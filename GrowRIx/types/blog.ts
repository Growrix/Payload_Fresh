// Minimal blog types shim for the admin UI demo.
export type BlogPost = {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  post_type?: string;
  view_count?: number;
  comment_count?: number;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BlogCategory = { id: string; name: string; slug?: string };
export type BlogTag = { id: string; name: string; slug?: string };
export type BlogAsset = { id: string; url: string; filename?: string };
export type BlogComment = { id: string; body: string; author?: string };

export type BlogPostFilters = Record<string, any>;
export type CategoryFilters = Record<string, any>;
export type TagFilters = Record<string, any>;

export type CreatePostData = Partial<BlogPost>;
export type UpdatePostData = Partial<BlogPost>;

export type BlogPostsResponse = { data: BlogPost[]; total?: number };

export type BlogStats = { totalPosts: number };

export type CreateCategoryData = Partial<BlogCategory>;
export type UpdateCategoryData = Partial<BlogCategory>;

export type CreateTagData = Partial<BlogTag>;
export type UpdateTagData = Partial<BlogTag>;

export type AssetFilters = Record<string, any>;
export type CommentFilters = Record<string, any>;

export type CreatePostResponse = { data?: BlogPost; error?: any };
