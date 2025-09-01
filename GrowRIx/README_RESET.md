# GrowRIx - Post-Nuke Reset Notes

This repository was nuked of Payload CMS integration and related scripts. Kept:

- Next.js frontend (preserved)
- components/, app/, public/, styles, and utilities

Added:

- `lib/supabaseClient.ts` - minimal Supabase client wrapper

Next steps (automated):

1. Install clean deps: `npm install`
2. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`
3. Implement Supabase-backed admin pages under `app/admin` or `pages/admin`
