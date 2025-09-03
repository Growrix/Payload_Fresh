import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Comment } from '@/payload-types'

export interface CreateCommentData {
  postId: string
  content: string
  authorName: string
  authorEmail: string
  authorWebsite?: string
  parentCommentId?: string
  userId?: string
}

export interface CommentWithReplies extends Comment {
  replies?: CommentWithReplies[]
  replyCount?: number
}

// Get comments for a specific post
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'comments',
    where: {
      and: [
        {
          post: {
            equals: postId,
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

  return result.docs
}

// Get comment threads (hierarchical structure)
export async function getCommentThreads(postId: string): Promise<CommentWithReplies[]> {
  const comments = await getCommentsByPostId(postId)

  // Separate top-level comments and replies
  const topLevelComments = comments.filter((comment) => !comment.parentComment)
  const replies = comments.filter((comment) => comment.parentComment)

  // Build hierarchical structure
  const buildReplies = (parentId: string): CommentWithReplies[] => {
    return replies
      .filter((reply) => {
        const parent =
          typeof reply.parentComment === 'string' ? reply.parentComment : reply.parentComment?.id
        return parent === parentId
      })
      .map((reply) => ({
        ...reply,
        replies: buildReplies(reply.id),
        replyCount: replies.filter((r) => {
          const parent = typeof r.parentComment === 'string' ? r.parentComment : r.parentComment?.id
          return parent === reply.id
        }).length,
      }))
  }

  return topLevelComments.map((comment) => ({
    ...comment,
    replies: buildReplies(comment.id),
    replyCount: replies.filter((reply) => {
      const parent =
        typeof reply.parentComment === 'string' ? reply.parentComment : reply.parentComment?.id
      return parent === comment.id
    }).length,
  }))
}

// Create a new comment
export async function createComment(data: CreateCommentData): Promise<Comment> {
  const payload = await getPayload({ config: configPromise })

  const commentData: any = {
    post: data.postId,
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: data.content,
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
      name: data.authorName,
      email: data.authorEmail,
      website: data.authorWebsite || undefined,
      user: data.userId || undefined,
    },
    status: 'pending', // Default to pending for moderation
    parentComment: data.parentCommentId || undefined,
  }

  const result = await payload.create({
    collection: 'comments',
    data: commentData,
  })

  return result
}

// Update comment status (for moderation)
export async function updateCommentStatus(
  commentId: string,
  status: 'pending' | 'approved' | 'spam' | 'trash',
): Promise<Comment> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.update({
    collection: 'comments',
    id: commentId,
    data: {
      status,
    },
  })

  return result
}

// Get comment count for a post
export async function getCommentCount(postId: string): Promise<number> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.count({
    collection: 'comments',
    where: {
      and: [
        {
          post: {
            equals: postId,
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

  return result.totalDocs
}

// Get recent comments (for admin)
export async function getRecentComments(limit: number = 10): Promise<Comment[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'comments',
    sort: '-createdAt',
    limit,
    depth: 2, // Include post and user data
  })

  return result.docs
}

// Delete a comment
export async function deleteComment(commentId: string): Promise<void> {
  const payload = await getPayload({ config: configPromise })

  await payload.delete({
    collection: 'comments',
    id: commentId,
  })
}

// Cached versions for performance
export const getCachedCommentsByPostId = unstable_cache(
  async (postId: string) => getCommentsByPostId(postId),
  ['comments-by-post'],
  {
    tags: [`comments-post-${String}`],
    revalidate: 300, // 5 minutes
  },
)

export const getCachedCommentThreads = unstable_cache(
  async (postId: string) => getCommentThreads(postId),
  ['comment-threads'],
  {
    tags: [`comment-threads-${String}`],
    revalidate: 300,
  },
)

export const getCachedCommentCount = unstable_cache(
  async (postId: string) => getCommentCount(postId),
  ['comment-count'],
  {
    tags: [`comment-count-${String}`],
    revalidate: 300,
  },
)
