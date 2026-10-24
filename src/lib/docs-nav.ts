import { type CollectionEntry, getCollection } from "astro:content";
import { type Locale, defaultLocale, docsLocales } from "site.config";
import { docsHref, productBlurb, productLabel, sectionLabel } from "./docs-i18n";

/**
 * Single source for how the user guide is labelled and ordered.
 *
 * The docs index, the sidebar and the per-page header all read from here, so
 * a product label or a section only ever has to be renamed in one place.
 */

/**
 * Products, in the order they appear everywhere in the guide.
 *
 * EduConnect leads because it *is* the product: the same application ships as
 * EduConnect for schools and as KinderCare for kindergartens. KinderCare's own
 * section covers only what differs, plus its two mobile apps.
 */
export const productOrder = ["educonnect", "kindercare", "admissions", "shared"] as const;

export type Product = (typeof productOrder)[number];

export const productLabels: Record<Product, string> = {
	educonnect: "EduConnect",
	kindercare: "KinderCare",
	admissions: "Admissions",
	shared: "Across the platform",
};

export const productBlurbs: Record<Product, string> = {
	educonnect:
		"The main application — the staff dashboard, the parent portal, and everything schools run day to day.",
	kindercare:
		"The kindergarten deployment of the same platform, plus the KinderCare staff and parent mobile apps.",
	admissions: "The public admissions portal that applicants use before they become students.",
	shared: "Behaviour that is the same no matter which deployment you are signed in to.",
};

/**
 * Sections, in the order they appear within a product. A doc with no `section`
 * falls into "Guides", which is why that entry has to exist here.
 */
export const sectionOrder = [
	"Getting started",
	"Tutorials",
	"For teachers",
	"Advanced workflows",
	"For parents",
	"Guides",
] as const;

export const defaultSection = "Guides";

export type DocEntry = CollectionEntry<"docs">;

export type DocLink = {
	slug: string;
	href: string;
	title: string;
	description: string;
};

export type DocSection = {
	section: string;
	docs: DocLink[];
};

export type DocProductGroup = {
	product: Product;
	label: string;
	blurb: string;
	sections: DocSection[];
};

/** Strips the locale prefix that `getCollection` puts on every docs slug. */
export function docSlug(entry: DocEntry): string {
	const [, ...rest] = entry.slug.split("/");
	return rest.join("/");
}

function sectionIndex(section: string): number {
	const i = (sectionOrder as readonly string[]).indexOf(section);
	return i === -1 ? sectionOrder.length : i;
}

/** English entries are the canonical set; a locale shadows them where translated. */
async function getDocsByLocale(locale: string) {
	const all = await getCollection("docs", ({ data }) => !data.hidden);
	const base = all.filter((doc) => doc.slug.startsWith(`${defaultLocale}/`));
	const translated = new Map(
		all.filter((doc) => doc.slug.startsWith(`${locale}/`)).map((doc) => [docSlug(doc), doc]),
	);
	return base.map((doc) => {
		const localized = translated.get(docSlug(doc));
		return { base: doc, entry: localized ?? doc, translated: Boolean(localized) };
	});
}

/**
 * The doc to render at `/<locale>/docs/<slug>`: the translation when there is
 * one, otherwise the English entry (flagged so the page can say so).
 */
export async function getDocEntry(locale: string, slug: string) {
	const found = (await getDocsByLocale(locale)).find(({ base }) => docSlug(base) === slug);
	return found ? { entry: found.entry, fallback: !found.translated } : undefined;
}

/** Static paths for `[...slug]` in one locale: every English doc, translated or not. */
export async function getDocsStaticPaths(locale: string) {
	return (await getDocsByLocale(locale)).map(({ base, entry, translated }) => ({
		params: { slug: docSlug(base) },
		props: { data: entry, fallback: !translated },
	}));
}

/** Locales a given doc is actually translated into (always includes English). */
export async function getAvailableLocales(slug: string): Promise<Locale[]> {
	const all = await getCollection("docs", ({ data }) => !data.hidden);
	return docsLocales.filter((locale) =>
		all.some((doc) => doc.slug === `${locale}/${slug}`),
	);
}

/**
 * Every visible doc, grouped product → section → page and sorted the way the
 * sidebar renders it, in the requested locale (untranslated pages show their
 * English title and still link to the locale's route, which renders the English
 * text with a notice). Empty products and sections are dropped so adding a
 * product to `productOrder` before it has any content is harmless.
 */
export async function getDocsNav(locale: string = defaultLocale): Promise<DocProductGroup[]> {
	const all = await getDocsByLocale(locale);

	return productOrder
		.map((product) => {
			const inProduct = all.filter(({ base }) => base.data.product === product);

			// Grouped and ordered by the English section key; labels are translated last.
			const bySection = new Map<string, typeof inProduct>();
			for (const doc of inProduct) {
				const section = doc.base.data.section ?? defaultSection;
				const bucket = bySection.get(section);
				if (bucket) bucket.push(doc);
				else bySection.set(section, [doc]);
			}

			const sections: DocSection[] = [...bySection.entries()]
				.sort(([a], [b]) => sectionIndex(a) - sectionIndex(b) || a.localeCompare(b))
				.map(([section, docs]) => ({
					section: sectionLabel(locale, section),
					docs: docs
						.sort(
							(a, b) =>
								(a.base.data.order ?? 100) - (b.base.data.order ?? 100) ||
								a.base.data.title.localeCompare(b.base.data.title),
						)
						.map(({ base, entry }) => {
							const slug = docSlug(base);
							return {
								slug,
								href: docsHref(locale, slug),
								title: entry.data.title,
								description: entry.data.description,
							};
						}),
				}));

			return {
				product,
				label: productLabel(locale, product),
				blurb: productBlurb(locale, product),
				sections,
			};
		})
		.filter((group) => group.sections.length > 0);
}
