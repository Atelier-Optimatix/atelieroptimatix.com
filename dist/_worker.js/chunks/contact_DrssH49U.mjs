globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "en/contact.mdoc";
						const collection = "pages";
						const slug = "en/contact";
						const body = "\n{% Container %}\n\n{% Contact\n  title=\"Get in touch\"\n  fields=[\n    {title: \"Full Name\", placeholder: \"John Doe\", required: true, type: \"text\"},\n    {title: \"Email\", placeholder: \"contact@email.com\", required: true, type: \"email\"},\n    {title: \"Phone\", placeholder: \"+1 345-678\", type: \"tel\"},\n    {title: \"Preferred Time for Call\", placeholder: \"e.g., 10:00 AM to 4:00 PM\", type: \"text\"},\n    {title: \"Message\", placeholder: \"Tell us about your needs or project idea\", type: \"textarea\", width: 2},\n    {title: \"Send Message\", type: \"submit\", width: 2}\n  ]\n/%}\n\n{% /Container %}\n";
						const data = {title:"Contact us",type:"informational",lastUpdateDate:new Date(1709942400000),hideTitle:false,seo:{title:"Contact Us | Atelier Optimatix – Edutech & Industrial Software Experts",description:"Connect with Atelier Optimatix to explore custom-built software solutions for education and industry. Let's build smarter systems together.",author:"Atelier Optimatix"}};
						const _internal = {
							type: 'content',
							filePath: "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc",
							rawData: "\ntitle: Contact us\ntype: informational\nlastUpdateDate: 2024-03-09\nhideTitle: false\nseo:\n  title: \"Contact Us | Atelier Optimatix – Edutech & Industrial Software Experts\"\n  description: \"Connect with Atelier Optimatix to explore custom-built software solutions for education and industry. Let's build smarter systems together.\"\n  author: Atelier Optimatix",
						};

export { _internal, body, collection, data, id, slug };
