import { getCollection } from "astro:content";
import { translatePath } from "@/lib/localization-helpers";

// Display order of the privacy documents. Anything flagged `legal` in
// frontmatter but missing here sorts last, so a new policy still shows up in
// the switcher and footer without a code change.
const order = [
	"privacy-policy",
	"website-privacy",
	"cookies-and-third-parties",
	"platform-privacy",
	"educonnect-privacy-policy",
	"kinder-care-privacy-policy",
	"legal",
];

export async function getLegalPages(locale: string | undefined) {
	const pages = await getCollection("pages");
	return pages
		.map((page) => {
			const [lang, ...rest] = page.slug.split("/");
			const name = rest.join("/");
			return { lang, name, title: page.data.title, legal: page.data.legal, href: translatePath(lang, `/${name}`) };
		})
		.filter((page) => page.lang === (locale ?? "en") && page.legal)
		.sort((a, b) => {
			const rank = (n: string) => (order.includes(n) ? order.indexOf(n) : order.length);
			return rank(a.name) - rank(b.name);
		});
}
