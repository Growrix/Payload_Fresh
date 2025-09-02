import Link from 'next/link'
import type { Tag } from '@/payload-types'
import { TagBadge } from './TagBadge'
import { cn } from '@/lib/utils'

interface TagCloudProps {
  tags: (Tag & { postCount: number })[]
  maxTags?: number
  className?: string
  showCounts?: boolean
  variant?: 'default' | 'outline'
}

export function TagCloud({
  tags,
  maxTags = 20,
  className,
  showCounts = false,
  variant = 'default',
}: TagCloudProps) {
  if (!tags.length) {
    return <div className={cn('text-center py-8 text-gray-500', className)}>No tags available</div>
  }

  // Sort by post count and limit
  const sortedTags = tags
    .filter((tag) => tag.postCount > 0)
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, maxTags)

  // Calculate font sizes based on post count
  const maxCount = Math.max(...sortedTags.map((tag) => tag.postCount))
  const minCount = Math.min(...sortedTags.map((tag) => tag.postCount))

  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 'text-sm'

    const ratio = (count - minCount) / (maxCount - minCount)

    if (ratio > 0.8) return 'text-lg'
    if (ratio > 0.6) return 'text-base'
    if (ratio > 0.4) return 'text-sm'
    return 'text-xs'
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {sortedTags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog/tag/${tag.slug}`}
          className={cn(
            'inline-block transition-transform hover:scale-105',
            getFontSize(tag.postCount),
          )}
        >
          <TagBadge
            tag={tag}
            variant={variant}
            size={getFontSize(tag.postCount) === 'text-lg' ? 'md' : 'sm'}
          />
          {showCounts && <span className="ml-1 text-xs text-gray-500">({tag.postCount})</span>}
        </Link>
      ))}
    </div>
  )
}

// Specialized variants
export function PopularTagsCloud({
  tags,
  ...props
}: Omit<TagCloudProps, 'tags'> & { tags: (Tag & { postCount: number })[] }) {
  return (
    <TagCloud
      tags={tags.filter((tag) => tag.postCount >= 3)} // Only show tags with 3+ posts
      maxTags={15}
      showCounts
      {...props}
    />
  )
}

export function FeaturedTagsCloud({
  tags,
  ...props
}: Omit<TagCloudProps, 'tags'> & { tags: (Tag & { postCount: number })[] }) {
  const featuredTags = tags.filter((tag) => tag.featured)

  return <TagCloud tags={featuredTags} maxTags={10} variant="outline" {...props} />
}
