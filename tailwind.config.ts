import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";
import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import type { PluginAPI } from "tailwindcss/types/config";
import style from "./src/content/global/style.json";

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			xs: "400px",
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				...tailwindcssPaletteGenerator([style.theme.colors.primary, style.theme.colors.secondary]),
				whatsapp: "#25d366",
			},
			fontFamily: {
				// Noto Sans Sinhala / Tamil cover the glyphs Inter Tight lacks (guide locales si, ta).
				sans: ["Inter Tight", "Noto Sans Sinhala", "Noto Sans Tamil", ...defaultTheme.fontFamily.sans],
				mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
				display: ["Montserrat", "Noto Sans Sinhala", "Noto Sans Tamil", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		typography,
		forms,
		aspectRatio,
		({ addVariant }: PluginAPI) => {
			addVariant("touch", "@media (pointer: coarse)");
		},
	],
	safelist: [
		// Try to avoid to add classes here
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

export default config;
