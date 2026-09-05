import { Markdoc, component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document, // Apply defaults for other options
			render: undefined, // default 'article'
		},
		heading: {
			// Spread the whole default node, not just its attributes: the default
			// carries the `transform` that slugs each heading into an `id` and
			// flags it for Astro's `headings` collector. Overriding the node
			// without it silently produced anchor-less headings and an empty
			// `headings` array, which is what the docs table of contents needs.
			...nodes.heading,
			attributes: {
				...nodes.heading.attributes, // Use the correct base attributes for a heading
				// Additional custom attributes if needed
				title: { type: String, render: "title" },
				level: { type: Number, render: "level" },
			},
			render: component("./src/components/primitives/Title.astro"),
		},
		link: {
			render: "a",
			attributes: {
				href: { type: String },
				target: { type: String },
				rel: { type: String },
			},
			// Open external links in a new tab, but keep internal navigation in
			// place. A blanket target="_blank" default meant every cross-reference
			// between guide pages spawned a tab, which makes a heavily cross-linked
			// set of docs unusable after about five clicks.
			transform(node, config) {
				const attributes = node.transformAttributes(config);
				const children = node.transformChildren(config);
				const href = String(attributes.href ?? "");
				const isInternal = href.startsWith("/") || href.startsWith("#");

				return new Markdoc.Tag(
					"a",
					isInternal
						? attributes
						: {
								...attributes,
								target: attributes.target ?? "_blank",
								rel: attributes.rel ?? "noopener noreferrer",
							},
					children,
				);
			},
		},
	},
	tags: {
		// Lowercase because docs content authors write it inline as
		// `{% callout type="note" %}`, unlike the capitalised page-section tags
		// below which are placed by the Keystatic editor.
		callout: {
			attributes: {
				type: { type: String, render: "type", matches: ["note", "warning"], default: "note" },
			},
			children: ["paragraph", "list", "link"],
			render: component("./src/components/primitives/Callout.astro"),
		},
		Container: {
			attributes: {
				class: { type: String, render: "class" },
			},
			children: ["*"],
			render: component("./src/components/primitives/Container.astro"),
		},
		ContainerFluid: {
			attributes: {
				class: { type: String, render: "class" },
			},
			children: ["*"],
			render: component("./src/components/primitives/ContainerFluid.astro"),
		},
		Prose: {
			attributes: {
				class: { type: String, render: "class" },
			},
			children: ["*"],
			render: component("./src/components/primitives/Prose.astro"),
		},
		Flex: {
			attributes: {
				class: { type: String, render: "class" },
				direction: { type: String, render: "direction" },
				verticalAlign: { type: String, render: "verticalAlign" },
				horizontalAlign: { type: String, render: "horizontalAlign" },
				itemsAlignment: { type: String, render: "itemsAlignment" },
				gap: { type: Number, render: "gap" },
				wrap: { type: Boolean, render: "wrap" },
			},
			children: ["*"],
			render: component("./src/components/primitives/Flex.astro"),
		},
		Hero: {
			attributes: {
				title: { type: String, render: "title", required: true },
				subtitle: { type: String, render: "subtitle", required: true },
				buttons: { type: Array, render: "buttons", required: true },
			},
			render: component("./src/components/sections/Hero.astro"),
		},
		BlogLatest: {
			attributes: {
				title: { type: String, render: "title", required: true },
			},
			render: component("./src/components/sections/BlogLatest.astro"),
		},
		LogoCloud: {
			attributes: {
				title: { type: String, render: "title", required: true },
				logos: { type: Array, render: "logos", required: true },
			},
			render: component("./src/components/sections/LogoCloud.astro"),
		},
		Services: {
			attributes: {
				title: { type: String, render: "title", required: true },
				services: { type: Array, render: "services", required: true },
			},
			render: component("./src/components/sections/Services.astro"),
		},
		EduConnectReel: {
			attributes: {},
			render: component("./src/components/sections/EduConnectReel.astro"),
		},
		OurProducts: {
			attributes: {
				title: { type: String, render: "title", required: true },
				buttons: { type: Array, render: "buttons", required: true },
			},
			render: component("./src/components/sections/OurProducts.astro"),
		},
		Testimonial: {
			attributes: {
				testimonial: { type: String, render: "testimonial", required: true },
				name: { type: String, render: "name", required: true },
			},
			render: component("./src/components/sections/Testimonial.astro"),
		},
		Results: {
			attributes: {
				title: { type: String, render: "title", required: true },
				results: { type: Array, render: "results", required: true },
			},
			render: component("./src/components/sections/Results.astro"),
		},
		About: {
			attributes: {
				title: { type: String, render: "title", required: true },
				subtitle: { type: String, render: "subtitle", required: true },
				content: { type: String, render: "content", required: true },
			},
			render: component("./src/components/sections/About.astro"),
		},
		Team: {
			attributes: {
				title: { type: String, render: "title", required: true },
				subtitle: { type: String, render: "subtitle" },
				members: { type: Array, render: "members", required: true },
			},
			render: component("./src/components/sections/Team.astro"),
		},
		Works: {
			attributes: {},
			render: component("./src/components/sections/Works.astro"),
		},
		News: {
			attributes: {},
			render: component("./src/components/sections/News.astro"),
		},
		Contact: {
			attributes: {
				title: { type: String, render: "title", required: true },
				fields: { type: Array, render: "fields", required: true },
			},
			render: component("./src/components/sections/Contact.astro"),
		},
	},
});
