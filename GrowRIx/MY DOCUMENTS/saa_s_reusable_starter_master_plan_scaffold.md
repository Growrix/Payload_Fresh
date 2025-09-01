# SaaS Reusable Starter — Master Plan & Scaffold

> Goal: A **WordPress-like, reusable SaaS starter** you can clone for any new project. It ships with a multi-tenant admin, blog/CMS, media library, roles/permissions, settings, theming, forms, notifications, billing hooks, and a clean UI system. Stack stays **lean**: Next.js (App Router) + Tailwind + shadcn/ui + Supabase (Auth/DB/Storage) + Stripe (billing-ready, optional) + Resend (email).

---

## Blog Module — A to Z Checklist (WordPress‑style)

A **complete blog feature** must cover the following pillars:

### 1) Blog Post Lifecycle

- Create, edit, draft, preview, publish (instant or scheduled)
- Unpublish, archive/trash, restore
- Revision history with compare/restore
- Auto‑save + manual save

### 2) Editor (Admin Side)

- **Rich Text Editor**: headings, bold/italic/underline, strikethrough, code, blockquotes, lists, links, tables
- **Media embeds**: image, video, audio with captions/alt
- **Blocks/Visuals**: hero, gallery, columns, callouts, CTA, HTML block
- **Drag‑and‑drop** block ordering
- **SEO panel**: meta title/description, keywords, slug editor
- **Permalink editor** with duplicate checks

### 3) Taxonomies

- Categories (hierarchical)
- Tags (flat)
- Category/tag management CRUD
- Assign to posts (multi‑select)

### 4) Media Integration

- Insert media from library
- Featured image selection
- ALT text, caption, alignment
- Inline resize/crop (optional)

### 5) Post Metadata

- Author assignment (bio/avatar)
- Status (draft, scheduled, published)
- Visibility: public/private/password‑protected
- Publish date/time (schedule)
- Reading time auto‑calculation
- Custom fields (extendable)

### 6) Frontend Blog Features

- Blog homepage with pagination
- Single post page with title, cover, content, metadata, related posts
- Category/tag/author archive pages
- Search across title/content/tags
- Related posts widget
- Comments (optional)

### 7) Comments (Optional)

- Nested/threaded comments
- Moderation queue (approve/reject/spam)
- Role‑based: commenter vs. admin
- Notifications for replies

### 8) SEO & Sharing

- Meta tags (title, description, OG, Twitter)
- Schema.org article markup
- Sitemap.xml (posts, categories, tags)
- RSS feeds (site, category, tag, author)
- Social sharing buttons
- Canonical URLs

### 9) Admin Blog Management UI

- Post list table with filters, bulk actions, search
- Quick edit (title, slug, categories, tags, status)
- Indicators (draft, scheduled, revisions)

### 10) User Roles & Permissions

- Owner/Admin: full control
- Editor: CRUD any posts, manage taxonomies
- Author: manage own posts
- Contributor: submit drafts only
- Viewer: read‑only

### 11) Notifications & Workflows

- Email + in‑app notifications (new comment, post published, scheduled post live)
- Approval workflow: submit → review → publish

### 12) Extensibility

- Custom fields per post
- Shortcodes/dynamic snippets
- Plugins/hooks (register new blocks, analytics)

### 13) Performance & UX

- Lazy‑load images, responsive `srcset`
- Fast queries with caching
- Accessible markup
- Mobile‑first responsive design

### 14) Analytics (Optional)

- Post views count
- Popular posts widget
- Dashboard stats: views, categories, trends

---

👉 In short: a **WordPress‑level blog module** = **post lifecycle + editor + taxonomies + media + metadata + frontend pages + comments + SEO + roles + notifications + extensibility + analytics**.

---

## Next Step

Integrate this **Blog Module A–Z** directly into **Section 7 (Admin Modules)** and **Section 8 (Front‑Site Features)** of your master plan so your SaaS starter has blog parity with WordPress from day one.



---

## Blog Module — Copilot Prompt Pack (Admin + Front)

> Paste each prompt into VS Code to have Copilot generate the files. Prompts are vendor‑neutral and assume **Next.js App Router + Tailwind + Supabase**. Keep your `.env.local` ready.

### 0) Prepare: DB tables, policies, indexes (if not already)

**Prompt:**

```
You are my Supabase SQL author. Create/verify blog tables and relations:
- tables: categories(tags optional), tags, posts, post_categories, post_tags, assets, revisions
- columns for posts: id, org_id (uuid), author_id, title, slug, excerpt, cover_asset, content_json, status('draft'|'scheduled'|'published'|'archived'), published_at, created_at, updated_at, meta_json
- RLS: org members read; editors/admin/owner write; author may edit own drafts
- unique(org_id, slug) on posts, categories, tags
- indexes: posts(org_id,status,published_at desc), content trigram gin on title/excerpt
- views: v_public_posts (published only)
- policies for assets and revisions like other org tables
Return a full SQL file ready to run.
```

### 1) Admin routes & layout

**Prompt:**

```
Scaffold admin blog routes under /app/(admin)/blog with:
- page.tsx (table of posts)
- new/page.tsx (create)
- [id]/page.tsx (edit)
- categories/page.tsx and tags/page.tsx
Add a BlogLayout with secondary nav (Posts, Categories, Tags, Settings). Use shadcn/ui Table, Badge, Button, Input, DropdownMenu, Dialog, Pagination. 
```

### 2) Posts list table + filters + bulk actions

**Prompt:**

```
Build PostsTable component with:
- columns: Title (with status badge), Author, Categories, Tags, Updated, Status, Actions
- filters: search, status, category, author, date range
- bulk actions: Publish, Unpublish, Delete (confirm dialog)
- server actions backed by Supabase; role guard requireRole(orgId, ['editor','admin','owner'])
- empty state with “Create Post” CTA
```

### 3) Create/Edit Post screen with Editor (Tiptap)

**Prompt:**

```
Create PostEditor page using Tiptap with extensions: Heading, Bold, Italic, Underline, Strike, Blockquote, Code, CodeBlock, List, Link, Image, Table, Callout. 
Right sidebar (Card sections):
- Status & Actions: Save Draft, Preview, Schedule, Publish
- Slug/Permalink editor with duplicate check
- SEO: meta title/description, OG image (select from media)
- Taxonomies: Categories (multi, hierarchical UI), Tags (chips, quick-create)
- Featured image selector (opens Media Library modal)
Add Autosave (debounced), Revisions panel with diff + restore. Use server actions for save/draft/publish/schedule.
```

### 4) Media Library modal + page

**Prompt:**

```
Build MediaLibrary component + /app/(admin)/media page with:
- grid/list toggle, drag-drop upload to Supabase Storage at public-assets/{orgId}
- write assets row with mime, width, height, alt, caption
- filters: type, date, uploader; search by filename
- details drawer: preview, alt/caption edit, copy URL
- selection mode returns chosen asset to PostEditor
```

### 5) Revisions & scheduling engine

**Prompt:**

```
Add a Revisions service that snapshots content_json + meta on each save. Show list with timestamp, author, actions (preview, restore). 
Implement scheduling: if status='scheduled' and published_at in the future, create a server cron (edge compatible) using a Next.js Route Handler + Supabase cron to publish at time (flip status to 'published', update sitemap, trigger webhooks).
```

### 6) Frontend: blog list, archives, single post

**Prompt:**

```
Create front routes:
- /blog (list with search, filters by category/tag, pagination)
- /blog/[slug] (single post with cover, metadata, reading time, related posts)
- /category/[slug] and /tag/[slug]
- /author/[slug]
Use static generation with ISR; fetch from v_public_posts. Add breadcrumbs, TOC for long posts, share buttons. Related posts by shared categories/tags.
```

### 7) SEO, sitemaps, RSS/JSON Feed

**Prompt:**

```
Add site-wide SEO helpers. Generate:
- /sitemap.xml (index) with /sitemap-posts.xml, /sitemap-categories.xml, /sitemap-tags.xml
- /feed.xml (RSS2) and /feed.json (JSON Feed)
Add JSON-LD (Article, BreadcrumbList) to single post. Support canonical URL and per-post noindex.
```

### 8) Search (PostgreSQL FTS + pg\_trgm)

**Prompt:**

```
Implement search API using Postgres FTS on posts (title, excerpt) and pg_trgm for fuzzy. Add /search page with query param q, show highlights, and filters by category/tag/date. Return only published posts.
```

### 9) Comments (optional module)

**Prompt:**

```
Add native comments:
- table: comments(id, post_id, parent_id, author_name, author_email, user_id nullable, content, status 'pending'|'approved'|'spam', created_at)
- admin moderation queue (approve/reject/spam)
- front comment list (nested) and form with honeypot + rate limit
Or integrate Giscus/Disqus via adapter setting per org.
```

### 10) Content Calendar (optional)

**Prompt:**

```
Create /app/(admin)/calendar showing drafts/scheduled/published posts on a monthly grid; drag to reschedule scheduled posts (update published_at). Filters by author/category.
```

---

## Blog Module — Acceptance Criteria & QA

- **Editor**: headings, lists, code, images, links, callouts; autosave; revisions
- **Taxonomies**: CRUD + assign; unique slugs per org
- **Media**: upload, search, select; alt/caption; cover image
- **Publishing**: draft → review (optional) → scheduled/published; unpublish
- **Front**: index, single, archives, author page, related, search
- **SEO**: meta/OG, JSON-LD, sitemap, RSS/JSON Feed
- **RBAC**: author/contributor/editor/admin flows enforced server-side
- **Perf/a11y**: responsive images, keyboard nav, contrast OK

## Manual Smoke Test (10 min)

1. Sign in → create org → go /app/(admin)/blog
2. Create post with cover, text, categories, tags → Save Draft
3. Preview → Publish → open /blog/[slug]
4. Edit content → confirm revision created → restore
5. Upload image via Media Library, set as cover, update alt
6. Search ‘hello’ on /blog → see result
7. Check /sitemap.xml and /feed.xml exist and include the post

---

## Reuse Notes

- Keep all blog UI under `/app/(admin)/blog` and front under `/app/(site)/blog` (or top-level) so you can lift the module into any new project.
- Gate every server action with `orgId` + role checks to remain tenant‑safe.

