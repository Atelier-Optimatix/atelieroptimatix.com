globalThis.process ??= {}; globalThis.process.env ??= {};
const industrial = new Proxy({"src":"/_astro/industrial.Bg4PtTAQ.svg","width":800,"height":800,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/industrial.svg";
							}
							
							return target[name];
						}
					});

export { industrial as default };
