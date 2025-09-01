// UI-ONLY: Mock data for blog public pages - no backend integration
export interface MockPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  status: 'published' | 'draft';
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface MockTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export const mockPosts: MockPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and TypeScript',
    slug: 'getting-started-nextjs-14-typescript',
    excerpt: 'Learn how to build modern web applications with Next.js 14, TypeScript, and the latest app router features.',
    content: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 brings exciting new features and performance improvements that make building React applications even better. In this comprehensive guide, we'll explore the key features and how to get started.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>App Router with improved performance</li>
        <li>Server Components by default</li>
        <li>Enhanced TypeScript support</li>
        <li>Improved developer experience</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To create a new Next.js 14 project with TypeScript:</p>
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
      
      <p>This command creates a new project with all the modern tooling configured out of the box.</p>
    `,
    featuredImage: '/images/blog/nextjs-featured.jpg',
    author: {
      name: 'Sarah Chen',
      avatar: '/images/authors/sarah-chen.jpg',
      bio: 'Senior Frontend Developer with 8+ years of experience in React and Next.js'
    },
    publishedAt: '2025-01-10T10:00:00Z',
    categories: ['Development', 'JavaScript'],
    tags: ['Next.js', 'TypeScript', 'React', 'Web Development'],
    readingTime: 8,
    status: 'published'
  },
  {
    id: '2',
    title: 'Building Responsive Design Systems with Tailwind CSS',
    slug: 'responsive-design-systems-tailwind-css',
    excerpt: 'Master the art of creating scalable and maintainable design systems using Tailwind CSS utilities and custom components.',
    content: `
      <h2>Why Design Systems Matter</h2>
      <p>Design systems provide consistency, scalability, and maintainability for modern web applications. With Tailwind CSS, we can create robust design systems efficiently.</p>
      
      <h3>Setting Up Your Design System</h3>
      <p>Start by configuring your tailwind.config.js with custom colors, typography, and spacing:</p>
      <pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  }
}</code></pre>
      
      <h3>Component Architecture</h3>
      <p>Create reusable components that leverage your design tokens for consistent styling across your application.</p>
    `,
    featuredImage: '/images/blog/tailwind-featured.jpg',
    author: {
      name: 'Marcus Johnson',
      avatar: '/images/authors/marcus-johnson.jpg',
      bio: 'UI/UX Designer and Frontend Developer specializing in design systems'
    },
    publishedAt: '2025-01-08T14:30:00Z',
    categories: ['Design', 'CSS'],
    tags: ['Tailwind CSS', 'Design Systems', 'CSS', 'Frontend'],
    readingTime: 12,
    status: 'published'
  },
  {
    id: '3',
    title: 'Advanced React Patterns for Scalable Applications',
    slug: 'advanced-react-patterns-scalable-applications',
    excerpt: 'Explore advanced React patterns including compound components, render props, and custom hooks for building maintainable applications.',
    content: `
      <h2>Compound Components Pattern</h2>
      <p>The compound component pattern allows you to create flexible and reusable components by providing multiple components that work together.</p>
      
      <h3>Implementation Example</h3>
      <pre><code>const Modal = ({ children }) => {
  return <div className="modal">{children}</div>
}

Modal.Header = ({ children }) => <div className="modal-header">{children}</div>
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div></code></pre>
      
      <h3>Custom Hooks for State Management</h3>
      <p>Custom hooks help encapsulate complex logic and make it reusable across components.</p>
    `,
    featuredImage: '/images/blog/react-patterns-featured.jpg',
    author: {
      name: 'Alex Rivera',
      avatar: '/images/authors/alex-rivera.jpg',
      bio: 'Senior React Developer and technical architect with expertise in scalable frontend architectures'
    },
    publishedAt: '2025-01-05T09:15:00Z',
    categories: ['Development', 'JavaScript'],
    tags: ['React', 'JavaScript', 'Patterns', 'Architecture'],
    readingTime: 15,
    status: 'published'
  },
  {
    id: '4',
    title: 'The Future of Web Development: Trends for 2025',
    slug: 'future-web-development-trends-2025',
    excerpt: 'Discover the emerging trends and technologies that will shape web development in 2025 and beyond.',
    content: `
      <h2>Key Trends Shaping 2025</h2>
      <p>The web development landscape continues to evolve rapidly. Here are the key trends we're seeing:</p>
      
      <h3>1. AI-Powered Development Tools</h3>
      <p>AI is transforming how we write code, with tools like GitHub Copilot and Claude becoming essential for developers.</p>
      
      <h3>2. Edge Computing and CDN Evolution</h3>
      <p>Edge computing is bringing computation closer to users, reducing latency and improving performance.</p>
      
      <h3>3. WebAssembly Adoption</h3>
      <p>WebAssembly is enabling high-performance applications in the browser, opening new possibilities for web development.</p>
    `,
    featuredImage: '/images/blog/future-web-featured.jpg',
    author: {
      name: 'Dr. Emily Watson',
      avatar: '/images/authors/emily-watson.jpg',
      bio: 'Technology researcher and web development consultant with 15+ years of industry experience'
    },
    publishedAt: '2025-01-03T16:45:00Z',
    categories: ['Technology', 'Trends'],
    tags: ['Web Development', 'AI', 'Edge Computing', 'Future Tech'],
    readingTime: 10,
    status: 'published'
  },
  {
    id: '5',
    title: 'Optimizing Web Performance: A Complete Guide',
    slug: 'optimizing-web-performance-complete-guide',
    excerpt: 'Learn practical techniques to improve your website\'s performance, from image optimization to code splitting.',
    content: `
      <h2>Performance Fundamentals</h2>
      <p>Web performance directly impacts user experience, SEO rankings, and conversion rates. Let's explore key optimization strategies.</p>
      
      <h3>Core Web Vitals</h3>
      <ul>
        <li>Largest Contentful Paint (LCP)</li>
        <li>First Input Delay (FID)</li>
        <li>Cumulative Layout Shift (CLS)</li>
      </ul>
      
      <h3>Image Optimization</h3>
      <p>Images often account for the majority of page weight. Use modern formats like WebP and implement lazy loading.</p>
      
      <h3>Code Splitting</h3>
      <p>Split your JavaScript bundles to load only what's needed for each page.</p>
    `,
    featuredImage: '/images/blog/performance-featured.jpg',
    author: {
      name: 'David Kim',
      avatar: '/images/authors/david-kim.jpg',
      bio: 'Performance engineer and web optimization specialist'
    },
    publishedAt: '2025-01-01T12:00:00Z',
    categories: ['Performance', 'Development'],
    tags: ['Performance', 'Optimization', 'Web Vitals', 'Speed'],
    readingTime: 18,
    status: 'published'
  }
];

export const mockCategories: MockCategory[] = [
  {
    id: '1',
    name: 'Development',
    slug: 'development',
    description: 'Articles about web development, programming languages, and software engineering best practices.',
    postCount: 3
  },
  {
    id: '2',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX design principles, design systems, and creative inspiration for digital products.',
    postCount: 1
  },
  {
    id: '3',
    name: 'JavaScript',
    slug: 'javascript',
    description: 'Everything JavaScript - from fundamentals to advanced concepts and frameworks.',
    postCount: 2
  },
  {
    id: '4',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest technology trends, industry insights, and emerging technologies.',
    postCount: 1
  },
  {
    id: '5',
    name: 'Performance',
    slug: 'performance',
    description: 'Web performance optimization, speed improvements, and monitoring techniques.',
    postCount: 1
  },
  {
    id: '6',
    name: 'CSS',
    slug: 'css',
    description: 'CSS techniques, frameworks, and styling best practices for modern web development.',
    postCount: 1
  }
];

export const mockTags: MockTag[] = [
  { id: '1', name: 'Next.js', slug: 'nextjs', postCount: 1 },
  { id: '2', name: 'TypeScript', slug: 'typescript', postCount: 1 },
  { id: '3', name: 'React', slug: 'react', postCount: 2 },
  { id: '4', name: 'Tailwind CSS', slug: 'tailwind-css', postCount: 1 },
  { id: '5', name: 'Performance', slug: 'performance', postCount: 1 },
  { id: '6', name: 'Design Systems', slug: 'design-systems', postCount: 1 },
  { id: '7', name: 'Web Development', slug: 'web-development', postCount: 2 },
  { id: '8', name: 'AI', slug: 'ai', postCount: 1 },
  { id: '9', name: 'Edge Computing', slug: 'edge-computing', postCount: 1 },
  { id: '10', name: 'Optimization', slug: 'optimization', postCount: 1 }
];

// UI-ONLY: Mock service functions for blog data
export const mockBlogService = {
  // Get all published posts
  getPosts: (options?: { category?: string; tag?: string; search?: string; limit?: number }) => {
    let filteredPosts = mockPosts.filter(post => post.status === 'published');
    
    if (options?.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => cat.toLowerCase() === options.category?.toLowerCase())
      );
    }
    
    if (options?.tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === options.tag?.toLowerCase())
      );
    }
    
    if (options?.search) {
      const searchTerm = options.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      );
    }
    
    if (options?.limit) {
      filteredPosts = filteredPosts.slice(0, options.limit);
    }
    
    return filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },
  
  // Get featured posts (first 3 posts for demo)
  getFeaturedPosts: () => {
    return mockPosts.filter(post => post.status === 'published').slice(0, 3);
  },
  
  // Get post by slug
  getPostBySlug: (slug: string) => {
    return mockPosts.find(post => post.slug === slug && post.status === 'published');
  },
  
  // Get related posts (posts with similar categories/tags)
  getRelatedPosts: (postId: string, limit = 3) => {
    const currentPost = mockPosts.find(p => p.id === postId);
    if (!currentPost) return [];
    
    return mockPosts
      .filter(post => 
        post.id !== postId && 
        post.status === 'published' &&
        (post.categories.some(cat => currentPost.categories.includes(cat)) ||
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);
  },
  
  // Get all categories
  getCategories: () => mockCategories,
  
  // Get category by slug
  getCategoryBySlug: (slug: string) => {
    return mockCategories.find(cat => cat.slug === slug);
  },
  
  // Get all tags
  getTags: () => mockTags,
  
  // Get tag by slug
  getTagBySlug: (slug: string) => {
    return mockTags.find(tag => tag.slug === slug);
  }
};
