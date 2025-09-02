import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Tag } from 'lucide-react'

import { getAllTags } from '@/lib/api/tags'
import { TagBadge } from '@/components/TagBadge'
import Navbar from '@/components/growrix/Navbar'
import Footer from '@/components/growrix/Footer'

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse all article tags. Discover content organized by topics and themes.',
  openGraph: {
    title: 'All Tags',
    description: 'Browse all article tags. Discover content organized by topics and themes.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'All Tags',
    description: 'Browse all article tags. Discover content organized by topics and themes.',
  },
}

export default async function TagsPage() {
  const tags = await getAllTags()

  // Separate featured and regular tags
  const featuredTags = tags.filter((tag) => tag.featured)
  const regularTags = tags.filter((tag) => !tag.featured && tag.postCount > 0)
  const emptyTags = tags.filter((tag) => !tag.featured && tag.postCount === 0)

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
                <span className="text-[#9C6BFF]">Tags</span>
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

        {/* Tags Header */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-8 h-8 text-[#9C6BFF]" />
              <h1 className="text-4xl md:text-5xl font-bold leading-tight font-['Space_Grotesk']">
                All Tags
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl">
              Explore our content by tags. Click on any tag to see all related articles.
            </p>
          </div>
        </div>

        {/* Featured Tags */}
        {featuredTags.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6 font-['Space_Grotesk']">
              Featured Tags
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="group block p-6 bg-[#181818] rounded-lg border border-gray-700 hover:border-[#9C6BFF] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <TagBadge tag={tag} size="md" />
                    <span className="text-sm text-gray-400">
                      {tag.postCount} {tag.postCount === 1 ? 'article' : 'articles'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#9C6BFF] transition-colors">
                    {tag.name}
                  </h3>
                  {tag.description && (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">{tag.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regular Tags */}
        {regularTags.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6 font-['Space_Grotesk']">
              All Tags
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regularTags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="group flex items-center justify-between p-4 bg-[#181818] rounded-lg border border-gray-700 hover:border-[#9C6BFF] hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <TagBadge tag={tag} size="sm" />
                    <span className="font-medium text-white group-hover:text-[#9C6BFF] transition-colors">
                      {tag.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{tag.postCount}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tag Cloud */}
        <div className="container mx-auto px-4 mb-16">
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4 font-['Space_Grotesk']">
                Tag Cloud
              </h3>
              <div className="flex flex-wrap justify-center gap-2 bg-[#181818] rounded-lg p-6">
                {[...featuredTags, ...regularTags]
                  .sort((a, b) => b.postCount - a.postCount)
                  .slice(0, 30)
                  .map((tag) => {
                    // Calculate size based on post count
                    const maxCount = Math.max(...tags.map((t) => t.postCount))
                    const minSize = 12
                    const maxSize = 20
                    const size = Math.max(
                      minSize,
                      minSize + (tag.postCount / maxCount) * (maxSize - minSize),
                    )

                    return (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        className="inline-block hover:opacity-70 transition-opacity"
                        style={{ fontSize: `${size}px` }}
                      >
                        <TagBadge tag={tag} size="sm" />
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Empty Tags (for admin reference) */}
        {emptyTags.length > 0 && (
          <div className="container mx-auto px-4 mb-16">
            <details className="p-4 bg-[#181818] rounded-lg border border-gray-700">
              <summary className="cursor-pointer font-medium text-gray-300 hover:text-white transition-colors">
                Unused Tags ({emptyTags.length})
              </summary>
              <div className="mt-4 flex flex-wrap gap-2">
                {emptyTags.map((tag) => (
                  <div key={tag.id} className="opacity-50">
                    <TagBadge tag={tag} size="sm" />
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
