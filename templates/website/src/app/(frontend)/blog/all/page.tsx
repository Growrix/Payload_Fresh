import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllPosts, transformPayloadPost } from '@/lib/payload/posts-api'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import BlogSearchClient from '@/components/blog/BlogSearchClient'

interface AllPostsPageProps {
  searchParams: {
    page?: string
  }
}

const AllPostsPage = async ({ searchParams }: AllPostsPageProps) => {
  const currentPage = parseInt(searchParams.page || '1', 10)
  const postsPerPage = 9

  // Fetch posts with pagination
  const postsData = await getAllPosts(currentPage, postsPerPage)
  const transformedPosts = postsData.docs.map(transformPayloadPost)

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

      {/* Header */}
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
            All Blog Posts
          </h1>

          <p className="text-xl text-[#B0B0B0] mb-8 font-['Inter']">
            Explore all {postsData.totalDocs} articles in our blog
          </p>

          {/* Search Bar */}
          <BlogSearchClient />
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {transformedPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">No Posts Found</h2>
              <p className="text-[#B0B0B0] text-lg font-['Inter']">
                No blog posts are available at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {transformedPosts.map((post) => (
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

                      <p className="text-[#B0B0B0] mb-4 line-clamp-3 font-['Inter']">
                        {post.excerpt}
                      </p>

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

              {/* Pagination */}
              {postsData.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  {postsData.hasPrevPage && (
                    <Link
                      href={`/blog/all${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#333] rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, postsData.totalPages) }, (_, i) => {
                      const pageNum =
                        currentPage <= 3
                          ? i + 1
                          : currentPage >= postsData.totalPages - 2
                            ? postsData.totalPages - 4 + i
                            : currentPage - 2 + i

                      if (pageNum < 1 || pageNum > postsData.totalPages) return null

                      return (
                        <Link
                          key={pageNum}
                          href={`/blog/all${pageNum > 1 ? `?page=${pageNum}` : ''}`}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#9C6BFF] text-white'
                              : 'bg-[#1A1A1A] hover:bg-[#333]'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                  </div>

                  {postsData.hasNextPage && (
                    <Link
                      href={`/blog/all?page=${currentPage + 1}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#333] rounded-lg transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AllPostsPage
