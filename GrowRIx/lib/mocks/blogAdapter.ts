import type { Post, Revision, Category, Tag, Asset } from '@/types/blog-mocks';

// In-memory storage (module-scoped)
let posts: Post[] = [
  {
    id: '1',
    title: 'Hello World',
    content: 'This is the first post content.',
    slug: 'hello-world',
    status: 'published',
    published_at: '2025-08-20T10:00:00Z',
    created_at: '2025-08-20T09:00:00Z',
    updated_at: '2025-08-20T10:00:00Z',
    author: 'Admin',
    tag_ids: ['1'],
    meta_title: 'Hello World - Blog',
    meta_description: 'Welcome to our first blog post'
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the second post content.',
    slug: 'second-post',
    status: 'draft',
    created_at: '2025-08-21T09:00:00Z',
    updated_at: '2025-08-21T09:30:00Z',
    author: 'Admin',
    tag_ids: ['2'],
  }
];

let revisions: Revision[] = [
  {
    id: 'rev-1',
    post_id: '1',
    content: 'Initial draft content for hello world.',
    title: 'Hello World',
    created_at: '2025-08-20T09:00:00Z',
    author: 'Admin'
  }
];

let categories: Category[] = [
  { id: '1', name: 'Design', slug: 'design', created_at: '2025-08-20T08:00:00Z' },
  { id: '2', name: 'Development', slug: 'development', created_at: '2025-08-20T08:05:00Z' }
];

let tags: Tag[] = [
  { id: '1', name: 'Next.js', slug: 'nextjs', created_at: '2025-08-20T08:00:00Z' },
  { id: '2', name: 'React', slug: 'react', created_at: '2025-08-20T08:05:00Z' }
];

let assets: Asset[] = [
  {
    id: 'asset-1',
    filename: 'sample1.jpg',
    url: '/sample1.jpg',
    alt_text: 'Blog Image 1',
    mime_type: 'image/svg+xml',
    size: 102400,
    created_at: '2025-08-20T08:00:00Z'
  },
  {
    id: 'asset-2',
    filename: 'sample2.jpg',
    url: '/sample2.jpg',
    alt_text: 'Blog Image 2',
    mime_type: 'image/svg+xml',
    size: 204800,
    created_at: '2025-08-20T08:01:00Z'
  },
  {
    id: 'asset-3',
    filename: 'sample3.jpg',
    url: '/sample3.jpg',
    alt_text: 'Blog Image 3',
    mime_type: 'image/svg+xml',
    size: 51200,
    created_at: '2025-08-20T08:02:00Z'
  },
  {
    id: 'asset-4',
    filename: 'Building_the_future__one_circuit_at_a_time.-transformed.jpeg',
    url: '/Building_the_future__one_circuit_at_a_time.-transformed.jpeg',
    alt_text: 'Building the future, one circuit at a time',
    mime_type: 'image/jpeg',
    size: 245600,
    created_at: '2025-08-20T08:03:00Z'
  },
  {
    id: 'asset-5',
    filename: 'Climbing towards challenges, ascending with solutions..png',
    url: '/Climbing towards challenges, ascending with solutions..png',
    alt_text: 'Climbing towards challenges, ascending with solutions',
    mime_type: 'image/png',
    size: 189400,
    created_at: '2025-08-20T08:04:00Z'
  },
  {
    id: 'asset-6',
    filename: 'Gears_of_progress_powered_by_the_electric_soul.-transformed.png',
    url: '/Gears_of_progress_powered_by_the_electric_soul.-transformed.png',
    alt_text: 'Gears of progress powered by the electric soul',
    mime_type: 'image/png',
    size: 312800,
    created_at: '2025-08-20T08:05:00Z'
  },
  {
    id: 'asset-7',
    filename: 'piclumen-1735820035316-transformed.jpeg',
    url: '/piclumen-1735820035316-transformed.jpeg',
    alt_text: 'Abstract design visualization',
    mime_type: 'image/jpeg',
    size: 198400,
    created_at: '2025-08-20T08:06:00Z'
  }
];

// Helper to simulate async operations
const delay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Generate new ID
const generateId = () => Date.now().toString();

export async function listPosts(): Promise<Post[]> {
  await delay();
  return [...posts];
}

export async function getPost(id: string | 'new'): Promise<Post | null> {
  await delay();
  
  if (id === 'new') {
    return {
      id: 'new',
      title: '',
      content: '',
      slug: '',
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: 'Admin',
      tag_ids: []
    };
  }
  
  return posts.find(p => p.id === id) || null;
}

export async function saveDraft(partialPost: Partial<Post> & { id: string }): Promise<Post> {
  await delay();
  
  const now = new Date().toISOString();
  const existingIndex = posts.findIndex(p => p.id === partialPost.id);
  
  let post: Post;
  
  if (existingIndex >= 0) {
    // Update existing post
    post = {
      ...posts[existingIndex],
      ...partialPost,
      updated_at: now
    };
    posts[existingIndex] = post;
  } else {
    // Create new post
    const newId = partialPost.id === 'new' ? generateId() : partialPost.id;
    post = {
      id: newId,
      title: partialPost.title || '',
      content: partialPost.content || '',
      slug: partialPost.slug || '',
      status: 'draft',
      created_at: now,
      updated_at: now,
      author: 'Admin',
      tag_ids: [],
      ...partialPost
    };
    posts.push(post);
  }
  
  // Create revision snapshot
  const revision: Revision = {
    id: generateId(),
    post_id: post.id,
    content: post.content,
    title: post.title,
    created_at: now,
    author: post.author
  };
  revisions.push(revision);
  
  return post;
}

export async function publishNow(id: string): Promise<Post> {
  await delay();
  
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post not found');
  
  post.status = 'published';
  post.published_at = new Date().toISOString();
  post.updated_at = new Date().toISOString();
  
  return post;
}

export async function unpublish(id: string): Promise<Post> {
  await delay();
  
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post not found');
  
  post.status = 'draft';
  post.published_at = undefined;
  post.updated_at = new Date().toISOString();
  
  return post;
}

export async function archive(id: string): Promise<Post> {
  await delay();
  
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post not found');
  
  post.status = 'archived';
  post.updated_at = new Date().toISOString();
  
  return post;
}

export async function listRevisions(postId: string): Promise<Revision[]> {
  await delay();
  
  return revisions
    .filter(r => r.post_id === postId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function restoreRevision(postId: string, revisionId: string): Promise<Post> {
  await delay();
  
  const revision = revisions.find(r => r.id === revisionId && r.post_id === postId);
  if (!revision) throw new Error('Revision not found');
  
  const post = posts.find(p => p.id === postId);
  if (!post) throw new Error('Post not found');
  
  post.title = revision.title;
  post.content = revision.content;
  post.updated_at = new Date().toISOString();
  
  return post;
}

export async function checkSlugUnique(slug: string): Promise<{ available: boolean; message: string }> {
  await delay();
  
  const exists = posts.some(p => p.slug === slug);
  return {
    available: !exists,
    message: exists ? 'Slug already exists' : 'Slug available'
  };
}

export async function listCategories(): Promise<Category[]> {
  await delay();
  return [...categories];
}

export async function listTags(): Promise<Tag[]> {
  await delay();
  return [...tags];
}

export async function listAssets(): Promise<Asset[]> {
  await delay();
  return [...assets];
}

export async function deleteAsset(id: string): Promise<void> {
  await delay();
  const index = assets.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Asset not found');
  assets.splice(index, 1);
}

export async function deleteAssets(ids: string[]): Promise<void> {
  await delay();
  ids.forEach(id => {
    const index = assets.findIndex(a => a.id === id);
    if (index !== -1) {
      assets.splice(index, 1);
    }
  });
}

export async function updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
  await delay();
  const asset = assets.find(a => a.id === id);
  if (!asset) throw new Error('Asset not found');
  
  Object.assign(asset, updates);
  return asset;
}

// Auto-generate alt text from filename
export function generateAltText(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .trim();
}

export async function pickFeaturedImage(): Promise<Asset> {
  await delay();
  
  // Return a random asset from our real asset list
  return assets[Math.floor(Math.random() * assets.length)];
}
