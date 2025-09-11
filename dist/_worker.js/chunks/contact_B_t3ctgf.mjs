globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "it/contact.mdoc";
						const collection = "pages";
						const slug = "it/contact";
						const body = "\n{% Container %}\n\n{% Contact\n  title=\"Contattaci\"\n  fields=[\n    {title: \"Nome Completo\", placeholder: \"John Doe\", required: true, type: \"text\"},\n    {title: \"Email\", placeholder: \"contact@email.com\", required: true, type: \"email\"},\n    {title: \"Telefono\", placeholder: \"+1 345-678\", type: \"tel\"},\n    {title: \"Orario per ricevere la chiamata\", placeholder: \"10:00 AM to 4:00 PM\", type: \"text\"},\n    {title: \"Messaggio\", placeholder: \"Scrivi qui il tuo messaggio\", type: \"textarea\", width: 2},\n    {title: \"Invia\", type: \"submit\", width: 2}\n  ]\n/%}\n\n{% /Container %}\n";
						const data = {title:"Contattaci",type:"informational",lastUpdateDate:new Date(1709942400000),hideTitle:false,seo:{title:"Contatta Atelier Optimatix Studio: Entra in Contatto per Soluzioni Web Innovative",description:"Contatta Atelier Optimatix Studio per servizi esperti di web design e SEO. Connettiti con noi per discutere del tuo progetto ed esplorare soluzioni web all'avanguardia.",author:"Atelier Optimatix"}};
						const _internal = {
							type: 'content',
							filePath: "/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc",
							rawData: "\ntitle: Contattaci\ntype: informational\nlastUpdateDate: 2024-03-09\nhideTitle: false\naddPadding: false\nseo:\n  title: \"Contatta Atelier Optimatix Studio: Entra in Contatto per Soluzioni Web Innovative\"\n  description: \"Contatta Atelier Optimatix Studio per servizi esperti di web design e SEO. Connettiti con noi per discutere del tuo progetto ed esplorare soluzioni web all'avanguardia.\"\n  author: Atelier Optimatix",
						};

export { _internal, body, collection, data, id, slug };
