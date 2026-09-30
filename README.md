# Loco for CoCo

Short video demos of what you can do with [Snowflake Cortex Code](https://docs.snowflake.com/en/user-guide/ui-snowsight-cortex-code) (CoCo), organized by category.

**Live site:** [https://locoforcoco.eu](https://locoforcoco.eu)

## What is this

A bilingual (ES/EN) video site where Solutions Engineers publish short, focused demos of CoCo. Each post embeds a Vimeo video with a written description of what is shown and why it matters.

Categories: **Governance**, **Engineering**, **AI**, **FinOps**, **Data Quality**, **DevOps**.

## How to add a new video

### 1. Upload your video to Vimeo

- Upload at [vimeo.com](https://vimeo.com)
- In video settings > Embed > restrict embeds to `locoforcoco.eu`
- Copy the video URL (e.g., `https://vimeo.com/987654321`)

### 2. Create the post folder

```
src/content/issues/
└── NNN-your-slug/
    ├── index.mdx      <- post content
    └── cover.png      <- thumbnail (16:9, ideally 1600x900px)
```

Pick a sequential issue number and a descriptive slug. The slug becomes the URL.

### 3. Write the post

Create `index.mdx` with this template:

```yaml
---
issue: 5                              # sequential number (unique per locale)
title: "Your video title"
excerpt: "One or two sentences for listings and SEO."
topic: "Engineering"                  # one of: Governance, Engineering, AI, FinOps, Data-Quality, DevOps
date: 2026-10-15                      # publication date
author:
  name: "Your Name"
  role: "Solutions Engineer"
cover:
  src: "./cover.png"
  alt: "Description of the cover image"
videoUrl: "https://vimeo.com/987654321"
locale: "es"                          # "es" for Spanish, "en" for English
featured: false                       # true = pin to homepage hero
draft: false                          # true = hide while working on it
---

Description of what the video shows, in Markdown.

## What you will learn

- First point
- Second point

## Benefits

Why this matters for the viewer.
```

### 4. Bilingual posts

Spanish and English are separate posts with different slugs:

```
src/content/issues/
├── 005-analisis-costes/       <- locale: "es"  -> locoforcoco.eu/issues/005-analisis-costes/
└── 006-cost-analysis/         <- locale: "en"  -> locoforcoco.eu/en/issues/006-cost-analysis/
```

They don't need to be translations of each other. You can have posts in only one language.

- `locale: "es"` posts appear on the Spanish site (`/`)
- `locale: "en"` posts appear on the English site (`/en/`)

### 5. Push to deploy

```bash
git add .
git commit -m "Add: your video title"
git push
```

GitHub Actions builds and deploys automatically. Live in ~1 minute.

## Frontmatter reference

| Field | Required | Values |
|---|---|---|
| `issue` | Yes | Sequential integer |
| `title` | Yes | Post title |
| `excerpt` | Yes | 1-2 sentence summary |
| `topic` | Yes | `Governance`, `Engineering`, `AI`, `FinOps`, `Data-Quality`, `DevOps` |
| `date` | Yes | `YYYY-MM-DD` |
| `author.name` | Yes | Your full name |
| `author.role` | Yes | Your role |
| `cover.src` | Yes | Relative path to image (e.g., `"./cover.png"`) |
| `cover.alt` | Yes | Image alt text |
| `videoUrl` | No | Vimeo or YouTube URL |
| `locale` | Yes | `"es"` or `"en"` |
| `featured` | No | `true` pins to homepage hero |
| `draft` | No | `true` hides from all pages |

## Adding a new category

Edit `src/config/topics.ts`:

1. Add the topic name to the `topics` array
2. Add an entry in both `es` and `en` in `topicMeta`

The topic page, navigation, and footer update automatically.

## Adding a new author

Edit `src/config/writers.ts` and add an entry keyed by the exact `author.name` you use in frontmatter. If no entry exists, the site falls back to a monogram avatar.

## Local development

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:4321
npm run build        # production build to dist/
npm run preview      # preview production build locally
```

Requires Node.js 22+.

## Project structure

```
src/
├── config/
│   ├── i18n.ts          # UI translations (ES/EN)
│   ├── site.ts          # site identity, navigation
│   ├── topics.ts        # categories with bilingual labels
│   └── writers.ts       # author profiles
├── content/
│   └── issues/          # video posts (one folder per post)
├── components/          # Astro components
├── pages/
│   ├── index.astro      # Spanish homepage
│   ├── archive/         # Spanish archive
│   ├── topics/          # Spanish topic pages
│   ├── en/              # English pages (mirror of root)
│   └── ...
└── layouts/
    └── BaseLayout.astro # shared HTML shell
```

## Tech stack

- [Astro 7](https://astro.build/) with native i18n routing
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript
- Deployed via GitHub Actions to GitHub Pages
- DNS via AWS Route 53
