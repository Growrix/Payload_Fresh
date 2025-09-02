import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

// Type definitions matching our Posts collection
export interface PayloadPost {
  id: string
  title: string
  slug: string
  content: any // Lexical rich text content
  excerpt?: string
  heroImage?: {
    id: string
    url: string
    alt?: string
    width: number
    height: number
  }
  authors: Array<{
    id: string
    name: string
    email: string
  }>
  categories: Array<{
    id: string
    title: string
    slug: string
  }>
  publishedAt?: string
  createdAt: string
  updatedAt: string
  _status: 'draft' | 'published'
  meta?: {
    title?: string
    description?: string
    image?: {
      id: string
      url: string
      alt?: string
    }
  }
}

// Get Payload instance
async function getPayloadInstance() {
  return await getPayload({ config })
}

// Fetch featured posts (published only)
export const getFeaturedPosts = unstable_cache(
  async (): Promise<PayloadPost[]> => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 3,
      depth: 2,
    })

    return result.docs as PayloadPost[]
  },
  ['featured-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts', 'featured-posts'],
  },
)

// Fetch recent posts (published only)
export const getRecentPosts = unstable_cache(
  async (limit: number = 6): Promise<PayloadPost[]> => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit,
      depth: 2,
    })

    return result.docs as PayloadPost[]
  },
  ['recent-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts', 'recent-posts'],
  },
)

// Fetch all published posts with pagination
export const getAllPosts = unstable_cache(
  async (
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    docs: PayloadPost[]
    totalDocs: number
    totalPages: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
  }> => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
      page,
      limit,
      depth: 2,
    })

    return {
      docs: result.docs as PayloadPost[],
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page || 1,
      hasPrevPage: result.hasPrevPage || false,
      hasNextPage: result.hasNextPage || false,
    }
  },
  ['all-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts', 'all-posts'],
  },
)

// Fetch single post by slug
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<PayloadPost | null> => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        _status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    })

    return (result.docs[0] as PayloadPost) || null
  },
  ['post-by-slug'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts', 'post-detail'],
  },
)

// Search posts
export const searchPosts = async (query: string, limit: number = 10): Promise<PayloadPost[]> => {
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { _status: { equals: 'published' } },
        {
          or: [{ title: { like: query } }, { excerpt: { like: query } }],
        },
      ],
    },
    sort: '-publishedAt',
    limit,
    depth: 2,
  })

  return result.docs as PayloadPost[]
}

// Get posts by category
export const getPostsByCategory = unstable_cache(
  async (categorySlug: string, limit: number = 10): Promise<PayloadPost[]> => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { 'categories.slug': { equals: categorySlug } },
        ],
      },
      sort: '-publishedAt',
      limit,
      depth: 2,
    })

    return result.docs as PayloadPost[]
  },
  ['posts-by-category'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts', 'posts-by-category'],
  },
)

// Get categories
export const getCategories = unstable_cache(
  async (): Promise<
    Array<{
      id: string
      title: string
      slug: string
    }>
  > => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'categories',
      sort: 'title',
      limit: 100,
    })

    return result.docs as Array<{
      id: string
      title: string
      slug: string
    }>
  },
  ['categories'],
  {
    revalidate: 3600, // 1 hour
    tags: ['categories'],
  },
)

// Utility function to calculate reading time
export function calculateReadingTime(content: any): number {
  // This is a simplified calculation
  // In a real implementation, you'd parse the Lexical content properly
  const text = JSON.stringify(content)
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Convert Payload post to format expected by frontend
export function transformPayloadPost(post: PayloadPost): {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any
  featuredImage?: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  categories: string[]
  tags: string[]
  readingTime: number
  status: 'published' | 'draft'
} {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || post.meta?.description || '',
    content: post.content,
    featuredImage: post.heroImage?.url,
    author: {
      name: post.authors?.[0]?.name || 'Anonymous',
      avatar: undefined, // Add if you have author avatars
      bio: undefined, // Add if you have author bios
    },
    publishedAt: post.publishedAt || post.createdAt,
    categories: post.categories?.map((cat) => cat.title) || [],
    tags: [], // Add if you implement tags
    readingTime: calculateReadingTime(post.content),
    status: post._status,
  }
}
