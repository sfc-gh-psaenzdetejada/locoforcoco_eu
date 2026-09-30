import type { CollectionEntry } from "astro:content";
import { topics, topicSlug, type Topic } from "@/config/topics";
import { siteConfig } from "@/config/site";
import { defaultLocale, localePath, type Locale } from "@/config/i18n";

export type Issue = CollectionEntry<"issues">;
export { topics, topicSlug, type Topic };

export const writerSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const writerInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export const issueSlug = (issue: Issue) => issue.id.replace(/\/index$/, "");

export const issueHref = (issue: Issue, locale?: Locale) => {
  const base = `/issues/${issueSlug(issue)}/`;
  return localePath(locale ?? (issue.data as any).locale ?? defaultLocale, base);
};

export const issueNumber = (issue: Issue) => String(issue.data.issue).padStart(2, "0");

const byNewest = (a: Issue, b: Issue) => b.data.date.getTime() - a.data.date.getTime();

export const publishedIssues = (issues: Issue[], locale?: Locale) => {
  let filtered = issues.filter((issue) => !issue.data.draft);
  if (locale) {
    filtered = filtered.filter((issue) => (issue.data as any).locale === locale);
  }
  return filtered.sort(byNewest);
};

export const byTopic = (issues: Issue[], topic: Topic) =>
  issues.filter((issue) => !issue.data.draft && issue.data.topic === topic).sort(byNewest);

export const leadIssue = (issues: Issue[]) => {
  return issues.find((issue) => issue.data.featured) ?? issues[0];
};

export const adjacentIssues = (issues: Issue[], current: Issue) => {
  const index = issues.findIndex((issue) => issue.id === current.id);
  return {
    newer: index > 0 ? issues[index - 1] : undefined,
    older: index >= 0 ? issues[index + 1] : undefined,
  };
};

export const relatedIssues = (issues: Issue[], current: Issue, limit = 3) =>
  issues
    .filter((issue) => issue.id !== current.id)
    .sort((a, b) => {
      const sameTopic =
        Number(b.data.topic === current.data.topic) - Number(a.data.topic === current.data.topic);
      return sameTopic || byNewest(a, b);
    })
    .slice(0, limit);

export interface WriterSummary {
  slug: string;
  name: string;
  role: string;
  issues: Issue[];
}

export const allWriters = (issues: Issue[]): WriterSummary[] =>
  Array.from(
    issues
      .reduce((writers, issue) => {
        const { name, role } = issue.data.author;
        const slug = writerSlug(name);
        const current = writers.get(slug);
        writers.set(slug, {
          name,
          role: current?.role ?? role,
          issues: [...(current?.issues ?? []), issue],
        });
        return writers;
      }, new Map<string, Omit<WriterSummary, "slug">>())
      .entries(),
  )
    .map(([slug, writer]) => ({ slug, ...writer }))
    .sort((a, b) => b.issues.length - a.issues.length || a.name.localeCompare(b.name));

const wordPattern = /[\p{L}\p{N}][\p{L}\p{N}''-]*/gu;

export const wordCount = (issue: Issue) => {
  const prose = (issue.body ?? "")
    .replace(/^---\n[\s\S]*?\n---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  return prose.match(wordPattern)?.length ?? 0;
};

export const readMinutes = (issue: Issue) =>
  Math.max(1, Math.round(wordCount(issue) / siteConfig.wordsPerMinute));

export const formatDate = (date: Date, style: "short" | "long" = "short", locale?: Locale) => {
  const dateLocales: Record<string, string> = { es: "es-ES", en: "en-US", it: "it-IT" };
  const dateLocale = dateLocales[locale ?? "es"] ?? "es-ES";
  return new Intl.DateTimeFormat(dateLocale, {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatYear = (date: Date, locale?: Locale) => {
  const dateLocales: Record<string, string> = { es: "es-ES", en: "en-US", it: "it-IT" };
  const dateLocale = dateLocales[locale ?? "es"] ?? "es-ES";
  return new Intl.DateTimeFormat(dateLocale, { year: "numeric" }).format(date);
};

export const withTrailingSlash = (url: string | undefined) =>
  url && !url.endsWith("/") ? `${url}/` : url;
