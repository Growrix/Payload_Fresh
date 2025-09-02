import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Search, Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { searchPosts, transformPayloadPost } from '@/lib/payload/posts-api'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import BlogSearchClient from '@/components/blog/BlogSearchClient'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

const SearchResultsPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.q

  if (!query || query.trim() === '') {
    notFound()
  }

  // Search for posts
  const searchResults = await searchPosts(query.trim(), 20)
  const transformedResults = searchResults.map(transformPayloadPost)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      {/* Search Header */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#070707] to-[#0B0B0B]">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#9C6BFF] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Search Results for "{query}"
          </h1>

          <p className="text-xl text-[#B0B0B0] mb-8 font-['Inter']">
            Found {transformedResults.length} article{transformedResults.length !== 1 ? 's' : ''}
          </p>

          {/* Search Bar */}
          <BlogSearchClient />
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {transformedResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-[#666] mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">No Results Found</h2>
              <p className="text-[#B0B0B0] text-lg font-['Inter'] mb-8">
                We couldn't find any articles matching your search. Try different keywords or browse
                our latest posts.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-[#9C6BFF] hover:bg-[#8A5FE8] text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Browse All Posts
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {transformedResults.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#1A1A1A] rounded-xl p-6 hover:bg-[#222] transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.featuredImage && (
                      <div className="flex-shrink-0 w-full md:w-48 h-32 bg-[#333] rounded-lg overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
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

                      <h2 className="text-2xl font-bold mb-3 font-['Space_Grotesk']">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-[#9C6BFF] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-[#B0B0B0] mb-4 line-clamp-3 font-['Inter']">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-[#666]">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SearchResultsPage
