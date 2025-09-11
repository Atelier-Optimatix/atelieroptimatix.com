globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderTemplate } from './astro_C6DN7fAn.mjs';
import { j as getCollection } from './prerender_BgPehNso.mjs';
import { $ as $$BlogPreview } from './BlogPreview_BBykjWvU.mjs';

const $$Astro = createAstro("https://atelieroptimatix.com");
const $$News = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$News;
  const currentLocale = Astro2.currentLocale;
  const posts = await getCollection("posts");
  const allPosts = posts.map((post) => {
    const [lang, ...slug] = post.slug.split("/");
    return {
      ...post,
      lang,
      slug: post.slug.startsWith("/") ? post.slug : `/${post.slug}`
    };
  }).filter((post) => post.lang === currentLocale && !post.data.hidden).sort(
    (a, b) => a.data.lastUpdateDate.getTime() - b.data.lastUpdateDate.getTime()
  );
  return renderTemplate`${maybeRenderHead()}<div class="gap-x-[1.88rem] text-sm font-medium auto-cols-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[auto] gap-y-10 grid pb-40"> ${allPosts.map((post) => renderTemplate`${renderComponent($$result, "BlogPreview", $$BlogPreview, { "post": post })}`)} </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/News.astro", void 0);

export { $$News as $ };
