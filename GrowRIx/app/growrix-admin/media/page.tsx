"use client";

import React from 'react';
import Library from '../../../components/media/Library';

export default function MediaPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-text mb-4">Media Library</h1>
      <Library />
    </div>
  );
}
