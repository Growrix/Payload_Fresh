# Phase 2 — UI Scaffolding (Admin + Frontsite)

Purpose: A controlled execution plan for Phase 2 from the master blueprint. This file defines the exact UI artifacts to create, audit and merge rules for any partial work found, the controlled prompt approach for edits, validation commands, and teaching notes.

---

## Quick checklist (do these in order)
- [ ] Audit the repository for existing UI files, components and routes (see Audit below).
- [ ] Reuse or merge partially completed UI work found by the audit; after execution, create a single log file in `MY DOCUMENTS\TASK DONE\phase-02-ui-scaffolding.md` that includes all details: audit findings, what was merged or reused, what remains, and a summary of actions taken. Do not create a separate audit file; consolidate all documentation in this log file.
- [ ] Implement or complete the files listed under "Files to create / edit" using the controlled prompt approach.
- [ ] Validate and smoke-test the UI routes and skeleton components locally.
- [ ] Commit each logical change as a small PR with a phase doc link and test evidence.

---

## Objective
Create the static UI surface for admin and frontsite where behaviors from Phase 3+ can be plugged in. Keep changes minimal, testable, and reversible.

## Files to create / edit (UPDATED AFTER MASSIVE AUDIT)

### Core Editor Files (Original Phase 2)
- `app/growrix-admin/blog/posts/page.tsx` (index skeleton) ✅ EXISTS - NEEDS FIXES
- `app/growrix-admin/blog/posts/new/page.tsx` (editor page skeleton) ✅ EXISTS - NEEDS ENHANCEMENTS
- `app/growrix-admin/blog/posts/[id]/page.tsx` (editor page skeleton) ✅ EXISTS - NEEDS ENHANCEMENTS
- `components/blog/PostEditor/EditorCanvas.tsx` (skeleton placeholder) ✅ EXISTS - NEEDS RICH EDITOR
- `components/blog/PostEditor/Sidebar/StatusCard.tsx` (placeholder) ✅ EXISTS - NEEDS VISIBILITY FIX
- `components/blog/PostEditor/Sidebar/SlugCard.tsx` (placeholder) ✅ EXISTS - NEEDS ENHANCEMENT
- `components/blog/PostEditor/Sidebar/SEOPanel.tsx` (placeholder) ✅ EXISTS - NEEDS ENHANCEMENT
- `components/blog/PostEditor/Sidebar/TaxonomyPanel.tsx` (placeholder) ✅ EXISTS - NEEDS CREATION FLOW
- `components/blog/PostEditor/Sidebar/FeaturedImageCard.tsx` (placeholder) ✅ EXISTS - NEEDS MEDIA LIBRARY
- `components/blog/PostEditor/Sidebar/RevisionsCard.tsx` (placeholder) ✅ EXISTS - NEEDS ENHANCEMENT

### CRITICAL MISSING COMPONENTS (Discovered in Audit)
- `components/blog/PreviewModal.tsx` ✅ IMPLEMENTED - CRITICAL FOR PREVIEW
- `components/blog/MediaLibraryModal.tsx` ✅ IMPLEMENTED - CRITICAL FOR IMAGES  
- `app/growrix-admin/blog/media/page.tsx` ✅ IMPLEMENTED - MEDIA LIBRARY ROUTE
- `components/blog/BulkActionsBar.tsx` ❌ MISSING - CRITICAL FOR POST MANAGEMENT
- `components/blog/SearchAndFilters.tsx` ✅ IMPLEMENTED - CRITICAL FOR POST DISCOVERY
- `components/blog/QuickEditRow.tsx` ✅ IMPLEMENTED - CRITICAL FOR EFFICIENCY
- `components/blog/ContentCalendar.tsx` ❌ MISSING - CRITICAL FOR SCHEDULING
- `components/admin/PageHeader.tsx` ❌ MISSING - CRITICAL FOR NAVIGATION
- `components/admin/AdminBreadcrumbs.tsx` ❌ MISSING - CRITICAL FOR UX

### PROFESSIONAL ENHANCEMENT COMPONENTS
- `components/blog/PostMetrics.tsx` ❌ MISSING - Word count, reading time
- `components/blog/SEOAnalyzer.tsx` ❌ MISSING - Advanced SEO scoring
- `components/blog/KeyboardShortcuts.tsx` ❌ MISSING - Power user features
- `components/blog/AutosaveIndicator.tsx` ❌ MISSING - Enhanced autosave UX
- `components/blog/CollaborationPanel.tsx` ❌ MISSING - Multi-user editing
- `components/blog/VisibilityManager.tsx` ❌ MISSING - Advanced visibility controls

### WordPress-Level Features (Phase 2.5)
- `components/blog/EmbedManager.tsx` ❌ MISSING - YouTube, Twitter embeds
- `components/blog/BlockInserter.tsx` ❌ MISSING - Custom content blocks  
- `components/blog/TemplateSelector.tsx` ❌ MISSING - Post templates
- `components/blog/CustomFieldsPanel.tsx` ❌ MISSING - Extensible metadata

Notes: If any of these files already exist, do not overwrite. Instead: (a) open and inspect, (b) record status (OK / partial / outdated) in `docs/phase-02-audit.md`, (c) implement only missing pieces or small patches to make the skeleton compile.

---

## IMMEDIATE CRITICAL FIXES REQUIRED (Based on Massive Audit)

### 🔴 CRITICAL PRIORITY 1 (Breaks Professional Usage)
1. **StatusCard Visibility Dropdown** - ✅ FIXED: Now interactive with UI-only demo mode
2. **Preview Functionality** - ✅ FIXED: PreviewModal implemented with accessibility features
3. **Posts Table Navigation** - ✅ FIXED: Rows link to edit routes, Quick Edit functional
4. **Bulk Actions** - ❌ PENDING: All buttons disabled, needs functional bulk operations
5. **Search & Filters** - ✅ FIXED: Client-side filtering implemented for posts table

### 🟠 HIGH PRIORITY 2 (Poor UX)
6. **Page Headers & Breadcrumbs** - ❌ PENDING: Missing navigation context
7. **Media Library Integration** - ✅ FIXED: Unified blogAdapter, real images, modal selection
8. **Taxonomy Creation** - ✅ FIXED: Cannot create categories/tags inline (UI exists)
9. **Enhanced Autosave UX** - ✅ FIXED: Professional implementation with status indicators
10. **Mobile Responsiveness** - ❌ PENDING: Editor layout needs mobile optimization

### 🟡 MEDIUM PRIORITY 3 (Professional Features)
11. **Content Calendar** - Visual scheduling interface
12. **Quick Edit** - Inline editing in posts table
13. **Keyboard Shortcuts** - Power user efficiency
14. **Advanced SEO** - Professional SEO analysis and scoring
15. **Word Count/Reading Time** - Content metrics display

---

## AUDIT FINDINGS SUMMARY

**CRITICAL DISCOVERY:** The current implementation is approximately **37% complete** compared to professional WordPress standards. Major gaps include:

- **Disabled Core Features:** Visibility, search, filters, bulk actions all disabled
- **Missing Preview System:** No way to preview posts before publishing  
- **No Media Management:** Featured images have no real media library
- **Limited Post Management:** Cannot edit posts from list, no bulk operations
- **Poor Navigation UX:** No breadcrumbs, page titles, or context

See full details in: `MY DOCUMENTS/TASK DONE/massive-comprehensive-ui-ux-audit-report.md`

---

## Audit (must do before editing)
1. Run these commands to capture current state:
   - `npx tsc --noEmit`
   - `npm run build` (if quick) or `npm run dev` to compile routes
2. Search for existing files listed above. For each file found, mark status: OK (usable), partial (needs edits), duplicate (similar file path), or missing.
3. Create `docs/phase-02-audit.md` and record:
   - Files found and status
   - Any compile errors or warnings shown by the commands above
   - A short plan for merging partial items (which files to keep, which to patch)

Important: Do not replace or delete files that appear intentionally customized; instead propose a patch in the PR and document prior contents.

---

## Controlled prompt approach (how to execute each UI subtask)
Follow this micro-procedure for each file or small group of files:

1. Read: open existing files (if present) and the master blueprint section `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md`.
2. Draft: prepare a focused change limited to one file or a tightly-coupled pair (e.g., EditorCanvas + one Sidebar card).
3. Validate locally: run `npx tsc --noEmit` and `npm run build` (or `npm run dev`) to ensure no compile-time regressions.
4. Commit on branch `phase2/<short-task>` with a one-line message and PR body referencing the master blueprint and this phase doc, including validation outputs.
5. Request one reviewer and merge after CI passes and reviewer sign-off.

This keeps PRs small and traceable and avoids large, risky changes.

---

## Implementation notes (detailed steps)
1. Create `docs/phase-02-audit.md` with the audit results and commit it on branch `phase2/audit`.

2. For each missing file from the "Files to create / edit" list create a minimal skeleton implementing:
   - A functional React component (TSX preferred) with a clear export.
   - Minimal Tailwind classes so the layout matches the project styling.
   - Placeholder text indicating the file is a scaffold (e.g., "StatusCard — scaffold").
   - Prop types or interfaces that match the eventual shape used in Phase 3, but keep them permissive so the files compile now.

3. For existing partial files, make minimal edits only to resolve TypeScript errors or missing imports. Record the original content in the PR body and the audit doc.

4. Add route pages under `app/` (Next App Router) if missing. Each page should import the EditorCanvas and Sidebar (placeholders) and render a two-column layout: main editor + right sidebar.

5. Add simple navigation links between admin pages and frontsite (Navbar) to enable manual navigation during testing.

6. Keep CSS changes to a minimum; prefer existing global styles `app/globals.css` and Tailwind utilities.

---

## Do NOT
- Do not implement editor functionality (autosave, publish, slug check) in Phase 2 — those belong to Phase 3.
- Do not perform large refactors of shared components in Phase 2.
- Do not wire real APIs or database calls; use placeholders and props only.

---

## Acceptance (must pass before moving to Phase 3)
- `docs/phase-02-audit.md` exists and documents the audit result.
- `npx tsc --noEmit` returns 0 after your changes (or any remaining baseline problems are documented in the audit with a remediation plan).
- `npm run build` completes successfully and the documented admin routes compile (e.g., `/growrix-admin/blog/posts/new`, `/growrix-admin/blog/posts/[id]`).
- Manual validation: open the dev server (`npm run dev`) and verify you can navigate to admin index and editor skeleton pages; placeholders render and no console runtime errors appear.
- Each logical task has a small PR with a PR body that references this phase doc and the master blueprint.

---

## Commit & PR guidance
- Branch naming: `phase2/<short-task>`
- PR title: `phase2: <short description>`
- PR body must include:
  - Link to `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md` and this phase doc
  - Audit evidence (if merging existing files) and before/after notes
  - Validation commands and outputs

---

## Testing checklist (manual)
Run these locally and paste results into PR body:

```powershell
npx tsc --noEmit
npm run build
npm run dev
# open http://localhost:3000/growrix-admin/blog/posts
# open http://localhost:3000/growrix-admin/blog/posts/new
# open http://localhost:3000/growrix-admin/blog/posts/<id>
```

Check: placeholders render, navigation works, and browser console shows no runtime errors.

---

## Teaching notes (end of phase)
- Project Effect: Phase 2 establishes the UI canvas that downstream features (autosave, revisions, media picker) will plug into. Doing this cleanly avoids repeated layout changes later.
- What You'll See: Skeleton admin pages and a consistent right-hand sidebar layout with placeholder cards for Status, Slug, SEO, Taxonomy, Featured Image, and Revisions.
- Why It Matters: With a stable UI surface, backend and UX engineering can iterate in parallel without blocking each other.

---

## Next steps after acceptance
- Proceed to Phase 3 (UX behaviors) and follow the controlled prompt approach for wiring mocks and autosave.
- When you ask me to implement any Phase 2 subtasks, I will: run the audit, produce minimal patches per the controlled approach, validate locally, and prepare PR-ready commits.

---

*End of Phase 2 execution plan.*
