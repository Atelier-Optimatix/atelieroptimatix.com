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

// Keystatic's admin UI only makes sense against `astro dev` (its "local"
// storage writes straight to files on disk), and its integration injects
// SSR-only routes with no opt-out. Those routes need an output mode that
// allows on-demand rendering, so:
//   - dev  → "hybrid" (SSR routes allowed; `astro dev` needs no adapter),
//            which keeps the /keystatic admin working for content editing.
//   - build → "static", producing a plain static site for GitHub Pages,
//            with Keystatic left out entirely (the /admin redirect is a
//            harmless no-op in that build).
//
// NOTE: Astro's `defineConfig` does NOT support Vite's function form
// (`defineConfig((env) => ({...}))`) — passing a function silently drops the
// whole config (integrations + vite plugins never wire up, which breaks
// astro-icon's `virtual:astro-icon` and the PWA virtual modules at build
// time). Detect the dev command from argv instead and keep the object form.
const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	output: isDev ? "hybrid" : "static",
	compressHTML: true,
	i18n: {
		defaultLocale: defaultLocale,
		locales: locales,
		routing: {
			prefixDefaultLocale: false,
		},
	},
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
		...(isDev ? [keystatic()] : []),
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
});
