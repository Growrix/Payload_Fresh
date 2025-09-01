# Phase 3 — UX Behaviors (Execution Plan)

Purpose: Implement Phase 3 as specified in `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md` — mocks, autosave, sidebar wiring, revisions UI and button feedback — using a controlled, audit-first approach.

High-level plan
- Audit existing code and builds.
- Merge with existing implementations if present; implement only what's undone.
- Validate by running TypeScript, build, and local dev server tests.
- Create small, focused commits/PRs per controlled prompt.
- Produce a task log at `MY DOCUMENTS/TASK DONE/phase-03-ux-behaviors.md` with audit findings and a changelog.

## Deep Audit Findings (before implementation)

**Teaching Note**: Deep auditing means examining actual user flows, data binding patterns, and integration gaps — not just file presence. This prevents implementing features that look complete but have broken user experiences.

**Critical UX Gaps Found**: ✅ **RESOLVED**
1. ✅ **SlugCard isolation**: Now connected to post data and autosave
2. ✅ **SEOPanel completely disabled**: Enabled with data binding to post.meta_title/meta_description  
3. ✅ **TaxonomyPanel completely disabled**: Enabled with category/tag selection and binding to post state
4. ✅ **FeaturedImageCard state isolation**: Now persists selected image to post.featured_image_id
5. ✅ **Data flow disconnection**: All sidebar components now operate through unified post state
6. ✅ **Type schema integration**: Component props interfaces properly implemented

**UX Behavior Improvements**: ✅ **IMPLEMENTED**
- Autosave now captures slug changes, SEO fields, taxonomies, and featured image
- Manual save buttons include all sidebar data in the save payload
- Components properly sync with post state and propagate changes
- Taxonomy loading from mock adapter works correctly

Checklist (explicit requirements)
- [x] **Deep Audit**: Examined all components for data binding, user flows, and integration gaps
- [x] **Fix SlugCard integration**: Connected slug input to post data and included in autosave
- [x] **Enable SEOPanel**: Wired meta_title/meta_description to post state and autosave
- [x] **Enable TaxonomyPanel**: Wired categories/tags selection to post state (mock taxonomy lists)
- [x] **Fix FeaturedImageCard integration**: Persist selected image to post.featured_image_id
- [x] **Unify post state management**: All sidebar changes flow through unified post state
- [ ] **Improve validation UX**: Add field validation and clear disabled-state messaging
- [ ] **Test complete user flows**: Create→edit all fields→save→publish→revisions→restore
- [ ] **Add comprehensive tests**: Include all sidebar components in autosave/save workflows

Controlled prompts (small, verifiable steps — run in sequence)

**Teaching Note**: Each prompt addresses one integration gap. We fix data binding before adding new features to avoid compounding UX debt.

1) **Deep UX Audit (read-only)** ✅ COMPLETED
   - Purpose: examine actual user flows and data binding patterns
   - Findings: SlugCard, SEOPanel, TaxonomyPanel, FeaturedImageCard operate in isolation from post state
   - Outcome: gap analysis documented above

2) **Unify Post State Management (critical fix)** ✅ COMPLETED
   - Purpose: connect all sidebar components to shared post state and autosave
   - Changes: wire slug, SEO fields, taxonomy, featured image to main post state
   - Acceptance: typing in any field triggers autosave and persists in post data

3) **Enable SEOPanel Data Binding (small PR)** ✅ COMPLETED
   - Purpose: wire meta_title/meta_description to post state
   - Changes: remove disabled state, bind to post state, include in autosave
   - Acceptance: SEO fields save with post and restore from revisions

4) **Enable TaxonomyPanel Selection (small PR)** ✅ COMPLETED
   - Purpose: provide working category/tag selection from mock lists
   - Changes: load categories/tags from mock adapter, bind selections to post
   - Acceptance: selected categories/tags persist and show in revisions

5) **Fix Featured Image Integration (small PR)** ✅ COMPLETED
   - Purpose: persist selected featured image to post.featured_image_id
   - Changes: update FeaturedImageCard to sync with post state
   - Acceptance: featured image selection persists across save/restore cycles

6) **Manual Browser Validation (in progress)**
   - Purpose: confirm end-to-end UX flows work correctly in runtime
   - Actions: test complete create→edit→save→publish→revisions flows
   - Acceptance: all sidebar fields persist and restore correctly

7) **Add Integration Tests (remaining)**
   - Purpose: automated testing for unified post state management
   - Actions: unit tests for post state changes and autosave scope
   - Acceptance: tests confirm all sidebar data included in save payload

7) Tests & Validation (small PR)
   - Purpose: add one or two lightweight tests and run full type/build checks.
   - Actions: add a tiny test (Jest or simple script) that runs adapter.saveDraft and listRevisions.
   - Acceptance: `npx tsc --noEmit` passes, tests pass locally.

8) Final Audit & Log (create task log)
   - Purpose: capture audit findings, merged/edited files, and commands used.
   - Action: write audit + actions to `MY DOCUMENTS/TASK DONE/phase-03-ux-behaviors.md` (exact filename required).

Validation steps (how to verify locally)
- Run typecheck and build:

```powershell
npx tsc --noEmit; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npm run build; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
```

- Run dev server and open editor page:

```powershell
npm run dev
# open http://localhost:3000/growrix-admin/blog/posts/new
```

- Manual checks:
  - Type in editor title/body -> "Saving…" then "Saved" appears.
  - Save or publish -> revisions created in mock and visible in RevisionsCard.
  - Try slug check flow (edit slug) -> UI shows duplicate warning when mock returns unavailable.

Testing commands (suggested)
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Dev: `npm run dev`
- Run tests (if you add Jest): `npm test`

Merge strategy and PR guidance (controlled approach)
- Make minimal commits scoped to one change.
- Each change is a PR against `phase-3/xxx` branch with description linking to this plan.
- Run local validation before PR: tsc, lint, build, dev sanity.
- Reviewer verifies acceptance checklist items for that PR only.

Files to create/inspect
- Implement or review: `lib/mocks/blogAdapter.ts`, `hooks/useAutoSave.ts`, `components/blog/PostEditor/EditorCanvas.tsx`, `components/blog/PostEditor/Sidebar/StatusCard.tsx`, `SlugCard.tsx`, `RevisionsCard.tsx`, pages: `app/growrix-admin/blog/posts/new/page.tsx`, `app/growrix-admin/blog/posts/[id]/page.tsx`.

Acceptance Criteria (Phase 3)
- Autosave visibly works and creates revisions in the mock adapter.
- Revisions list shows entries and restore works in-editor (mock only).
- Publish/Unpublish/Archive buttons call mock adapter and update UI state.
- Typecheck/build/dev all succeed after changes.

Teaching notes
- Keep changes small and test frequently; UX logic is brittle when mixed with backend calls — mocks reduce iteration time.
- Use debounced autosave with cancellation tokens to avoid overlapping saves.
- Revisions are authoritative snapshots. Save-draft should be fast and not block typing; show saving states only when necessary.

Log instruction (mandatory)
After you finish the execution (all prompts above), create a log file with full audit details and a change summary under:

`MY DOCUMENTS/TASK DONE/phase-03-ux-behaviors.md`

The log must include:
- Audit Findings (what already existed, versions, partial implementations)
- Files merged/edited/created with one-line purpose
- Commands run and test results (tSC/build/dev/test outputs or summaries)
- Any manual test steps and their pass/fail status
- Follow-up tasks if anything was deferred

---

End of Phase 3 execution plan.
