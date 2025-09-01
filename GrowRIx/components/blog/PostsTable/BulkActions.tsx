'use client';

import React from 'react';

interface BulkActionsProps {
  selectedCount: number;
  onBulkAction: (action: string) => void;
  isLoading?: boolean;
}

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function BulkActions({ selectedCount, onBulkAction, isLoading = false }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 p-4 border-l-4" style={{ backgroundColor: '#181818', borderLeftColor: '#9333ea' }}>
      <span className="text-sm font-medium text-white">
        {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
      </span>
      
      <div className="flex items-center gap-2">
        <div className="relative group">
          <button
            style={{ backgroundColor: '#0b0b0b' }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-800 text-white rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9333ea] disabled:opacity-50"
            disabled={isLoading}
          >
            Bulk Actions
            <ChevronDownIcon />
          </button>
          
          <div className="absolute left-0 top-full mt-1 w-48 border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10" style={{ backgroundColor: '#181818' }}>
            <div className="py-1">
              <button
                onClick={() => onBulkAction('publish')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                <div className="text-green-400"><EyeIcon /></div>
                Publish
              </button>
              <button
                onClick={() => onBulkAction('unpublish')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                <div className="text-orange-400"><PencilIcon /></div>
                Move to Draft
              </button>
              <button
                onClick={() => onBulkAction('trash')}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                disabled={isLoading}
              >
                <TrashIcon />
                Move to Trash
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onBulkAction('apply')}
          style={{ backgroundColor: '#9333ea' }}
          className="px-4 py-1.5 text-sm text-white rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#9333ea] disabled:opacity-50"
          disabled={isLoading}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
