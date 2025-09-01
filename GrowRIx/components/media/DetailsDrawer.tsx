"use client";

import React, { useEffect, useState } from 'react';
import { generateAltText, updateAsset } from '@/lib/mocks/blogAdapter';

type Asset = {
  id: string;
  name: string;
  width: number;
  height: number;
  mime: string;
  date: string;
  alt?: string;
  caption?: string;
  url?: string;
};

export default function DetailsDrawer({ asset, open, onClose }: { asset: Asset | null; open: boolean; onClose: () => void }) {
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [saving, setSaving] = useState(false);

  // Initialize form when asset changes
  useEffect(() => {
    if (asset) {
      setAltText(asset.alt || generateAltText(asset.name));
      setCaption(asset.caption || '');
    }
  }, [asset]);

  const handleSave = async () => {
    if (!asset) return;
    
    setSaving(true);
    try {
      await updateAsset(asset.id, {
        alt_text: altText,
      });
      // In a real app, we would update the parent component's asset list
      console.log('Asset updated successfully');
    } catch (error) {
      console.error('Failed to update asset:', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateAltText = () => {
    if (asset) {
      setAltText(generateAltText(asset.name));
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') onClose(); 
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSave();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, handleSave]);

  if (!open || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full md:w-96 bg-panel border-l border-gray-700 p-4 pointer-events-auto overflow-auto">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Asset details</h3>
          <button aria-label="Close drawer" onClick={onClose} className="text-subtext">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="w-full h-48 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
            <img src={asset.url || `/images/${asset.name}`} alt={asset.alt || 'Asset preview'} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="text-sm text-subtext">Filename</div>
            <div className="text-text">{asset.name}</div>
          </div>

          <div>
            <div className="text-sm text-subtext">Dimensions</div>
            <div className="text-text">{asset.width} × {asset.height}</div>
          </div>

          <div>
            <div className="text-sm text-subtext">Type</div>
            <div className="text-text">{asset.mime}</div>
          </div>

          <div>
            <div className="text-sm text-subtext">Uploaded</div>
            <div className="text-text">{new Date(asset.date).toLocaleDateString()}</div>
          </div>

          {/* Editable Alt Text */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-subtext">Alt text</label>
              <button
                onClick={handleGenerateAltText}
                className="text-xs text-accent hover:text-accent-light"
                title="Generate alt text from filename"
              >
                Auto-generate
              </button>
            </div>
            <input 
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text focus:border-accent focus:outline-none" 
              placeholder="Describe this image for accessibility..."
            />
          </div>

          {/* Editable Caption */}
          <div>
            <label className="text-sm text-subtext">Caption</label>
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="mt-1 w-full p-2 bg-surface border border-gray-600 rounded-lg text-text focus:border-accent focus:outline-none resize-none" 
              placeholder="Add a caption for this image..."
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="text-xs text-subtext text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-600 rounded text-xs">Ctrl+S</kbd> to save
          </div>
        </div>
      </aside>
    </div>
  );
}
