"use client";

import React, { useState, useCallback, useEffect } from 'react';
import EditorCanvas from '@/components/blog/PostEditor/EditorCanvas';
import StatusCard from '@/components/blog/PostEditor/Sidebar/StatusCard';
import SlugCard from '@/components/blog/PostEditor/Sidebar/SlugCard';
import SEOPanel from '@/components/blog/PostEditor/Sidebar/SEOPanel';
import TaxonomyPanel from '@/components/blog/PostEditor/Sidebar/TaxonomyPanel';
import FeaturedImageCard from '@/components/blog/PostEditor/Sidebar/FeaturedImageCard';
import RevisionsCard from '@/components/blog/PostEditor/Sidebar/RevisionsCard';
import { useAutoSave } from '@/hooks/useAutoSave';
import { saveDraft, getPost } from '@/lib/mocks/blogAdapter';
import type { Post } from '@/types/blog-mocks';

// Use a permissive props type to satisfy Next.js generated PageProps shape
// without changing runtime behavior in this UI-only demo.
export default function ExistingPostPage({ params }: any) {
  const [postData, setPostData] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  // Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await getPost(params.id);
        setPostData(post || {
          id: params.id,
          title: `Post ${params.id}`,
          content: 'Loading...',
          slug: `post-${params.id}`,
          status: 'draft',
          author: 'Admin',
          tag_ids: []
        });
      } catch (error) {
        console.error('Failed to load post:', error);
        setPostData({
          id: params.id,
          title: `Post ${params.id}`,
          content: 'Error loading post',
          slug: `post-${params.id}`,
          status: 'draft',
          author: 'Admin',
          tag_ids: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  const handleSave = useCallback(async (data: Partial<Post>) => {
    if (!data.id) return;
    await saveDraft(data as Partial<Post> & { id: string });
  }, []);

  const { status, error } = useAutoSave({
    data: postData || {},
    onSave: handleSave,
    delay: 1000
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPostData(prev => prev ? ({ ...prev, title }) : null);
  };

  // Handler for slug changes from SlugCard
  const handleSlugChange = (slug: string) => {
    setPostData(prev => prev ? ({ 
      ...prev, 
      slug, 
      userEditedSlug: true 
    }) : null);
  };

  // Handler for SEO changes from SEOPanel
  const handleSEOChange = (seoData: { meta_title?: string; meta_description?: string }) => {
    setPostData(prev => prev ? ({ ...prev, ...seoData }) : null);
  };

  // Handler for taxonomy changes from TaxonomyPanel
  const handleTaxonomyChange = (taxonomyData: { category_id?: string; tag_ids?: string[] }) => {
    setPostData(prev => prev ? ({ ...prev, ...taxonomyData }) : null);
  };

  // Handler for featured image changes from FeaturedImageCard
  const handleFeaturedImageChange = (featured_image_id?: string) => {
    setPostData(prev => prev ? ({ ...prev, featured_image_id }) : null);
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'saving': return <span className="text-blue-500">Saving...</span>;
      case 'saved': return <span className="text-green-500">Saved</span>;
      case 'error': return <span className="text-red-500">Failed to save</span>;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-subtext">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">Post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr,320px] gap-6">
        <main>
          <div className="mb-4">
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-sm text-subtext">Title</span>
                {getStatusDisplay()}
              </div>
              <input
                aria-label="Post title"
                value={postData.title || ''}
                onChange={handleTitleChange}
                className="mt-1 w-full p-3 bg-panel border border-gray-700 rounded-lg text-text outline-none"
              />
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* Content area with autosave status - single themed editor */}
          <div className="mb-4">
            <label className="block">
              <span className="text-sm text-subtext">Content</span>
            </label>
            <div className="mt-2">
              <EditorCanvas
                content={postData.content || ''}
                onChange={(v) => setPostData(prev => prev ? ({ ...prev, content: v }) : null)}
              />
            </div>
          </div>
        </main>

        <aside className="order-first md:order-last md:sticky md:top-6 space-y-4">
          <div className="space-y-4">
            <StatusCard 
              post={postData} 
              onPostUpdate={(updatedPost) => setPostData(updatedPost)}
            />
            <RevisionsCard 
              postId={postData.id}
              onPostRestore={(restoredPost) => setPostData(restoredPost)}
            />
            <SlugCard 
              post={postData}
              onSlugChange={handleSlugChange}
            />
            <SEOPanel 
              post={postData}
              onSEOChange={handleSEOChange}
            />
            <TaxonomyPanel 
              post={postData}
              onTaxonomyChange={handleTaxonomyChange}
            />
            <FeaturedImageCard 
              post={postData}
              onFeaturedImageChange={handleFeaturedImageChange}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
