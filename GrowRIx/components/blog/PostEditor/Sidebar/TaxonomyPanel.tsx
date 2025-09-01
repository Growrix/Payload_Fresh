"use client";

import React, { useState, useEffect } from 'react';
import { listCategories, listTags } from '@/lib/mocks/blogAdapter';
import type { Post, Category, Tag } from '@/types/blog-mocks';

interface TaxonomyPanelProps {
  post?: Partial<Post>;
  onTaxonomyChange?: (taxonomyData: { category_id?: string; tag_ids?: string[] }) => void;
}

export default function TaxonomyPanel({ post, onTaxonomyChange }: TaxonomyPanelProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories and tags on mount
  useEffect(() => {
    const loadTaxonomies = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          listCategories(),
          listTags()
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Failed to load taxonomies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTaxonomies();
  }, []);

  // Sync selected tags with post data
  useEffect(() => {
    if (post?.tag_ids) {
      setSelectedTags(post.tag_ids);
    }
  }, [post?.tag_ids]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category_id = e.target.value || undefined;
    if (onTaxonomyChange) {
      onTaxonomyChange({ category_id });
    }
  };

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    if (onTaxonomyChange) {
      onTaxonomyChange({ tag_ids: newSelectedTags });
    }
  };

  if (loading) {
    return (
      <div className="bg-panel border border-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-text">Categories & Tags</h4>
        <div className="mt-2 text-sm text-subtext">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-text">Categories & Tags</h4>
      <div className="mt-2 space-y-3">
        <label className="block">
          <span className="text-sm text-subtext">Category</span>
          <select 
            aria-label="Categories" 
            value={post?.category_id || ''}
            onChange={handleCategoryChange}
            className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        
        <div>
          <span className="text-sm text-subtext">Tags</span>
          <div className="mt-1 space-y-1">
            {tags.map(tag => (
              <label key={tag.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                  className="rounded border-gray-600 bg-surface text-blue-600 focus:ring-blue-500"
                />
                <span className="text-text">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
