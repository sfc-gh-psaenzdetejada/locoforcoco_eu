export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const ui: Record<Locale, Record<string, string>> = {
  es: {
    "site.tagline": "Descubre lo que puedes hacer con Cortex Code",
    "site.bio": "Videos cortos y directos sobre Snowflake CoCo, organizados por categoria.",
    "nav.videos": "Videos",
    "nav.topics": "Categorias",
    "nav.about": "Acerca de",
    "nav.search": "Buscar",
    "nav.archive": "Archivo",
    "page.archive.title": "Todos los videos",
    "page.archive.description": "Todos los videos publicados, del mas reciente al mas antiguo.",
    "page.topics.title": "Categorias",
    "issue.readThis": "Ver este video",
    "issue.latest": "Ultimo video",
    "issue.featured": "Destacado",
    "issue.minRead": "min de lectura",
    "issue.issues": "videos",
    "issue.issue": "video",
    "issue.backIssues": "Mas videos",
    "issue.alsoRecently": "Tambien recientes",
    "issue.allIssues": "Todos los videos",
    "issue.fullArchive": "Archivo completo",
    "issue.keepReading": "Sigue viendo",
    "issue.readByTopic": "Ver por categoria",
    "issue.previous": "Anterior",
    "issue.next": "Siguiente",
    "issue.no": "Video No.",
    "footer.read": "Ver",
    "footer.topics": "Categorias",
    "footer.site": "Loco for CoCo",
    "search.placeholder": "Buscar videos...",
  },
  en: {
    "site.tagline": "Discover what you can do with Cortex Code",
    "site.bio": "Short, focused videos about Snowflake CoCo, organized by category.",
    "nav.videos": "Videos",
    "nav.topics": "Categories",
    "nav.about": "About",
    "nav.search": "Search",
    "nav.archive": "Archive",
    "page.archive.title": "Every video",
    "page.archive.description": "Every video published, newest first.",
    "page.topics.title": "Categories",
    "issue.readThis": "Watch this video",
    "issue.latest": "Latest video",
    "issue.featured": "Featured",
    "issue.minRead": "min read",
    "issue.issues": "videos",
    "issue.issue": "video",
    "issue.backIssues": "More videos",
    "issue.alsoRecently": "Also recently",
    "issue.allIssues": "All videos",
    "issue.fullArchive": "Full archive",
    "issue.keepReading": "Keep watching",
    "issue.readByTopic": "Browse by category",
    "issue.previous": "Previous",
    "issue.next": "Next",
    "issue.no": "Video No.",
    "footer.read": "Watch",
    "footer.topics": "Categories",
    "footer.site": "Loco for CoCo",
    "search.placeholder": "Search videos...",
  },
};

export function t(locale: Locale, key: string): string {
  return ui[locale]?.[key] ?? ui[defaultLocale]?.[key] ?? key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const firstSegment = url.pathname.split("/").filter(Boolean)[0];
  if (locales.includes(firstSegment as Locale) && firstSegment !== defaultLocale) {
    return firstSegment as Locale;
  }
  return defaultLocale;
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean}`;
}
