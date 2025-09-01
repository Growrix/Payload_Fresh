'use client';

import React, { useState } from 'react';

interface MediaInsertionProps {
  onMediaInsert: (media: { url: string; alt: string; caption?: string }) => void;
  onClose: () => void;
}

const ImageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Mock media library data
const MOCK_MEDIA = [
  {
    id: '1',
    url: '/demo-images/tech-1.jpg',
    alt: 'Modern workspace with laptop',
    filename: 'workspace-laptop.jpg',
    size: '1.2 MB',
    dimensions: '1920x1080'
  },
  {
    id: '2',
    url: '/demo-images/tech-2.jpg',
    alt: 'Code on screen',
    filename: 'code-screen.jpg',
    size: '890 KB',
    dimensions: '1600x900'
  },
  {
    id: '3',
    url: '/demo-images/tech-3.jpg',
    alt: 'Mobile app development',
    filename: 'mobile-dev.jpg',
    size: '1.5 MB',
    dimensions: '1920x1280'
  },
  {
    id: '4',
    url: '/demo-images/office-1.jpg',
    alt: 'Team collaboration',
    filename: 'team-collab.jpg',
    size: '2.1 MB',
    dimensions: '2048x1365'
  },
  {
    id: '5',
    url: '/demo-images/office-2.jpg',
    alt: 'Office meeting room',
    filename: 'meeting-room.jpg',
    size: '1.8 MB',
    dimensions: '1920x1280'
  },
  {
    id: '6',
    url: '/demo-images/office-3.jpg',
    alt: 'Creative workspace',
    filename: 'creative-space.jpg',
    size: '1.3 MB',
    dimensions: '1600x1067'
  }
];

export default function MediaInsertion({ onMediaInsert, onClose }: MediaInsertionProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<typeof MOCK_MEDIA[0] | null>(null);
  const [imageSettings, setImageSettings] = useState({
    alt: '',
    caption: '',
    size: 'full',
    alignment: 'none'
  });

  const filteredMedia = MOCK_MEDIA.filter(item =>
    item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageSelect = (image: typeof MOCK_MEDIA[0]) => {
    setSelectedImage(image);
    setImageSettings({
      ...imageSettings,
      alt: image.alt
    });
  };

  const handleInsert = () => {
    if (selectedImage) {
      onMediaInsert({
        url: selectedImage.url,
        alt: imageSettings.alt,
        caption: imageSettings.caption
      });
      onClose();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In a real app, this would upload the file and return the URL
      const file = files[0];
      const url = URL.createObjectURL(file);
      
      onMediaInsert({
        url,
        alt: file.name,
        caption: ''
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg w-full max-w-4xl h-[80vh] flex flex-col" style={{ backgroundColor: '#0b0b0b', color: 'white' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #2a2a2a' }}>
          <h2 className="text-lg font-semibold">Add Media</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid #2a2a2a' }}>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'library' ? 'text-white' : 'text-white/60'}`}
            style={ activeTab === 'library' ? { borderBottom: '2px solid #9333ea' } : {} }
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'upload' ? 'text-white' : 'text-white/60'}`}
            style={ activeTab === 'upload' ? { borderBottom: '2px solid #9333ea' } : {} }
          >
            Upload Files
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'upload' ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="rounded-lg p-12" style={{ border: '2px dashed #2a2a2a' }}>
                      <UploadIcon />
                      <div className="mt-4">
                        <p className="text-lg font-medium">Upload files</p>
                        <p className="text-sm text-white/70 mt-1">
                          Drag and drop files here, or click to select files
                        </p>
                      </div>
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search media files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-md"
                    style={{ backgroundColor: '#0b0b0b', color: 'white', border: '1px solid #2a2a2a' }}
                  />
                  <div className="absolute left-2 top-2.5 text-white/60">
                    <SearchIcon />
                  </div>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleImageSelect(item)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all`}
                      style={ selectedImage?.id === item.id ? { borderColor: '#9333ea', boxShadow: '0 0 0 2px rgba(147,51,234,0.12)' } : { borderColor: 'transparent' } }
                    >
                      <div className="aspect-square bg-[#181818] flex items-center justify-center">
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden text-white">
                          <ImageIcon />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                        <p className="text-xs truncate">{item.filename}</p>
                        <p className="text-xs text-white/70">{item.dimensions}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredMedia.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No media files found
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          {selectedImage && activeTab === 'library' && (
            <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Attachment Details</h3>
              
              {/* Preview */}
              <div className="mb-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="w-full rounded border"
                />
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Filename:</span>
                  <div>{selectedImage.filename}</div>
                </div>
                <div>
                  <span className="text-gray-500">File size:</span>
                  <div>{selectedImage.size}</div>
                </div>
                <div>
                  <span className="text-gray-500">Dimensions:</span>
                  <div>{selectedImage.dimensions}</div>
                </div>
              </div>

              {/* Settings */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={imageSettings.alt}
                    onChange={(e) => setImageSettings({...imageSettings, alt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe this image..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caption
                  </label>
                  <textarea
                    value={imageSettings.caption}
                    onChange={(e) => setImageSettings({...imageSettings, caption: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Enter caption (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <select
                    value={imageSettings.size}
                    onChange={(e) => setImageSettings({...imageSettings, size: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="thumbnail">Thumbnail</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="full">Full Size</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alignment
                  </label>
                  <select
                    value={imageSettings.alignment}
                    onChange={(e) => setImageSettings({...imageSettings, alignment: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleInsert}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Insert into post
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
