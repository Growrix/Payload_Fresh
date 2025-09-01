'use client';

import React, { useState } from 'react';

interface Author {
  id: string;
  name: string;
  email: string;
  postCount: number;
}

interface AuthorFilterProps {
  selectedAuthor?: string;
  onAuthorChange: (authorId: string) => void;
  placeholder?: string;
}

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function AuthorFilter({ 
  selectedAuthor, 
  onAuthorChange, 
  placeholder = "All authors" 
}: AuthorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock authors data - in real app this would come from props or API
  const authors: Author[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', postCount: 15 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', postCount: 8 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', postCount: 12 },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', postCount: 6 },
    { id: '5', name: 'David Brown', email: 'david@example.com', postCount: 20 },
  ];

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAuthorData = authors.find(a => a.id === selectedAuthor);

  const handleAuthorSelect = (authorId: string) => {
    onAuthorChange(authorId);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md min-w-[160px] justify-between"
        style={{ backgroundColor: '#181818', color: 'white', border: '1px solid #2a2a2a' }}
      >
        <div className="flex items-center gap-2">
          <UserIcon />
          <span className="truncate">
            {selectedAuthorData ? selectedAuthorData.name : placeholder}
          </span>
        </div>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 rounded-md shadow-lg z-50" style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a', color: 'white' }}>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-3 py-2 text-sm rounded"
                style={{ backgroundColor: '#0b0b0b', color: 'white', border: '1px solid #2a2a2a' }}
              />
              <div className="absolute left-2 top-2.5 text-white/60">
                <SearchIcon />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              <button
                onClick={() => handleAuthorSelect('')}
                className={`block w-full text-left px-3 py-2 text-sm rounded`}
                style={ !selectedAuthor ? { backgroundColor: '#0b0b0b', color: '#9333ea' } : { color: 'white' } }
              >
                <div className="flex items-center gap-2">
                  <UserIcon />
                  <span>All authors</span>
                </div>
              </button>

              {filteredAuthors.length === 0 ? (
                <div className="px-3 py-2 text-sm" style={{ color: 'white' }}>
                  No authors found
                </div>
              ) : (
                filteredAuthors.map((author) => (
                  <button
                    key={author.id}
                    onClick={() => handleAuthorSelect(author.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded`}
                    style={ selectedAuthor === author.id ? { backgroundColor: '#0b0b0b', color: '#9333ea' } : { color: 'white' } }
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{author.name}</div>
                        <div className="text-xs" style={{ color: 'white' }}>{author.email}</div>
                      </div>
                      <div className="text-xs" style={{ backgroundColor: '#181818', color: 'white', padding: '2px 6px', borderRadius: 6 }}>
                        {author.postCount} posts
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
