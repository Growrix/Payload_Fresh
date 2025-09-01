"use client";

import React, { useState, useEffect } from 'react';
import { checkSlugUnique } from '@/lib/mocks/blogAdapter';
import type { Post } from '@/types/blog-mocks';

interface SlugCardProps {
  post?: Partial<Post>;
  onSlugChange?: (slug: string) => void;
}

export default function SlugCard({ post, onSlugChange }: SlugCardProps) {
  const [localSlug, setLocalSlug] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{ available: boolean; message: string } | null>(null);

  // Sync local slug with post data
  useEffect(() => {
    if (post?.slug !== undefined) {
      setLocalSlug(post.slug);
    }
  }, [post?.slug]);

  const handleSlugCheck = async () => {
    if (!localSlug.trim()) {
      setCheckResult({ available: false, message: 'Please enter a slug' });
      return;
    }

    setChecking(true);
    try {
      const result = await checkSlugUnique(localSlug);
      setCheckResult(result);
    } catch (error) {
      setCheckResult({ available: false, message: 'Error checking slug' });
    } finally {
      setChecking(false);
    }
  };

  const handleSlugChange = (value: string) => {
    setLocalSlug(value);
    setCheckResult(null); // Clear previous check result when slug changes
    // Propagate change to parent
    if (onSlugChange) {
      onSlugChange(value);
    }
  };

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-text mb-3">Permalink</h4>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            aria-label="Post slug"
            value={localSlug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className="flex-1 p-2 bg-surface border border-gray-600 rounded-lg text-text"
            placeholder="post-slug"
          />
          <button
            onClick={handleSlugCheck}
            disabled={checking || !localSlug.trim()}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            {checking ? 'Checking...' : 'Check'}
          </button>
        </div>

        {checkResult && (
          <div className={`p-2 rounded text-sm flex items-center gap-2 ${
            checkResult.available
              ? 'bg-green-600/20 text-green-400 border border-green-600/30'
              : 'bg-red-600/20 text-red-400 border border-red-600/30'
          }`}>
            <span className="text-sm">
              {checkResult.available ? '✓' : '✕'}
            </span>
            {checkResult.message}
          </div>
        )}

        <div className="text-xs text-subtext">
          Preview: <span className="text-text">example.com/blog/{localSlug || 'post-slug'}</span>
        </div>
      </div>
    </div>
  );
}
