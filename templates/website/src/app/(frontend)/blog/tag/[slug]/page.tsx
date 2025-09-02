import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

import { getTagBySlug } from '@/lib/api/tags'
import { TagBadge } from '@/components/TagBadge'
import { PostCard } from '@/components/PostCard'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  const title = tag.seo?.title || `${tag.name} Articles`
  const description =
    tag.seo?.description ||
    tag.description ||
    `Browse all articles tagged with ${tag.name}. ${tag.postCount} ${tag.postCount === 1 ? 'article' : 'articles'} found.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function TagPage({ params }: Props) {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

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
                <Link href="/blog/tags" className="hover:text-white transition-colors">
                  Tags
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#9C6BFF]">{tag.name}</span>
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

        {/* Tag Header */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <TagBadge tag={tag} size="lg" />
              <span className="text-sm text-gray-400">
                {tag.postCount} {tag.postCount === 1 ? 'article' : 'articles'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-['Space_Grotesk']">
              Articles tagged with "{tag.name}"
            </h1>

            {tag.description && (
              <p className="text-lg text-gray-300 max-w-3xl">{tag.description}</p>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 pb-16">
          {tag.posts && tag.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tag.posts.map((post) => (
                <PostCard key={post.id} post={post} showCategories={true} showTags={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
              <p className="text-gray-400">
                There are no published articles with the tag "{tag.name}" yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Generate static params for all tags
export async function generateStaticParams() {
  const { getAllTags } = await import('@/lib/api/tags')
  const tags = await getAllTags()

  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}
