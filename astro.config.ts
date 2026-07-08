import alpinejs from "@astrojs/alpinejs";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import AstroPWA from "@vite-pwa/astro";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
// import squoosh from "@astrojs/image/service/squoosh";
import { defaultLocale, locales, siteTitle, siteUrl } from "./site.config";

// https://astro.build/config
export default defineConfig(({ command }) => ({
	site: siteUrl,
	output: "static",
	compressHTML: true,
	i18n: {
		defaultLocale: defaultLocale,
		locales: locales,
		routing: {
			prefixDefaultLocale: false,
		},
	},
	// Keystatic's admin UI only makes sense against `astro dev` (its "local"
	// storage writes straight to files on disk) — the integration always
	// injects SSR-only routes with no opt-out, which is incompatible with
	// `output: "static"`, so it's only registered in dev below and this
	// redirect is a no-op in the production build.
	redirects: {
		"/admin": "/keystatic",
	},
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		alpinejs(),
		tailwind({
			// Base style is applied on the file global.css
			applyBaseStyles: false,
		}),
		sitemap(),
		icon(),
		react(),
		markdoc(),
		...(command === "dev" ? [keystatic()] : []),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
		}),
		AstroPWA({
			mode: import.meta.env.PROD ? "production" : "development",
			base: "/",
			scope: "/",
			includeAssets: ["favicon.svg"],
			registerType: "autoUpdate",
			injectRegister: false,
			manifest: {
				name: siteTitle,
				short_name: siteTitle,
				theme_color: "#ffffff",
			},
			pwaAssets: {
				config: true,
			},
			workbox: {
				navigateFallback: "/",
				globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
				globIgnores: ["**/_worker.js/**/*", "_worker.js"],
				navigateFallbackDenylist: [/^\/keystatic/, /^\/api/],
				skipWaiting: true,
				maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
			},
			devOptions: {
				enabled: false,
				navigateFallbackAllowlist: [/^\//],
			},
			experimental: {
				directoryAndTrailingSlashHandler: true,
			},
		}),
	],
}));
