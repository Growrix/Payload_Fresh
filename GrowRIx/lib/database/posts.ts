// Minimal postsService shim for API routes
export const postsService = {
  async list() { return { data: [] }; },
  async get(id: string) { return { data: null }; },
  async create(data: any) { return { data: null }; },
  async update(id: string, data: any) { return { data: null }; },
  async remove(id: string) { return { data: null }; },
};
