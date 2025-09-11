globalThis.process ??= {}; globalThis.process.env ??= {};
const education = new Proxy({"src":"/_astro/education.CRT0BOCt.svg","width":800,"height":800,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/education.svg";
							}
							
							return target[name];
						}
					});

export { education as default };
