export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  published_at?: string;
  created_at: string;
  updated_at: string;
  author: string;
  category_id?: string;
  tag_ids: string[];
  featured_image_id?: string;
  meta_title?: string;
  meta_description?: string;
  userEditedSlug?: boolean;
}

export interface Revision {
  id: string;
  post_id: string;
  content: string;
  title: string;
  created_at: string;
  author: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Asset {
  id: string;
  filename: string;
  url: string;
  alt_text?: string;
  mime_type: string;
  size: number;
  created_at: string;
}
