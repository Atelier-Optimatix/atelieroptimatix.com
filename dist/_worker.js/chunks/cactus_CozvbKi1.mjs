globalThis.process ??= {}; globalThis.process.env ??= {};
const cactus = new Proxy({"src":"/_astro/cactus.D_jKg2Ry.svg","width":407,"height":110,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/cactus.svg";
							}
							
							return target[name];
						}
					});

export { cactus as default };
