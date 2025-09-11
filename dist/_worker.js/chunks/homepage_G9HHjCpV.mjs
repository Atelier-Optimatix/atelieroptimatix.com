globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createGetHeadings, a as createContentComponent, $ as $$Renderer, m as markdocConfig, b as assetsConfig } from './runtime-assets-config_C13ZgZ07.mjs';
import { $ as $$BlogLatest, a as $$OurProducts, b as $$Services, c as $$Hero } from './BlogLatest_5PfQ8VSM.mjs';
import { $ as $$Title, f as $$Container } from './prerender_BgPehNso.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };


const tagComponentMap = {"Hero": $$Hero,
"Container": $$Container,
"Services": $$Services,
"OurProducts": $$OurProducts,
"BlogLatest": $$BlogLatest,
};
const nodeComponentMap = {"heading": $$Title,
};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[0,4],\"inline\":false,\"attributes\":{\"title\":\"We engineer <b>intelligent</b> systems that drive <b>real-world impact.</b>\",\"subtitle\":\"Specialised software for Education, Hospitality and Industry Automation. <span class=\\\"text-neutral-400\\\">Talk to us about building your next solution.</span>\",\"buttons\":[{\"title\":\"Contact us\",\"href\":\"/contact\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Hero\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"We engineer <b>intelligent</b> systems that drive <b>real-world impact.</b>\"},{\"type\":\"attribute\",\"name\":\"subtitle\",\"value\":\"Specialised software for Education, Hospitality and Industry Automation. <span class=\\\"text-neutral-400\\\">Talk to us about building your next solution.</span>\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"Contact us\",\"href\":\"/contact\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":0},\"end\":{\"line\":4}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[5,6,37,38],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[7,26],\"inline\":false,\"attributes\":{\"title\":\"Purpose-built software for <span class=\\\"text-neutral-400\\\">education and industrial innovation.</span>\",\"services\":[{\"title\":\"Edutech Platforms\",\"description\":\"We create intuitive, secure platforms for schools and educational institutions—enhancing communication, safety, and day-to-day operations.\",\"icon\":\"/src/assets/pages/homepage/education.png\"},{\"title\":\"Industrial Applications\",\"description\":\"From automation tools to custom workflow systems, our industrial solutions are designed for precision, efficiency, and long-term reliability.\",\"icon\":\"/src/assets/pages/homepage/industrial.png\"},{\"title\":\"System Integration\",\"description\":\"We connect your existing infrastructure with modern tools and interfaces, helping your operations run seamlessly and securely.\",\"icon\":\"/src/assets/pages/homepage/integration.png\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"Services\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Purpose-built software for <span class=\\\"text-neutral-400\\\">education and industrial innovation.</span>\"},{\"type\":\"attribute\",\"name\":\"services\",\"value\":[{\"title\":\"Edutech Platforms\",\"description\":\"We create intuitive, secure platforms for schools and educational institutions—enhancing communication, safety, and day-to-day operations.\",\"icon\":\"/src/assets/pages/homepage/education.png\"},{\"title\":\"Industrial Applications\",\"description\":\"From automation tools to custom workflow systems, our industrial solutions are designed for precision, efficiency, and long-term reliability.\",\"icon\":\"/src/assets/pages/homepage/industrial.png\"},{\"title\":\"System Integration\",\"description\":\"We connect your existing infrastructure with modern tools and interfaces, helping your operations run seamlessly and securely.\",\"icon\":\"/src/assets/pages/homepage/integration.png\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":7},\"end\":{\"line\":26}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[27,30],\"inline\":false,\"attributes\":{\"title\":\"Our Products\",\"buttons\":[{\"title\":\"View all projects\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]},\"children\":[],\"type\":\"tag\",\"tag\":\"OurProducts\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"Our Products\"},{\"type\":\"attribute\",\"name\":\"buttons\",\"value\":[{\"title\":\"View all projects\",\"href\":\"/works\",\"style\":\"button\",\"icon\":\"iconamoon:arrow-top-right-1-thin\"}]}],\"slots\":{},\"location\":{\"start\":{\"line\":27},\"end\":{\"line\":30}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[31,34],\"inline\":false,\"attributes\":{\"content\":\"{% Testimonial\\n   testimonial=\\\"Atelier Optimatix helped us streamline our school communication platform. It’s now safer, faster, and easier to manage.\\\"\\n   name=\\\"Sarah K., Headteacher\\\" /%}\"},\"children\":[],\"type\":\"comment\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":31},\"end\":{\"line\":34}}},{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[35,36],\"inline\":false,\"attributes\":{\"title\":\"From Our Blog\"},\"children\":[],\"type\":\"tag\",\"tag\":\"BlogLatest\",\"annotations\":[{\"type\":\"attribute\",\"name\":\"title\",\"value\":\"From Our Blog\"}],\"slots\":{},\"location\":{\"start\":{\"line\":35},\"end\":{\"line\":36}}}],\"type\":\"tag\",\"tag\":\"Container\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":5},\"end\":{\"line\":6}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

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
