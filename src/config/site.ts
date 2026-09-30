import { topics, topicSlug, getTopicMeta } from "./topics";
import { localePath, type Locale } from "./i18n";

export const siteConfig = {
  name: "Loco for CoCo",
  tagline: "Quick demos of what you can do with Cortex Code",
  title: "Loco for CoCo - Snowflake Cortex Code Demos",
  description:
    "Short, focused video demos of Snowflake Cortex Code (CoCo), organized by category: Governance, Engineering, AI, FinOps, and more.",
  siteUrl: "https://locoforcoco.eu",
  authorName: "Pablo Saenz de Tejada",
  email: "pablo.saenzdetejada@snowflake.com",
  language: "es",
  dateLocale: "es-ES",
  locale: "es_ES",
  socialImage: "/og-image.png",
  publisherLogo: "/og-image.png",
  wordsPerMinute: 225,
  defaultColorMode: "system" as const,
  fetchBookmarkPreviews: true,
  bio: "Videos cortos y al grano sobre Snowflake CoCo, organizados por categoria.",
  cadence: "",
  editor: {
    name: "Pablo Saenz de Tejada",
    title: "Snowflake Solutions Engineer",
  },
  rss: {
    fullContent: true,
    limit: 20,
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "",
    description: "",
    terms: "",
    proof: "",
  },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/psaenzdetejada" },
    { label: "GitHub", href: "https://github.com/sfc-gh-psaenzdetejada" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export function topicNavigation(locale: Locale) {
  return topics.map((topic) => ({
    label: getTopicMeta(topic, locale).label,
    href: localePath(locale, `/topics/${topicSlug(topic)}/`),
  }));
}

export function primaryNavigation(locale: Locale) {
  const labels: Record<Locale, { videos: string; topics: string; about: string }> = {
    es: { videos: "Videos", topics: "Categorias", about: "Acerca de" },
    en: { videos: "Videos", topics: "Categories", about: "About" },
    it: { videos: "Video", topics: "Categorie", about: "Chi siamo" },
  };
  const l = labels[locale];
  return [
    { label: l.videos, href: localePath(locale, "/archive/") },
    { label: l.topics, href: localePath(locale, "/topics/") },
    { label: l.about, href: localePath(locale, "/about/") },
  ];
}

export function footerNavigation(locale: Locale) {
  const labels: Record<Locale, { watch: string; allVideos: string; topics: string; search: string; about: string; privacy: string }> = {
    es: { watch: "Ver", allVideos: "Todos los videos", topics: "Categorias", search: "Buscar", about: "Acerca de", privacy: "Privacidad" },
    en: { watch: "Watch", allVideos: "All videos", topics: "Categories", search: "Search", about: "About", privacy: "Privacy" },
    it: { watch: "Guarda", allVideos: "Tutti i video", topics: "Categorie", search: "Cerca", about: "Chi siamo", privacy: "Privacy" },
  };
  const l = labels[locale];
  return [
    {
      title: l.watch,
      links: [
        { label: l.allVideos, href: localePath(locale, "/archive/") },
        { label: l.topics, href: localePath(locale, "/topics/") },
        { label: l.search, href: localePath(locale, "/search/") },
      ],
    },
    {
      title: l.topics,
      links: topicNavigation(locale),
    },
    {
      title: "Loco for CoCo",
      links: [
        { label: l.about, href: localePath(locale, "/about/") },
        { label: l.privacy, href: localePath(locale, "/privacy/") },
        { label: "RSS", href: "/rss.xml" },
      ],
    },
  ];
}
