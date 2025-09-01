"use client";

import React from 'react';
import Library from '../../../../components/media/Library';

export default function BlogMediaPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-text mb-4">Media Library</h1>
      <p className="text-sm text-subtext mb-4">This is the blog-scoped media page (UI-only). Use this page to browse and select media for posts.</p>
      <Library />
    </div>
  );
}
