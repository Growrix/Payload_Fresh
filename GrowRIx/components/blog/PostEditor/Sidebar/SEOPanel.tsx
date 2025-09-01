"use client";

import React from 'react';
import type { Post } from '@/types/blog-mocks';

interface SEOPanelProps {
  post?: Partial<Post>;
  onSEOChange?: (seoData: { meta_title?: string; meta_description?: string }) => void;
}

export default function SEOPanel({ post, onSEOChange }: SEOPanelProps) {
  const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSEOChange) {
      onSEOChange({ meta_title: e.target.value });
    }
  };

  const handleMetaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onSEOChange) {
      onSEOChange({ meta_description: e.target.value });
    }
  };

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-text">SEO</h4>
      <div className="mt-2 space-y-2">
        <label className="block">
          <span className="text-sm text-subtext">Meta title</span>
          <input 
            aria-label="Meta title" 
            value={post?.meta_title || ''}
            onChange={handleMetaTitleChange}
            className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text" 
            placeholder="Meta title for search engines"
          />
        </label>
        <label className="block">
          <span className="text-sm text-subtext">Meta description</span>
          <textarea 
            aria-label="Meta description" 
            value={post?.meta_description || ''}
            onChange={handleMetaDescriptionChange}
            className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text" 
            placeholder="Brief description for search engines"
            rows={3}
          />
        </label>
      </div>
    </div>
  );
}
