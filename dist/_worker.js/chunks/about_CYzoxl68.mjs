globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_C13ZgZ07.mjs';
import { $ as $$Title, f as $$Container } from './prerender_BgPehNso.mjs';
import { $ as $$About } from './About_paqhu1l9.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Container": $$Container,
"About": $$About,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[1,2,9,10],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[3,8],\"inline\":false,\"attributes\":{\"title\":\"About us\",\"subtitle\":\"At Atelier Optimatix, we build specialised software for the education and industrial sectors. Our mission is to simplify complexity through intelligent, dependable, and future-ready digital solutions.\",\"content\":\"<br/><br/><span class=\\\"text-neutral-400\\\">We don’t just write code, we craft systems that empower schools, industries, and institutions to operate smarter and more securely. From intuitive edutech platforms that foster safer, more connected learning environments to robust industrial tools that enhance precision and efficiency, our work is driven by purpose and precision.<br/><br/>Rooted in a culture of excellence and integrity, we focus on long-term value rather than short-term fixes. Join us in redefining what purposeful software can achieve. Discover the Atelier Optimatix difference.</span>\"},\"children\":[],\"type\":\"tag\",\"tag\":\"About\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"About us\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"At Atelier Optimatix, we build specialised software for the education and industrial sectors. Our mission is to simplify complexity through intelligent, dependable, and future-ready digital solutions.\"},{\"type\":\"attribute\",\"name\":\"content\",\"value\":\"<br/><br/><span class=\\\"text-neutral-400\\\">We don’t just write code, we craft systems that empower schools, industries, and institutions to operate smarter and more securely. From intuitive edutech platforms that foster safer, more connected learning environments to robust industrial tools that enhance precision and efficiency, our work is driven by purpose and precision.<br/><br/>Rooted in a culture of excellence and integrity, we focus on long-term value rather than short-term fixes. Join us in redefining what purposeful software can achieve. Discover the Atelier Optimatix difference.</span>\"}],\"slots\":{},\"location\":{\"start\":{\"line\":3},\"end\":{\"line\":8}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":1},\"end\":{\"line\":2}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
