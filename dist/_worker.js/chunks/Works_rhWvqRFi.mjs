globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderTemplate } from './astro_C6DN7fAn.mjs';
import { j as getCollection } from './prerender_BgPehNso.mjs';
import { $ as $$WorkPreview } from './WorkPreview_BbAjyZTb.mjs';

const $$Astro = createAstro("https://atelieroptimatix.com");
const $$Works = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Works;
  const currentLocale = Astro2.currentLocale;
  const works = await getCollection("works");
  const allWorks = works.map((work) => {
    const [lang, ...slug] = work.slug.split("/");
    return {
      ...work,
      lang,
      slug: work.slug.startsWith("/") ? work.slug : `/${work.slug}`
    };
  }).filter((page) => page.lang === currentLocale).sort(
    (a, b) => a.data.lastUpdateDate.getTime() - b.data.lastUpdateDate.getTime()
  );
  return renderTemplate`${maybeRenderHead()}<div class="text-sm font-medium auto-cols-fr grid-cols-1 md:grid-cols-2 grid-rows-[auto] grid gap-9 pb-40"> ${allWorks.map((work) => renderTemplate`${renderComponent($$result, "WorkPreview", $$WorkPreview, { "work": work })}`)} </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Works.astro", void 0);

export { $$Works as $ };
