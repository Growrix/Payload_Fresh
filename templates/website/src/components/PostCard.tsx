import Link from 'next/link'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { CategoryBadgeList } from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  showCategories?: boolean
  showTags?: boolean
  className?: string
}

export function PostCard({
  post,
  showCategories = true,
  showTags = true,
  className = '',
}: PostCardProps) {
  const { slug, categories, tags, meta, title, createdAt } = post
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const hasTags = tags && Array.isArray(tags) && tags.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/blog/${slug}`

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article
      className={`group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Featured Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        {metaImage && typeof metaImage !== 'string' ? (
          <Link href={href} className="block">
            <Media
              resource={metaImage}
              size="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories and Tags */}
        <div className="mb-3 space-y-2">
          {showCategories && hasCategories && (
            <CategoryBadgeList
              categories={categories.filter(
                (cat): cat is NonNullable<typeof cat> => typeof cat === 'object' && cat !== null,
              )}
              maxVisible={2}
              size="small"
              variant="solid"
            />
          )}

          {showTags && hasTags && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={typeof tag === 'string' ? tag : tag.id || index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                >
                  {typeof tag === 'string' ? tag : tag.name}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        {title && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link href={href}>{title}</Link>
          </h3>
        )}

        {/* Description */}
        {sanitizedDescription && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {sanitizedDescription}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>

          <Link
            href={href}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
