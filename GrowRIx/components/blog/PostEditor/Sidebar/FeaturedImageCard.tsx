"use client";

import React, { useState, useEffect } from 'react';
import { pickFeaturedImage } from '@/lib/mocks/blogAdapter';
import MediaLibraryModal from './MediaLibraryModal';
import type { Asset, Post } from '@/types/blog-mocks';

interface FeaturedImageCardProps {
  post?: Partial<Post>;
  onFeaturedImageChange?: (featured_image_id?: string) => void;
}

export default function FeaturedImageCard({ post, onFeaturedImageChange }: FeaturedImageCardProps) {
  const [featuredImage, setFeaturedImage] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);

  // Load featured image data when post.featured_image_id changes
  useEffect(() => {
    if (post?.featured_image_id && !featuredImage) {
      // In a real app, we'd fetch the asset by ID here
      // For now, we'll just keep local state
    }
  }, [post?.featured_image_id]);

  const handleChooseFromLibrary = async () => {
    // open modal instead
    setShowLibrary(true);
  };

  const [showLibrary, setShowLibrary] = useState(false);

  const handleSelectFromLibrary = (asset: any) => {
    setFeaturedImage(asset);
    if (onFeaturedImageChange) onFeaturedImageChange(asset.id);
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    if (onFeaturedImageChange) {
      onFeaturedImageChange(undefined);
    }
  };

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-text mb-3">Featured Image</h4>
      
      <div className="space-y-3">
        {featuredImage ? (
          <div className="space-y-3">
            <div className="w-full h-36 bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={featuredImage.url}
                alt={featuredImage.alt_text || 'Featured image'}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-xs text-subtext">
              <div className="font-medium text-text">{featuredImage.filename}</div>
              <div>{featuredImage.mime_type} • {(featuredImage.size / 1024).toFixed(1)} KB</div>
            </div>

            <div>
              <label className="block">
                <span className="text-sm text-subtext">Alt Text</span>
                <input
                  value={featuredImage.alt_text || ''}
                  disabled
                  className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text text-sm opacity-50 cursor-not-allowed"
                  placeholder="Alt text (disabled in demo)"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleChooseFromLibrary}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
              >
                {loading ? 'Loading...' : 'Replace'}
              </button>
              <button
                onClick={handleRemoveImage}
                className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded text-white text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-full h-36 bg-gray-800 rounded-lg flex items-center justify-center text-subtext">
              No image
            </div>
            
            <div>
              <button
                onClick={handleChooseFromLibrary}
                disabled={loading}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
              >
                {loading ? 'Loading...' : 'Choose from Library'}
              </button>
              <p className="mt-2 text-xs text-subtext">Opens a demo media library (UI-only)</p>
            </div>
          </div>
        )}
      
      <MediaLibraryModal open={showLibrary} onClose={() => setShowLibrary(false)} onSelect={handleSelectFromLibrary} />
      </div>
    </div>
  );
}
