globalThis.process ??= {}; globalThis.process.env ??= {};
const education = new Proxy({"src":"/_astro/education.QEjJfogT.png","width":90,"height":90,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/education.png";
							}
							
							return target[name];
						}
					});

export { education as default };
