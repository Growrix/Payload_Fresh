import Link from 'next/link'
import type { Tag } from '@/payload-types'
import { TagBadge } from './TagBadge'
import { cn } from '@/lib/utils'

interface TagBadgeListProps {
  tags: Tag[] | (Tag & { postCount?: number })[]
  className?: string
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showCounts?: boolean
  maxTags?: number
  linkable?: boolean
}

export function TagBadgeList({
  tags,
  className,
  variant = 'default',
  size = 'sm',
  showCounts = false,
  maxTags,
  linkable = true,
}: TagBadgeListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  const displayTags = maxTags ? tags.slice(0, maxTags) : tags
  const hasMore = maxTags && tags.length > maxTags

  const TagElement = ({ tag }: { tag: Tag & { postCount?: number } }) => (
    <div className="flex items-center space-x-1">
      <TagBadge tag={tag} variant={variant} size={size} />
      {showCounts && 'postCount' in tag && tag.postCount !== undefined && (
        <span className="text-xs text-gray-500">({tag.postCount})</span>
      )}
    </div>
  )

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayTags.map((tag) => (
        <div key={tag.id}>
          {linkable ? (
            <Link
              href={`/blog/tag/${tag.slug}`}
              className="inline-block transition-opacity hover:opacity-70"
            >
              <TagElement tag={tag} />
            </Link>
          ) : (
            <TagElement tag={tag} />
          )}
        </div>
      ))}

      {hasMore && (
        <span className="text-xs text-gray-500 flex items-center">
          +{tags.length - maxTags!} more
        </span>
      )}
    </div>
  )
}

// Specialized variants for different use cases
export function PostTags({ tags, className }: { tags: Tag[]; className?: string }) {
  return (
    <TagBadgeList tags={tags} variant="outline" size="sm" className={className} linkable={true} />
  )
}

export function RelatedTags({
  tags,
  className,
}: {
  tags: (Tag & { postCount: number })[]
  className?: string
}) {
  return (
    <TagBadgeList
      tags={tags}
      variant="default"
      size="sm"
      showCounts={true}
      maxTags={8}
      className={className}
      linkable={true}
    />
  )
}

export function TagPreview({ tags, className }: { tags: Tag[]; className?: string }) {
  return (
    <TagBadgeList
      tags={tags}
      variant="outline"
      size="sm"
      maxTags={3}
      className={className}
      linkable={false}
    />
  )
}
