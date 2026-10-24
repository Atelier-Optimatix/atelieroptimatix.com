import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { defaultLocale } from "site.config";

// Published for the Phase 5 CI staleness-check workflow in each product repo
// (attendance-web-app, educonnect-public, educonnect-admissions) to fetch at
// build/PR time. Generated straight from the `docs` content collection's
// `sourcePaths` front-matter so the mapping used by CI is never a hand-copied
// duplicate of what each doc page already declares.
export const GET: APIRoute = async () => {
	const allDocs = await getCollection("docs", ({ data }) => !data.hidden);

	const entries = allDocs
		.filter((doc) => doc.slug.startsWith(`${defaultLocale}/`))
		.map((doc) => ({
			slug: doc.slug.slice(defaultLocale.length + 1),
			title: doc.data.title,
			sourcePaths: doc.data.sourcePaths,
		}));

	return new Response(JSON.stringify(entries), {
		headers: { "Content-Type": "application/json" },
	});
};
