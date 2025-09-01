# Payload Integration Cleanup & Resolution Plan

## Current Critical Issues
1. React 18 vs React 19 conflict with Payload plugins
2. Dual config files (TS vs CJS) with different content
3. Stub type definitions causing runtime issues
4. Security vulnerabilities in dependencies

## Resolution Options (Choose One)

### Option A: Upgrade to React 19 (Recommended for Production)
```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# 2. Upgrade React ecosystem
npm install react@^19.0.0 react-dom@^19.0.0
npm install @types/react@^19.0.0

# 3. Reinstall Payload without legacy peer deps
npm install payload @payloadcms/db-postgres @payloadcms/plugin-seo @payloadcms/plugin-search @payloadcms/richtext-lexical

# 4. Update Next.js for React 19 compatibility
npm install next@latest
```

### Option B: Server-Only Payload (Recommended for Quick Start)
```bash
# 1. Remove client-side Payload packages
npm uninstall @payloadcms/plugin-seo @payloadcms/plugin-search @payloadcms/richtext-lexical

# 2. Keep only server-side packages
npm install payload @payloadcms/db-postgres

# 3. Use Payload as headless CMS only (no admin UI)
```

### Option C: Separate Payload Admin App
- Create separate Express app for Payload admin
- Use React 19 in admin app
- Keep Next.js frontend on React 18
- Connect via API calls

## Immediate Fixes Needed

### 1. Fix Configuration Consistency
- Consolidate to single config file
- Add proper collection definitions
- Remove stub implementations

### 2. Fix Bootstrap Script
- Update to use TypeScript config
- Add proper error handling
- Fix module loading issues

### 3. Security Updates
```bash
npm audit fix --force  # Will break Cypress but fix critical issues
npm install cypress@latest  # Reinstall latest Cypress
```

## Testing Strategy
1. Start with minimal Payload config (no plugins)
2. Test DB connection independently
3. Add features incrementally
4. Verify each step before proceeding

## Files to Modify/Remove
- Remove: `payload.config.cjs` (conflicting config)
- Update: `payload.config.ts` (proper collections)
- Remove: `types/payload.d.ts` (stub types)
- Update: `scripts/payload-standalone.cjs` (use TS config)
