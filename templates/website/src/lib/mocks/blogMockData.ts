// UI-ONLY: Mock data for blog public pages - no backend integration
export interface MockPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  categories: string[]
  tags: string[]
  readingTime: number
  status: 'published' | 'draft'
}

export interface MockCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export interface MockTag {
  id: string
  name: string
  slug: string
  postCount: number
}

export const mockPosts: MockPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and TypeScript',
    slug: 'getting-started-nextjs-14-typescript',
    excerpt:
      'Learn how to build modern web applications with Next.js 14, TypeScript, and the latest app router features.',
    content: 'Content here...',
    featuredImage: '/images/blog/nextjs-featured.jpg',
    author: {
      name: 'Sarah Chen',
      avatar: '/images/authors/sarah-chen.jpg',
      bio: 'Senior Frontend Developer with 8+ years of experience in React and Next.js',
    },
    publishedAt: '2025-01-10T10:00:00Z',
    categories: ['Development', 'JavaScript'],
    tags: ['Next.js', 'TypeScript', 'React', 'Web Development'],
    readingTime: 8,
    status: 'published',
  },
  {
    id: '2',
    title: 'Building Responsive Design Systems with Tailwind CSS',
    slug: 'responsive-design-systems-tailwind-css',
    excerpt:
      'Master the art of creating scalable and maintainable design systems using Tailwind CSS utilities and custom components.',
    content: 'Content here...',
    featuredImage: '/images/blog/tailwind-featured.jpg',
    author: {
      name: 'Marcus Johnson',
      avatar: '/images/authors/marcus-johnson.jpg',
      bio: 'UI/UX Designer and Frontend Developer specializing in design systems',
    },
    publishedAt: '2025-01-08T14:30:00Z',
    categories: ['Design', 'CSS'],
    tags: ['Tailwind CSS', 'Design Systems', 'CSS', 'Frontend'],
    readingTime: 12,
    status: 'published',
  },
  {
    id: '3',
    title: 'Advanced React Patterns for Scalable Applications',
    slug: 'advanced-react-patterns-scalable-applications',
    excerpt:
      'Explore advanced React patterns including compound components, render props, and custom hooks for building maintainable applications.',
    content: 'Content here...',
    featuredImage: '/images/blog/react-patterns-featured.jpg',
    author: {
      name: 'Alex Rivera',
      avatar: '/images/authors/alex-rivera.jpg',
      bio: 'Senior React Developer and technical architect with expertise in scalable frontend architectures',
    },
    publishedAt: '2025-01-05T09:15:00Z',
    categories: ['Development', 'JavaScript'],
    tags: ['React', 'JavaScript', 'Patterns', 'Architecture'],
    readingTime: 15,
    status: 'published',
  },
]

export const mockCategories: MockCategory[] = [
  {
    id: '1',
    name: 'Development',
    slug: 'development',
    description: 'Programming and development tutorials',
    postCount: 15,
  },
  {
    id: '2',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX design insights and tips',
    postCount: 8,
  },
  {
    id: '3',
    name: 'JavaScript',
    slug: 'javascript',
    description: 'JavaScript and related frameworks',
    postCount: 12,
  },
]

export const mockTags: MockTag[] = [
  { id: '1', name: 'React', slug: 'react', postCount: 10 },
  { id: '2', name: 'Next.js', slug: 'nextjs', postCount: 7 },
  { id: '3', name: 'TypeScript', slug: 'typescript', postCount: 8 },
  { id: '4', name: 'Tailwind CSS', slug: 'tailwind-css', postCount: 5 },
]

// Mock service for blog operations
export const mockBlogService = {
  getPosts: ({
    limit = 10,
    category,
    tag,
  }: { limit?: number; category?: string; tag?: string } = {}) => {
    let filteredPosts = mockPosts.filter((post) => post.status === 'published')

    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase()),
      )
    }

    if (tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      )
    }

    return filteredPosts.slice(0, limit)
  },

  getFeaturedPosts: () => mockPosts.slice(0, 3),

  getPostBySlug: (slug: string) => mockPosts.find((post) => post.slug === slug),

  getCategories: () => mockCategories,

  getTags: () => mockTags,

  searchPosts: (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  },
}
