# Phase 1 — Project Setup & Conventions

Purpose: a practical, controlled execution plan to complete Phase 1 from the master blueprint. This file contains the exact artifacts to create, the audit/merge steps (if anything already exists), the controlled prompt approach for each subtask, validation commands, and teaching notes.

---

## Quick checklist (do these in order)
- [ ] Audit existing repository structure and builds (see audit steps below).
- [ ] Merge or reuse any partially completed work found by the audit; record what was merged and what remains.
- [ ] Create/complete the deliverables listed in "Files to create / edit" below using the controlled prompt approach.
- [ ] Run validation and basic smoke tests (TypeScript, lint, dev server, basic page render).
- [ ] Commit each logical change as a small PR with a phase doc link and test evidence.

---

## Objective
Establish a stable, documented developer baseline with agreed conventions so all subsequent phases are reproducible and low-friction.

## Files to create / edit (only these)
- `package.json` (scripts: dev, build, lint, typecheck, test)
- `.eslintrc.*` and `.prettierrc` (or single config files)
- `README.developer.md` (run steps, env list, local supabase notes)
- `tsconfig.json` (paths for `@/*` if desired)
- `docs/CONTRIBUTING.md` (commit hooks, PR template, branch rules)
- `.github/workflows/basic-ci.yml` (lint + typecheck + build for PRs) — minimal skeleton
- `scripts/bootstrap-dev.ps1` (PowerShell) and `scripts/bootstrap-dev.sh` for cross-platform local dev setup (optional)

---

## Audit (must do before editing)
1. Run local checks to capture current state:
   - `npx tsc --noEmit` (TypeScript compile diagnostics)
   - `npm run lint` (if exists)
   - `npm run build` (if exists)
   - `npm run dev` (quick server start to see runtime logs)
2. Inspect repository for existing files from the list above.
   - If a file exists, open and validate: does it match the conventions below? If yes, keep it and record "reused".
   - If a file exists but is incomplete, record the gaps and plan to patch only those gaps.
3. Record audit findings in `docs/phase-01-audit.md` (auto-created by this plan) with:
   - Files found and their status (OK / partial / missing)
   - Commands output summary (TypeScript / lint / build result)

Notes: Do not overwrite any file that appears intentionally customized without first recording its pre-state and asking for a confirmatory short note in the PR description.

---

## Controlled prompt approach (how to execute each subtask)
For every subtask below follow this micro-procedure (this keeps prompts, patches, and PRs small and reviewable):

1. Read: inspect the file(s) to edit in the workspace. If not present, create.
2. Draft: prepare a single focused change (one file or small related group) that implements the required behavior.
3. Validate locally: run `npx tsc --noEmit` and `npm run lint` and `npm run build` where applicable.
4. Create a short PR branch named `phase1/<short-task-name>` with a one-line commit message and a PR body that references `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md` and `MY DOCUMENTS/BLOG COPILOT PLAN/phase-01-project-setup.md` and includes validation commands + their outputs.
5. Request one reviewer; after sign-off and CI green, merge to `develop` (or `main` if you use trunk).

This process keeps the work atomic and avoids prompt bloat or messy multi-file edits in one go.

---

## Implementation notes (detailed steps)
1. Create `docs/phase-01-audit.md` and populate with the audit results from the Audit step. Commit this first (branch: `phase1/audit`).

2. Create or patch `package.json` scripts if missing. Minimal scripts recommended:
   - dev: `next dev -p 3000`
   - build: `next build`
   - start: `next start`
   - lint: `next lint` (or `eslint .`)
   - typecheck: `tsc --noEmit`

3. Add ESLint and Prettier configs (use Next.js recommended base). If the repo already has these, check plugin versions and rules; update only what is missing.

4. Create `README.developer.md` with:
   - One-line startup: `npm ci && npm run dev` and local supabase bootstrap notes (supabase CLI link), env var list (from master blueprint 21.14), and how to run migrations once we create them.
   - Troubleshooting quick commands (tsc, lint, build, reset dev DB)

5. Add `tsconfig.json` entries for `paths` if the project uses `@/*` imports. If the repo already has `tsconfig.json`, merge required path aliases only.

6. Add a minimal GitHub Actions workflow `./github/workflows/basic-ci.yml` that runs on PR: install node, npm ci, npm run lint, npx tsc --noEmit, npm run build. Keep it small — this is a smoke gate only.

7. Add commit hooks instructions in `docs/CONTRIBUTING.md` and optional husky config to run lint-staged on staged JS/TS files.

8. Create `scripts/bootstrap-dev.ps1` to automate installing dependencies and printing the audit summary and how to run the app locally.

---

## Do NOT
- Do not perform mass refactors across unrelated files in Phase 1.
- Do not change production infra or deployment settings yet (only local dev guidance).
- Do not replace existing configs wholesale without recording prior state and asking for confirmatory sign-off when behavior is unclear.

---

## Acceptance (must pass before moving to Phase 2)
- Audit file `docs/phase-01-audit.md` exists and lists findings.
- `npx tsc --noEmit` returns 0 (or the TypeScript baseline issues are documented in the audit with a clear remediation plan).
- `npm run lint` returns 0 or has only agreed exceptions documented in the audit.
- `npm run dev` starts and the app serves at `http://localhost:3000` with the admin and frontsite routes rendering basic pages (skeletons may 404 until Phase 2 — validate that server starts and routes compile).
- PRs for each logical task are present and merged OR a single consolidated PR exists with review notes recorded.

---

## Commit & PR guidance
- Keep each PR focused: one task per branch.
- PR title format: `phase1: <short description>`
- PR body must include:
  - Link to `MY DOCUMENTS/BLOG COPILOT PLAN/master-blog-blueprint.md` and this phase doc
  - Audit evidence or before/after notes if merging existing files
  - Validation commands and outputs
- Use semantic commit messages and include issue/ticket reference if available.

---

## Testing checklist (manual)
- Run the following locally and paste results into the PR body:

```powershell
npx tsc --noEmit
npm run lint
npm run build
npm run dev
# open http://localhost:3000 and verify a skeletal home or admin page loads
```

---

## Teaching notes (end of phase)
- Project Effect: Phase 1 creates a shared, reproducible developer environment that reduces onboarding friction and prevents small config differences from producing bugs later.
- What You'll See: A small set of config files, a developer README, a basic CI smoke workflow, and an audit that records the repo's starting state.
- Why It Matters: Early investment in developer experience prevents a cascade of environment-specific bugs and keeps future PRs focused and reviewable.

---

## Next steps after acceptance
- Proceed to Phase 2 (UI scaffolding) and use the controlled prompt approach for each UI file creation.
- When you ask me to execute any Phase 1 subtasks (create files), I will: run the audit, produce minimal patches per the controlled approach, validate locally, and add PR-ready commits.

---

*End of Phase 1 execution plan.*
