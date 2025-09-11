globalThis.process ??= {}; globalThis.process.env ??= {};
const integration = new Proxy({"src":"/_astro/integration.d4OAHKeq.png","width":100,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/integration.png";
							}
							
							return target[name];
						}
					});

export { integration as default };
