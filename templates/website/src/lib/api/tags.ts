import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'

import type { Tag, Post } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type TagWithPostCount = Tag & {
  postCount: number
  posts?: Post[]
}

async function getPayloadInstance() {
  return await getPayload({ config: configPromise })
}

export async function getAllTags(): Promise<TagWithPostCount[]> {
  const payload = await getPayloadInstance()

  const { docs: tags } = await payload.find({
    collection: 'tags',
    sort: 'name',
    depth: 1,
  })

  // Calculate post count for each tag
  const tagsWithCount = await Promise.all(
    tags.map(async (tag) => {
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          tags: {
            equals: tag.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0, // Only get count
      })

      return {
        ...tag,
        postCount: totalDocs,
      }
    }),
  )

  return tagsWithCount
}

export async function getTagBySlug(slug: string): Promise<TagWithPostCount | null> {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'tags',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })

  if (!docs.length) return null

  const tag = docs[0]

  // Get posts for this tag
  const { docs: posts, totalDocs } = await payload.find({
    collection: 'posts',
    where: {
      tags: {
        equals: tag.id,
      },
      _status: {
        equals: 'published',
      },
    },
    sort: '-createdAt',
    depth: 1,
  })

  return {
    ...tag,
    postCount: totalDocs,
    posts,
  }
}

export async function getFeaturedTags(): Promise<TagWithPostCount[]> {
  const payload = await getPayloadInstance()

  const { docs: tags } = await payload.find({
    collection: 'tags',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'name',
    depth: 1,
  })

  // Calculate post count for each featured tag
  const tagsWithCount = await Promise.all(
    tags.map(async (tag) => {
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          tags: {
            equals: tag.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0,
      })

      return {
        ...tag,
        postCount: totalDocs,
      }
    }),
  )

  return tagsWithCount
}

export async function getPopularTags(limit: number = 20): Promise<TagWithPostCount[]> {
  const payload = await getPayloadInstance()

  const { docs: tags } = await payload.find({
    collection: 'tags',
    sort: 'name',
    depth: 1,
  })

  // Calculate post count for each tag and sort by popularity
  const tagsWithCount = await Promise.all(
    tags.map(async (tag) => {
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          tags: {
            equals: tag.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0,
      })

      return {
        ...tag,
        postCount: totalDocs,
      }
    }),
  )

  // Sort by post count (most popular first) and limit results
  return tagsWithCount
    .filter((tag) => tag.postCount > 0) // Only tags with posts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, limit)
}

export async function getRelatedTags(postId: string): Promise<TagWithPostCount[]> {
  const payload = await getPayloadInstance()

  // Get the current post with its tags
  const { docs: currentPost } = await payload.find({
    collection: 'posts',
    where: {
      id: {
        equals: postId,
      },
    },
    depth: 1,
    limit: 1,
  })

  if (!currentPost.length || !currentPost[0].tags) return []

  const currentTags = Array.isArray(currentPost[0].tags)
    ? currentPost[0].tags.map((tag) => (typeof tag === 'object' ? tag.id : tag))
    : []

  if (!currentTags.length) return []

  // Get all tags that are used with any of the current post's tags
  const { docs: relatedPosts } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          tags: {
            in: currentTags,
          },
        },
        {
          id: {
            not_equals: postId,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    depth: 1,
  })

  // Collect all tags from related posts
  const relatedTagIds = new Set<string>()
  relatedPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (typeof tag === 'object' && tag.id && !currentTags.includes(tag.id)) {
          relatedTagIds.add(tag.id)
        }
      })
    }
  })

  if (!relatedTagIds.size) return []

  // Get tag details with post counts
  const relatedTags = await Promise.all(
    Array.from(relatedTagIds).map(async (tagId) => {
      const { docs } = await payload.find({
        collection: 'tags',
        where: {
          id: {
            equals: tagId,
          },
        },
        limit: 1,
      })

      if (!docs.length) return null

      const tag = docs[0]
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          tags: {
            equals: tag.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0,
      })

      return {
        ...tag,
        postCount: totalDocs,
      }
    }),
  )

  return relatedTags
    .filter((tag): tag is TagWithPostCount => tag !== null)
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 10) // Limit to 10 related tags
}

// Cached versions for better performance
export const getCachedTags = unstable_cache(getAllTags, ['tags-all'], { tags: ['tags'] })

export const getCachedTagBySlug = unstable_cache(getTagBySlug, ['tag-by-slug'], {
  tags: ['tags', 'posts'],
})

export const getCachedFeaturedTags = unstable_cache(getFeaturedTags, ['tags-featured'], {
  tags: ['tags'],
})

export const getCachedPopularTags = unstable_cache(getPopularTags, ['tags-popular'], {
  tags: ['tags', 'posts'],
})
