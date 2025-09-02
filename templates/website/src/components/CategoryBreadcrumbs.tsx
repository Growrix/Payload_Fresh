import Link from 'next/link'
import type { Category } from '@/payload-types'

interface CategoryBreadcrumbsProps {
  category: Category
}

export function CategoryBreadcrumbs({ category }: CategoryBreadcrumbsProps) {
  const breadcrumbs = []

  // Build breadcrumb path
  let currentCategory = category
  while (currentCategory) {
    breadcrumbs.unshift(currentCategory)
    currentCategory = typeof currentCategory.parent === 'object' ? currentCategory.parent : null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/blog" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
        Blog
      </Link>
      <span>/</span>

      {breadcrumbs.map((cat, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          <div key={cat.id} className="flex items-center space-x-2">
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium">{cat.title}</span>
            ) : (
              <>
                <Link
                  href={`/blog/category/${cat.slug}`}
                  className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  {cat.title}
                </Link>
                <span>/</span>
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}
