import type { Tag } from '@/payload-types'
import { cn } from '@/lib/utils'

interface TagBadgeProps {
  tag: Tag
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  className?: string
}

const colorClasses = {
  blue: {
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    outline: 'text-blue-600 border-blue-300 hover:bg-blue-50',
  },
  green: {
    default: 'bg-green-100 text-green-800 border-green-200',
    outline: 'text-green-600 border-green-300 hover:bg-green-50',
  },
  purple: {
    default: 'bg-purple-100 text-purple-800 border-purple-200',
    outline: 'text-purple-600 border-purple-300 hover:bg-purple-50',
  },
  red: {
    default: 'bg-red-100 text-red-800 border-red-200',
    outline: 'text-red-600 border-red-300 hover:bg-red-50',
  },
  orange: {
    default: 'bg-orange-100 text-orange-800 border-orange-200',
    outline: 'text-orange-600 border-orange-300 hover:bg-orange-50',
  },
  pink: {
    default: 'bg-pink-100 text-pink-800 border-pink-200',
    outline: 'text-pink-600 border-pink-300 hover:bg-pink-50',
  },
  gray: {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    outline: 'text-gray-600 border-gray-300 hover:bg-gray-50',
  },
  indigo: {
    default: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    outline: 'text-indigo-600 border-indigo-300 hover:bg-indigo-50',
  },
  yellow: {
    default: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    outline: 'text-yellow-600 border-yellow-300 hover:bg-yellow-50',
  },
  teal: {
    default: 'bg-teal-100 text-teal-800 border-teal-200',
    outline: 'text-teal-600 border-teal-300 hover:bg-teal-50',
  },
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
}

export function TagBadge({ tag, size = 'sm', variant = 'default', className }: TagBadgeProps) {
  const color = tag.color || 'gray'
  const colorClass =
    colorClasses[color as keyof typeof colorClasses]?.[variant] || colorClasses.gray[variant]
  const sizeClass = sizeClasses[size]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors',
        colorClass,
        sizeClass,
        variant === 'outline' && 'bg-white hover:shadow-sm',
        className,
      )}
    >
      {tag.name}
    </span>
  )
}
