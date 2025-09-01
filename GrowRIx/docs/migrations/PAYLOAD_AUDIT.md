# Payload Integration — Phase 1 Audit

Date: 2025-08-26

Purpose: a focused, non-invasive audit of the Payload + Supabase integration, dependency state, configuration, and runtime blockers. This document contains findings, evidence, and high-level remediation options only (no code or config changes were made while producing this document).

---

## Executive summary

- Primary blocker: React version mismatch. The installed Payload packages (v3.53.0 and several plugins) expect React 19; the project runs React 18.3.1. This produces widespread peer dependency conflicts and is the root cause of several runtime failures.
- Secondary issues: duplicate/conflicting Payload configs (`payload.config.ts` vs earlier `payload.config.cjs`), dependency installation history using `--legacy-peer-deps` which masked peer errors, and 13 security vulnerabilities reported by `npm audit` (including 2 criticals).
- Network: Supabase host DNS resolves; DNS is not the immediate problem for DB connectivity. A direct TCP connection test to port 5432 is recommended before attempting migrations.
- Status: Audit complete. No code changes applied by this audit (file written only). Next: choose remediation path (see options).

---

## Checklist (user request mapping)

- [x] Produce an audit document summarizing stack, dependencies, config, and blockers.
- [ ] Execute remediation actions (deferred until user confirms a chosen approach).

---

## Environment snapshot

- Node.js: v22.17.0 (confirmed)
- npm: 10.9.2 (confirmed)
- React: 18.3.1 (project)
- Next.js: 15.4.6
- TypeScript: 5.9.2
- Payload: 3.53.0 (installed)
- DB: Supabase Postgres (DATABASE_URL present in `.env.local`)

Files examined (representative)
- `payload.config.ts` — TypeScript Payload config (contains plugins and Postgres adapter)
- `payload.config.cjs` — previously present CommonJS config (conflicting; may have been removed)
- `scripts/payload-standalone.cjs` — standalone start script used during testing
- `.env.local` — contains Supabase keys and DATABASE_URL
- `package.json` — lists Payload + plugin dependencies

---

## Findings — detailed

1) React peer dependency conflicts (MAJOR)
- Evidence: `npm ls react` produced many "invalid" peer dependency entries where Payload plugins require `^19.0.0`.
- Impact: Installing plugins that bundle or require React 19 will cause peer dependency errors and can break admin UI bundling or runtime behavior. Some installs were performed with `--legacy-peer-deps`, which suppressed errors but left an inconsistent dependency tree.

2) Conflicting Payload configuration (MODERATE)
- Evidence: Two config variants were present during investigation: a rich `payload.config.ts` (TypeScript, full collections & plugins) and a `payload.config.cjs` (CommonJS, minimal/placeholder). Startup attempts sometimes loaded the CJS file, leading to missing collections/globals and runtime errors (e.g., undefined collection data causing `forEach` failures in schema build).
- Impact: Standalone server may start with an empty/minimal config and fail when payload expects collection definitions.

3) Runtime bootstrap issues traced to config + dependency state (MAJOR)
- Evidence: Attempts to run `npm run payload:start` reported module resolution errors and then later runtime TypeErrors during `payload.init()` when collections/globals were missing or plugins failed to initialize.
- Impact: Prevents successful admin UI startup and schema migration.

4) Network / DB connectivity (INFO)
- Evidence: `nslookup` for the Supabase DB host returned IPv6 addresses. DNS resolution works. No direct TCP connectivity test was performed by the audit.
- Impact: DNS not blocking; recommend a quick `psql` or `tcp` check on port 5432 from the dev machine if problems persist.

5) Security vulnerabilities (MODERATE)
- Evidence: `npm audit` returned 13 vulnerabilities (11 moderate, 2 critical) — notable items include older Cypress/esbuild packages.
- Impact: These should be remediated after dependency tree stabilized; some fixes may require major package updates.

6) Installation history and masking (CONTEXT)
- Evidence: Repeated use of `--legacy-peer-deps` was used to force-install packages with incompatible peer requirements (React 19 required by Payload plugins). This masks the underlying compatibility problem and can produce subtle runtime errors.

---

## Evidence snippets
- React mismatch: Payload plugins peer requirements: `^19.0.0 || ^19.0.0-rc-...` while project React: `18.3.1`.
- `.env.local` contains a Supabase `DATABASE_URL` with `sslmode=require` (looks like: `postgresql://postgres:***@db.<site>.supabase.co:5432/postgres?sslmode=require`).
- `scripts/payload-standalone.cjs` was observed to attempt loading `payload.config.cjs` in earlier runs; multiple iterations of the script were present.

---

## Non-invasive remediation options (summary; choose before making changes)

Option A — Upgrade project React to 19 (recommended long-term)
- Pros: Clean compatibility with current Payload + plugins. Admin UI and plugins can be used fully.
- Cons: Upgrading React/Next may require code changes and regression testing. Next.js compatibility must be verified.

Option B — Run Payload server-only without client-side plugins (recommended quick path)
- Pros: Avoids React peer conflicts by removing admin UI plugins that require React 19. You can run Payload as a headless CMS using the REST API or GraphQL and keep the Next.js app on React 18.
- Cons: Admin UI features (SEO plugin UI, Lexical rich editor) will not be available in the same process. You may still want a separate admin app later.

Option C — Split admin into a separate app (React 19) and keep frontend on React 18
- Pros: Least risky to the existing Next.js app. Admin app can be tuned to Payload's peer deps.
- Cons: Additional project and deployment complexity (two apps to maintain).

Option D — Downgrade Payload/plugins to versions compatible with React 18
- Pros: Keep single app and admin UI.
- Cons: Older Payload/plugin versions may lack features or security fixes and may be harder to support.

---

## Recommended immediate next steps (no changes performed by this audit)
1. Pick one remediation option (A/B/C/D) and confirm. This audit stops here until you choose.
2. If you choose Option B (fastest): remove React-dependent plugins from `payload.config.ts` and test `payload.init()` with a minimal config and the real `DATABASE_URL`.
3. If you choose Option A or C: prepare a plan to upgrade React/Next or scaffold an admin app. We can run a dry-run upgrade and list breaking changes.
4. Run a direct DB connectivity test from your machine: `psql "${DATABASE_URL}" -c '\l'` (or use a TCP check) to confirm that Supabase allows connections from your IP.
5. After dependency tree stabilizes, run `npm audit` and fix high/critical vulnerabilities.

---

## Appendix — quick validations done during audit
- Confirmed Node + npm versions on local machine.
- Read `payload.config.ts`, `scripts/payload-standalone.cjs`, and `.env.local`.
- Confirmed presence of collection files under `payload/collections`.
- Observed prior use of `--legacy-peer-deps` in install history.
- Performed DNS lookup for Supabase host — resolved successfully.

---

If you'd like, I can now (after your confirmation) convert one of the remediation options into a step-by-step plan and implement it. Please tell me which option you prefer or ask for a recommendation tailored to your tolerance for risk and timeline.
