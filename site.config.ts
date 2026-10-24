export const siteUrl = "https://atelieroptimatix.com";
export const siteTitle = "Atelier Optimatix";
export const defaultLocale = "en";
// Every locale Astro routes. Only `siteLocales` have marketing pages, posts and
// works; the rest exist for the user guide (`/<locale>/docs`) alone.
export const locales = ["en", "es", "ms", "fr", "si", "ta"];
export type Locale = "en" | "es" | "ms" | "fr" | "si" | "ta";
/** Locales with the full marketing site (header, footer, pages, blog, work). */
export const siteLocales: Locale[] = ["en", "es", "ms"];
/** Locales the user guide is published in. */
export const docsLocales: Locale[] = ["en", "es", "ms", "fr", "si", "ta"];
