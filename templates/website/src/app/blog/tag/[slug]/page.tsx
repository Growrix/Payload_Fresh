import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getTagBySlug } from '@/lib/api/tags'
import { PostGrid } from '@/components/PostGrid'
import { TagBadge } from '@/components/TagBadge'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'

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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/blog/tags' },
    { label: tag.name, href: `/blog/tag/${tag.slug}` },
  ]

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <TagBadge tag={tag} size="lg" />
            <span className="text-sm text-gray-600">
              {tag.postCount} {tag.postCount === 1 ? 'article' : 'articles'}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Articles tagged with "{tag.name}"
          </h1>

          {tag.description && <p className="text-lg text-gray-600 max-w-3xl">{tag.description}</p>}
        </div>

        {tag.posts && tag.posts.length > 0 ? (
          <PostGrid posts={tag.posts} />
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              There are no published articles with the tag "{tag.name}" yet.
            </p>
          </div>
        )}
      </div>
    </Container>
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
