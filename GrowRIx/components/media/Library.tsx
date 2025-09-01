"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import DetailsDrawer from './DetailsDrawer';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Toast from '@/components/ui/Toast';
import { listAssets, deleteAsset, deleteAssets } from '@/lib/mocks/blogAdapter';

type Asset = { 
  id: string; 
  filename: string; 
  width?: number; 
  height?: number; 
  mime_type: string; 
  created_at: string; 
  alt_text?: string; 
  caption?: string; 
  url: string; 
  size: number 
};

export default function Library() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid'|'list'>('grid');
  const [filterType, setFilterType] = useState<'all'|'image'|'video'>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Asset | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  
  // Confirmation dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: 'single' | 'bulk';
    assetId?: string;
    assetName?: string;
    count?: number;
  }>({ open: false, type: 'single' });
  
  // Toast notification state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>({ show: false, message: '', type: 'info' });

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ show: true, message, type });
  };
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load assets from unified adapter
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const data = await listAssets();
      const adaptedAssets = data.map(asset => ({
        id: asset.id,
        filename: asset.filename,
        width: 400, // Default width for display
        height: 300, // Default height for display  
        mime_type: asset.mime_type,
        created_at: asset.created_at,
        alt_text: asset.alt_text || '',
        caption: '',
        url: asset.url,
        size: asset.size
      }));
      setAssets(adaptedAssets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load assets:', error);
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    if (loading) return [];
    return assets.filter(a => {
      if (query && !a.filename.toLowerCase().includes(query.toLowerCase())) return false;
      if (filterType !== 'all' && !(filterType === 'image' ? a.mime_type.startsWith('image/') : a.mime_type.startsWith('video/'))) return false;
      if (from && new Date(a.created_at) < new Date(from)) return false;
      if (to && new Date(a.created_at) > new Date(to)) return false;
      return true;
    });
  }, [assets, query, filterType, from, to, loading]);

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    setSelectedIds(new Set(filtered.map(a => a.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    // If we clear all selections, automatically exit selection mode
    setIsSelectionMode(false);
  };

  // Delete handlers
  const handleDeleteSingle = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    setDeleteDialog({
      open: true,
      type: 'single',
      assetId,
      assetName: asset?.filename || 'Unknown'
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    
    setDeleteDialog({
      open: true,
      type: 'bulk',
      count: selectedIds.size
    });
  };

  const confirmDelete = async () => {
    if (deleteDialog.type === 'single' && deleteDialog.assetId) {
      try {
        await deleteAsset(deleteDialog.assetId);
        await loadAssets(); // Reload assets
        if (selected?.id === deleteDialog.assetId) {
          setSelected(null); // Close details if deleted asset was selected
        }
        showToast(`Image "${deleteDialog.assetName}" deleted successfully`, 'success');
      } catch (error) {
        console.error('Failed to delete asset:', error);
        showToast('Failed to delete image', 'error');
      }
    } else if (deleteDialog.type === 'bulk') {
      setBulkDeleting(true);
      try {
        const count = selectedIds.size;
        await deleteAssets(Array.from(selectedIds));
        await loadAssets(); // Reload assets
        clearSelection();
        if (selected && selectedIds.has(selected.id)) {
          setSelected(null); // Close details if deleted asset was selected
        }
        showToast(`${count} image${count > 1 ? 's' : ''} deleted successfully`, 'success');
      } catch (error) {
        console.error('Failed to delete assets:', error);
        showToast('Failed to delete selected images', 'error');
      } finally {
        setBulkDeleting(false);
      }
    }
    
    setDeleteDialog({ open: false, type: 'single' });
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, type: 'single' });
  };

  const handleAssetClick = (asset: Asset, event: React.MouseEvent) => {
    if (isSelectionMode) {
      event.preventDefault();
      toggleSelection(asset.id);
    } else {
      setSelected(asset);
    }
  };

  // keyboard navigation in grid
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-asset]'));
    let focused = -1;

    const focusItem = (idx: number) => {
      if (idx < 0 || idx >= items.length) return;
      focused = idx;
      items[idx].focus();
    };

    const onKey = (e: KeyboardEvent) => {
      if (items.length === 0) return;
      const cols = Math.max(1, Math.floor((el.clientWidth) / 200));
      if (e.key === 'ArrowRight') { focusItem(Math.min(focused + 1, items.length - 1)); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { focusItem(Math.max(focused - 1, 0)); e.preventDefault(); }
      if (e.key === 'ArrowDown') { focusItem(Math.min(focused + cols, items.length - 1)); e.preventDefault(); }
      if (e.key === 'ArrowUp') { focusItem(Math.max(focused - cols, 0)); e.preventDefault(); }
      if (e.key === 'Enter' && focused >= 0) { const id = items[focused].dataset.asset; const sel = assets.find(a=>a.id===id); if (sel) setSelected(sel); }
    };

    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [filtered, assets]);

  // drag-drop and upload functionality
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      showToast('Please select only image files (JPG, PNG, GIF, WebP)', 'error');
      return;
    }

    // Check file sizes (10MB limit)
    const oversizedFiles = imageFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showToast(`Some files are too large. Maximum size is 10MB per file.`, 'error');
      return;
    }

    setUploading(true);
    showToast(`Uploading ${imageFiles.length} file${imageFiles.length > 1 ? 's' : ''}...`, 'info');
    
    try {
      // Simulate upload progress for each file
      for (const file of imageFiles) {
        // Create a temporary URL for immediate preview
        const tempUrl = URL.createObjectURL(file);
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // In a real app, you would upload to your server here
        console.log(`Uploaded: ${file.name} (${file.size} bytes)`);
        
        // Clean up progress
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
        
        // Clean up object URL
        URL.revokeObjectURL(tempUrl);
      }
      
      // Refresh the assets list after upload
      await loadAssets();
      
      // Show success message
      const count = imageFiles.length;
      showToast(`Successfully uploaded ${count} file${count > 1 ? 's' : ''}!`, 'success');
      
    } catch (error) {
      console.error('Upload failed:', error);
      showToast('Upload failed. Please try again.', 'error');
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex-1">
          <label className="relative block">
            <span className="sr-only">Search media</span>
            <input aria-label="Search media" value={query} onChange={(e)=> setQuery(e.target.value)} className="w-full p-2 bg-surface border border-gray-600 rounded-lg text-text" placeholder="Search by filename" />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <select aria-label="Type filter" value={filterType} onChange={(e)=> setFilterType(e.target.value as any)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text">
            <option value="all">All types</option>
            <option value="image">Images</option>
            <option value="video">Video</option>
          </select>

          <input aria-label="From date" type="date" value={from} onChange={(e)=> setFrom(e.target.value)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text" />
          <input aria-label="To date" type="date" value={to} onChange={(e)=> setTo(e.target.value)} className="p-2 bg-surface border border-gray-600 rounded-lg text-text" />

          <div className="flex items-center gap-2">
            <button onClick={()=> setView('grid')} aria-pressed={view==='grid'} title="Grid view" className={`px-2 py-1 rounded ${view === 'grid' ? 'bg-accent text-white' : 'bg-gray-800 text-subtext'}`}>Grid</button>
            <button onClick={()=> setView('list')} aria-pressed={view==='list'} title="List view" className={`px-2 py-1 rounded ${view === 'list' ? 'bg-accent text-white' : 'bg-gray-800 text-subtext'}`}>List</button>
          </div>
        </div>
      </div>

      {/* Bulk Operations Toolbar */}
      <div className="flex items-center justify-between mb-4 p-3 bg-surface border border-gray-600 rounded-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSelectionMode(!isSelectionMode)}
            className={`px-3 py-1 rounded text-sm ${isSelectionMode ? 'bg-accent text-white' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
          >
            {isSelectionMode ? 'Exit Selection' : 'Select Images'}
          </button>
          
          {/* Show bulk selection buttons when items are selected OR in selection mode */}
          {(isSelectionMode || selectedIds.size > 0) && (
            <>
              <button
                onClick={selectAll}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
              >
                Select All ({filtered.length})
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500"
              >
                Clear Selection
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <span className="text-sm text-text font-medium">
              {selectedIds.size} selected
            </span>
          )}
          
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-500 disabled:opacity-50 font-medium"
            >
              {bulkDeleting ? 'Deleting...' : `Delete Selected (${selectedIds.size})`}
            </button>
          )}
        </div>
      </div>

      {/* WordPress-Style Upload Area */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} 
        onDragLeave={(e) => {
          // Only set dragOver to false if we're leaving the entire drop zone
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOver(false);
          }
        }} 
        onDrop={onDrop} 
        className={`mb-6 border-2 transition-all duration-200 ${
          dragOver 
            ? 'border-dashed border-accent bg-accent/10 scale-[1.02]' 
            : 'border-dashed border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800/70'
        } rounded-lg p-8 text-center cursor-pointer`}
        onClick={() => document.getElementById('file-upload')?.click()}
      > 
        <div className="flex flex-col items-center space-y-4">
          {/* Upload Icon */}
          <div className={`p-4 rounded-full transition-colors ${
            dragOver ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'
          }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <div className="text-text font-medium text-lg">
              {dragOver ? 'Drop files to upload' : 'Upload new media'}
            </div>
            <div className="text-subtext text-sm">
              Drag and drop files here or{' '}
              <span className="text-accent hover:text-accent-light cursor-pointer underline">
                browse files
              </span>
            </div>
            <div className="text-subtext text-xs">
              Supports: JPG, PNG, GIF, WebP (Max 10MB per file)
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('file-upload')?.click();
            }}
            disabled={uploading}
            className="px-6 py-2 bg-accent hover:bg-accent-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {uploading ? 'Uploading...' : 'Select Files'}
          </button>

          {/* Hidden File Input */}
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </div>
        
        {/* Upload Progress */}
        {uploading && Object.keys(uploadProgress).length > 0 && (
          <div className="mt-4 w-full max-w-md">
            <div className="text-sm text-subtext mb-2">Uploading files...</div>
            <div className="space-y-2">
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <div key={fileName} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text truncate">{fileName}</span>
                    <span className="text-accent">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef} tabIndex={0} className={view==='grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' : 'space-y-2'}>
        {loading ? (
          <div className="col-span-full text-center text-subtext py-8">Loading images...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-subtext py-8">No images found</div>
        ) : (
          filtered.map(a => {
            const isSelected = selectedIds.has(a.id);
            return view === 'grid' ? (
              <div 
                key={a.id} 
                data-asset={a.id} 
                tabIndex={-1} 
                className={`relative group bg-gray-800 rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-accent shadow-lg shadow-accent/25' : ''
                }`}
                role="button" 
                aria-label={`${isSelectionMode ? 'Select' : 'Open details for'} ${a.filename}`} 
                onClick={(e) => handleAssetClick(a, e)}
              >
                {/* Selection Checkbox Overlay */}
                {isSelectionMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelection(a.id);
                        // Auto-enable selection mode when first item is selected
                        if (!isSelected && !isSelectionMode) {
                          setIsSelectionMode(true);
                        }
                      }}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                      title={isSelected ? 'Unselect image' : 'Select image'}
                    />
                  </div>
                )}

                {/* Delete Button (always visible in selection mode, hover in normal mode) */}
                <div className={`absolute top-2 right-2 z-10 ${isSelectionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSingle(a.id);
                    }}
                    className="p-1 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg"
                    title="Delete image"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div style={{ paddingBottom: `${((a.height || 300)/(a.width || 400))*100}%` }} className="relative w-full bg-gray-700">
                  <img src={a.url} alt={a.alt_text} className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* Selection Overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-accent/20 border-2 border-accent"></div>
                  )}
                </div>
                <div className="p-2 text-sm text-text">{a.filename}</div>
              </div>
            ) : (
              <div 
                key={a.id} 
                data-asset={a.id} 
                tabIndex={-1} 
                className={`flex items-center gap-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  isSelected ? 'bg-accent/10 border border-accent' : 'bg-panel hover:bg-gray-700'
                }`}
                role="button" 
                aria-label={`${isSelectionMode ? 'Select' : 'Open details for'} ${a.filename}`} 
              >
                {/* Selection Checkbox - Always visible in list view */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelection(a.id);
                    // Auto-enable selection mode when first item is selected
                    if (!isSelected && !isSelectionMode) {
                      setIsSelectionMode(true);
                    }
                  }}
                  className="w-4 h-4 accent-blue-600 cursor-pointer flex-shrink-0"
                  title={isSelected ? 'Unselect image' : 'Select image'}
                />

                {/* Image thumbnail - clickable to open details */}
                <div 
                  className="w-24 h-16 bg-gray-700 flex items-center justify-center overflow-hidden rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                  onClick={() => setSelected(a)}
                  title="View image details"
                >
                  <img src={a.url} alt={a.alt_text} className="w-full h-full object-cover" />
                </div>

                {/* Image info - clickable to open details */}
                <div 
                  className="flex-1 cursor-pointer hover:text-accent transition-colors"
                  onClick={() => setSelected(a)}
                  title="View image details"
                >
                  <div className="text-text font-medium">{a.filename}</div>
                  <div className="text-subtext text-sm">{a.mime_type} • {new Date(a.created_at).toLocaleDateString()}</div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSingle(a.id);
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded flex-shrink-0"
                  title="Delete image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      <DetailsDrawer 
        asset={selected ? {
          id: selected.id,
          name: selected.filename,
          width: selected.width || 400,
          height: selected.height || 300,
          mime: selected.mime_type,
          date: selected.created_at,
          alt: selected.alt_text,
          caption: selected.caption,
          url: selected.url
        } : null} 
        open={!!selected} 
        onClose={()=> setSelected(null)} 
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        title={deleteDialog.type === 'single' ? 'Delete Image' : 'Delete Images'}
        message={
          deleteDialog.type === 'single' 
            ? `Are you sure you want to delete "${deleteDialog.assetName}"? This action cannot be undone.`
            : `Are you sure you want to delete ${deleteDialog.count} selected image${deleteDialog.count === 1 ? '' : 's'}? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Toast Notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
