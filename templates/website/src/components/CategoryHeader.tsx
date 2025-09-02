import type { Category } from '@/payload-types'
import { CategoryIcon } from './CategoryIcon'

interface CategoryHeaderProps {
  category: Category & { postCount: number }
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="text-center py-8">
      {/* Category Icon */}
      {category.icon && (
        <div className="mb-4">
          <CategoryIcon icon={category.icon} color={category.color} size="large" />
        </div>
      )}

      {/* Category Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{category.title}</h1>

      {/* Category Description */}
      {category.description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          {category.description}
        </p>
      )}

      {/* Post Count */}
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span>
          {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
        </span>

        {category.color && (
          <span className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full bg-${category.color}-500`}
              aria-label={`Category color: ${category.color}`}
            />
            <span className="capitalize">{category.color}</span>
          </span>
        )}
      </div>

      {/* Parent Category Info */}
      {category.parent && typeof category.parent === 'object' && (
        <div className="mt-4 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Part of: </span>
          <a
            href={`/blog/category/${category.parent.slug}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
          >
            {category.parent.title}
          </a>
        </div>
      )}
    </div>
  )
}
