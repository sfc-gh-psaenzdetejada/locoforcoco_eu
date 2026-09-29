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
  return [
    { label: locale === "es" ? "Videos" : "Videos", href: localePath(locale, "/archive/") },
    { label: locale === "es" ? "Categorias" : "Categories", href: localePath(locale, "/topics/") },
    { label: locale === "es" ? "Acerca de" : "About", href: localePath(locale, "/about/") },
  ];
}

export function footerNavigation(locale: Locale) {
  return [
    {
      title: locale === "es" ? "Ver" : "Watch",
      links: [
        { label: locale === "es" ? "Todos los videos" : "All videos", href: localePath(locale, "/archive/") },
        { label: locale === "es" ? "Categorias" : "Categories", href: localePath(locale, "/topics/") },
        { label: locale === "es" ? "Buscar" : "Search", href: localePath(locale, "/search/") },
      ],
    },
    {
      title: locale === "es" ? "Categorias" : "Categories",
      links: topicNavigation(locale),
    },
    {
      title: "Loco for CoCo",
      links: [
        { label: locale === "es" ? "Acerca de" : "About", href: localePath(locale, "/about/") },
        { label: locale === "es" ? "Privacidad" : "Privacy", href: localePath(locale, "/privacy/") },
        { label: "RSS", href: "/rss.xml" },
      ],
    },
  ];
}
