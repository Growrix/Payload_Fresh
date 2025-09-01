export function createServerClient() {
  // Minimal server-side shim that returns the same API as the client shim.
  return {
    from: (table: string) => ({
      select: async () => ({ data: [], error: null }),
      insert: async (rows: any) => ({ data: rows, error: null }),
      update: async (rows: any) => ({ data: rows, error: null }),
      delete: async () => ({ data: [], error: null }),
    }),
    auth: {
      getUser: async () => ({ data: { user: { id: 'server-demo' } }, error: null }),
    },
  };
}

// Export createClient from server shim to satisfy imports that expect
// `createClient` from '@/lib/supabase/server'.
export const createClient = createServerClient;
