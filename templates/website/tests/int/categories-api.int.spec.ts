import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getAllCategories, getCategoryBySlug, getFeaturedCategories } from '@/lib/api/categories'

// Mock data for testing
const mockCategories = [
  {
    id: '1',
    title: 'Technology',
    slug: 'technology',
    description: 'Latest in tech and innovation',
    icon: 'tech',
    color: 'blue',
    featured: true,
    seo: {
      metaTitle: 'Technology Articles',
      metaDescription: 'Read the latest technology articles and tutorials',
    },
  },
  {
    id: '2',
    title: 'Design',
    slug: 'design',
    description: 'UI/UX and graphic design insights',
    icon: 'design',
    color: 'purple',
    featured: false,
    parent: null,
  },
]

describe('Categories API Functions', () => {
  describe('getAllCategories', () => {
    it('should return all categories with post counts', async () => {
      const categories = await getAllCategories()

      expect(Array.isArray(categories)).toBe(true)
      // Each category should have postCount property
      categories.forEach((category) => {
        expect(category).toHaveProperty('postCount')
        expect(typeof category.postCount).toBe('number')
        expect(category.postCount).toBeGreaterThanOrEqual(0)
      })
    })

    it('should return categories sorted by title', async () => {
      const categories = await getAllCategories()

      if (categories.length > 1) {
        const titles = categories.map((cat) => cat.title)
        const sortedTitles = [...titles].sort()
        expect(titles).toEqual(sortedTitles)
      }
    })
  })

  describe('getCategoryBySlug', () => {
    it('should return null for non-existent category', async () => {
      const category = await getCategoryBySlug('non-existent-slug')
      expect(category).toBeNull()
    })

    it('should return category with posts when found', async () => {
      // First get all categories to find a valid slug
      const categories = await getAllCategories()

      if (categories.length > 0) {
        const firstCategory = categories[0]
        if (firstCategory.slug) {
          const category = await getCategoryBySlug(firstCategory.slug)

          expect(category).not.toBeNull()
          expect(category?.slug).toBe(firstCategory.slug)
          expect(category).toHaveProperty('postCount')
          expect(category).toHaveProperty('posts')
          expect(Array.isArray(category?.posts)).toBe(true)
        }
      }
    })
  })

  describe('getFeaturedCategories', () => {
    it('should return only featured categories', async () => {
      const featuredCategories = await getFeaturedCategories()

      expect(Array.isArray(featuredCategories)).toBe(true)
      featuredCategories.forEach((category) => {
        expect(category).toHaveProperty('postCount')
        // Note: featured property should be true but may not be in type
        if ('featured' in category) {
          expect((category as any).featured).toBe(true)
        }
      })
    })
  })

  describe('Category data structure', () => {
    it('should have enhanced fields in categories', async () => {
      const categories = await getAllCategories()

      categories.forEach((category) => {
        // Basic fields
        expect(category).toHaveProperty('title')
        expect(category).toHaveProperty('slug')

        // Enhanced fields (can be optional)
        expect(category).toHaveProperty('description')
        expect(category).toHaveProperty('icon')
        expect(category).toHaveProperty('color')
        expect(category).toHaveProperty('featured')
        expect(category).toHaveProperty('seo')

        // Computed field
        expect(category).toHaveProperty('postCount')
        expect(typeof category.postCount).toBe('number')
      })
    })

    it('should handle parent-child relationships', async () => {
      const categories = await getAllCategories()

      categories.forEach((category) => {
        if (category.parent) {
          // Parent can be either an ID string or a populated object
          expect(typeof category.parent === 'string' || typeof category.parent === 'object').toBe(
            true,
          )
        }
      })
    })
  })
})
