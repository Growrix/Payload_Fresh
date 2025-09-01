'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen } from 'lucide-react'
import { mockBlogService, MockPost } from '@/lib/mocks/blogMockData'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'

const BlogHomepage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<MockPost[]>([])
  const [recentPosts, setRecentPosts] = useState<MockPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // UI-ONLY: Simulate loading with mock data
    const loadData = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const featured = mockBlogService.getFeaturedPosts()
      const recent = mockBlogService.getPosts({ limit: 6 })

      setFeaturedPosts(featured)
      setRecentPosts(recent)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // UI-ONLY: In real implementation, this would navigate to search results
      console.log('Search for:', searchQuery)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9C6BFF] mx-auto mb-4"></div>
            <p className="text-[#B0B0B0]">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#070707] to-[#0B0B0B]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Space_Grotesk']">
            Insights & <span className="text-[#9C6BFF]">Knowledge</span>
          </h1>
          <p className="text-xl text-[#B0B0B0] mb-8 max-w-2xl mx-auto font-['Inter']">
            Stay updated with the latest trends, tutorials, and insights in web development and
            design.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] text-white"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666] w-5 h-5" />
            </div>
          </form>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-[#9C6BFF]" />
            <h2 className="text-3xl font-bold font-['Space_Grotesk']">Featured Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:bg-[#222] transition-colors duration-300"
              >
                <div className="aspect-video bg-[#333] relative overflow-hidden">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 font-['Space_Grotesk']">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#9C6BFF] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-[#B0B0B0] mb-4 line-clamp-3 font-['Inter']">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-[#666]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-[#666]">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-6 bg-[#181818]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#9C6BFF]" />
              <h2 className="text-3xl font-bold font-['Space_Grotesk']">Recent Posts</h2>
            </div>
            <Link
              href="/blog/all"
              className="flex items-center gap-2 text-[#9C6BFF] hover:text-white transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="flex gap-4 bg-[#0B0B0B] p-6 rounded-xl hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-[#333] rounded-lg overflow-hidden">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    {post.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold mb-2 line-clamp-2 font-['Space_Grotesk']">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#9C6BFF] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-[#B0B0B0] text-sm line-clamp-2 font-['Inter']">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-[#666]">
                    <span>{post.author.name}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogHomepage
