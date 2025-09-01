# Master Blueprint — Blog Feature (A → Z, 100% Complete)

> Purpose: A single, unambiguous blueprint that fully specifies the blog feature end-to-end. This file is the canonical plan we will follow and implement. No gaps, no 99% — every decision, artifact, API contract, DB schema, operations, and QA step is included.

---

## Quick start (what I will create now)
- File: `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md` (this file)
- Use this blueprint as the single source of truth. Every implementation task will reference a specific section here (phase, artifact, API, SQL, test, acceptance).

## Checklist (requirements for this task)
- [x] Create a single comprehensive blueprint doc inside `MY DOCUMENTS/BLOG COPILOT PLAN`.
- [x] Ensure no gaps — include DB schemas, API contracts, RLS, scheduler, media, editor, search, CI/CD, testing, launch checklist.
- [x] Provide phased developer workflow (UI → UX → DB/API → RLS → ops) with deliverables for each phase.
- [x] Add teaching blocks to the end of this execution (see bottom).

---

## 0) Definition of Done (100% acceptance)
A final "live" blog feature meets all of the following with proofs and tests:
- Admin editor: full CRUD (create/edit/save/publish/schedule/unpublish/archive/restore) with autosave and revisions.
- Editor: rich blocks, media embeds, featured image, SEO panel, permalink editor with duplicate checks, drag/drop block ordering.
- Taxonomies: categories (hierarchical) + tags (flat), management UI and assignments.
- Media library: upload, browse, select, preview, metadata (alt/caption), responsive image presets.
- Revisions: list, preview, restore; automatic snapshots on save and manual snapshots.
- Scheduling: reliably publish scheduled posts at exact time (idempotent), update sitemaps and caches.
- Frontsite: blog index, single post, archives (category/tag/author), search, RSS, sitemap.
- RBAC & RLS: correct enforcement of tenant isolation and roles for all server actions (testable RLS policies).
- Testing & CI: unit tests, integration tests (server actions), e2e tests (Playwright), CI pipeline.
- Observability & runbook: logging, error reporting, metrics, alerts, backup & rollback procedures.
- Documentation: API contract, ERD, migrations, dev onboarding, release checklist.

Each item above must have automated tests or a manual verification script and pass in CI before marking as done.

---

## 1) High-level Phases (strict, sequential)
We will build in phases. Complete and validate the previous phase before starting the next.

- Phase 1 — Project Setup & Conventions
- Phase 2 — UI Scaffolding (static admin + frontsite pages)
- Phase 3 — UX Behaviors (autosave, mock adapter, sidebar components)
- Phase 4 — DB Design & Migrations (SQL ERD and migrations)
- Phase 5 — API Contracts & Server Actions (typed endpoints)
- Phase 6 — RLS & Role Enforcement (SQL policies + middleware)
- Phase 7 — Media Pipeline (upload, processing, CDN)
- Phase 8 — Search & Indexing
- Phase 9 — Scheduling Worker & Publish Job
- Phase 10 — Revisions Snapshotting & Restore logic
- Phase 11 — Testing, Accessibility, Perf
- Phase 12 — CI/CD, Infra, Release & Runbook

For each phase below: deliverables, acceptance tests, and one small "teaching block" at the end.

---

## 2) Phase 1 — Project Setup & Conventions
Deliverables
- Repo scaffold with Next.js App Router + TypeScript, Tailwind, shadcn/ui components
- Linting (ESLint with Next/React rules) and Prettier config
- Commit hooks (husky) and changelog template
- `tsconfig.json` with `paths` for `@/*`
- `README.developer.md` with env var list and run steps

Acceptance
- `npm run build` completes locally
- `npx tsc --noEmit` returns 0 in CI
- ESLint and Prettier configured and pass in CI

Phase 1 Teaching
- Project Effect: Provides a stable dev environment and shared conventions, avoids friction.
- What You'll See: Working `npm run dev`, lint-pass on commits, consistent formatting.
- Why It Matters: Avoids style drift and reduces CI surprises.

---

## 3) Phase 2 — UI Scaffolding (Admin + Frontsite)
Deliverables
- Admin routes: `/growrix-admin/blog/posts`, `/growrix-admin/blog/posts/new`, `/growrix-admin/blog/posts/[id]`
- Right sidebar skeleton components: `StatusCard`, `SlugCard`, `SEOPanel`, `TaxonomyPanel`, `FeaturedImageCard`, `RevisionsCard` (static placeholders)
- Editor canvas skeleton `EditorCanvas` (non-functional placeholder)
- Frontsite pages: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`
- Shared style tokens and layout components

Acceptance
- Pages render server-side without errors
- Navigation flows between admin pages and frontsite

Phase 2 Teaching
- Project Effect: Establishes the UI surface to plug behaviors into.
- What You'll See: Empty editor and sidebar panels visually in place.
- Why It Matters: UI-first ensures API and DB can be designed to match real UX needs.

---

## 4) Phase 3 — UX Behaviors (Mocks + Autosave + Sidebar)
Deliverables
- `lib/mocks/blogAdapter.ts` implemented (Promise-based in-memory adapter)
- `hooks/useAutoSave.ts` debounced autosave hook with status states {idle,saving,saved,error}
- Wire autosave into `/new` and `/[id]` pages, show status next to title
- Implement `RevisionsCard` UI to read from `listRevisions` (mock)
- Implement visual feedback for Save/Publish/Unpublish/Archive buttons using mock adapter

Acceptance
- Typing in editor triggers "Saving…" then "Saved"
- Save draft creates a revision entry in the mock adapter
- Buttons call mock functions and update UI state

Phase 3 Teaching
- Project Effect: Validates UX flows without backend risk.
- What You'll See: Live autosave indicators and a working Revisions list (mocked).
- Why It Matters: Allows user testing and iteration before DB/API commitments.

---

## 5) Phase 4 — DB Design & Migrations (Postgres)
Deliverables
- ERD diagram (exported PNG / diagram file)
- SQL migration files (idempotent) using chosen migration tool
- Schema below (canonical): `posts`, `categories`, `tags`, `post_tags`, `post_categories`, `assets`, `revisions`, `users` (reference), `orgs` (multi-tenant)
- Supabase migrations & seed scripts (Supabase CLI) — generate timestamped SQL files under `migrations/` and seeds under `scripts/` so the project can be run against a local Supabase instance.

Canonical SQL (starter)

```sql
-- posts (core)
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL,
  author_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  excerpt text,
  cover_asset_id uuid,
  content jsonb NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  meta jsonb DEFAULT '{}'
);
CREATE UNIQUE INDEX posts_org_slug_idx ON posts(org_id, slug);

-- categories, tags, assets, revisions, post_tags, post_categories follow similar patterns
```

Acceptance
- Migrations run cleanly on a fresh DB
- Indexes created for search and queries

Phase 4 Teaching
- Project Effect: Defines the truth for all persisted data and enforces constraints.
- What You'll See: SQL scripts, ERD, and an empty DB with required tables.
- Why It Matters: DB design prevents future schema churn and enforces tenant isolation.

---

## 6) Phase 5 — API Contracts & Server Actions
Deliverables
- OpenAPI-style contract (YAML or MD) for server actions covering all behaviors
- Typed server-action stubs in `app/api` or Next server functions (TS types)
- Standardized error format `{code,message,details?}`

Essential endpoints (contract summary)
- POST /api/posts → create draft
- GET /api/posts/:id → fetch post
- PATCH /api/posts/:id → update post
- POST /api/posts/:id/save-draft → save and snapshot revision
- POST /api/posts/:id/publish → publish now
- POST /api/posts/:id/unpublish
- POST /api/posts/:id/archive
- POST /api/posts/:id/schedule → schedule publish
- GET /api/posts/:id/revisions
- POST /api/posts/:id/revisions/:rid/restore
- POST /api/slug/check
- POST /api/media/upload
- GET /api/media
- POST /api/internal/publish-scheduled (protected)

Acceptance
- Server action signatures are typed and testable
- API contract exists as a living document in repo

Phase 5 Teaching
- Project Effect: Creates a precise server surface for frontend integration.
- What You'll See: Typed endpoints and consistent request/response shapes.
- Why It Matters: Reduces backend/frontend mismatch and simplifies future replacement of mocks with real implementations.

---

## 7) Phase 6 — RLS & Role Enforcement (DB + App)
Deliverables
- Role definitions and permission matrix (owner/admin/editor/author/contributor/viewer)
- SQL RLS policies for each table (posts, assets, revisions) and sample policy SQL
- Server middleware to enforce roles for endpoints with explicit checks
- Unit tests for role enforcement

Example RLS (posts)
```sql
-- enable rls
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- allow org members to select
CREATE POLICY "org_select" ON posts
  FOR SELECT
  USING (org_id = current_setting('app.current_org')::uuid);

-- allow author to insert
CREATE POLICY "insert_post" ON posts
  FOR INSERT
  WITH CHECK (org_id = current_setting('app.current_org')::uuid AND
    (current_setting('app.role') IN ('owner','admin','editor','author')));

-- allow update for editors/admins or post authors
CREATE POLICY "update_post" ON posts
  FOR UPDATE
  USING (
    org_id = current_setting('app.current_org')::uuid AND (
      current_setting('app.role') IN ('owner','admin','editor') OR
      author_id = current_setting('app.current_user')::uuid
    )
  );
```

Acceptance
- RLS policies deployed and verified using integration tests (attempt invalid actions and ensure denial)

Phase 6 Teaching
- Project Effect: Guarantees tenant and role safety straight from the DB layer.
- What You'll See: Rejected updates when role rules are violated in tests.
- Why It Matters: Strong security posture and fewer server-side role checks to maintain.

---

## 8) Phase 7 — Media Pipeline & Featured Image
Deliverables
- Media upload API (signed URLs), server registration of `assets` metadata
- Image processing worker (resize, format conversions) producing presets (e.g., 320/640/1280/2048)
- Store `assets.metadata` with `srcset` and width/height
- Media library UI with pagination, search, filters, selection mode (for featured image)

Acceptance
- Upload an image, see generated presets and preview in media library
- Select asset as featured image -> `posts.cover_asset_id` set and frontsite shows optimized srcset

Phase 7 Teaching
- Project Effect: Efficient, secure media delivery and consistent UX across editors and frontsite.
- What You'll See: Image appearing in media library and in post preview with correct sizes.
- Why It Matters: Images are the biggest source of UX and performance issues; handling them early avoids rework.

---

## 9) Phase 8 — Search & Indexing
Deliverables
- Postgres FTS pipeline (tsvector column + trigram) and triggers on write
- Search API with query, filters (category/tag/author), pagination, highlights
- Optional: Add Meilisearch/Algolia sync worker for instant search (infra optional)

Acceptance
- Search returns relevant results for title/content/tags and shows highlights
- Latency targets met for expected traffic

Phase 8 Teaching
- Project Effect: Makes content discoverable and enables fast UX in the admin and frontsite.
- What You'll See: Admin search and frontsite search returning expected posts.
- Why It Matters: Search shapes how content is found — required for production UX.

---

## 10) Phase 9 — Scheduling Engine & Idempotent Publish Job
Deliverables
- Worker implementation (Node worker or serverless cron) that runs every minute
- Publish transaction: mark status→published, set published_at, create revision if needed, update sitemaps, clear caches
- Idempotency guard to avoid double publish

Acceptance
- Schedule a post at future time -> worker publishes at or shortly after that time -> frontsite shows post
- Running worker multiple times doesn't double-publish or create duplicate effects

Phase 9 Teaching
- Project Effect: Reliable background publishing for editorial workflows.
- What You'll See: A scheduled post appears on the frontsite after its time.
- Why It Matters: Editorial workflows depend on predictable publish semantics.

---

## 11) Phase 10 — Revisions System (Snapshot & Restore)
Deliverables
- Revision snapshots stored in `revisions.snapshot` (jsonb) on save-draft and explicit snapshot endpoints
- Revisions UI: list with timestamp/author/snippet, preview modal, restore action that writes snapshot back to post (and optionally create a new revision)
- Retention policy: keep N latest revisions (configurable) + archival policy

Acceptance
- Save multiple times, view revisions, preview content, restore and confirm editor updates and persisted post content

Phase 10 Teaching
- Project Effect: Safeguards content and supports editorial collaboration.
- What You'll See: Revisions list with preview and restore buttons.
- Why It Matters: Allows undo and accountability — critical for editorial teams.

---

## 12) Phase 11 — Testing, Accessibility & Performance
Deliverables
- Unit tests for hooks, utils, and server logic
- Integration tests for server actions and RLS policies using a test DB
- E2E Playwright tests covering main flows (create, save, publish, schedule, revisions, media)
- Accessibility audits and fixes (axe reports)
- Performance audit (Lighthouse summary) and image/asset optimizations

Acceptance
- CI pipeline runs tests and must pass before merge
- Accessibility errors below agreed thresholds

Phase 11 Teaching
- Project Effect: Ensures quality and reliability before release.
- What You'll See: Green CI pipeline and regression-free releases.
- Why It Matters: Reduces production bugs and improves user trust.

---

## 13) Phase 12 — CI/CD, Infra & Release
Deliverables
- GitHub Actions / CI pipeline: lint → test → build → migrate (dry run) → deploy to staging
- DB migration strategy with rollback scripts
- Deploy infra docs (hosting, envs, secrets, CDN, storage)
- Observability: Sentry + Prometheus/Grafana or vendor metrics, alert rules
- Runbook: rollback, emergency publish/unpublish, DB restore steps

Acceptance
- Automated staging deploys on PR merge and production deploys on main merge with verified smoke tests

Phase 12 Teaching
- Project Effect: Safe, repeatable deployments with observability.
- What You'll See: Canary/staging pipelines and dashboards.
- Why It Matters: Production readiness and low-risk release process.

---

## 14) Security & Compliance Checklist
- RLS enforced + server middleware
- Input sanitization (content HTML sanitization) and size limits
- Rate limiting on media upload and slug checks
- Secrets rotation and storage in secret manager

Acceptance
- Pen test checklist: no high/critical findings

Phase 14 Teaching
- Project Effect: Reduces security risk by making compliance requirements explicit and testable.
- What You'll See: A checklist of security controls and test cases that must pass in staging before production.
- Why It Matters: Security and compliance issues found late are costly; teaching notes help engineers prioritize fixes.

---

## 15) Release Checklist (pre-prod → prod)
- All tests passing in CI
- Manual smoke tests (admin create/publish/schedule, frontsite visibility)
- RLS verify: test unauthorized actions fail
- Backups taken and migration plan approved
- Monitoring & alerts in place
- Runbook available and team notified

---

Release Teaching
- Project Effect: Ensures each release follows a reproducible, low-risk process.
- What You'll See: A short checklist of gates that must pass before promotion to production.
- Why It Matters: Prevents accidental production outages and provides clear steps during incidents.

## 16) Exact Deliverables & Files to Commit
- `migrations/` SQL files with README for apply/rollback
- `docs/erd.png`, `docs/api-contract.yaml`, `docs/release-checklist.md`
- `tests/e2e/*`, `tests/integration/*`, `tests/unit/*`
- `app/growrix-admin/blog/...` pages + components
- `lib/mocks/blogAdapter.ts` and transition guide to real adapter
- `scripts/publish-worker.js` or serverless function source

---

Deliverables Teaching
- Project Effect: Makes repo contents and ownership explicit so reviewers can find artifacts quickly.
- What You'll See: A mapping of files to purpose, helping reviewers validate scope during PRs.
- Why It Matters: Reduces ambiguity during code review and speeds up onboarding for new contributors.

## 17) Minimal timeline (detailed sprint plan)
- Sprint 0 (setup): 2 days — repo + lint + CI baseline
- Sprint 1: 5 days — UI scaffolding + mock adapter
- Sprint 2: 7 days — Editor + autosave + revisions UI (mock)
- Sprint 3: 7 days — DB schema + migrations + API contract
- Sprint 4: 7 days — Server actions + RLS + tests
- Sprint 5: 7 days — Media pipeline + featured image
- Sprint 6: 7 days — Search + indexing
- Sprint 7: 5 days — Scheduling + worker + sitemaps
- Sprint 8: 5 days — QA, performance, accessibility
- Sprint 9: 3 days — CI, docs, release

---

Timeline Teaching
- Project Effect: Provides a predictable cadence for implementation and stakeholder expectations.
- What You'll See: Sprint boundaries with clear deliverables for each sprint.
- Why It Matters: Helps PMs and engineers plan work and identify dependencies early.

## 18) Acceptance Criteria (detailed test cases)
- Create flow: admin creates draft → autosave snapshot created → manual save creates revision → publish now shows on frontsite
- Schedule flow: admin schedules post for future → worker publishes at time → frontsite shows post and sitemap updated
- Revisions flow: create 3 revisions → preview the second → restore → confirm content replaced and new revision recorded
- Media flow: upload image → preview in media library → select as featured → frontsite uses optimized srcset
- Security flow: attempt unauthorized update -> confirm 403

Test artifacts: Playwright scripts to reproduce above test cases.

---

Acceptance Teaching
- Project Effect: Clarifies exactly how features will be validated and what tests are required.
- What You'll See: Test scenarios that exercise happy paths and edge cases, suitable for automation.
- Why It Matters: Makes 'done' objective and ensures QA/CI can gate merges.

## 19) Appendix: Full API contract (compact)
(See `docs/api-contract.yaml` for full OpenAPI. Compact summary here.)

- POST /api/posts
  - body: {orgId, authorId, title, slug?, content, excerpt?, meta?}
  - returns: 201 {post}
- GET /api/posts/:id
  - returns: 200 {post}
- PATCH /api/posts/:id
  - body: partial post fields
  - returns: 200 {post}
- POST /api/posts/:id/save-draft
  - body: {snapshot, authorId}
  - returns: 200 {post, revision}
- POST /api/posts/:id/publish
  - returns: 200 {post}
- POST /api/posts/:id/schedule
  - body: {published_at}
  - returns: 200 {post}
- POST /api/slug/check
  - body: {orgId, slug, postId?}
  - returns: {available: boolean, message: string}
- POST /api/media/upload
  - multipart form -> returns 201 {asset}
- GET /api/media
  - returns {assets, meta}
- POST /api/internal/publish-scheduled
  - protected job endpoint

---

API Teaching
- Project Effect: Provides a shared understanding of how frontend and backend communicate.
- What You'll See: Concrete request/response examples that reduce integration friction.
- Why It Matters: Prevents misinterpretation of API behavior and accelerates backend/frontend parallel work.

## 20) Next immediate actions (I can execute now)
Pick one and I will implement it next (and add a teaching block for that execution):
- A: Generate full SQL migration files for the schema above (Phase 4)
- B: Generate `docs/api-contract.yaml` OpenAPI file (Phase 5)
- C: Scaffold server-action stubs with typed signatures (Phase 5)
- D: Create Playwright e2e test skeleton for acceptance tests (Phase 11)

---

Next Actions Teaching
- Project Effect: Helps you pick the next artifact with the clearest short-term ROI.
- What You'll See: A recommended choice and what that choice unlocks for the team.
- Why It Matters: Prioritizes work to reduce blocker risk and enable downstream tasks.

## 21) Complete missing details (now fully specified)
This section fills all previously underspecified items so the blueprint is 100% actionable.

21.1 Migration tool, repo layout and dev seed
- Migration tool: Supabase CLI (recommended for Supabase DB + Storage). Use Supabase's migration system to produce timestamped SQL files stored under `migrations/` and keep seed scripts in `scripts/seed-dev.sql` (SQL) and `scripts/seed-dev.js` (optional helper).
- Note: if you prefer a different workflow you may still use `pg-migrate` or `prisma migrate`, but Supabase CLI will make local dev and deploys against Supabase simpler.
- Repo layout (important files):
  - `migrations/` (timestamped SQL files)
  - `scripts/seed-dev.sql` and `scripts/seed-dev.js`
  - `docs/erd.png`, `docs/api-contract.yaml`
  - `docs/migrations/README.md` (apply/rollback commands)

Apply/rollback guidance (Supabase)
- Use the Supabase CLI to create and manage migrations and to run them locally (install the Supabase CLI per Supabase docs). In CI, run migrations against your staging DB via the same CLI.
- Where to store: commit created SQL migration files to `migrations/` so they are part of the repo and versioned.
- Dev workflow (high level): generate a migration, commit it, and apply it to your local Supabase DB; add a `scripts/seed-dev.sql` that inserts minimal orgs/users/posts and run it after migrations during dev setup.

  21.1 Teaching
  - Project Effect: Standardizes how migrations are applied and rolled back in dev and CI.
  - What You'll See: Simple commands that team members run to sync their local DB state.
  - Why It Matters: Avoids divergent DB schemas and painful merge conflicts during schema changes.

21.2 Exact DB schema (fully typed fields, constraints, indexes)
-- posts
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL,
  author_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  excerpt text DEFAULT '',
  cover_asset_id uuid NULL,
  content jsonb NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'draft',
  published_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  meta jsonb DEFAULT '{}'::jsonb
);
CREATE UNIQUE INDEX posts_org_slug_idx ON posts(org_id, slug);
CREATE INDEX posts_org_status_published_at_idx ON posts(org_id, status, published_at DESC);
-- content search helper index
CREATE INDEX posts_content_gin_idx ON posts USING gin ((to_tsvector('english', coalesce(title,'') || ' ' || coalesce((content->>'plainText'),'') )));

-- categories
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  parent_id uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX categories_org_slug_idx ON categories(org_id, slug);

-- tags
CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX tags_org_slug_idx ON tags(org_id, slug);

-- assets
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL,
  uploader_id uuid NULL,
  url text NOT NULL,
  filename text NOT NULL,
  mime_type text NOT NULL,
  width int NULL,
  height int NULL,
  size_bytes int NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- revisions
CREATE TABLE revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  author_id uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- linking tables
CREATE TABLE post_tags (post_id uuid REFERENCES posts(id) ON DELETE CASCADE, tag_id uuid REFERENCES tags(id) ON DELETE CASCADE, PRIMARY KEY(post_id, tag_id));
CREATE TABLE post_categories (post_id uuid REFERENCES posts(id) ON DELETE CASCADE, category_id uuid REFERENCES categories(id) ON DELETE CASCADE, PRIMARY KEY(post_id, category_id));

21.2 Teaching
- Project Effect: Defines the authoritative data model and constraints so application code can rely on DB invariants.
- What You'll See: Concrete CREATE TABLE statements and indexes used by queries in the app.
- Why It Matters: Reduces bugs caused by implicit assumptions about data shape and indexing.
21.3 Seed data examples (dev)
- `scripts/seed-dev.sql` should insert 2 orgs, 3 users (owner/admin/author), 2 posts (published/draft), categories and tags, and one asset. Example minimal row for posts uses `content` JSON shape described below.

21.3 Teaching
- Project Effect: Provides reproducible local test data for development and CI smoke tests.
- What You'll See: A dev DB seeded with representative orgs, users, posts, and assets.
- Why It Matters: Makes debugging easier and ensures tests run against realistic data.

21.4 Editor `content` JSON schema (canonical)
- Use a block-based JSON schema compatible with Tiptap/ProseMirror serialized format with a light contract for server storage:
  - Root: {type: 'doc', content: [Block...]}
  - Block types: paragraph, heading(level), image({assetId, alt, caption, width, height}), blockquote, codeBlock, orderedList, bulletList, listItem, callout({level}), htmlBlock({html})
  - Provide a `plainText` summary field derived at save for search indexing (server computes it).
Example:
{
  "type":"doc",
  "content":[
    {"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Title"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Intro paragraph"}]},
    {"type":"image","attrs":{"assetId":"asset-uuid","alt":"Alt text","caption":"Caption"}}
  ],
  "plainText":"Title\nIntro paragraph\nCaption"
}

21.4 Teaching
- Project Effect: Ensures editor content is interoperable between client and server and is searchable.
- What You'll See: A compact JSON contract for blocks and a derived `plainText` used for indexing.
- Why It Matters: Avoids format drift and keeps the search/indexing pipeline simple.
21.5 Full API request/response examples (per endpoint)
- POST /api/posts
  - request JSON: {orgId:uuid, authorId:uuid, title:string, slug?:string, content:json, excerpt?:string, meta?:object}
  - response 201: {post:{id,org_id,author_id,title,slug,excerpt,content,status,published_at,created_at,updated_at,meta}}
- PATCH /api/posts/:id
  - request JSON: partial post fields e.g. {title,slug,content,excerpt,meta}
  - response 200: updated post
- POST /api/posts/:id/save-draft
  - request JSON: {authorId, snapshot:contentJSON}
  - response 200: {post, revision}
- POST /api/slug/check
  - request JSON: {orgId, slug, postId?}
  - response 200: {available:boolean, message:string}
- POST /api/media/upload
  - multipart/form-data with file + metadata
  - response 201: {asset}

All endpoints must return errors with shape: {error:{code:'string', message:'string', details?:object}}

21.5 Teaching
- Project Effect: Removes ambiguity for clients consuming the API and standardizes error handling.
- What You'll See: Example requests and responses used by frontend mocks and integration tests.
- Why It Matters: Simplifies frontend error handling and makes automated tests deterministic.
21.6 RLS policies (complete set)
- For every table ensure `org_id` scoping and role enforcement. Example full policies (posts, assets, revisions):

-- posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY posts_select ON posts FOR SELECT USING (org_id = current_setting('app.current_org')::uuid);
CREATE POLICY posts_insert ON posts FOR INSERT WITH CHECK (
  org_id = current_setting('app.current_org')::uuid AND
  current_setting('app.role') IN ('owner','admin','editor','author')
);
CREATE POLICY posts_update ON posts FOR UPDATE USING (
  org_id = current_setting('app.current_org')::uuid AND (
    current_setting('app.role') IN ('owner','admin','editor') OR
    author_id = current_setting('app.current_user')::uuid
  )
);

-- assets
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY assets_select ON assets FOR SELECT USING (org_id = current_setting('app.current_org')::uuid);
CREATE POLICY assets_insert ON assets FOR INSERT WITH CHECK (org_id = current_setting('app.current_org')::uuid AND current_setting('app.role') IN ('owner','admin','editor','author'));
CREATE POLICY assets_update ON assets FOR UPDATE USING (org_id = current_setting('app.current_org')::uuid AND current_setting('app.role') IN ('owner','admin','editor'));

-- revisions
ALTER TABLE revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY revisions_select ON revisions FOR SELECT USING (EXISTS(SELECT 1 FROM posts p WHERE p.id = revisions.post_id AND p.org_id = current_setting('app.current_org')::uuid));
CREATE POLICY revisions_insert ON revisions FOR INSERT WITH CHECK (EXISTS(SELECT 1 FROM posts p WHERE p.id = revisions.post_id AND p.org_id = current_setting('app.current_org')::uuid));

21.6 Teaching
- Project Effect: Teaches DB-level access control and how it maps to app roles and settings.
- What You'll See: Policy examples and test cases that demonstrate allowed and denied actions.
- Why It Matters: Makes RLS understandable and testable for DB and backend engineers.

21.7 Media pipeline details
- Storage: S3-compatible (Supabase Storage or S3). Buckets: `org-<orgId>-public`, `org-<orgId>-private`.
- Upload flow: client requests a signed upload URL via `POST /api/media/upload-url` -> server returns signed URL -> client uploads directly -> client calls `POST /api/media/register` with metadata -> server inserts `assets` record.
- Processing: image worker (lambda/worker) triggered on upload to generate presets: 320, 640, 1280, 2048 widths; WebP and AVIF where supported. Worker updates `assets.metadata.srcset` with array of {url,width,height,size}
- CDN: configure Cache-Control and invalidate on replace.

21.7 Teaching
- Project Effect: Clarifies the lifecycle from upload to CDN delivery and performance expectations.
- What You'll See: Signed upload flow, worker responsibilities, and resulting `assets.metadata` structure.
- Why It Matters: Ensures images are delivered efficiently and consistently, avoiding rework later.

21.8 Scheduler & publish worker (design + idempotency)
- Worker: a cron job every minute that runs `select id from posts where status='scheduled' and published_at <= now()` and processes each row in a transaction.
- Publish transaction steps:
  1) lock row `FOR UPDATE SKIP LOCKED`
  2) if status != 'scheduled' skip
  3) update status -> 'published', set published_at = greatest(published_at, now()) and updated_at
  4) insert a revision snapshot (optional)
  5) call functions: refresh sitemap entry (background), invalidate caches, send webhooks/notifications
  6) commit
- Idempotency: use `FOR UPDATE SKIP LOCKED` and only process rows where status='scheduled' to avoid double-processing. Worker should be safe to run concurrently.

21.8 Teaching
- Project Effect: Explains why the worker must be idempotent and how row-locking prevents duplicated effects.
- What You'll See: A minute-cron worker that processes scheduled posts reliably and safely.
- Why It Matters: Prevents double publishes and race conditions in busy deployments.

21.9 Search & indexing (implementation)
- Use Postgres FTS with an indexed `search_vector` column (tsvector) and `pg_trgm` for fuzzy search. Trigger updates on insert/update via a SQL trigger that sets `search_vector = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content->>'plainText',''))`.
- Optionally, provide a sync worker to push to Meilisearch/Algolia: on write enqueue post for indexing; make index schema include title, excerpt, content snippet, tags, categories, published_at.

21.9 Teaching
- Project Effect: Outlines the tradeoffs between relying on Postgres FTS vs. an external search index.
- What You'll See: Triggers to update `search_vector` and an optional sync worker for external indices.
- Why It Matters: Helps teams pick a path that balances cost, latency, and feature needs.
21.10 CI example (GitHub Actions) summary
- Workflows:
  - `lint-test-build.yml`: runs on PR, steps: checkout, install, run `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`
  - `migrations.yml`: on merge to main: run migrations in dry-run against staging DB then apply to staging
  - `deploy.yml`: on release tag: deploy to prod

  21.10 Teaching
  - Project Effect: Makes CI responsibilities explicit and reproducible across environments.
  - What You'll See: Example workflows that run tests, migrations, and deploys with safe gates.
  - Why It Matters: Ensures code entering production has passed required checks.

21.11 Observability thresholds & alerts
- Metrics to collect:
  - scheduled_publish_backlog (count of scheduled posts with published_at <= now() + 5min)
  - publish_job_errors (per-minute errors)
  - autosave_failures (rate)
  - http_5xx_rate
- Alerts examples:
  - publish_job_errors > 0 in last 5 minutes -> P1
  - scheduled_publish_backlog > 10 -> P2
  - 5xx_rate > 1% -> P1

21.11 Teaching
- Project Effect: Teaches which metrics indicate critical failures and how to set sensible thresholds.
- What You'll See: Concrete alerts and runbook entries tied to metrics.
- Why It Matters: Reduces mean time to detect and resolve production incidents.


21.12 Data retention & pruning
- Revisions retention policy: keep last N (configurable default 50) per post; older revisions moved to an archival table `revisions_archive` or deleted after 1 year. Provide SQL prune script run nightly.
- Asset cleanup: orphan asset detection job (assets not referenced by posts/tags) with a 30-day grace delete workflow.

21.12 Teaching
- Project Effect: Clarifies long-term storage costs and operational maintenance tasks.
- What You'll See: Scheduled prune jobs and a documented deletion workflow with safety nets.
- Why It Matters: Keeps storage costs predictable and prevents accidental data loss.
21.13 Transition guide mock→real (mapping)
- lib/mocks/blogAdapter.saveDraft -> POST /api/posts (or PATCH)
- listRevisions -> GET /api/posts/:id/revisions
- restoreRevision -> POST /api/posts/:id/revisions/:rid/restore
- pickFeaturedImage -> GET /api/media (client selects) OR dedicated pick endpoint

21.13 Teaching
- Project Effect: Makes the replacement of mocks with real endpoints low risk and incremental.
- What You'll See: A clear mapping table and a migration plan for swapping the adapter.
- Why It Matters: Enables frontend work to continue uninterrupted while backend is built.
21.14 Environment variables (recommended)
- DB_URL, NEXTAUTH_URL, NEXT_PUBLIC_API_BASE, STORAGE_PROVIDER, S3_BUCKET, S3_REGION, S3_KEY, S3_SECRET, SENTRY_DSN, PROMETHEUS_PUSHGATEWAY, ALLOWED_ORIGINS

21.14 Teaching
- Project Effect: Documents the minimal operational surface necessary to run the app in any environment.
- What You'll See: A list of env vars and short descriptions used by devs and ops.
- Why It Matters: Prevents missing-config errors and speeds up onboarding.
21.15 Test matrix & sample Playwright tests to create
- Tests: create-post, autosave, create-revisions, restore-revision, schedule-publish (simulate worker), upload-media and select featured, slug-check duplicate, RLS negative tests

21.15 Teaching
- Project Effect: Prioritizes test cases that deliver confidence for key features.
- What You'll See: Playwright test names and what they validate, suitable for CI.
- Why It Matters: Ensures critical user journeys are covered by automated tests.
21.16 Deployment notes
- Host: Vercel or self-hosted Node on Cloud Run/EC2/K8s. If using Vercel, schedule jobs must be handled via external worker (Cloud Run or serverless cron).

21.16 Teaching
- Project Effect: Explains deployment tradeoffs and where to place background workers.
- What You'll See: Recommended deployment architectures and implications for scheduling and storage.
- Why It Matters: Helps ops choose an architecture that meets reliability and scheduling needs.
With these additions the blueprint is now fully specified and immediately actionable.


## Teaching block (for this execution: creation of the master blueprint)
1. Project Effect → This blueprint turns the project into a deterministic, auditable roadmap; every change maps to an artifact, test, and acceptance criteria.
2. What You’ll See → A committed `master-blog-blueprint.md` in `MY DOCUMENTS/BLOG COPILOT PLAN` and a follow-up artifact based on your chosen next action.
3. Why It Matters → Ensures we never "miss" a requirement, makes handoffs predictable, and lets us track progress with clear QA gates.

---

*End of blueprint file.*
