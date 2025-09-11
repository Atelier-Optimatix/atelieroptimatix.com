globalThis.process ??= {}; globalThis.process.env ??= {};
const dentalFilling = new Proxy({"src":"/_astro/dental-filling.Bm25Bgv8.svg","width":68,"height":68,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental-filling.svg";
							}
							
							return target[name];
						}
					});

export { dentalFilling as default };
