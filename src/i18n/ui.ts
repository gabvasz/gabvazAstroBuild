export const languages = {
  en: "English",
  "pt-br": "Português (Brasil)",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "nav.label": "Main navigation",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "toggle.theme": "Toggle light/dark theme",
    "toggle.lang": "Switch to Portuguese (Brazil)",
  },
  "pt-br": {
    "nav.label": "Navegação principal",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "toggle.theme": "Alternar tema claro/escuro",
    "toggle.lang": "Mudar para inglês",
  },
} as const;

export type UiKey = keyof (typeof ui)["en"];

/** Reads the language from the first URL segment: /pt-br/about -> "pt-br". */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return segment in ui ? (segment as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** "/about" + "pt-br" -> "/pt-br/about". The default language has no prefix. */
export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === "/" ? "/" : path}`;
}

/** Same page, other language. Used by the language toggle. */
export function switchLangPath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  let path = url.pathname;
  if (current !== defaultLang) {
    path = path.replace(new RegExp(`^/${current}`), "") || "/";
  }
  return getLocalizedPath(path, target);
}