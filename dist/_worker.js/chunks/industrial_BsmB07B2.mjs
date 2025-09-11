globalThis.process ??= {}; globalThis.process.env ??= {};
const industrial = new Proxy({"src":"/_astro/industrial.x83RdodJ.png","width":100,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/industrial.png";
							}
							
							return target[name];
						}
					});

export { industrial as default };
