import type { Post } from '@/payload-types'
import { PostCard } from './PostCard'
import { cn } from '@/lib/utils'

interface PostGridProps {
  posts: Post[]
  className?: string
  showCategories?: boolean
  showTags?: boolean
}

export function PostGrid({
  posts,
  className,
  showCategories = true,
  showTags = true,
}: PostGridProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">There are no published posts to display.</p>
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showCategories={showCategories} showTags={showTags} />
      ))}
    </div>
  )
}
