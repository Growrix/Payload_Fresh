'use client';

import React, { useState } from 'react';
import { User, Clock, Heart, MessageCircle, Flag, Edit2, Trash2 } from 'lucide-react';
import { MockComment } from '@/lib/mocks/commentsMockData';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: MockComment;
  onReply?: (comment: MockComment) => void;
  onLike?: (commentId: string) => void;
  onReport?: (commentId: string) => void;
  allowReplies?: boolean;
  depth?: number;
  maxDepth?: number;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  onLike,
  onReport,
  allowReplies = true,
  depth = 0,
  maxDepth = 3
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [showReplies, setShowReplies] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    }
    
    if (onLike) {
      onLike(comment.id);
    }
  };

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmitted = (newReply: MockComment) => {
    setShowReplyForm(false);
    if (onReply) {
      onReply(newReply);
    }
  };

  const getIndentationLevel = () => {
    return Math.min(depth * 40, maxDepth * 40);
  };

  return (
    <div 
      className="relative"
      style={{ marginLeft: `${getIndentationLevel()}px` }}
    >
      {/* Thread Line for Nested Comments */}
      {depth > 0 && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-700"></div>
      )}
      
      <div className="bg-[#0b0b0b] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-[#9333ea] rounded-full flex items-center justify-center flex-shrink-0">
              {comment.authorAvatar ? (
                <img 
                  src={comment.authorAvatar} 
                  alt={comment.authorName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            
            {/* Author Info */}
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-white">{comment.authorName}</h4>
                {comment.isEdited && (
                  <span className="text-xs text-gray-500">(edited)</span>
                )}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(comment.createdAt)}
              </div>
            </div>
          </div>
          
          {/* Comment Status Badge */}
          {comment.status !== 'approved' && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              comment.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700' :
              comment.status === 'spam' ? 'bg-red-900/20 text-red-400 border border-red-700' :
              'bg-gray-900/20 text-gray-400 border border-gray-700'
            }`}>
              {comment.status}
            </span>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="mb-4">
          <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
        
        {/* Comment Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-red-900/20 text-red-400' 
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-900/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </button>
            
            {/* Reply Button */}
            {allowReplies && depth < maxDepth && (
              <button
                onClick={handleReply}
                className="flex items-center space-x-1 text-gray-400 hover:text-[#9333ea] transition-colors px-3 py-1 rounded-full hover:bg-purple-900/10"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Reply</span>
              </button>
            )}
          </div>
          
          {/* Report Button */}
          <button
            onClick={() => onReport && onReport(comment.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors text-sm"
          >
            <Flag className="w-3 h-3" />
            <span>Report</span>
          </button>
        </div>
      </div>
      
      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4">
          <CommentForm
            postId={comment.postId}
            parentId={comment.id}
            onCommentAdded={handleReplySubmitted}
            onCancel={() => setShowReplyForm(false)}
            placeholder="Write your reply..."
            buttonText="Post Reply"
          />
        </div>
      )}
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onReport={onReport}
              allowReplies={allowReplies}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
      
      {/* Toggle Replies Button */}
      {comment.replies && comment.replies.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="mt-2 text-sm text-[#9333ea] hover:text-purple-400 transition-colors"
        >
          {showReplies 
            ? `Hide ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`
            : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`
          }
        </button>
      )}
    </div>
  );
};

export default Comment;
