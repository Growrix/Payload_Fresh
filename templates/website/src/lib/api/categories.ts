import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'

import type { Category, Post } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type CategoryWithPostCount = Category & {
  postCount: number
  posts?: Post[]
}

async function getPayloadInstance() {
  return await getPayload({ config: configPromise })
}

export async function getAllCategories(): Promise<CategoryWithPostCount[]> {
  const payload = await getPayloadInstance()

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
    depth: 1,
  })

  // Calculate post count for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          categories: {
            equals: category.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0, // Only get count
      })

      return {
        ...category,
        postCount: totalDocs,
      }
    }),
  )

  return categoriesWithCount
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithPostCount | null> {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })

  if (!docs.length) return null

  const category = docs[0]

  // Get posts for this category
  const { docs: posts, totalDocs } = await payload.find({
    collection: 'posts',
    where: {
      categories: {
        equals: category.id,
      },
      _status: {
        equals: 'published',
      },
    },
    sort: '-createdAt',
    depth: 1,
  })

  return {
    ...category,
    postCount: totalDocs,
    posts,
  }
}

export async function getFeaturedCategories(): Promise<CategoryWithPostCount[]> {
  const payload = await getPayloadInstance()

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'title',
    depth: 1,
  })

  // Calculate post count for each featured category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          categories: {
            equals: category.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0,
      })

      return {
        ...category,
        postCount: totalDocs,
      }
    }),
  )

  return categoriesWithCount
}

export async function getCategoryHierarchy(): Promise<CategoryWithPostCount[]> {
  const payload = await getPayloadInstance()

  // Get all categories with their parent relationships
  const { docs: allCategories } = await payload.find({
    collection: 'categories',
    sort: 'title',
    depth: 2, // Include parent relationship
  })

  // Build hierarchy (root categories with their children)
  const rootCategories = allCategories.filter((cat) => !cat.parent)

  const categoriesWithHierarchy = await Promise.all(
    rootCategories.map(async (category) => {
      const children = allCategories.filter(
        (cat) => cat.parent && typeof cat.parent === 'object' && cat.parent.id === category.id,
      )

      const { totalDocs } = await payload.find({
        collection: 'posts',
        where: {
          categories: {
            equals: category.id,
          },
          _status: {
            equals: 'published',
          },
        },
        limit: 0,
      })

      return {
        ...category,
        postCount: totalDocs,
        children: await Promise.all(
          children.map(async (child) => {
            const { totalDocs: childPostCount } = await payload.find({
              collection: 'posts',
              where: {
                categories: {
                  equals: child.id,
                },
                _status: {
                  equals: 'published',
                },
              },
              limit: 0,
            })

            return {
              ...child,
              postCount: childPostCount,
            }
          }),
        ),
      }
    }),
  )

  return categoriesWithHierarchy
}

// Cached versions for better performance
export const getCachedCategories = unstable_cache(getAllCategories, ['categories-all'], {
  tags: ['categories'],
})

export const getCachedCategoryBySlug = unstable_cache(getCategoryBySlug, ['category-by-slug'], {
  tags: ['categories', 'posts'],
})

export const getCachedFeaturedCategories = unstable_cache(
  getFeaturedCategories,
  ['categories-featured'],
  { tags: ['categories'] },
)

export const getCachedCategoryHierarchy = unstable_cache(
  getCategoryHierarchy,
  ['categories-hierarchy'],
  { tags: ['categories'] },
)
