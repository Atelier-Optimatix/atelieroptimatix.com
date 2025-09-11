globalThis.process ??= {}; globalThis.process.env ??= {};
const rise = new Proxy({"src":"/_astro/rise.Bn5naVcu.svg","width":244,"height":77,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/rise.svg";
							}
							
							return target[name];
						}
					});

export { rise as default };
