import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null as any;

export function createClient() {
  if (client) return client;

  try {
    // lazy require so code doesn't break in environments without the package
    // or during static type checks
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createClient: create } = require('@supabase/supabase-js');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      // fallback to shim when env isn't set
      return {
        from: (table: string) => ({
          select: async () => ({ data: [], error: null }),
          insert: async (rows: any) => ({ data: rows, error: null }),
          update: async (rows: any) => ({ data: rows, error: null }),
          delete: async () => ({ data: [], error: null }),
        }),
        auth: {
          signInWithPassword: async (creds: any) => ({ data: { user: { id: 'demo' } }, error: null }),
          signOut: async () => ({ error: null }),
        },
      };
    }

    client = create(url, anon);
    return client;
  } catch (e) {
    // package not installed or runtime error — return shim
    return {
      from: (table: string) => ({
        select: async () => ({ data: [], error: null }),
        insert: async (rows: any) => ({ data: rows, error: null }),
        update: async (rows: any) => ({ data: rows, error: null }),
        delete: async () => ({ data: [], error: null }),
      }),
      auth: {
        signInWithPassword: async (creds: any) => ({ data: { user: { id: 'demo' } }, error: null }),
        signOut: async () => ({ error: null }),
      },
    };
  }
}
