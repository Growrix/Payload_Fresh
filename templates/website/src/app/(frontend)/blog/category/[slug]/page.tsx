import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getCachedCategoryBySlug } from '@/lib/api/categories'
import { PostCard } from '@/components/PostCard'
import { CategoryBreadcrumbs } from '@/components/CategoryBreadcrumbs'
import { CategoryHeader } from '@/components/CategoryHeader'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const category = await getCachedCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <CategoryBreadcrumbs category={category} />

      {/* Category Header */}
      <CategoryHeader category={category} />

      {/* Posts Grid */}
      <div className="mt-8">
        {category.posts && category.posts.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {category.postCount} {category.postCount === 1 ? 'Post' : 'Posts'} in "
                {category.title}"
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no published posts in this category yet. Check back later for new content!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Browse All Posts
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Related Categories */}
      {category.parent && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            More in{' '}
            {typeof category.parent === 'object' ? category.parent.title : 'Parent Category'}
          </h3>
          <Link
            href={`/blog/category/${typeof category.parent === 'object' ? category.parent.slug : '#'}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            View all posts in{' '}
            {typeof category.parent === 'object' ? category.parent.title : 'parent category'} →
          </Link>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const category = await getCachedCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }

  const title = category.seo?.metaTitle || `${category.title} - Blog Category`
  const description =
    category.seo?.metaDescription ||
    category.description ||
    `Explore ${category.postCount} posts in the ${category.title} category.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/blog/category/${category.slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}
