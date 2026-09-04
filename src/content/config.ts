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

// User guide / help center content. `product` and `roles` drive the docs IA
// (grouping by /docs/<product>/<role>/...); `sourcePaths` powers the CI
// staleness check that flags when mapped app code changes without a doc update.
const docsCollection = defineCollection({
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			product: z.enum(["educonnect", "kindercare", "admissions", "shared"]),
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
