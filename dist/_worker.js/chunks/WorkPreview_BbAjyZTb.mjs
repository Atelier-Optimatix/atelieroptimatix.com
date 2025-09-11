globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as createAstro, c as createComponent, m as maybeRenderHead, j as addAttribute, r as renderComponent, d as renderTemplate } from './astro_C6DN7fAn.mjs';
import { u as unlocalizedUrl, l as loadVideo, t as translatePath, h as $$Icon, e as $$Image, k as defaultLocale } from './prerender_BgPehNso.mjs';
/* empty css                                                                   */

const $$Astro = createAstro("https://atelieroptimatix.com");
const $$WorkPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WorkPreview;
  const currentLocale = Astro2.currentLocale;
  const { work } = Astro2.props;
  const unlocalizedPath = unlocalizedUrl(work.slug);
  const localizedPath = translatePath(
    currentLocale ?? defaultLocale,
    `/work${unlocalizedPath}`
  );
  const videoSrc = work.data?.video ? await loadVideo(work.data.video) : null;
  return renderTemplate`${maybeRenderHead()}<div class="items-stretch flex-col justify-center relative flex" data-astro-cid-zukrwfzk> <a${addAttribute(localizedPath, "href")} class="work-item items-center justify-center flex overflow-hidden rounded-3xl relative group" data-astro-cid-zukrwfzk> <div class="play-button text-white items-center justify-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute z-10 flex max-w-full opacity-0 group-hover:opacity-100 transition-all duration-300" data-astro-cid-zukrwfzk> <div class="text-black bg-white/[0.75] items-center backdrop-blur-[5px] cursor-pointer justify-center flex w-full h-full rounded-full" data-astro-cid-zukrwfzk> ${renderComponent($$result, "Icon", $$Icon, { "name": "iconamoon:arrow-top-right-1-thin", "class": "align-middle inline-block w-12 h-12 max-w-full", "data-astro-cid-zukrwfzk": true })} </div> </div> ${videoSrc ? renderTemplate`<video class="object-cover align-middle inline-block w-full h-96 min-h-full max-w-full" autoplay loop muted playsinline data-astro-cid-zukrwfzk> <source${addAttribute(videoSrc, "src")} data-astro-cid-zukrwfzk> </video>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": work.data.cover, "alt": `Cover for ${work.data.title}`, "class": "object-cover align-middle inline-block w-full h-96 min-h-full max-w-full", "data-astro-cid-zukrwfzk": true })}`} </a> <div class="mt-5" data-astro-cid-zukrwfzk> <div class="items-center justify-between flex flex-row gap-4" data-astro-cid-zukrwfzk> <a${addAttribute(localizedPath, "href")} class="menu-item relative items-start flex-col flex max-w-full" data-astro-cid-zukrwfzk> <h3 class="cursor-pointer text-[1.75rem] leading-8" data-astro-cid-zukrwfzk> ${work.data.title} </h3> <div class="cursor-pointer w-full overflow-hidden" data-astro-cid-zukrwfzk> <div class="w-full h-0.5 mt-1" data-astro-cid-zukrwfzk></div> </div> </a> <p class="text-neutral-400 text-lg" data-astro-cid-zukrwfzk> ${Array.from(work.data.tags).join(", ")} </p> </div> </div> </div> `;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/WorkPreview.astro", void 0);

export { $$WorkPreview as $ };
