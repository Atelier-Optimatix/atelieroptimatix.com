globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as createAstro, c as createComponent, m as maybeRenderHead, j as addAttribute, r as renderComponent, i as renderSlot, d as renderTemplate, u as unescapeHTML } from './astro_C6DN7fAn.mjs';
import { h as $$Icon, i as $$Link, f as $$Container, e as $$Image, j as getCollection } from './prerender_BgPehNso.mjs';
/* empty css                                                            */
/* empty css                                                            */
import { $ as $$WorkPreview } from './WorkPreview_BbAjyZTb.mjs';
import { $ as $$BlogPreview } from './BlogPreview_BBykjWvU.mjs';

const promoVideo = "/_astro/promo.8ev6z6da.webm";

const $$Astro$4 = createAstro("https://atelieroptimatix.com");
const $$Blob = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Blob;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative" data-astro-cid-zxqwhg62> <canvas id="blob"${addAttribute(["touch:pointer-events-none", className], "class:list")} data-astro-cid-zxqwhg62></canvas> <video id="video-blob" autoplay loop muted controls data-astro-cid-zxqwhg62> <source${addAttribute(promoVideo, "src")} data-astro-cid-zxqwhg62>
Your browser does not support the video tag.
</video> <div id="blob-cursor-follower" class="follower" data-astro-cid-zxqwhg62> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:play-circle", "size": 100, "data-astro-cid-zxqwhg62": true })} </div> ${renderSlot($$result, $$slots["default"])} </div>  `;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Blob.astro", void 0);

const $$Astro$3 = createAstro("https://atelieroptimatix.com");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero;
  const defaultButtons = [
    {
      title: "Contattaci",
      href: "/contact",
      style: "button",
      icon: "iconamoon:arrow-top-right-1-thin"
    }
  ];
  const { title, subtitle, buttons = defaultButtons } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="hero" class="items-center text-sm font-medium justify-center pb-48 lg:px-20 pt-32 lg:pt-44 relative flex min-h-[100svh]" data-astro-cid-anhloy43> ${renderComponent($$result, "Container", $$Container, { "data-astro-cid-anhloy43": true }, { "default": ($$result2) => renderTemplate` <div class="items-center flex-col w-full m-auto" data-astro-cid-anhloy43> <div class="items-center auto-cols-fr grid-cols-1 lg:grid-cols-2 grid-rows-[auto] grid gap-[3.13rem]" data-astro-cid-anhloy43> <div class="items-start flex-col justify-start flex gap-2 row-start-1" data-astro-cid-anhloy43> <h1 data-hero-reveal class="text-4xl md:text-7xl leading-tight my-3 mx-0" data-astro-cid-anhloy43>${unescapeHTML(title)}</h1> <div class="lg:mt-20" data-astro-cid-anhloy43> <div data-astro-cid-anhloy43> <p data-hero-reveal class="text-3xl font-semibold mb-3" data-astro-cid-anhloy43>${unescapeHTML(subtitle)}</p> <div class="mt-10 text-white" data-astro-cid-anhloy43> ${buttons.map(
    ({ title: title2, href, style, icon }) => renderTemplate`${renderComponent($$result2, "Link", $$Link, { "data-hero-reveal": true, "href": href, "style": style, "icon": icon, "data-astro-cid-anhloy43": true }, { "default": ($$result3) => renderTemplate`${title2}` })}`
  )} </div> </div> </div> </div> <div class="justify-self-center col-span-1 row-span-1" data-astro-cid-anhloy43> ${renderComponent($$result2, "Blob", $$Blob, { "class": "xl:pl-32", "data-astro-cid-anhloy43": true })} </div> </div> </div> <div class="items-center bottom-[3.13rem] justify-center left-0 absolute right-0 z-10 flex max-w-[80%] overflow-hidden m-auto text-blue-700" data-astro-cid-anhloy43> <div class="items-center flex" data-astro-cid-anhloy43> <button id="scroll-down-button" class="scroll-down-button items-start justify-center underline flex w-5 h-7 max-w-full border-2 border-black border-solid rounded-xl m-auto" data-astro-cid-anhloy43><div class="bg-black cursor-pointer w-0.5 h-1 mt-1.5" data-astro-cid-anhloy43></div> </button> </div> </div> ` })} </div>  `;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Hero.astro", void 0);

const $$Astro$2 = createAstro("https://atelieroptimatix.com");
const $$Services = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Services;
  const { title, services } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/assets/pages/about/about.png": () => import('./about_DnIBAvoc.mjs'),"/src/assets/pages/blog/cover.svg": () => import('./cover_BQ7H3V8y.mjs'),"/src/assets/pages/homepage/cactus.svg": () => import('./cactus_CozvbKi1.mjs'),"/src/assets/pages/homepage/clean-teeth.svg": () => import('./clean-teeth_C4KXWboe.mjs'),"/src/assets/pages/homepage/dental-check-up-schedule.svg": () => import('./dental-check-up-schedule_BJQYejbt.mjs'),"/src/assets/pages/homepage/dental-filling.svg": () => import('./dental-filling_QNpQpPgw.mjs'),"/src/assets/pages/homepage/dental-implant.svg": () => import('./dental-implant_BzDmUBYw.mjs'),"/src/assets/pages/homepage/dental.svg": () => import('./dental_BW2HCGM9.mjs'),"/src/assets/pages/homepage/education.png": () => import('./education_DDUv0_3A.mjs'),"/src/assets/pages/homepage/education.svg": () => import('./education_BXgXaBM_.mjs'),"/src/assets/pages/homepage/google-white.png": () => import('./google-white_B6EMIV7Z.mjs'),"/src/assets/pages/homepage/hitech.svg": () => import('./hitech_BDvKGEBo.mjs'),"/src/assets/pages/homepage/industrial.png": () => import('./industrial_BsmB07B2.mjs'),"/src/assets/pages/homepage/industrial.svg": () => import('./industrial_CXd_zMCx.mjs'),"/src/assets/pages/homepage/integration.png": () => import('./integration_BdGAntAx.mjs'),"/src/assets/pages/homepage/integration.svg": () => import('./integration__UgPG2ZW.mjs'),"/src/assets/pages/homepage/marketing-service.png": () => import('./marketing-service_DsTJa62o.mjs'),"/src/assets/pages/homepage/orthodontics.svg": () => import('./orthodontics_D7GMLgKk.mjs'),"/src/assets/pages/homepage/paidmedia-service.png": () => import('./paidmedia-service_CoKAE7Cq.mjs'),"/src/assets/pages/homepage/plaque.svg": () => import('./plaque_CuT7MUK5.mjs'),"/src/assets/pages/homepage/play.svg": () => import('./play_C30WqH6E.mjs'),"/src/assets/pages/homepage/rise.svg": () => import('./rise_C6IcIVod.mjs'),"/src/assets/pages/homepage/socialmedia-service.png": () => import('./socialmedia-service_DCvECF9T.mjs'),"/src/assets/pages/homepage/teeth-whitening.svg": () => import('./teeth-whitening_L8TXBeqq.mjs'),"/src/assets/pages/homepage/terra.svg": () => import('./terra_Cgbr9WIz.mjs'),"/src/assets/pages/homepage/vision.svg": () => import('./vision_ZOQLBM7N.mjs')

});
  return renderTemplate`${maybeRenderHead()}<div class="pt-36" id="services"> <p class="text-[2.13rem] leading-9 font-semibold lg:max-w-[64%] mb-3">${unescapeHTML(title)}</p> <div class="mt-16"> <div class="auto-cols-fr grid-cols-1 md:grid-cols-3 grid-rows-[auto] grid gap-10"> ${services.map(({ title: title2, description, icon }) => renderTemplate`<div class="items-stretch flex-col flex h-full max-w-[90%] m-auto col-span-1 row-span-1"> ${renderComponent($$result, "Image", $$Image, { "src": images[icon](), "alt": `Service ${title2}`, "class": "align-middle inline-block w-12 h-12 max-w-full" })} <div class="mt-16 text-[1.38rem] leading-7 font-semibold"> <h3 class="mb-3">${title2}</h3> </div> <div class="mt-3.5 text-lg"> <p class="mb-3">${description}</p> </div> </div>`)} </div> </div> </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Services.astro", void 0);

const $$Astro$1 = createAstro("https://atelieroptimatix.com");
const $$OurProducts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OurProducts;
  const currentLocale = Astro2.currentLocale;
  const works = await getCollection("works");
  const ourProducts = works.map((work) => {
    const [lang, ...slug] = work.slug.split("/");
    return {
      ...work,
      lang,
      slug: work.slug.startsWith("/") ? work.slug : `/${work.slug}`
    };
  }).filter((page) => page.lang === currentLocale).sort(
    (a, b) => a.data.lastUpdateDate.getTime() - b.data.lastUpdateDate.getTime()
  ).slice(0, 4);
  const { title, buttons } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="items-center text-sm font-medium justify-center flex pt-20 pb-16"> <h2 class="text-[3.13rem] leading-none font-semibold my-1">${title}</h2> </div> <div class="text-sm font-medium auto-cols-fr grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto] grid gap-[3.13rem]"> ${ourProducts.map((work) => renderTemplate`${renderComponent($$result, "WorkPreview", $$WorkPreview, { "work": work })}`)} </div> <div class="items-center flex-col text-sm font-medium flex text-white pt-16 pb-20"> ${buttons.map(({ title: title2, href, style, icon }) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": href, "style": style, "icon": icon }, { "default": async ($$result2) => renderTemplate`${title2}` })}`)} </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/OurProducts.astro", void 0);

const $$Astro = createAstro("https://atelieroptimatix.com");
const $$BlogLatest = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogLatest;
  const currentLocale = Astro2.currentLocale;
  const posts = await getCollection("posts");
  const recentPosts = posts.map((post) => {
    const [lang, ...slug] = post.slug.split("/");
    return {
      ...post,
      lang,
      slug: post.slug.startsWith("/") ? post.slug : `/${post.slug}`
    };
  }).filter((post) => post.lang === currentLocale).sort(
    (a, b) => a.data.lastUpdateDate.getTime() - b.data.lastUpdateDate.getTime()
  ).slice(0, 4);
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="text-sm font-medium pt-20 pb-32"> <div class="items-center justify-center flex text-[3.13rem] leading-none font-semibold"> <h2 class="my-1">${title}</h2> </div> <div class="mt-16"> <div class="gap-x-[1.88rem] auto-cols-fr grid-cols-1 lg:grid-cols-3 grid-rows-[auto] gap-y-10 grid"> ${recentPosts.map((post) => renderTemplate`${renderComponent($$result, "BlogPreview", $$BlogPreview, { "post": post })}`)} </div> </div> </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/BlogLatest.astro", void 0);

export { $$BlogLatest as $, $$OurProducts as a, $$Services as b, $$Hero as c };
