# Dark Agency - Copy

This is a copy of the essential pages and components from the dark-agency-nextjs project.

## Included Pages

- **Homepage** (`/`) - Complete homepage with all sections
- **Admin Dashboard** (`/admin`) - Dashboard page as-is from the original
- **Demo Wall** (`/demo-wall`) - Demo showcase page  
- **Contact Page** (`/contact`) - Contact page with form

## Included Components

### Core Layout
- `Navbar.js` - Navigation bar with responsive design
- `Footer.js` - Footer with links and social media icons

### Homepage Components
- `HeroSection.js` - Main hero section with animated canvas
- `Features.js` - Features grid section
- `CaseStudies.js` - Case studies showcase
- `ProcessTimeline.js` - Development process timeline
- `StatsSection.js` - Statistics and metrics
- `ShopPreview.js` - Shop/products preview
- `FinalCTA.js` - Final call-to-action section

### Demo Wall Components
- `DemoWallHeader.tsx` - Demo wall page header
- `DemoGrid.tsx` - Grid of demo items
- `DemoFilters.tsx` - Filter controls for demos
- `DemoCTA.tsx` - Call-to-action for demo wall

### Contact Page Components
- `ContactHero.tsx` - Contact page hero section
- `ContactForm.tsx` - Contact form component
<!-- Payload CMS section removed during repository reset. See README_RESET.md and COMPREHENSIVE_AUDIT_REPORT.md for details. -->
   1. Create a file `.env.local` at the project root and add the values you shared (we added placeholders in repo). Example already included in `.env.local`.
   2. Install packages:
      ```bash
      npm install
      ```
   3. Start the standalone Payload server (recommended):
      ```bash
      npm run payload:start
      ```
      This will initialize the DB schema (Drizzle) and start the Payload server.

   4. Start Next.js dev server in a separate terminal:
      ```bash
      npm run dev
      ```

   5. Admin & API endpoints:
      - Payload admin will be at the `PAYLOAD_SERVER_URL` (default: `http://localhost:3001`).
      - Use the Next frontend at `http://localhost:3000` which can call Payload APIs or the standalone Payload server.

Note: For production, run Payload as its own service and set secure secrets (don't commit service role keys).
## Note

This is a clean copy containing only the essential files needed to run the specified pages. All blog-related features, complex integrations, and unnecessary dependencies have been removed to keep this copy lightweight and focused.
