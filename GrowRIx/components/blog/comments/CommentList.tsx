'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, Filter, Search, AlertCircle } from 'lucide-react';
import { MockComment, mockCommentService } from '@/lib/mocks/commentsMockData';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface CommentListProps {
  postId: string;
  title?: string;
  allowComments?: boolean;
  showCommentForm?: boolean;
  maxDepth?: number;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  title = "Comments",
  allowComments = true,
  showCommentForm = true,
  maxDepth = 3
}) => {
  const [comments, setComments] = useState<MockComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId, sortBy]);

  const loadComments = async () => {
    setIsLoading(true);
    
    // UI-ONLY: Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      let loadedComments = mockCommentService.getCommentsByPostId(postId);
      
      // Apply sorting
      loadedComments = sortComments(loadedComments);
      
      setComments(loadedComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortComments = (commentList: MockComment[]): MockComment[] => {
    return [...commentList].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });
  };

  const filteredComments = comments.filter(comment =>
    searchQuery === '' ||
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewComment = (newComment: MockComment) => {
    // UI-ONLY: In real app, this would trigger a refresh or optimistic update
    setShowNewCommentForm(false);
    // Show success message or reload comments
  };

  const handleReply = (reply: MockComment) => {
    // UI-ONLY: In real app, this would update the comment tree
    console.log('New reply added:', reply);
  };

  const handleLike = (commentId: string) => {
    // UI-ONLY: In real app, this would update like count in backend
    console.log('Liked comment:', commentId);
  };

  const handleReport = (commentId: string) => {
    // UI-ONLY: In real app, this would report comment for moderation
    alert('Comment reported for moderation. Thank you for helping keep our community safe.');
  };

  const commentCount = comments.reduce((total, comment) => {
    return total + 1 + (comment.replies?.length || 0);
  }, 0);

  if (!allowComments) {
    return (
      <div className="bg-[#181818] rounded-xl p-8 border border-gray-800 text-center">
        <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Comments Disabled</h3>
        <p className="text-gray-500">Comments are not allowed on this post.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-[#9333ea]" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <span className="bg-[#9333ea] text-white px-3 py-1 rounded-full text-sm font-medium">
            {commentCount}
          </span>
        </div>

        {showCommentForm && (
          <button
            onClick={() => setShowNewCommentForm(!showNewCommentForm)}
            className="flex items-center px-4 py-2 bg-[#9333ea] hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Add Comment
          </button>
        )}
      </div>

      {/* New Comment Form */}
      {showNewCommentForm && showCommentForm && (
        <CommentForm
          postId={postId}
          onCommentAdded={handleNewComment}
          onCancel={() => setShowNewCommentForm(false)}
        />
      )}

      {/* Comments Controls */}
      {commentCount > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#181818] rounded-lg p-4 border border-gray-800">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-[#9333ea]"
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
              className="bg-[#0b0b0b] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#181818] rounded-lg p-6 border border-gray-800 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredComments.length === 0 ? (
        searchQuery ? (
          <div className="bg-[#181818] rounded-xl p-8 border border-gray-800 text-center">
            <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No Results Found</h3>
            <p className="text-gray-500">No comments match your search query.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[#9333ea] hover:text-purple-400 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="bg-[#181818] rounded-xl p-8 border border-gray-800 text-center">
            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No Comments Yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your thoughts!</p>
            {showCommentForm && !showNewCommentForm && (
              <button
                onClick={() => setShowNewCommentForm(true)}
                className="px-6 py-2 bg-[#9333ea] hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Start the conversation
              </button>
            )}
          </div>
        )
      ) : (
        <div className="space-y-6">
          {filteredComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
              onReport={handleReport}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}

      {/* Load More Button (UI-ONLY) */}
      {!isLoading && filteredComments.length > 0 && (
        <div className="text-center pt-6">
          <button className="px-6 py-2 bg-[#181818] hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
