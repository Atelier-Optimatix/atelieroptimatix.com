globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./prerender_BgPehNso.mjs').then(n => n.r);

export { page };
