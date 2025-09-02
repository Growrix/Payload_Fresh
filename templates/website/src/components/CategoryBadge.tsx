import Link from 'next/link'
import type { Category } from '@/payload-types'
import { CategoryIcon } from './CategoryIcon'

interface CategoryBadgeProps {
  category: Category
  showIcon?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
}

export function CategoryBadge({
  category,
  showIcon = true,
  size = 'medium',
  variant = 'solid',
  className = '',
}: CategoryBadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  }

  const colorClasses = {
    blue: {
      solid: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
      outline:
        'border border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300',
      ghost: 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900',
    },
    green: {
      solid: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300',
      outline:
        'border border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300',
      ghost: 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900',
    },
    purple: {
      solid:
        'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300',
      outline:
        'border border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300',
      ghost: 'text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900',
    },
    red: {
      solid: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300',
      outline:
        'border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300',
      ghost: 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900',
    },
    orange: {
      solid:
        'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300',
      outline:
        'border border-orange-300 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300',
      ghost: 'text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900',
    },
    pink: {
      solid: 'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300',
      outline:
        'border border-pink-300 text-pink-700 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-300',
      ghost: 'text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900',
    },
    gray: {
      solid: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300',
      outline:
        'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300',
      ghost: 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900',
    },
    indigo: {
      solid:
        'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300',
      outline:
        'border border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300',
      ghost: 'text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900',
    },
  }

  const color = category.color || 'blue'
  const baseClasses =
    'inline-flex items-center font-medium rounded-full transition-colors duration-200'
  const classes = `${baseClasses} ${sizeClasses[size]} ${colorClasses[color as keyof typeof colorClasses][variant]} ${className}`

  return (
    <Link href={`/blog/category/${category.slug}`} className={classes}>
      {showIcon && category.icon && (
        <CategoryIcon
          icon={category.icon}
          color={color}
          size={size === 'small' ? 'small' : 'small'}
          className="mr-1.5"
        />
      )}
      {category.title}
    </Link>
  )
}

interface CategoryBadgeListProps {
  categories: Category[]
  maxVisible?: number
  showIcon?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
}

export function CategoryBadgeList({
  categories,
  maxVisible = 3,
  showIcon = false,
  size = 'small',
  variant = 'solid',
  className = '',
}: CategoryBadgeListProps) {
  const visibleCategories = categories.slice(0, maxVisible)
  const hiddenCount = categories.length - maxVisible

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleCategories.map((category) => (
        <CategoryBadge
          key={category.id}
          category={category}
          showIcon={showIcon}
          size={size}
          variant={variant}
        />
      ))}

      {hiddenCount > 0 && (
        <span
          className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 self-center`}
        >
          +{hiddenCount} more
        </span>
      )}
    </div>
  )
}
