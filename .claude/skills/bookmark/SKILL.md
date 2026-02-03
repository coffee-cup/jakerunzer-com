---
name: bookmark
description: Add a bookmark to jakerunzer.com. Use when user says "add a bookmark", "bookmark this", "save this link", or wants to save a URL to their bookmarks collection.
---

# Add Bookmark

Run from project root `/Users/jr/dev/astro-jakerunzer-com`:

```bash
bun scripts/add-bookmark.ts <url> [date]
```

- URL is required
- Date is optional (defaults to now, format: YYYY-MM-DD)
- Script auto-fetches page title
- Creates JSON file in `src/content/bookmarks/`
