'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface RowActionsProps {
  postId: string;
  status: string;
  onQuickEdit: () => void;
  onTrash: () => void;
  isVisible?: boolean;
}

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function RowActions({ postId, status, onQuickEdit, onTrash, isVisible = false }: RowActionsProps) {
  return (
    <div className={`flex items-center gap-2 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
      <Link
        href={`/growrix-admin/blog/posts/${postId}`}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Edit
      </Link>
      
      <span className="text-gray-300">|</span>
      
      <button
        onClick={onQuickEdit}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        Quick Edit
      </button>
      
      <span className="text-gray-300">|</span>
      
      <button
        onClick={onTrash}
        className="text-red-600 hover:text-red-800 text-sm"
      >
        Trash
      </button>
      
      <span className="text-gray-300">|</span>
      
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        View
      </button>
      
      {status === 'draft' && (
        <>
          <span className="text-gray-300">|</span>
          <button className="text-green-600 hover:text-green-800 text-sm">
            Preview
          </button>
        </>
      )}
    </div>
  );
}
