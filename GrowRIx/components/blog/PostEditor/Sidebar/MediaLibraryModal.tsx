"use client";

import React, { useEffect, useRef, useState } from 'react';
import { listAssets } from '@/lib/mocks/blogAdapter';

export default function MediaLibraryModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (asset: any) => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load assets from unified adapter when modal opens
  useEffect(() => {
    if (!open) return;
    
    setLoading(true);
    listAssets().then((data) => {
      setAssets(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [open]);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element when modal opens
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/60" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-library-title"
    >
      <div 
        ref={modalRef}
        className="bg-panel border border-gray-700 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 id="media-library-title" className="text-lg font-medium text-text">Media Library</h3>
          <button 
            ref={firstFocusableRef}
            onClick={onClose} 
            className="text-subtext hover:text-text p-1"
            aria-label="Close media library"
          >
            ×
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {loading ? (
            <div className="col-span-full text-center text-subtext">Loading images...</div>
          ) : assets.length === 0 ? (
            <div className="col-span-full text-center text-subtext">No images available</div>
          ) : (
            assets.map((s) => (
              <div key={s.id} className="border border-gray-700 rounded overflow-hidden">
                <div className="w-full h-32 bg-gray-800 overflow-hidden">
                  <img src={s.url} alt={s.alt_text} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 text-sm">
                  <div className="font-medium">{s.filename}</div>
                  <div className="text-xs text-subtext">{s.mime_type} • {(s.size/1024).toFixed(0)} KB</div>
                  <div className="mt-2">
                    <button 
                      onClick={() => { onSelect(s); onClose(); }} 
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Select ${s.filename}`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
