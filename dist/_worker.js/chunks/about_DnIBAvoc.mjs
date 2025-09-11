globalThis.process ??= {}; globalThis.process.env ??= {};
const about = new Proxy({"src":"/_astro/about.D3UQkeX3.png","width":1820,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/about/about.png";
							}
							
							return target[name];
						}
					});

export { about as default };
