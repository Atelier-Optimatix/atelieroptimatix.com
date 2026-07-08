declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"authors": {
"en/shamil-kuruppu.mdoc": {
	id: "en/shamil-kuruppu.mdoc";
  slug: "en/shamil-kuruppu";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".mdoc"] };
"es/shamil-kuruppu.mdoc": {
	id: "es/shamil-kuruppu.mdoc";
  slug: "es/shamil-kuruppu";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".mdoc"] };
"ms/shamil-kuruppu.mdoc": {
	id: "ms/shamil-kuruppu.mdoc";
  slug: "ms/shamil-kuruppu";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".mdoc"] };
};
"pages": {
"en/about.mdoc": {
	id: "en/about.mdoc";
  slug: "en/about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/cancellation-policy.mdoc": {
	id: "en/cancellation-policy.mdoc";
  slug: "en/cancellation-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/contact.mdoc": {
	id: "en/contact.mdoc";
  slug: "en/contact";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/homepage.mdoc": {
	id: "en/homepage.mdoc";
  slug: "en/homepage";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/kinder-care-privacy-policy.mdoc": {
	id: "en/kinder-care-privacy-policy.mdoc";
  slug: "en/kinder-care-privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/legal.mdoc": {
	id: "en/legal.mdoc";
  slug: "en/legal";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/news.mdoc": {
	id: "en/news.mdoc";
  slug: "en/news";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/payment-disclamer.mdoc": {
	id: "en/payment-disclamer.mdoc";
  slug: "en/payment-disclamer";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/privacy-policy.mdoc": {
	id: "en/privacy-policy.mdoc";
  slug: "en/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/refund-policy.mdoc": {
	id: "en/refund-policy.mdoc";
  slug: "en/refund-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/terms-and-conditions.mdoc": {
	id: "en/terms-and-conditions.mdoc";
  slug: "en/terms-and-conditions";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"en/works.mdoc": {
	id: "en/works.mdoc";
  slug: "en/works";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/about.mdoc": {
	id: "es/about.mdoc";
  slug: "es/about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/cancellation-policy.mdoc": {
	id: "es/cancellation-policy.mdoc";
  slug: "es/cancellation-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/contact.mdoc": {
	id: "es/contact.mdoc";
  slug: "es/contact";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/homepage.mdoc": {
	id: "es/homepage.mdoc";
  slug: "es/homepage";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/kinder-care-privacy-policy.mdoc": {
	id: "es/kinder-care-privacy-policy.mdoc";
  slug: "es/kinder-care-privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/legal.mdoc": {
	id: "es/legal.mdoc";
  slug: "es/legal";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/news.mdoc": {
	id: "es/news.mdoc";
  slug: "es/news";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/payment-disclamer.mdoc": {
	id: "es/payment-disclamer.mdoc";
  slug: "es/payment-disclamer";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/privacy-policy.mdoc": {
	id: "es/privacy-policy.mdoc";
  slug: "es/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/refund-policy.mdoc": {
	id: "es/refund-policy.mdoc";
  slug: "es/refund-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/terms-and-conditions.mdoc": {
	id: "es/terms-and-conditions.mdoc";
  slug: "es/terms-and-conditions";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"es/works.mdoc": {
	id: "es/works.mdoc";
  slug: "es/works";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/about.mdoc": {
	id: "ms/about.mdoc";
  slug: "ms/about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/cancellation-policy.mdoc": {
	id: "ms/cancellation-policy.mdoc";
  slug: "ms/cancellation-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/contact.mdoc": {
	id: "ms/contact.mdoc";
  slug: "ms/contact";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/homepage.mdoc": {
	id: "ms/homepage.mdoc";
  slug: "ms/homepage";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/kinder-care-privacy-policy.mdoc": {
	id: "ms/kinder-care-privacy-policy.mdoc";
  slug: "ms/kinder-care-privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/legal.mdoc": {
	id: "ms/legal.mdoc";
  slug: "ms/legal";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/news.mdoc": {
	id: "ms/news.mdoc";
  slug: "ms/news";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/payment-disclamer.mdoc": {
	id: "ms/payment-disclamer.mdoc";
  slug: "ms/payment-disclamer";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/privacy-policy.mdoc": {
	id: "ms/privacy-policy.mdoc";
  slug: "ms/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/refund-policy.mdoc": {
	id: "ms/refund-policy.mdoc";
  slug: "ms/refund-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/terms-and-conditions.mdoc": {
	id: "ms/terms-and-conditions.mdoc";
  slug: "ms/terms-and-conditions";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"ms/works.mdoc": {
	id: "ms/works.mdoc";
  slug: "ms/works";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
};
"posts": {
"en/future-of-edutech.mdoc": {
	id: "en/future-of-edutech.mdoc";
  slug: "en/future-of-edutech";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"es/future-of-edutech.mdoc": {
	id: "es/future-of-edutech.mdoc";
  slug: "es/future-of-edutech";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"ms/future-of-edutech.mdoc": {
	id: "ms/future-of-edutech.mdoc";
  slug: "ms/future-of-edutech";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
};
"services": {
};
"works": {
"en/duesautomata.mdoc": {
	id: "en/duesautomata.mdoc";
  slug: "en/duesautomata";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"en/educonnect.mdoc": {
	id: "en/educonnect.mdoc";
  slug: "en/educonnect";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"en/simmeringerp.mdoc": {
	id: "en/simmeringerp.mdoc";
  slug: "en/simmeringerp";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"es/duesautomata.mdoc": {
	id: "es/duesautomata.mdoc";
  slug: "es/duesautomata";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"es/educonnect.mdoc": {
	id: "es/educonnect.mdoc";
  slug: "es/educonnect";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"es/simmeringerp.mdoc": {
	id: "es/simmeringerp.mdoc";
  slug: "es/simmeringerp";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"ms/duesautomata.mdoc": {
	id: "ms/duesautomata.mdoc";
  slug: "ms/duesautomata";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"ms/educonnect.mdoc": {
	id: "ms/educonnect.mdoc";
  slug: "ms/educonnect";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
"ms/simmeringerp.mdoc": {
	id: "ms/simmeringerp.mdoc";
  slug: "ms/simmeringerp";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		"global": {
"contacts": {
	id: "contacts";
  collection: "global";
  data: any
};
"en/footer": {
	id: "en/footer";
  collection: "global";
  data: any
};
"en/header": {
	id: "en/header";
  collection: "global";
  data: any
};
"en/seo": {
	id: "en/seo";
  collection: "global";
  data: any
};
"es/footer": {
	id: "es/footer";
  collection: "global";
  data: any
};
"es/header": {
	id: "es/header";
  collection: "global";
  data: any
};
"es/seo": {
	id: "es/seo";
  collection: "global";
  data: any
};
"ms/footer": {
	id: "ms/footer";
  collection: "global";
  data: any
};
"ms/header": {
	id: "ms/header";
  collection: "global";
  data: any
};
"ms/seo": {
	id: "ms/seo";
  collection: "global";
  data: any
};
"style": {
	id: "style";
  collection: "global";
  data: any
};
"widget": {
	id: "widget";
  collection: "global";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
