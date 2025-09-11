globalThis.process ??= {}; globalThis.process.env ??= {};
const dental = new Proxy({"src":"/_astro/dental.CrW35zZ6.svg","width":268,"height":504,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental.svg";
							}
							
							return target[name];
						}
					});

export { dental as default };
