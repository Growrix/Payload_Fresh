import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPayload } from 'payload'
import {
  getFeaturedPosts,
  getRecentPosts,
  getAllPosts,
  getPostBySlug,
  searchPosts,
  getCategories,
  transformPayloadPost,
  calculateReadingTime,
} from '@/lib/payload/posts-api'

// Mock Next.js unstable_cache
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fn) => fn),
}))

// Mock Payload
vi.mock('payload', () => ({
  getPayload: vi.fn(),
  buildConfig: vi.fn(() => ({})),
  lexicalEditor: vi.fn(() => ({})),
  checkDependencies: vi.fn(),
}))

const mockPayload = {
  find: vi.fn(),
  findByID: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}

const mockConfig = {}

describe('Blog API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayload as any).mockResolvedValue(mockPayload)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getFeaturedPosts', () => {
    it('should fetch featured posts successfully', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Test Post 1',
          slug: 'test-post-1',
          excerpt: 'Test excerpt',
          content: { root: { children: [] } },
          featuredImage: {
            id: 'img1',
            url: '/test.jpg',
            alt: 'Test image',
            width: 800,
            height: 600,
          },
          authors: [{ name: 'Test Author' }],
          categories: [{ title: 'Test Category' }],
          publishedAt: '2025-01-01T00:00:00Z',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
          _status: 'published' as const,
        },
      ]

      mockPayload.find.mockResolvedValue({
        docs: mockPosts,
        totalDocs: 1,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getFeaturedPosts()

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 3,
        depth: 2,
      })
      expect(result).toEqual(mockPosts)
    })

    it('should handle empty results', async () => {
      mockPayload.find.mockResolvedValue({
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getFeaturedPosts()
      expect(result).toEqual([])
    })
  })

  describe('getRecentPosts', () => {
    it('should fetch recent posts with custom limit', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Recent Post',
          slug: 'recent-post',
          excerpt: 'Recent excerpt',
          content: { root: { children: [] } },
          authors: [{ name: 'Author' }],
          categories: [{ title: 'Category' }],
          publishedAt: '2025-01-01T00:00:00Z',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
          _status: 'published' as const,
        },
      ]

      mockPayload.find.mockResolvedValue({
        docs: mockPosts,
        totalDocs: 1,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getRecentPosts(5)

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 5,
        depth: 2,
      })
      expect(result).toEqual(mockPosts)
    })

    it('should use default limit of 6', async () => {
      mockPayload.find.mockResolvedValue({
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      await getRecentPosts()

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 6,
        depth: 2,
      })
    })
  })

  describe('getAllPosts', () => {
    it('should fetch all posts with pagination', async () => {
      const mockResult = {
        docs: [],
        totalDocs: 10,
        totalPages: 2,
        page: 1,
        hasPrevPage: false,
        hasNextPage: true,
      }

      mockPayload.find.mockResolvedValue(mockResult)

      const result = await getAllPosts(1, 5)

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        page: 1,
        limit: 5,
        depth: 2,
      })
      expect(result).toEqual(mockResult)
    })

    it('should use default values', async () => {
      const mockResult = {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      }

      mockPayload.find.mockResolvedValue(mockResult)

      await getAllPosts()

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        page: 1,
        limit: 10,
        depth: 2,
      })
    })
  })

  describe('getPostBySlug', () => {
    it('should fetch post by slug', async () => {
      const mockPost = {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: { root: { children: [] } },
        authors: [{ name: 'Author' }],
        categories: [{ title: 'Category' }],
        publishedAt: '2025-01-01T00:00:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        _status: 'published' as const,
      }

      mockPayload.find.mockResolvedValue({
        docs: [mockPost],
        totalDocs: 1,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getPostBySlug('test-post')

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: {
          slug: { equals: 'test-post' },
          _status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
      })
      expect(result).toEqual(mockPost)
    })

    it('should return null for non-existent post', async () => {
      mockPayload.find.mockResolvedValue({
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getPostBySlug('non-existent')
      expect(result).toBeNull()
    })
  })

  describe('searchPosts', () => {
    it('should search posts by query', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Search Result',
          slug: 'search-result',
          excerpt: 'Search excerpt',
          content: { root: { children: [] } },
          authors: [{ name: 'Author' }],
          categories: [{ title: 'Category' }],
          publishedAt: '2025-01-01T00:00:00Z',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
          _status: 'published' as const,
        },
      ]

      mockPayload.find.mockResolvedValue({
        docs: mockPosts,
        totalDocs: 1,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await searchPosts('test query', 5)

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'posts',
        where: {
          and: [
            { _status: { equals: 'published' } },
            {
              or: [{ title: { like: 'test query' } }, { excerpt: { like: 'test query' } }],
            },
          ],
        },
        sort: '-publishedAt',
        limit: 5,
        depth: 2,
      })
      expect(result).toEqual(mockPosts)
    })
  })

  describe('getCategories', () => {
    it('should fetch categories', async () => {
      const mockCategories = [
        { id: '1', title: 'Tech', slug: 'tech' },
        { id: '2', title: 'Design', slug: 'design' },
      ]

      mockPayload.find.mockResolvedValue({
        docs: mockCategories,
        totalDocs: 2,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getCategories()

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'categories',
        sort: 'title',
        limit: 100,
      })
      expect(result).toEqual(mockCategories)
    })
  })

  describe('transformPayloadPost', () => {
    it('should transform Payload post to frontend format', () => {
      const payloadPost = {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: { root: { children: [] } },
        heroImage: {
          id: 'img1',
          url: '/test.jpg',
          alt: 'Test image',
          width: 800,
          height: 600,
        },
        authors: [{ id: 'auth1', name: 'Test Author', email: 'test@example.com' }],
        categories: [{ id: 'cat1', title: 'Test Category', slug: 'test-category' }],
        tags: [],
        publishedAt: '2025-01-01T00:00:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        _status: 'published' as const,
        allowComments: true,
      }

      const result = transformPayloadPost(payloadPost)

      expect(result).toEqual({
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: { root: { children: [] } },
        featuredImage: '/test.jpg',
        author: {
          name: 'Test Author',
          avatar: undefined,
          bio: undefined,
        },
        publishedAt: '2025-01-01T00:00:00Z',
        categories: ['Test Category'],
        tags: [],
        readingTime: expect.any(Number),
        status: 'published',
        allowComments: true,
      })
    })

    it('should handle missing data gracefully', () => {
      const payloadPost = {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: '',
        content: { root: { children: [] } },
        authors: [],
        categories: [],
        tags: [],
        publishedAt: '2025-01-01T00:00:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        _status: 'published' as const,
      }

      const result = transformPayloadPost(payloadPost)

      expect(result.author.name).toBe('Anonymous')
      expect(result.categories).toEqual([])
      expect(result.publishedAt).toBe('2025-01-01T00:00:00Z')
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time correctly', () => {
      const content = { text: 'This is a test content with some words to read.' }
      const readingTime = calculateReadingTime(content)

      // Assuming 200 words per minute, and the content has about 10 words
      expect(readingTime).toBeGreaterThan(0)
      expect(typeof readingTime).toBe('number')
    })

    it('should handle empty content', () => {
      const readingTime = calculateReadingTime({})
      expect(readingTime).toBe(1) // Minimum 1 minute
    })
  })
})
