globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_C13ZgZ07.mjs';
import { $ as $$BlogLatest, a as $$OurProducts, b as $$Services, c as $$Hero } from './BlogLatest_5PfQ8VSM.mjs';
import { e as $$Image, $ as $$Title, f as $$Container } from './prerender_BgPehNso.mjs';
import { h as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderTemplate } from './astro_C6DN7fAn.mjs';
import googleWhite from './google-white_B6EMIV7Z.mjs';

const $$Astro = createAstro("https://atelieroptimatix.com");
const $$Testimonial = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Testimonial;
  const { testimonial, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="text-sm font-medium pt-20 pb-14"> <div class="bg-black flex-grow py-20 px-16 rounded-3xl"> <div class="items-center flex-col justify-center text-center flex"> ${renderComponent($$result, "Image", $$Image, { "src": googleWhite, "alt": "Google logo", "class": "object-contain align-middle inline-block w-full h-10 max-w-[8.13rem] mb-8" })} <h2 class="text-white text-[2.13rem] leading-9 lg:max-w-[60%] mb-1">
"${testimonial}"
</h2> <div class="bg-white/[0.9] w-12 h-0 my-8 m-auto mx-auto"></div> <h3 class="text-white text-lg">${name}</h3> </div> </div> </div>`;
}, "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Testimonial.astro", void 0);

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Hero": $$Hero,
"Container": $$Container,
"Services": $$Services,
"OurProducts": $$OurProducts,
"Testimonial": $$Testimonial,
"BlogLatest": $$BlogLatest,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,5],\"inline\":false,\"attributes\":{\"title\":\"Diamo vita alle vostre visioni più <b>maestose</b>.\",\"subtitle\":\"Siamo specializzati in soluzioni che portano risultati al vostro business. <span class=\\\"text-neutral-400\\\">Contattateci per una consulenza gratuita.</span>\",\"buttons\":[{\"title\":\"Contattaci\",\"href\":\"/contact\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Hero\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Diamo vita alle vostre visioni più <b>maestose</b>.\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"Siamo specializzati in soluzioni che portano risultati al vostro business. <span class=\\\"text-neutral-400\\\">Contattateci per una consulenza gratuita.</span>\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"Contattaci\",\"href\":\"/contact\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":5}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[6,7,22,23],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[8,11],\"inline\":false,\"attributes\":{\"title\":\"Sfruttiamo la nostra vasta esperienza in design e tecnologia per <span class=\\\"text-neutral-400\\\">creare brand leader ed esperienze digitali eccezionali.</span>\",\"services\":[{\"title\":\"Branding\",\"description\":\"Connettiamo brand e UX, creando identità digitali coerenti su tutti i canali con una guida strategica per garantire una rappresentazione del brand senza soluzione di continuità.\",\"icon\":\"/src/assets/pages/homepage/marketing-service.png\"},{\"title\":\"Soluzioni digitali\",\"description\":\"Creiamo prodotti aziendali e per i consumatori memorabili, garantendo esperienze utente eccezionali e fornendo sistemi di design completi per una facile iterazione.\",\"icon\":\"/src/assets/pages/homepage/socialmedia-service.png\"},{\"title\":\"Media a pagamento\",\"description\":\"Progettiamo campagne pubblicitarie di impatto, garantendo un'eccezionale portata e coinvolgimento, e fornendo strategie complete per un'esecuzione senza problemi.\",\"icon\":\"/src/assets/pages/homepage/paidmedia-service.png\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Services\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Sfruttiamo la nostra vasta esperienza in design e tecnologia per <span class=\\\"text-neutral-400\\\">creare brand leader ed esperienze digitali eccezionali.</span>\"},{\"type\":\"attribute\",\"name\":\"services\",\"value\":[{\"title\":\"Branding\",\"description\":\"Connettiamo brand e UX, creando identità digitali coerenti su tutti i canali con una guida strategica per garantire una rappresentazione del brand senza soluzione di continuità.\",\"icon\":\"/src/assets/pages/homepage/marketing-service.png\"},{\"title\":\"Soluzioni digitali\",\"description\":\"Creiamo prodotti aziendali e per i consumatori memorabili, garantendo esperienze utente eccezionali e fornendo sistemi di design completi per una facile iterazione.\",\"icon\":\"/src/assets/pages/homepage/socialmedia-service.png\"},{\"title\":\"Media a pagamento\",\"description\":\"Progettiamo campagne pubblicitarie di impatto, garantendo un'eccezionale portata e coinvolgimento, e fornendo strategie complete per un'esecuzione senza problemi.\",\"icon\":\"/src/assets/pages/homepage/paidmedia-service.png\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":8},\"end\":{\"line\":11}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[12,15],\"inline\":false,\"attributes\":{\"title\":\"Lavori Recenti\",\"buttons\":[{\"title\":\"Vedi tutti i lavori\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"OurProducts\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Lavori Recenti\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"Vedi tutti i lavori\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":12},\"end\":{\"line\":15}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[16,19],\"inline\":false,\"attributes\":{\"testimonial\":\"[Atelier Optimatix] ci ha creato un sito web fantastico che ha trasformato tutto il nostro traffico in nuovi contatti. Il loro lavoro ha aumentato enormemente il nostro business!\",\"name\":\"Jane Doe\"},\"children\":[],\"type\":\"tag\",\"tag\":\"Testimonial\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"testimonial\",\"value\":\"[Atelier Optimatix] ci ha creato un sito web fantastico che ha trasformato tutto il nostro traffico in nuovi contatti. Il loro lavoro ha aumentato enormemente il nostro business!\"},{\"type\":\"attribute\",\"name\":\"name\",\"value\":\"Jane Doe\"}],\"slots\":{},\"location\":{\"start\":{\"line\":16},\"end\":{\"line\":19}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[20,21],\"inline\":false,\"attributes\":{\"title\":\"Dal Blog\"},\"children\":[],\"type\":\"tag\",\"tag\":\"BlogLatest\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Dal Blog\"}],\"slots\":{},\"location\":{\"start\":{\"line\":20},\"end\":{\"line\":21}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":6},\"end\":{\"line\":7}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

const getHeadings = createGetHeadings(stringifiedAst, markdocConfig);
const Content = createContentComponent(
	$$Renderer,
	stringifiedAst,
	markdocConfig,
  options,
	tagComponentMap,
	nodeComponentMap,
);

export { Content, getHeadings };
