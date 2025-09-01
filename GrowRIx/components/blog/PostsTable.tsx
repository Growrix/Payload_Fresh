'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { saveDraft } from '@/lib/mocks/blogAdapter';
import BulkActions from './PostsTable/BulkActions';
import RowActions from './PostsTable/RowActions';
import StatusBadge from './PostsTable/StatusBadge';
import Pagination from './PostsTable/Pagination';
import DateRangePicker from './shared/DateRangePicker';
import AuthorFilter from './shared/AuthorFilter';
import { useToast } from './shared/Toast';

type Post = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  status: 'published' | 'draft' | 'scheduled' | 'private' | 'trash';
  updated_at: string;
  categories: string[];
  tags: string[];
};

const MOCK_POSTS: Post[] = [
  { 
    id: '1', 
    title: 'Next.js 15 Release Notes and Breaking Changes', 
    author: 'John Doe', 
    authorId: '1',
    status: 'published', 
    updated_at: '2025-08-01T10:00:00Z',
    categories: ['Development', 'Frontend'],
    tags: ['nextjs', 'react', 'javascript']
  },
  { 
    id: '2', 
    title: 'Using Supabase with Edge Functions for Real-time Applications', 
    author: 'Jane Smith', 
    authorId: '2',
    status: 'draft', 
    updated_at: '2025-07-21T09:00:00Z',
    categories: ['Backend', 'Database'],
    tags: ['supabase', 'serverless', 'postgres']
  },
  { 
    id: '3', 
    title: 'Web Accessibility Best Practices in 2025', 
    author: 'Mike Johnson', 
    authorId: '3',
    status: 'published', 
    updated_at: '2025-06-10T12:00:00Z',
    categories: ['Accessibility', 'UX'],
    tags: ['a11y', 'accessibility', 'ux']
  },
  { 
    id: '4', 
    title: 'Advanced TypeScript Patterns for Large Applications', 
    author: 'Sarah Wilson', 
    authorId: '4',
    status: 'scheduled', 
    updated_at: '2025-09-01T08:30:00Z',
    categories: ['Development'],
    tags: ['typescript', 'patterns', 'architecture']
  },
  { 
    id: '5', 
    title: 'Performance Budgets and Web Vitals Optimization', 
    author: 'David Brown', 
    authorId: '5',
    status: 'private', 
    updated_at: '2025-05-02T14:20:00Z',
    categories: ['Performance'],
    tags: ['performance', 'webvitals', 'optimization']
  },
  { 
    id: '6', 
    title: 'Building Scalable React Components with Compound Patterns', 
    author: 'John Doe', 
    authorId: '1',
    status: 'draft', 
    updated_at: '2025-08-15T14:30:00Z',
    categories: ['Development', 'Frontend'],
    tags: ['react', 'components', 'patterns']
  },
  { 
    id: '7', 
    title: 'CSS Grid vs Flexbox: When to Use Each', 
    author: 'Jane Smith', 
    authorId: '2',
    status: 'published', 
    updated_at: '2025-07-05T11:15:00Z',
    categories: ['Frontend', 'CSS'],
    tags: ['css', 'grid', 'flexbox']
  }
];

function formatDate(iso: string) {
  try { 
    const date = new Date(iso);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }); 
  } catch { 
    return iso; 
  }
}

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {direction === 'asc' ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    ) : direction === 'desc' ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    )}
  </svg>
);

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<'title' | 'author' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingPost, setEditingPost] = useState<{ id: string; title: string; status: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setPosts(MOCK_POSTS), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = (posts || []).filter((p) => {
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (authorFilter && p.authorId !== authorFilter) return false;
    
    // Date filtering
    if (startDate || endDate) {
      const postDate = new Date(p.updated_at);
      if (startDate && postDate < new Date(startDate)) return false;
      if (endDate && postDate > new Date(endDate + 'T23:59:59.999Z')) return false;
    }
    
    return true;
  });

  // Sort filtered posts
  const sorted = [...filtered].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;
    
    switch (sortColumn) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'author':
        aValue = a.author.toLowerCase();
        bValue = b.author.toLowerCase();
        break;
      case 'date':
        aValue = new Date(a.updated_at);
        bValue = new Date(b.updated_at);
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = sorted.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(new Set(paginatedPosts.map(p => p.id)));
    } else {
      setSelectedPosts(new Set());
    }
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    const newSelected = new Set(selectedPosts);
    if (checked) {
      newSelected.add(postId);
    } else {
      newSelected.delete(postId);
    }
    setSelectedPosts(newSelected);
  };

  const handleSort = (column: 'title' | 'author' | 'date') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedPosts.size === 0) return;
    
    const selectedPostsArray = Array.from(selectedPosts);
    
    switch (action) {
      case 'publish':
        addToast({
          type: 'success',
          title: 'Posts Published',
          message: `${selectedPostsArray.length} posts have been published successfully.`
        });
        break;
      case 'unpublish':
        addToast({
          type: 'success',
          title: 'Posts Moved to Draft',
          message: `${selectedPostsArray.length} posts have been moved to draft.`
        });
        break;
      case 'trash':
        addToast({
          type: 'success',
          title: 'Posts Moved to Trash',
          message: `${selectedPostsArray.length} posts have been moved to trash.`
        });
        break;
    }
    
    setSelectedPosts(new Set());
  };

  const handleQuickEdit = (post: Post) => {
    setEditingPost({ id: post.id, title: post.title, status: post.status });
  };

  const handleSaveQuickEdit = async () => {
    if (!editingPost) return;
    
    setSaving(true);
    try {
      await saveDraft({
        id: editingPost.id,
        title: editingPost.title,
        status: editingPost.status as any
      });
      
      addToast({
        type: 'success',
        title: 'Post Updated',
        message: 'Post has been updated successfully.'
      });
      
      setEditingPost(null);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update the post. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelQuickEdit = () => {
    setEditingPost(null);
  };

  const handleTrash = (postId: string) => {
    addToast({
      type: 'success',
      title: 'Post Moved to Trash',
      message: 'Post has been moved to trash successfully.'
    });
  };

  const isAllSelected = paginatedPosts.length > 0 && paginatedPosts.every(p => selectedPosts.has(p.id));
  const isIndeterminate = selectedPosts.size > 0 && !isAllSelected;

  if (posts === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#9333ea' }}></div>
        <span className="ml-2 text-white">Loading posts...</span>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0b0b0b' }} className="min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between p-6" style={{ backgroundColor: '#181818' }}>
        <div>
          <h1 className="text-2xl font-semibold text-white">Posts</h1>
          <p className="text-sm text-white/80 mt-1">
            Manage your blog posts, drafts, and published content
          </p>
        </div>
        <Link
          href="/growrix-admin/blog/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 transition-colors"
          style={{ backgroundColor: '#9333ea', borderColor: '#9333ea' }}
        >
          <PlusIcon />
          Add New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="p-6" style={{ backgroundColor: '#0b0b0b' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-md bg-[#181818] text-white border border-gray-700 focus:outline-none"
              style={{ boxShadow: 'none' }}
            />
            <div className="absolute left-2 top-2.5 text-white/60">
              <SearchIcon />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#181818] text-white border border-gray-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="private">Private</option>
          </select>

          {/* Author Filter */}
          <AuthorFilter
            selectedAuthor={authorFilter}
            onAuthorChange={setAuthorFilter}
          />

          {/* Date Range */}
          <div className="lg:col-span-2">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center text-sm text-white/80">
            {filtered.length} of {posts.length} posts
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedPosts.size}
        onBulkAction={handleBulkAction}
        isLoading={saving}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b" style={{ borderColor: '#2a2a2a' }}>
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded text-white focus:ring-2"
                />
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-1 text-xs font-medium text-white/80 uppercase tracking-wider hover:text-white"
                >
                  Title
                  <SortIcon direction={sortColumn === 'title' ? sortDirection : undefined} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('author')}
                  className="flex items-center gap-1 text-xs font-medium text-white/80 uppercase tracking-wider hover:text-white"
                >
                  Author
                  <SortIcon direction={sortColumn === 'author' ? sortDirection : undefined} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Categories
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Tags
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  Status
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1 text-xs font-medium text-white/80 uppercase tracking-wider hover:text-white"
                >
                  Date
                  <SortIcon direction={sortColumn === 'date' ? sortDirection : undefined} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post) => (
              <tr key={post.id} className="group hover:bg-[#181818] transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={(e) => handleSelectPost(post.id, e.target.checked)}
                    className="rounded text-white"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="font-medium text-white hover:text-[#9333ea]">
                      <Link href={`/growrix-admin/blog/posts/${post.id}`}>
                        {post.title}
                      </Link>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <RowActions
                        postId={post.id}
                        status={post.status}
                        onQuickEdit={() => handleQuickEdit(post)}
                        onTrash={() => handleTrash(post.id)}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {post.author}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: '#181818', color: 'white' }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: '#181818', color: 'white' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs text-white/70">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-6 py-4 text-sm text-white/70">
                  {formatDate(post.updated_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {paginatedPosts.length === 0 && (
        <div className="text-center py-12 text-white">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="mb-6">
            {query || statusFilter !== 'all' || authorFilter || startDate || endDate
              ? 'Try adjusting your search criteria or filters.'
              : 'Get started by creating your first post.'}
          </p>
          <Link
            href="/growrix-admin/blog/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md"
            style={{ backgroundColor: '#9333ea' }}
          >
            <PlusIcon />
            Create Your First Post
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Quick Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md" style={{ backgroundColor: '#181818' }}>
            <h3 className="text-lg font-medium text-white mb-4">Quick Edit</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#0b0b0b] text-white border border-gray-700 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Status</label>
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#0b0b0b] text-white border border-gray-700 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancelQuickEdit}
                className="px-4 py-2 text-white rounded-md bg-[#181818] hover:bg-[#222]"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuickEdit}
                className="px-4 py-2 text-white rounded-md"
                style={{ backgroundColor: '#9333ea' }}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

