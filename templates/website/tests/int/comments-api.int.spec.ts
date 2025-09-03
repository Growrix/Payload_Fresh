import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPayload } from 'payload'
import {
  getCommentsByPostId,
  getCommentThreads,
  createComment,
  updateCommentStatus,
  getCommentCount,
  getRecentComments,
  deleteComment,
  type CreateCommentData,
  type CommentWithReplies,
} from '@/lib/api/comments'
import type { Comment } from '@/payload-types'

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
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  count: vi.fn(),
}

describe('Comments API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayload as any).mockResolvedValue(mockPayload)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getCommentsByPostId', () => {
    it('should fetch approved comments for a post', async () => {
      const mockComments: Comment[] = [
        {
          id: '1',
          post: 'post-1',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Great post!', version: 1 }],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          author: {
            name: 'John Doe',
            email: 'john@example.com',
          },
          status: 'approved',
          parentComment: null,
          metadata: null,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ]

      mockPayload.find.mockResolvedValueOnce({
        docs: mockComments,
        totalDocs: 1,
        limit: 1000,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getCommentsByPostId('post-1')

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'comments',
        where: {
          and: [
            {
              post: {
                equals: 'post-1',
              },
            },
            {
              status: {
                equals: 'approved',
              },
            },
          ],
        },
        sort: 'createdAt',
        limit: 1000,
      })

      expect(result).toEqual(mockComments)
    })

    it('should return empty array when no comments exist', async () => {
      mockPayload.find.mockResolvedValueOnce({
        docs: [],
        totalDocs: 0,
        limit: 1000,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getCommentsByPostId('post-2')
      expect(result).toEqual([])
    })
  })

  describe('getCommentThreads', () => {
    it('should organize comments into threaded structure', async () => {
      const mockComments: Comment[] = [
        {
          id: '1',
          post: 'post-1',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Parent comment', version: 1 }],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          author: { name: 'John', email: 'john@example.com' },
          status: 'approved',
          parentComment: null,
          metadata: null,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
        {
          id: '2',
          post: 'post-1',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Reply comment', version: 1 }],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          author: { name: 'Jane', email: 'jane@example.com' },
          status: 'approved',
          parentComment: '1',
          metadata: null,
          createdAt: '2025-01-01T01:00:00Z',
          updatedAt: '2025-01-01T01:00:00Z',
        },
      ]

      mockPayload.find.mockResolvedValueOnce({
        docs: mockComments,
        totalDocs: 2,
        limit: 1000,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      })

      const result = await getCommentThreads('post-1')

      expect(result).toHaveLength(1) // One top-level comment
      expect(result[0].id).toBe('1')
      expect(result[0].replies).toHaveLength(1) // One reply
      expect(result[0].replies![0].id).toBe('2')
      expect(result[0].replyCount).toBe(1)
    })
  })

  describe('createComment', () => {
    it('should create a new comment successfully', async () => {
      const commentData: CreateCommentData = {
        postId: 'post-1',
        content: 'This is a new comment',
        authorName: 'Test User',
        authorEmail: 'test@example.com',
        authorWebsite: 'https://example.com',
      }

      const mockCreatedComment: Comment = {
        id: 'new-comment-id',
        post: 'post-1',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'This is a new comment',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        author: {
          name: 'Test User',
          email: 'test@example.com',
          website: 'https://example.com',
        },
        status: 'pending',
        parentComment: null,
        metadata: null,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      }

      mockPayload.create.mockResolvedValueOnce(mockCreatedComment)

      const result = await createComment(commentData)

      expect(mockPayload.create).toHaveBeenCalledWith({
        collection: 'comments',
        data: {
          post: 'post-1',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'This is a new comment',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          author: {
            name: 'Test User',
            email: 'test@example.com',
            website: 'https://example.com',
            user: undefined,
          },
          status: 'pending',
          parentComment: undefined,
        },
      })

      expect(result).toEqual(mockCreatedComment)
    })

    it('should create a reply comment with parent', async () => {
      const replyData: CreateCommentData = {
        postId: 'post-1',
        content: 'This is a reply',
        authorName: 'Reply User',
        authorEmail: 'reply@example.com',
        parentCommentId: 'parent-comment-id',
      }

      const mockReplyComment: Comment = {
        id: 'reply-comment-id',
        post: 'post-1',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'This is a reply',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        author: {
          name: 'Reply User',
          email: 'reply@example.com',
        },
        status: 'pending',
        parentComment: 'parent-comment-id',
        metadata: null,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      }

      mockPayload.create.mockResolvedValueOnce(mockReplyComment)

      const result = await createComment(replyData)

      expect(mockPayload.create).toHaveBeenCalledWith({
        collection: 'comments',
        data: expect.objectContaining({
          parentComment: 'parent-comment-id',
        }),
      })

      expect(result.parentComment).toBe('parent-comment-id')
    })
  })

  describe('updateCommentStatus', () => {
    it('should update comment status successfully', async () => {
      const mockUpdatedComment: Comment = {
        id: 'comment-id',
        post: 'post-1',
        content: {
          root: {
            type: 'root',
            children: [],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        author: { name: 'User', email: 'user@example.com' },
        status: 'approved',
        parentComment: null,
        metadata: null,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      }

      mockPayload.update.mockResolvedValueOnce(mockUpdatedComment)

      const result = await updateCommentStatus('comment-id', 'approved')

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'comments',
        id: 'comment-id',
        data: {
          status: 'approved',
        },
      })

      expect(result.status).toBe('approved')
    })
  })

  describe('getCommentCount', () => {
    it('should return correct count of approved comments', async () => {
      mockPayload.count.mockResolvedValueOnce({
        totalDocs: 5,
      })

      const result = await getCommentCount('post-1')

      expect(mockPayload.count).toHaveBeenCalledWith({
        collection: 'comments',
        where: {
          and: [
            {
              post: {
                equals: 'post-1',
              },
            },
            {
              status: {
                equals: 'approved',
              },
            },
          ],
        },
      })

      expect(result).toBe(5)
    })

    it('should return 0 when no comments exist', async () => {
      mockPayload.count.mockResolvedValueOnce({
        totalDocs: 0,
      })

      const result = await getCommentCount('post-2')
      expect(result).toBe(0)
    })
  })

  describe('getRecentComments', () => {
    it('should fetch recent comments with default limit', async () => {
      const mockComments: Comment[] = [
        {
          id: '1',
          post: 'post-1',
          content: {
            root: {
              type: 'root',
              children: [],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          author: { name: 'User 1', email: 'user1@example.com' },
          status: 'approved',
          parentComment: null,
          metadata: null,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z',
        },
      ]

      mockPayload.find.mockResolvedValueOnce({
        docs: mockComments,
        totalDocs: 1,
      })

      const result = await getRecentComments()

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'comments',
        sort: '-createdAt',
        limit: 10,
        depth: 2,
      })

      expect(result).toEqual(mockComments)
    })

    it('should respect custom limit parameter', async () => {
      mockPayload.find.mockResolvedValueOnce({
        docs: [],
        totalDocs: 0,
      })

      await getRecentComments(5)

      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'comments',
        sort: '-createdAt',
        limit: 5,
        depth: 2,
      })
    })
  })

  describe('deleteComment', () => {
    it('should delete comment successfully', async () => {
      mockPayload.delete.mockResolvedValueOnce({ id: 'comment-id' })

      await deleteComment('comment-id')

      expect(mockPayload.delete).toHaveBeenCalledWith({
        collection: 'comments',
        id: 'comment-id',
      })
    })
  })
})
