# GROWRIX FRESH START MIGRATION GUIDE
*Complete step-by-step instructions for migrating UI/UX assets to a clean project*

## OVERVIEW
This document contains the complete migration plan to create a clean GrowRIx project while preserving all UI/UX assets. Follow these steps in exact order.

## PREREQUISITES
- Clean VS Code window open
- Access to the old project at: `f:\PROJECTS\GROWRIX PROJECT\GrowRIx`
- PowerShell terminal access

---

## PHASE 1: PROJECT INITIALIZATION

### Step 1: Create Fresh Next.js Project
```bash
# Navigate to projects directory
cd "f:\PROJECTS\GROWRIX PROJECT"

# Create new clean project
npx create-next-app@latest GrowRIx-Clean --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Enter the new project
cd GrowRIx-Clean
```

### Step 2: Install Core UI Dependencies
```bash
# Install essential UI/animation libraries
npm install clsx tailwind-merge framer-motion lucide-react react-icons

# Install font optimization
npm install @next/font

# Install development dependencies
npm install @types/node
```

---

## PHASE 2: CONFIGURATION FILES MIGRATION

### Step 3: Copy Core Configuration Files
```powershell
# Set up variables for easy copying
$old = "f:\PROJECTS\GROWRIX PROJECT\GrowRIx"
$new = "f:\PROJECTS\GROWRIX PROJECT\GrowRIx-Clean"

# Copy Tailwind configuration (contains custom theme)
Copy-Item "$old\tailwind.config.js" "$new\" -Force

# Copy PostCSS configuration
Copy-Item "$old\postcss.config.js" "$new\" -Force

# Copy environment variables (Supabase credentials)
Copy-Item "$old\.env.local" "$new\" -Force
```

### Step 4: Replace Default App Structure
```powershell
# Copy global styles (contains custom dark theme)
Copy-Item "$old\app\globals.css" "$new\app\" -Force

# Copy root layout (contains font setup and metadata)
Copy-Item "$old\app\layout.tsx" "$new\app\" -Force

# Copy homepage (main landing page)
Copy-Item "$old\app\page.tsx" "$new\app\" -Force
```

---

## PHASE 3: UI COMPONENTS MIGRATION

### Step 5: Copy Core UI Component Library
```powershell
# Create components directory
New-Item "$new\components" -ItemType Directory -Force

# Copy all UI primitives (buttons, cards, inputs, etc.)
Copy-Item "$old\components\ui" "$new\components\" -Recurse -Force
```

### Step 6: Copy Homepage Components (Core Value)
```powershell
# Copy all homepage section components
Copy-Item "$old\components\CaseStudies.tsx" "$new\components\" -Force
Copy-Item "$old\components\ContactForm.tsx" "$new\components\" -Force
Copy-Item "$old\components\ContactHero.tsx" "$new\components\" -Force
Copy-Item "$old\components\DemoCTA.tsx" "$new\components\" -Force
Copy-Item "$old\components\DemoFilters.tsx" "$new\components\" -Force
Copy-Item "$old\components\DemoGrid.tsx" "$new\components\" -Force
Copy-Item "$old\components\DemoWallHeader.tsx" "$new\components\" -Force
Copy-Item "$old\components\DirectContactCard.tsx" "$new\components\" -Force
Copy-Item "$old\components\Features.tsx" "$new\components\" -Force
Copy-Item "$old\components\FinalCTA.tsx" "$new\components\" -Force
Copy-Item "$old\components\Footer.tsx" "$new\components\" -Force
Copy-Item "$old\components\HeroSection.tsx" "$new\components\" -Force
Copy-Item "$old\components\Navbar.tsx" "$new\components\" -Force
Copy-Item "$old\components\ProcessTimeline.tsx" "$new\components\" -Force
Copy-Item "$old\components\ShopPreview.tsx" "$new\components\" -Force
Copy-Item "$old\components\StatsSection.tsx" "$new\components\" -Force
```

---

## PHASE 4: PAGES MIGRATION

### Step 7: Copy Core Pages
```powershell
# Copy contact page (complete feature)
Copy-Item "$old\app\contact" "$new\app\" -Recurse -Force

# Copy demo wall page (showcase feature)
Copy-Item "$old\app\demo-wall" "$new\app\" -Recurse -Force
```

---

## PHASE 5: ASSETS MIGRATION

### Step 8: Copy Static Assets
```powershell
# Copy all images, icons, and static files
Copy-Item "$old\public" "$new\" -Recurse -Force
```

### Step 9: Copy Utility Libraries
```powershell
# Create lib directory
New-Item "$new\lib" -ItemType Directory -Force

# Copy utility functions (important for components)
Copy-Item "$old\lib\utils.ts" "$new\lib\" -Force
```

### Step 10: Copy Custom Hooks
```powershell
# Create hooks directory
New-Item "$new\hooks" -ItemType Directory -Force

# Copy React hooks used by components
Copy-Item "$old\hooks\useAutoSave.ts" "$new\hooks\" -Force
```

---

## PHASE 6: VERIFICATION & TESTING

### Step 11: Test Core Website
```bash
# Start development server
npm run dev
```

**Verification Checklist:**
- [ ] Homepage loads at http://localhost:3000
- [ ] All sections render correctly (Hero, Features, Case Studies, etc.)
- [ ] Navigation works
- [ ] Contact page accessible at /contact
- [ ] Demo wall page accessible at /demo-wall
- [ ] No missing component errors in console
- [ ] Tailwind styles applied correctly
- [ ] Animations working (Framer Motion)

### Step 12: Fix Any Import Issues
If there are any import errors, check these common issues:
- Missing `clsx` or `tailwind-merge` imports
- Framer Motion import syntax
- Lucide React icon imports
- Next.js font imports

---

## PHASE 7: OPTIONAL ENHANCEMENTS

### Step 13: Copy Additional Components (If Needed Later)
```powershell
# Only copy these if you need admin/blog functionality later
# Copy-Item "$old\components\admin" "$new\components\" -Recurse -Force
# Copy-Item "$old\components\blog" "$new\components\" -Recurse -Force
# Copy-Item "$old\components\common" "$new\components\" -Recurse -Force
```

---

## FINAL PROJECT STRUCTURE

After migration, your clean project should have:

```
GrowRIx-Clean/
├── app/
│   ├── contact/          # Contact page
│   ├── demo-wall/        # Demo showcase
│   ├── globals.css       # Custom theme styles
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # Reusable UI components
│   ├── CaseStudies.tsx   # Homepage sections
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   └── ...all other homepage components
├── hooks/
│   └── useAutoSave.ts    # Custom React hooks
├── lib/
│   └── utils.ts          # Utility functions
├── public/               # Images and static assets
├── .env.local           # Environment variables
├── tailwind.config.js   # Custom theme configuration
└── package.json         # Clean dependencies
```

---

## SUCCESS CRITERIA

✅ **Migration Complete When:**
- Homepage renders perfectly with all sections
- Contact and demo pages work
- No console errors
- All animations and interactions work
- Styling matches original design
- Performance is optimal (fresh dependencies)

---

## NEXT STEPS AFTER MIGRATION

Once core UI/UX migration is complete and verified:

1. **Test all pages thoroughly**
2. **Clean up any unused imports**
3. **Optimize images if needed**
4. **Ready for Payload CMS integration** (separate phase)

---

## TROUBLESHOOTING

**Common Issues & Solutions:**

**Font Loading Issues:**
- Ensure `@next/font` is installed
- Check font imports in layout.tsx

**Component Import Errors:**
- Verify all dependencies installed: `clsx`, `tailwind-merge`, `framer-motion`, `lucide-react`, `react-icons`
- Check import paths are correct

**Styling Issues:**
- Ensure `tailwind.config.js` copied correctly
- Verify `globals.css` applied

**Animation Issues:**
- Check Framer Motion imports: `import { motion } from "framer-motion"`
- Ensure components marked as "use client" if needed

---

## COMPLETION VERIFICATION

Run this final check:
```bash
# Build test (should complete without errors)
npm run build

# Development test
npm run dev
```

🎉 **Migration successful when build completes and site renders perfectly!**

---

*This document ensures 100% accurate migration of all UI/UX assets while maintaining clean project structure.*

---

## PHASE 8: INSTALL STACK & DEPENDENCIES (order-sensitive)

Follow this exact, ordered sequence. Run each block of commands from the new project root (PowerShell).

### Quick pre-install validation (run these before you install)
```powershell
# Confirm Node and npm versions (we recommend Node 22.x or >=18 and npm 8+; this repo used Node 22)
node -v
npm -v

# Backup package.json so you can rollback quickly
Copy-Item package.json package.json.bak -Force

# Note about Next.js compatibility: if you pin Next to 15.x (suggested), verify it supports React 19 in your environment.
# If unsure, you can install React/React-DOM first and run a quick `npm run dev` to surface peer issues before proceeding.
```

1) Clean install (safe starting point)
```powershell
# Remove previous artifacts (if any) and clear cache
Remove-Item -Recurse -Force node_modules,package-lock.json
npm cache clean --force
```

2) Install React / Next (React 19 required by Payload plugins)
```powershell
# Install React 19 first so peer deps line up
npm install react@^19.0.0 react-dom@^19.0.0 --save

# Confirm (optional) - keep Next matching your target; the project used Next 15.x
# If you want to pin to the repo version:
npm install next@15.4.6 --save
```

3) Install Payload core + Postgres adapter (server-side)
```powershell
# Install Payload + Postgres adapter and node Postgres client
npm install payload@^3.53.0 @payloadcms/db-postgres@^3.53.0 pg --save
```

4) Optionally install admin UI plugins (ONLY if you want the built-in admin UI). These require React 19 — install only after step 2.
```powershell
# Optional (admin UI features). Install only when ready to run the Admin UI.
npm install @payloadcms/plugin-seo@^3.53.0 @payloadcms/plugin-search@^3.53.0 @payloadcms/richtext-lexical@^3.53.0 --save
```

5) Install testing and developer tooling (devDependencies)
```powershell
# Recommended dev tools (pin versions from the audit to reduce surprises)
npm install -D vitest@^3.2.4 @testing-library/react @testing-library/jest-dom cypress@^12.13.0

# TypeScript & helpers
npm install -D typescript@5.9.2 ts-node@^10.9.2 @types/node @types/react
```

6) Verification & post-install checks
```powershell
# Check peer tree for React (should show react@19.x)
npm ls react

# Run a fresh build and dev server
npm run build
npm run dev
```

7) Optional: audit and safe fixes
```powershell
# Run audit, fix non-breaking when possible
npm audit
npm audit fix

# Use --force only if you understand the risk (may change major versions)
# npm audit fix --force
```

Notes and best practices
- Never use `--legacy-peer-deps` when doing a fresh install; it masks conflicts.
- Install React and React-DOM first, then Payload, then optional plugins.
- If you see a peer conflict, stop and paste the `npm ls <pkg>` output into the conversation so I can advise the exact fix.
- Keep a copy of the `package.json` you want to preserve before large changes so you can roll back quickly.

If you'd like, I will now generate a ready-to-run PowerShell script that executes the above steps in your clean VS Code window (one command at a time, with prompts). Say "Yes, generate the install script" and I'll create it.


