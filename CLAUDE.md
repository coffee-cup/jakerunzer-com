# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Only run mise commands:

```bash
mise run check  # typecheck
mise run build  # production build
mise run up     # deploy to railway
```

**Never run dev/preview servers** - user runs these themselves.

Add bookmark: `bun scripts/add-bookmark.ts <url> [date]`

## Architecture

Astro 4 site with MDX + Tailwind. Personal site for jakerunzer.com.

### Content Collections

- `src/content/blog/` - MDX posts with frontmatter: title, date, description?, image?, draft?
- `src/content/bookmarks/` - JSON files with title, url, date (auto-generated via add-bookmark script)

Schema defined in `src/content/config.ts`.

### Routing

- `/` - home
- `/posts/` - blog index
- `/posts/[slug]` - individual post (dynamic from blog collection)
- `/bookmarks/` - bookmark list
- `/projects/` - projects page
- `/rss.xml` - RSS feed

### Styling

- CSS variables in `src/global.css`: `--bg`, `--fg`, `--article`
- Dark mode via `.dark` class on html
- Tailwind uses these via `colors.bg`, `colors.fg`, `colors.article`
- Typography plugin for prose styling
- Fonts: Playfair Display (serif headings), JetBrains Mono (code)
- Shiki themes: rose-pine-dawn (light), rose-pine-moon (dark)

### Layouts

- `Layout.astro` - base layout with meta tags, nav, view transitions
- `MarkdownLayout.astro` - for markdown content
