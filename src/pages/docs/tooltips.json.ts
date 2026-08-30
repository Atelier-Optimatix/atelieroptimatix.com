import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { defaultLocale } from "site.config";

// Published for in-app help tooltips (attendance-web-app, educonnect-public,
// educonnect-admissions) to fetch at runtime. Generated straight from the
// `docs` content collection so the excerpt shown in-app is never a
// hand-copied duplicate of the doc's `description` front-matter - this is
// the single source for both the full page and the tooltip text.
export const GET: APIRoute = async () => {
	const allDocs = await getCollection("docs", ({ data }) => !data.hidden);

	const entries = allDocs
		.filter((doc) => doc.slug.startsWith(`${defaultLocale}/`))
		.map((doc) => ({
			slug: doc.slug.slice(defaultLocale.length + 1),
			title: doc.data.title,
			description: doc.data.description,
			product: doc.data.product,
		}));

	return new Response(JSON.stringify(entries), {
		headers: { "Content-Type": "application/json" },
	});
};
