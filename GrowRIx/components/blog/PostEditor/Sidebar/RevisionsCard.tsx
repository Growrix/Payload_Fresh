"use client";

import React, { useState, useEffect } from 'react';
import { listRevisions, restoreRevision } from '@/lib/mocks/blogAdapter';
import type { Revision, Post } from '@/types/blog-mocks';

interface RevisionsCardProps {
  postId?: string;
  onPostRestore?: (restoredPost: Post) => void;
}

interface PreviewModalProps {
  revision: Revision | null;
  onClose: () => void;
}

function PreviewModal({ revision, onClose }: PreviewModalProps) {
  if (!revision) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-panel border border-gray-700 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-text">Revision Preview</h3>
          <button 
            onClick={onClose}
            className="text-subtext hover:text-text p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="text-sm text-subtext mb-2">
              {new Date(revision.created_at).toLocaleString()} • {revision.author}
            </div>
            <h4 className="text-lg font-medium text-text mb-3">{revision.title}</h4>
          </div>
          
          <div className="bg-surface border border-gray-600 rounded p-3 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-text text-sm">{revision.content}</pre>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RevisionsCard({ postId, onPostRestore }: RevisionsCardProps) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewRevision, setPreviewRevision] = useState<Revision | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const loadRevisions = async () => {
    if (!postId || postId === 'new') return;
    
    setLoading(true);
    try {
      const revisionsList = await listRevisions(postId);
      setRevisions(revisionsList);
    } catch (error) {
      showMessage('error', 'Failed to load revisions');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (revisionId: string) => {
    if (!postId || !onPostRestore) return;
    
    try {
      const restoredPost = await restoreRevision(postId, revisionId);
      onPostRestore(restoredPost);
      showMessage('success', 'Revision restored successfully');
      // Reload revisions to reflect the restore
      await loadRevisions();
    } catch (error) {
      showMessage('error', `Failed to restore revision: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const formatSnippet = (content: string, maxLength: number = 80) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    loadRevisions();
  }, [postId]);

  return (
    <>
      <div className="bg-panel border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-text">Revisions</h4>
          {loading && <span className="text-xs text-subtext">Loading...</span>}
        </div>

        {message && (
          <div className={`mb-3 p-2 rounded text-sm ${
            message.type === 'success' 
              ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
              : 'bg-red-600/20 text-red-400 border border-red-600/30'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-2">
          {revisions.length === 0 ? (
            <div className="text-subtext text-sm">
              {postId === 'new' ? 'Revisions will appear after saving your first draft' : 'No revisions yet'}
            </div>
          ) : (
            revisions.map((revision) => (
              <div key={revision.id} className="bg-surface border border-gray-600 rounded p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-subtext mb-1">
                      {formatDate(revision.created_at)} • {revision.author}
                    </div>
                    <div className="text-sm text-text font-medium mb-1 truncate">
                      {revision.title || 'Untitled'}
                    </div>
                    <div className="text-xs text-subtext">
                      {formatSnippet(revision.content)}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setPreviewRevision(revision)}
                    className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-500 rounded text-white"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleRestore(revision.id)}
                    className="px-2 py-1 text-xs bg-green-600 hover:bg-green-500 rounded text-white"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {postId && postId !== 'new' && (
          <button
            onClick={loadRevisions}
            disabled={loading}
            className="mt-3 w-full px-3 py-2 text-sm bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white"
          >
            {loading ? 'Loading...' : 'Refresh Revisions'}
          </button>
        )}
      </div>

      <PreviewModal 
        revision={previewRevision} 
        onClose={() => setPreviewRevision(null)} 
      />
    </>
  );
}
