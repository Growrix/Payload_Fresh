"use client";

import React, { useState } from 'react';
import PreviewModal from './PreviewModal';
import { saveDraft, publishNow, unpublish, archive } from '@/lib/mocks/blogAdapter';
import type { Post } from '@/types/blog-mocks';

interface StatusCardProps {
  post?: Partial<Post>;
  onPostUpdate?: (updatedPost: Post) => void;
}

export default function StatusCard({ post, onPostUpdate }: StatusCardProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [visibility, setVisibility] = useState<string>('public');
  const [previewOpen, setPreviewOpen] = useState(false);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSchedule = async () => {
    if (!post?.id || !scheduledDateTime) {
      showMessage('error', 'Please select a date/time');
      return;
    }

    // If post is still 'new', save it first to get a real ID
    if (post.id === 'new') {
      showMessage('error', 'Please save the post first before scheduling');
      return;
    }

    setLoading('Schedule');
    try {
      // Update post with scheduled status and publish time
      const updatedPost = await saveDraft({
        ...post,
        id: post.id,
        status: 'scheduled',
        published_at: new Date(scheduledDateTime).toISOString()
      });
      
      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }
      setShowScheduler(false);
      showMessage('success', `Post scheduled for ${new Date(scheduledDateTime).toLocaleString()}`);
    } catch (error) {
      showMessage('error', `Failed to schedule: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  const handleAction = async (action: string, actionFn: () => Promise<Post>) => {
    if (!post?.id || post.id === 'new') {
      showMessage('error', 'Please save the post first');
      return;
    }

    setLoading(action);
    try {
      const updatedPost = await actionFn();
      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }
      showMessage('success', `Post ${action.toLowerCase()} successfully`);
    } catch (error) {
      showMessage('error', `Failed to ${action.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  const handleSaveDraft = async () => {
    if (!post) {
      showMessage('error', 'No post data to save');
      return;
    }

    setLoading('Save Draft');
    try {
      const updatedPost = await saveDraft(post as Partial<Post> & { id: string });
      if (onPostUpdate) {
        onPostUpdate(updatedPost);
      }
      showMessage('success', 'Draft saved successfully');
    } catch (error) {
      showMessage('error', `Failed to save draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = () => {
    const status = post?.status || 'draft';
    const statusColors = {
      draft: 'bg-gray-600 text-gray-300',
      published: 'bg-green-600 text-green-100',
      archived: 'bg-orange-600 text-orange-100',
      scheduled: 'bg-blue-600 text-blue-100'
    };
    
    let statusText = status.charAt(0).toUpperCase() + status.slice(1);
    if (status === 'scheduled' && post?.published_at) {
      const scheduledDate = new Date(post.published_at);
      statusText += ` (${scheduledDate.toLocaleDateString()} ${scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    }
    
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[status as keyof typeof statusColors] || statusColors.draft}`}>
        {statusText}
      </span>
    );
  };

  const isButtonDisabled = (buttonType: string) => {
    const status = post?.status || 'draft';
    switch (buttonType) {
      case 'publish':
        return status === 'published' || status === 'scheduled';
      case 'unpublish':
        return status !== 'published';
      case 'archive':
        return status === 'archived';
      default:
        return false;
    }
  };

  return (
    <div className="bg-panel border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-text">Status & Visibility</h4>
        {getStatusBadge()}
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
        {/* Action Buttons */}
  <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSaveDraft}
            disabled={loading !== null}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            {loading === 'Save Draft' ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            onClick={() => handleAction('Publish', () => publishNow(post!.id!))}
            disabled={loading !== null || isButtonDisabled('publish')}
            className="px-3 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            {loading === 'Publish' ? 'Publishing...' : 'Publish Now'}
          </button>

          <button
            onClick={() => handleAction('Unpublish', () => unpublish(post!.id!))}
            disabled={loading !== null || isButtonDisabled('unpublish')}
            className="px-3 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            {loading === 'Unpublish' ? 'Unpublishing...' : 'Unpublish'}
          </button>

          <button
            onClick={() => handleAction('Archive', () => archive(post!.id!))}
            disabled={loading !== null || isButtonDisabled('archive')}
            className="px-3 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            {loading === 'Archive' ? 'Archiving...' : 'Archive'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="mt-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white text-sm"
          >
            Preview
          </button>
          <span className="text-sm text-subtext">Open a read-only preview of the current content</span>
        </div>

        {/* Schedule Section */}
        {!showScheduler ? (
          <button
            onClick={() => setShowScheduler(true)}
            disabled={loading !== null}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
          >
            Schedule
          </button>
        ) : (
          <div className="space-y-2 p-3 bg-surface border border-gray-600 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text font-medium">Schedule Publication</span>
              <button
                onClick={() => setShowScheduler(false)}
                className="text-subtext hover:text-text"
              >
                ×
              </button>
            </div>
            <input
              type="datetime-local"
              value={scheduledDateTime}
              onChange={(e) => setScheduledDateTime(e.target.value)}
              className="w-full p-2 bg-panel border border-gray-600 rounded text-text text-sm"
              min={new Date().toISOString().slice(0, 16)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSchedule}
                disabled={loading !== null || !scheduledDateTime}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:opacity-50 rounded text-white text-sm"
              >
                {loading === 'Schedule' ? 'Scheduling...' : 'Schedule'}
              </button>
              <button
                onClick={() => setShowScheduler(false)}
                className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <label className="block">
          <span className="text-sm text-subtext">Visibility</span>
          <select
            aria-label="Visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text"
            title="Demo toggle: change visibility for UI preview only"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlisted">Unlisted</option>
          </select>
          <p className="mt-1 text-xs text-subtext">This toggle is UI-only in the demo and does not change backend visibility.</p>
        </label>
      </div>

      {/* Preview Modal - UI only */}
      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        html={
          (post && ((post as any).content_html || (post as any).excerpt || `<h2>${(post as any).title || 'Untitled'}</h2><p>No content yet.</p>`)) || '<p>No content available</p>'
        }
      />
    </div>
  );
}
