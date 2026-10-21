import { type Locale, defaultLocale, docsLocales } from "site.config";

/**
 * Everything around the user guide that is not a doc: chrome strings, section
 * and product labels, role badges and the search widget's wording.
 *
 * Doc *content* (title, description, body) lives in src/content/docs/<locale>/.
 * Frontmatter keys other than `title` and `description` stay in English in
 * every locale - `product`, `section` and `roles` are lookup keys into the
 * dictionaries below, not display text.
 */

export type DocsLocale = (typeof docsLocales)[number];

export function isDocsLocale(value: string | undefined): value is DocsLocale {
	return docsLocales.includes(value as Locale);
}

/** Endonyms, for the language switcher. */
export const localeNames: Record<DocsLocale, string> = {
	en: "English",
	es: "Español",
	ms: "Bahasa Melayu",
	fr: "Français",
	si: "සිංහල",
	ta: "தமிழ்",
};

export type DocsUi = {
	userGuide: string;
	/** Intro paragraph on the index; `count` is the number of pages. */
	indexIntro: (count: number) => string;
	startHere: string;
	setUpInstitute: string;
	imTeacher: string;
	browseGuide: string;
	allDocs: string;
	navLabel: string;
	onThisPage: string;
	lastUpdated: string;
	searchPlaceholder: string;
	language: string;
	notTranslated: string;
	/** Strings for Pagefind's UI (keys are Pagefind's own). */
	search: {
		placeholder: string;
		clear_search: string;
		load_more: string;
		search_label: string;
		filters_label: string;
		zero_results: string;
		many_results: string;
		one_result: string;
		searching: string;
	};
};

const ui: Record<DocsLocale, DocsUi> = {
	en: {
		userGuide: "User Guide",
		indexIntro: (n) =>
			`${n} pages covering EduConnect and its KinderCare deployment, the admissions portal and the parent apps. Search above, or browse below.`,
		startHere: "Start here",
		setUpInstitute: "Set up a new institute",
		imTeacher: "I'm a teacher",
		browseGuide: "Browse the guide",
		allDocs: "← All docs",
		navLabel: "User guide",
		onThisPage: "On this page",
		lastUpdated: "Last updated",
		searchPlaceholder: "Search the guide",
		language: "Language",
		notTranslated: "This page has not been translated yet, so the English version is shown.",
		search: {
			placeholder: "Search the guide",
			clear_search: "Clear",
			load_more: "Load more results",
			search_label: "Search this site",
			filters_label: "Filters",
			zero_results: "No results for [SEARCH_TERM]",
			many_results: "[COUNT] results for [SEARCH_TERM]",
			one_result: "[COUNT] result for [SEARCH_TERM]",
			searching: "Searching for [SEARCH_TERM]...",
		},
	},
	es: {
		userGuide: "Guía del usuario",
		indexIntro: (n) =>
			`${n} páginas sobre EduConnect y su versión KinderCare, el portal de admisiones y las aplicaciones para familias. Busque arriba o explore más abajo.`,
		startHere: "Empiece aquí",
		setUpInstitute: "Configurar un nuevo centro",
		imTeacher: "Soy docente",
		browseGuide: "Explorar la guía",
		allDocs: "← Toda la documentación",
		navLabel: "Guía del usuario",
		onThisPage: "En esta página",
		lastUpdated: "Última actualización",
		searchPlaceholder: "Buscar en la guía",
		language: "Idioma",
		notTranslated: "Esta página aún no está traducida, por lo que se muestra la versión en inglés.",
		search: {
			placeholder: "Buscar en la guía",
			clear_search: "Borrar",
			load_more: "Cargar más resultados",
			search_label: "Buscar en este sitio",
			filters_label: "Filtros",
			zero_results: "Sin resultados para [SEARCH_TERM]",
			many_results: "[COUNT] resultados para [SEARCH_TERM]",
			one_result: "[COUNT] resultado para [SEARCH_TERM]",
			searching: "Buscando [SEARCH_TERM]...",
		},
	},
	ms: {
		userGuide: "Panduan Pengguna",
		indexIntro: (n) =>
			`${n} halaman yang merangkumi EduConnect dan pelaksanaan KinderCare, portal kemasukan serta aplikasi ibu bapa. Cari di atas, atau layari di bawah.`,
		startHere: "Mulakan di sini",
		setUpInstitute: "Sediakan institusi baharu",
		imTeacher: "Saya seorang guru",
		browseGuide: "Layari panduan",
		allDocs: "← Semua dokumen",
		navLabel: "Panduan pengguna",
		onThisPage: "Di halaman ini",
		lastUpdated: "Kemas kini terakhir",
		searchPlaceholder: "Cari dalam panduan",
		language: "Bahasa",
		notTranslated: "Halaman ini belum diterjemahkan, jadi versi Bahasa Inggeris dipaparkan.",
		search: {
			placeholder: "Cari dalam panduan",
			clear_search: "Kosongkan",
			load_more: "Muat lebih banyak hasil",
			search_label: "Cari di laman ini",
			filters_label: "Penapis",
			zero_results: "Tiada hasil untuk [SEARCH_TERM]",
			many_results: "[COUNT] hasil untuk [SEARCH_TERM]",
			one_result: "[COUNT] hasil untuk [SEARCH_TERM]",
			searching: "Mencari [SEARCH_TERM]...",
		},
	},
	fr: {
		userGuide: "Guide de l'utilisateur",
		indexIntro: (n) =>
			`${n} pages couvrant EduConnect et son déploiement KinderCare, le portail d'admission et les applications pour les parents. Recherchez ci-dessus ou parcourez ci-dessous.`,
		startHere: "Commencer ici",
		setUpInstitute: "Configurer un nouvel établissement",
		imTeacher: "Je suis enseignant",
		browseGuide: "Parcourir le guide",
		allDocs: "← Toute la documentation",
		navLabel: "Guide de l'utilisateur",
		onThisPage: "Sur cette page",
		lastUpdated: "Dernière mise à jour",
		searchPlaceholder: "Rechercher dans le guide",
		language: "Langue",
		notTranslated: "Cette page n'est pas encore traduite ; la version anglaise est affichée.",
		search: {
			placeholder: "Rechercher dans le guide",
			clear_search: "Effacer",
			load_more: "Charger plus de résultats",
			search_label: "Rechercher sur ce site",
			filters_label: "Filtres",
			zero_results: "Aucun résultat pour [SEARCH_TERM]",
			many_results: "[COUNT] résultats pour [SEARCH_TERM]",
			one_result: "[COUNT] résultat pour [SEARCH_TERM]",
			searching: "Recherche de [SEARCH_TERM]...",
		},
	},
	si: {
		userGuide: "පරිශීලක මාර්ගෝපදේශය",
		indexIntro: (n) =>
			`EduConnect සහ එහි KinderCare අනුවාදය, ඇතුළත් කිරීමේ ද්වාරය සහ දෙමාපිය යෙදුම් ආවරණය කරන පිටු ${n}ක්. ඉහත සොයන්න, නැතහොත් පහතින් පිරික්සන්න.`,
		startHere: "මෙතැනින් ආරම්භ කරන්න",
		setUpInstitute: "නව ආයතනයක් සකසන්න",
		imTeacher: "මම ගුරුවරයෙක්",
		browseGuide: "මාර්ගෝපදේශය පිරික්සන්න",
		allDocs: "← සියලු ලේඛන",
		navLabel: "පරිශීලක මාර්ගෝපදේශය",
		onThisPage: "මෙම පිටුවේ",
		lastUpdated: "අවසන් යාවත්කාලීන කළේ",
		searchPlaceholder: "මාර්ගෝපදේශයේ සොයන්න",
		language: "භාෂාව",
		notTranslated: "මෙම පිටුව තවමත් පරිවර්තනය කර නැත, එබැවින් ඉංග්‍රීසි අනුවාදය පෙන්වයි.",
		search: {
			placeholder: "මාර්ගෝපදේශයේ සොයන්න",
			clear_search: "මකන්න",
			load_more: "තවත් ප්‍රතිඵල පූරණය කරන්න",
			search_label: "මෙම අඩවියේ සොයන්න",
			filters_label: "පෙරහන්",
			zero_results: "[SEARCH_TERM] සඳහා ප්‍රතිඵල නැත",
			many_results: "[SEARCH_TERM] සඳහා ප්‍රතිඵල [COUNT]ක්",
			one_result: "[SEARCH_TERM] සඳහා ප්‍රතිඵල [COUNT]ක්",
			searching: "[SEARCH_TERM] සොයමින්...",
		},
	},
	ta: {
		userGuide: "பயனர் வழிகாட்டி",
		indexIntro: (n) =>
			`EduConnect மற்றும் அதன் KinderCare பயன்பாடு, சேர்க்கை இணையதளம், பெற்றோர் செயலிகள் ஆகியவற்றை உள்ளடக்கிய ${n} பக்கங்கள். மேலே தேடுங்கள் அல்லது கீழே உலாவுங்கள்.`,
		startHere: "இங்கே தொடங்குங்கள்",
		setUpInstitute: "புதிய நிறுவனத்தை அமைக்கவும்",
		imTeacher: "நான் ஓர் ஆசிரியர்",
		browseGuide: "வழிகாட்டியை உலாவுங்கள்",
		allDocs: "← அனைத்து ஆவணங்கள்",
		navLabel: "பயனர் வழிகாட்டி",
		onThisPage: "இந்தப் பக்கத்தில்",
		lastUpdated: "கடைசியாகப் புதுப்பித்தது",
		searchPlaceholder: "வழிகாட்டியில் தேடுங்கள்",
		language: "மொழி",
		notTranslated: "இந்தப் பக்கம் இன்னும் மொழிபெயர்க்கப்படவில்லை, எனவே ஆங்கிலப் பதிப்பு காட்டப்படுகிறது.",
		search: {
			placeholder: "வழிகாட்டியில் தேடுங்கள்",
			clear_search: "அழி",
			load_more: "மேலும் முடிவுகளை ஏற்று",
			search_label: "இந்தத் தளத்தில் தேடு",
			filters_label: "வடிப்பான்கள்",
			zero_results: "[SEARCH_TERM] க்கு முடிவுகள் இல்லை",
			many_results: "[SEARCH_TERM] க்கு [COUNT] முடிவுகள்",
			one_result: "[SEARCH_TERM] க்கு [COUNT] முடிவு",
			searching: "[SEARCH_TERM] ஐத் தேடுகிறது...",
		},
	},
};

/** Section keys are the English names used in doc frontmatter. */
export const sectionLabels: Record<DocsLocale, Record<string, string>> = {
	en: {
		"Getting started": "Getting started",
		Tutorials: "Tutorials",
		"For teachers": "For teachers",
		"Advanced workflows": "Advanced workflows",
		"For parents": "For parents",
		Guides: "Guides",
	},
	es: {
		"Getting started": "Primeros pasos",
		Tutorials: "Tutoriales",
		"For teachers": "Para docentes",
		"Advanced workflows": "Flujos avanzados",
		"For parents": "Para familias",
		Guides: "Guías",
	},
	ms: {
		"Getting started": "Bermula",
		Tutorials: "Tutorial",
		"For teachers": "Untuk guru",
		"Advanced workflows": "Aliran kerja lanjutan",
		"For parents": "Untuk ibu bapa",
		Guides: "Panduan",
	},
	fr: {
		"Getting started": "Premiers pas",
		Tutorials: "Tutoriels",
		"For teachers": "Pour les enseignants",
		"Advanced workflows": "Flux de travail avancés",
		"For parents": "Pour les parents",
		Guides: "Guides",
	},
	si: {
		"Getting started": "ආරම්භ කිරීම",
		Tutorials: "නිබන්ධන",
		"For teachers": "ගුරුවරුන් සඳහා",
		"Advanced workflows": "උසස් කාර්ය ප්‍රවාහ",
		"For parents": "දෙමාපියන් සඳහා",
		Guides: "මාර්ගෝපදේශ",
	},
	ta: {
		"Getting started": "தொடங்குவது",
		Tutorials: "பயிற்சிகள்",
		"For teachers": "ஆசிரியர்களுக்கு",
		"Advanced workflows": "மேம்பட்ட செயல்முறைகள்",
		"For parents": "பெற்றோருக்கு",
		Guides: "வழிகாட்டிகள்",
	},
};

export const productLabels: Record<DocsLocale, Record<string, string>> = {
	en: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "Admissions",
		shared: "Across the platform",
	},
	es: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "Admisiones",
		shared: "En toda la plataforma",
	},
	ms: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "Kemasukan",
		shared: "Merentas platform",
	},
	fr: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "Admissions",
		shared: "Sur toute la plateforme",
	},
	si: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "ඇතුළත් කිරීම්",
		shared: "සමස්ත වේදිකාව පුරා",
	},
	ta: {
		educonnect: "EduConnect",
		kindercare: "KinderCare",
		admissions: "சேர்க்கை",
		shared: "தளம் முழுவதும்",
	},
};

export const productBlurbs: Record<DocsLocale, Record<string, string>> = {
	en: {
		educonnect:
			"The main application — the staff dashboard, the parent portal, and everything schools run day to day.",
		kindercare:
			"The kindergarten deployment of the same platform, plus the KinderCare staff and parent mobile apps.",
		admissions: "The public admissions portal that applicants use before they become students.",
		shared: "Behaviour that is the same no matter which deployment you are signed in to.",
	},
	es: {
		educonnect:
			"La aplicación principal: el panel del personal, el portal de familias y todo lo que los centros usan a diario.",
		kindercare:
			"La versión para jardines de infancia de la misma plataforma, junto con las aplicaciones móviles de KinderCare para personal y familias.",
		admissions:
			"El portal público de admisiones que usan los solicitantes antes de convertirse en alumnos.",
		shared: "Comportamiento que es el mismo sin importar en qué versión haya iniciado sesión.",
	},
	ms: {
		educonnect:
			"Aplikasi utama — papan pemuka kakitangan, portal ibu bapa dan semua yang dijalankan sekolah setiap hari.",
		kindercare:
			"Pelaksanaan taska dan tadika bagi platform yang sama, serta aplikasi mudah alih KinderCare untuk kakitangan dan ibu bapa.",
		admissions:
			"Portal kemasukan awam yang digunakan pemohon sebelum mereka menjadi murid.",
		shared: "Tingkah laku yang sama tidak kira pelaksanaan mana yang anda log masuk.",
	},
	fr: {
		educonnect:
			"L'application principale : le tableau de bord du personnel, le portail des parents et tout ce que les établissements utilisent au quotidien.",
		kindercare:
			"Le déploiement pour les écoles maternelles de la même plateforme, avec les applications mobiles KinderCare pour le personnel et les parents.",
		admissions:
			"Le portail d'admission public que les candidats utilisent avant de devenir élèves.",
		shared:
			"Un fonctionnement identique, quel que soit le déploiement auquel vous êtes connecté.",
	},
	si: {
		educonnect:
			"ප්‍රධාන යෙදුම — කාර්ය මණ්ඩල උපකරණ පුවරුව, දෙමාපිය ද්වාරය සහ පාසල් දිනපතා භාවිත කරන සියල්ල.",
		kindercare:
			"එම වේදිකාවේම ළමා පාසල් අනුවාදය, සමඟ KinderCare කාර්ය මණ්ඩල සහ දෙමාපිය ජංගම යෙදුම්.",
		admissions: "අයදුම්කරුවන් ශිෂ්‍යයන් බවට පත්වීමට පෙර භාවිත කරන පොදු ඇතුළත් කිරීමේ ද්වාරය.",
		shared: "ඔබ පිවිස ඇත්තේ කුමන අනුවාදයට වුවත් එකම ආකාරයට ක්‍රියා කරන දේ.",
	},
	ta: {
		educonnect:
			"முதன்மைப் பயன்பாடு — பணியாளர் முகப்புப் பலகை, பெற்றோர் இணையதளம் மற்றும் பள்ளிகள் தினசரி நடத்தும் அனைத்தும்.",
		kindercare:
			"அதே தளத்தின் மழலையர் பள்ளிப் பதிப்பு, மேலும் KinderCare பணியாளர் மற்றும் பெற்றோர் மொபைல் செயலிகள்.",
		admissions:
			"விண்ணப்பதாரர்கள் மாணவர்களாவதற்கு முன் பயன்படுத்தும் பொது சேர்க்கை இணையதளம்.",
		shared: "நீங்கள் எந்தப் பதிப்பில் உள்நுழைந்தாலும் ஒரே மாதிரியாகச் செயல்படுபவை.",
	},
};

export const roleLabels: Record<DocsLocale, Record<string, string>> = {
	en: {
		admin: "admin",
		staff: "staff",
		teacher: "teacher",
		parent: "parent",
		applicant: "applicant",
		accountant: "accountant",
		org_admin: "org admin",
		super_admin: "super admin",
	},
	es: {
		admin: "administrador",
		staff: "personal",
		teacher: "docente",
		parent: "familia",
		applicant: "solicitante",
		accountant: "contable",
		org_admin: "admin. de la organización",
		super_admin: "superadministrador",
	},
	ms: {
		admin: "pentadbir",
		staff: "kakitangan",
		teacher: "guru",
		parent: "ibu bapa",
		applicant: "pemohon",
		accountant: "akauntan",
		org_admin: "pentadbir organisasi",
		super_admin: "pentadbir super",
	},
	fr: {
		admin: "administrateur",
		staff: "personnel",
		teacher: "enseignant",
		parent: "parent",
		applicant: "candidat",
		accountant: "comptable",
		org_admin: "admin. de l'organisation",
		super_admin: "super-administrateur",
	},
	si: {
		admin: "පරිපාලක",
		staff: "කාර්ය මණ්ඩලය",
		teacher: "ගුරුවරයා",
		parent: "දෙමාපියන්",
		applicant: "අයදුම්කරු",
		accountant: "ගණකාධිකාරී",
		org_admin: "සංවිධාන පරිපාලක",
		super_admin: "ප්‍රධාන පරිපාලක",
	},
	ta: {
		admin: "நிர்வாகி",
		staff: "பணியாளர்",
		teacher: "ஆசிரியர்",
		parent: "பெற்றோர்",
		applicant: "விண்ணப்பதாரர்",
		accountant: "கணக்காளர்",
		org_admin: "நிறுவன நிர்வாகி",
		super_admin: "முதன்மை நிர்வாகி",
	},
};

export function docsUi(locale: string | undefined): DocsUi {
	return ui[(isDocsLocale(locale) ? locale : defaultLocale) as DocsLocale];
}

function lookup(
	table: Record<DocsLocale, Record<string, string>>,
	locale: string | undefined,
	key: string,
): string {
	const loc = (isDocsLocale(locale) ? locale : defaultLocale) as DocsLocale;
	return table[loc][key] ?? table[defaultLocale as DocsLocale][key] ?? key;
}

export const sectionLabel = (locale: string | undefined, key: string) =>
	lookup(sectionLabels, locale, key);
export const productLabel = (locale: string | undefined, key: string) =>
	lookup(productLabels, locale, key);
export const productBlurb = (locale: string | undefined, key: string) =>
	lookup(productBlurbs, locale, key);
export const roleLabel = (locale: string | undefined, key: string) =>
	lookup(roleLabels, locale, key);

/** `/docs`, `/docs/<slug>`, `/fr/docs`, `/fr/docs/<slug>`. */
export function docsHref(locale: string | undefined, slug?: string): string {
	const prefix = !locale || locale === defaultLocale ? "" : `/${locale}`;
	return `${prefix}/docs${slug ? `/${slug}` : ""}`;
}
