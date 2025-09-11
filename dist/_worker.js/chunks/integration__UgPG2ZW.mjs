globalThis.process ??= {}; globalThis.process.env ??= {};
const integration = new Proxy({"src":"/_astro/integration.CQl8Kya8.svg","width":800,"height":800,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/integration.svg";
							}
							
							return target[name];
						}
					});

export { integration as default };
