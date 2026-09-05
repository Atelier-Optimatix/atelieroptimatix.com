import { defineCollection, z } from "astro:content";

const pagesCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.optional(z.string()),
			type: z.string(),
			lastUpdateDate: z.date(),
			hideTitle: z.optional(z.boolean()),
			hidden: z.optional(z.boolean()),
			cover: z.optional(image()),
			seo: z.object({
				title: z.string(),
				description: z.string(),
				author: z.string(),
			}),
		}),
});

const postsCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			lastUpdateDate: z.date(),
			description: z.string(),
			category: z.string(),
			author: z.string(),
			cover: image(),
			tags: z.array(z.string()),
			hidden: z.optional(z.boolean()),
		}),
});

const worksCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			lastUpdateDate: z.date(),
			cover: image(),
			video: z.optional(z.string()),
			description: z.string(),
			link: z.optional(z.string()),
			tags: z.array(z.string()),
			hidden: z.optional(z.boolean()),
		}),
});

const servicesCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			lastUpdateDate: z.date(),
			cover: z.optional(image()),
			description: z.string(),
			hidden: z.optional(z.boolean()),
		}),
});

// User guide / help center content. `product` and `section` drive the docs IA
// (see src/lib/docs-nav.ts, which owns the ordering and the labels); `roles`
// are rendered as badges; `sourcePaths` powers the CI staleness check that
// flags when mapped app code changes without a doc update.
//
// A doc's filename is its slug, and slugs are load-bearing: the in-app help
// tooltips in attendance-web-app, educonnect-public and educonnect-admissions
// reference them by string (`HelpTooltip(slug: '...')`). Renaming a file
// silently empties those tooltips - add a new doc instead.
const docsCollection = defineCollection({
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			product: z.enum(["educonnect", "kindercare", "admissions", "shared"]),
			// Sidebar grouping within a product. Omitted means "Guides".
			section: z.optional(z.string()),
			// Sort position within a section; ties fall back to title order.
			order: z.optional(z.number()),
			roles: z.array(z.string()),
			lastUpdateDate: z.date(),
			sourcePaths: z.array(z.string()),
			screenshotIds: z.optional(z.array(z.string())),
			hidden: z.optional(z.boolean()),
		}),
});

export const collections = {
	posts: postsCollection,
	pages: pagesCollection,
	services: servicesCollection,
	works: worksCollection,
	docs: docsCollection,
};
