UI/UX Kit — GrowRIx

What this folder contains
- Tailwind + PostCSS config and a `globals.css` file.
- Lightweight, UI-only React components (ContactForm, DemoGrid) and small UI primitives (`/components/ui`).
- A tiny `lib/utils.ts` with a `cn` helper.

How to use
1) Copy `ui-ux-kit/` into your new project's root.
2) Install the minimal dependencies (example):

```powershell
npm install tailwindcss postcss autoprefixer framer-motion
```

3) Add Tailwind setup in your project and import `./ui-ux-kit/styles/globals.css` from your root layout or entry.

Notes
- These files are UI-only; no backend, Payload, or data layer code included.
- Image URLs in `DemoGrid` use Unsplash and are public placeholders.
- Adjust imports for `@/lib/utils` if your new project uses a different path alias.
