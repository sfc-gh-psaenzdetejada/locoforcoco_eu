---
name: add-language
description: "Add a new language to the locoforcoco.eu Astro site. Use when: adding a new locale (French, German, Portuguese, etc.), setting up i18n for a new language, creating translated page files. Triggers: add language, new language, add locale, add French, add German, add Portuguese, translate site, new translation."
---

# Add Language to Loco for CoCo

Adds a new language to the locoforcoco.eu bilingual Astro site. This creates all config entries, page files, and translations needed for the new locale.

## Prerequisites

- The repo is at `/Users/psaenzdetejada/Documents/GitHub/locoforcoco_eu`
- The site builds successfully (`npm run build`)

## Workflow

### Step 1: Gather Language Details

**Ask** user:
```
Which language do you want to add?
- Language name (e.g., French)
- Locale code (e.g., fr)
- Date locale (e.g., fr-FR)
```

If the user gives just a language name, derive the codes (e.g., "French" -> `fr`, `fr-FR`).

### Step 2: Update Config Files (5 files)

Apply all changes in this order:

#### 2a. `src/config/i18n.ts`

1. Add the locale code to the `locales` array:
   ```typescript
   export const locales = ["es", "en", "it", "NEW_CODE"] as const;
   ```

2. Add a full UI string block under the new locale key in `ui`. Copy the `en` block as a starting point and translate every value. Key strings to translate:
   - `site.tagline`, `site.bio` (main tagline and description)
   - `nav.*` (navigation labels)
   - `issue.*` (video page labels)
   - `footer.*`, `search.placeholder`

#### 2b. `astro.config.mjs`

1. Add the locale to the `locales` array in `i18n` config
2. Add fallback entry: `NEW_CODE: "es"`

```javascript
i18n: {
  locales: ["es", "en", "it", "NEW_CODE"],
  fallback: {
    en: "es",
    it: "es",
    NEW_CODE: "es",
  },
}
```

#### 2c. `src/config/topics.ts`

Add a new locale block in `topicMeta` with translated `label` and `summary` for each topic:
- Governance, Engineering, AI, FinOps, Data-Quality, DevOps

#### 2d. `src/config/site.ts`

Update the `primaryNavigation` and `footerNavigation` functions:
- Add a new entry to the `labels` lookup objects with translated navigation strings (Videos, Categories, About, Watch, Search, Privacy, etc.)

#### 2e. `src/lib/issues.ts`

Add the new date locale mapping in both `formatDate` and `formatYear`:
```typescript
const dateLocales: Record<string, string> = { es: "es-ES", en: "en-US", it: "it-IT", NEW_CODE: "NEW_LOCALE" };
```

#### 2f. `src/components/LanguageSwitcher.astro`

Add entries to `langNames` and `langCodes`:
```typescript
const langNames = { es: "Espanol", en: "English", it: "Italiano", NEW_CODE: "NEW_NAME" };
const langCodes = { es: "ES", en: "EN", it: "IT", NEW_CODE: "CODE" };
```

#### 2g. `src/components/SiteHeader.astro`

Add the new locale to all label lookup objects in the frontmatter section:
- `searchLabel`, `menuLabel`, `searchPlaceholder`, `closeLabel`, `searchHint`

Also add in the client-side `<script>` block:
- The `loc === "NEW_CODE"` branch in the `render` function for search status messages

#### 2h. `src/components/SectionHead.astro`

Add the new locale to the `defaultLabel` lookup:
```typescript
const defaultLabel = { es: "Ver todas", en: "See all", it: "Vedi tutto", NEW_CODE: "TRANSLATED" }[locale];
```

**⚠️ STOP**: Present all config changes to user for review before creating page files.

### Step 3: Create Page Files

Create `src/pages/NEW_CODE/` directory with these files, copying from `src/pages/en/` and changing:
- `const locale = "en"` -> `const locale = "NEW_CODE"`
- `publishedIssues(await getCollection("issues"), "en")` -> `"NEW_CODE"`
- All `/en/` href paths -> `/NEW_CODE/`
- All English text in page templates -> translated text

Files to create (10 total):

| File | Key translations needed |
|---|---|
| `index.astro` | Homepage (uses `t()` function, minimal manual text) |
| `issues/[slug].astro` | "Video No.", "Photograph by", prev/next labels |
| `archive/[...page].astro` | Title, description, "videos" count label |
| `topics/index.astro` | Title, description, "categories"/"videos" labels |
| `topics/[topic]/[...page].astro` | "videos" label |
| `about.astro` | Full prose: "What is this", "Who is it for", "Who makes it" |
| `privacy.astro` | Full prose: data collection, analytics, contact |
| `search.astro` | Title, description, button, placeholder, status messages, no-results text |
| `writers/index.astro` | Title, description, "writers" label |
| `writers/[writer]/[...page].astro` | "videos" label, "Latest" prefix |

**About and Privacy pages** contain full prose that needs manual translation. Copy the English structure but write the body text in the new language.

**Data-driven pages** (index, archive, topics, issues, writers, search) are mostly translated via `t()` function calls and the config lookups — only a few hardcoded strings per file need translating.

### Step 4: Build and Verify

```bash
cd /Users/psaenzdetejada/Documents/GitHub/locoforcoco_eu
npm run build
```

**Verify:**
- Page count increased by ~13 pages
- No build errors
- `dist/NEW_CODE/index.html` exists
- `dist/NEW_CODE/about/index.html` exists
- Language switcher shows the new language

### Step 5: Local Preview

```bash
npm run build && npx astro preview
```

Check:
- `http://localhost:4321/NEW_CODE/` loads correctly
- Language switcher works from all 3 (now 4) languages
- Navigation links point to `/NEW_CODE/...` paths
- Topic pages show correctly

**⚠️ STOP**: Get user confirmation before committing.

### Step 6: Commit and Deploy

```bash
git add .
git commit -m "Add LANGUAGE_NAME language support"
git push
```

## Stopping Points

- ✋ Step 2: After config changes, before creating page files
- ✋ Step 5: After local preview, before committing

## Output

- New locale fully integrated in config (i18n, topics, navigation, components)
- 10 new page files under `src/pages/NEW_CODE/`
- Language switcher updated automatically (reads from `locales` array)
- Site builds and deploys with the new language at `/NEW_CODE/`

## Troubleshooting

**Build error: "locale not assignable to type"**
- The new code wasn't added to the `locales` array in `i18n.ts`. The `Locale` type is derived from this array.

**Topic pages empty for new language**
- No content posts exist with `locale: "NEW_CODE"`. Create at least one sample post.

**Language switcher doesn't show new language**
- The `langNames` and `langCodes` maps in `LanguageSwitcher.astro` need the new entry.

**Dates show wrong format**
- The `dateLocales` map in `lib/issues.ts` needs the new locale mapping.
