// Minimal blog service shim used to satisfy imports in API routes and server code.
export const blogPostService = {
  async list() { return { data: [], total: 0 }; },
  async get(id: string) { return { data: null }; },
  async create(data: any) { return { data: null }; },
  async update(id: string, data: any) { return { data: null }; },
  async remove(id: string) { return { data: null }; },
};

export const blogCategoryService = {
  async list() { return { data: [] }; },
};

export const blogTagService = {
  async list() { return { data: [] }; },
};
