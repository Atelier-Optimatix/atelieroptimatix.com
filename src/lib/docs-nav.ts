import { type CollectionEntry, getCollection } from "astro:content";
import { defaultLocale } from "site.config";

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

/**
 * Every visible doc in the default locale, grouped product → section → page and
 * sorted the way the sidebar renders it. Empty products and sections are
 * dropped so adding a product to `productOrder` before it has any content is
 * harmless.
 */
export async function getDocsNav(): Promise<DocProductGroup[]> {
	const all = await getCollection(
		"docs",
		({ data, slug }) => !data.hidden && slug.startsWith(`${defaultLocale}/`),
	);

	return productOrder
		.map((product) => {
			const inProduct = all.filter((doc) => doc.data.product === product);

			const bySection = new Map<string, DocEntry[]>();
			for (const doc of inProduct) {
				const section = doc.data.section ?? defaultSection;
				const bucket = bySection.get(section);
				if (bucket) bucket.push(doc);
				else bySection.set(section, [doc]);
			}

			const sections: DocSection[] = [...bySection.entries()]
				.sort(([a], [b]) => sectionIndex(a) - sectionIndex(b) || a.localeCompare(b))
				.map(([section, docs]) => ({
					section,
					docs: docs
						.sort(
							(a, b) =>
								(a.data.order ?? 100) - (b.data.order ?? 100) ||
								a.data.title.localeCompare(b.data.title),
						)
						.map((doc) => {
							const slug = docSlug(doc);
							return {
								slug,
								href: `/docs/${slug}`,
								title: doc.data.title,
								description: doc.data.description,
							};
						}),
				}));

			return {
				product,
				label: productLabels[product],
				blurb: productBlurbs[product],
				sections,
			};
		})
		.filter((group) => group.sections.length > 0);
}
