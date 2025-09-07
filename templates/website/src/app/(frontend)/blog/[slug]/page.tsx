import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  BookOpen,
  Tag,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import { getPostBySlug, getRecentPosts, transformPayloadPost } from '@/lib/payload/posts-api'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'
import CommentsList from '@/components/CommentsList'
import ShareButtons from '@/components/ShareButtons'
import { Metadata } from 'next'

interface BlogPostProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.meta?.description || 'Read this blog post',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.meta?.description || 'Read this blog post',
      images: post.heroImage ? [post.heroImage.url] : [],
    },
  }
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params

  // Fetch the blog post
  const postData = await getPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  // Transform the post data
  const post = transformPayloadPost(postData)

  // Fetch related posts
  const recentPostsData = await getRecentPosts(3)
  const relatedPosts = recentPostsData.map(transformPayloadPost)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Simple content renderer for Lexical content
  const renderContent = (content: any) => {
    if (!content || !content.root) {
      return <p className="text-gray-300">Content not available</p>
    }

    // Basic text extraction from Lexical content
    const extractText = (node: any): string => {
      if (!node) return ''

      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }

      return ''
    }

    const textContent = extractText(content.root)

    // Split into paragraphs for better display
    const paragraphs = textContent.split('\n\n').filter((p) => p.trim())

    return (
      <div className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-300 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Breadcrumb & Back Navigation */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#9C6BFF]">{post.categories[0] || 'Article'}</span>
              </nav>

              <Link
                href="/blog"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-[#9C6BFF]/20 text-[#9C6BFF] rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-['Space_Grotesk']">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
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

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="aspect-video bg-[#333] rounded-xl overflow-hidden mb-12">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-300 mb-8 p-6 bg-[#1A1A1A] rounded-xl border-l-4 border-[#9C6BFF]">
                {post.excerpt}
              </div>
            )}

            {/* Content */}
            <div className="mb-12">{renderContent(post.content)}</div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#9C6BFF]" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#1A1A1A] text-gray-300 rounded-full text-sm hover:bg-[#333] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="border-t border-gray-800 pt-8 mb-12">
              <ShareButtons
                title={post.title}
                url={`/blog/${post.slug}`}
                excerpt={post.excerpt || ''}
              />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-800 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-[#9C6BFF]" />
                  Related Articles
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.id}
                      className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:bg-[#222] transition-colors duration-300"
                    >
                      <div className="aspect-video bg-[#333] relative overflow-hidden">
                        {relatedPost.featuredImage && (
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedPost.categories.map((category) => (
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
                            href={`/blog/${relatedPost.slug}`}
                            className="hover:text-[#9C6BFF] transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>

                        <p className="text-[#B0B0B0] text-sm mb-4 line-clamp-2 font-['Inter']">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-[#888]">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(relatedPost.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {relatedPost.readingTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comments Section */}
        {(() => {
          console.log('Post object:', {
            id: post.id,
            allowComments: post.allowComments,
            title: post.title,
          })
          return null
        })()}
        {post.allowComments && (
          <section className="border-t border-gray-800 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <CommentsList postId={post.id} allowComments={post.allowComments} />
              </div>
            </div>
          </section>
        )}
        {!post.allowComments && (
          <section className="border-t border-gray-800 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-[#0B0B0B] rounded-xl p-8 text-center">
                  <p className="text-gray-400">
                    DEBUG: Comments are disabled for this post (allowComments:{' '}
                    {String(post.allowComments)})
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}

export default BlogPost
