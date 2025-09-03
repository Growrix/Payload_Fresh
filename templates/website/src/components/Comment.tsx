'use client'

import React, { useState } from 'react'
import { User, Clock, Heart, MessageCircle, Flag, Reply } from 'lucide-react'
import type { Comment } from '@/payload-types'
import CommentForm from './CommentForm'

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[]
}

interface CommentProps {
  comment: CommentWithReplies
  onReply?: (comment: Comment) => void
  onLike?: (commentId: string) => void
  onReport?: (commentId: string) => void
  allowReplies?: boolean
  depth?: number
  maxDepth?: number
}

const CommentComponent: React.FC<CommentProps> = ({
  comment,
  onReply,
  onLike,
  onReport,
  allowReplies = true,
  depth = 0,
  maxDepth = 3,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showReplies, setShowReplies] = useState(true)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24)
      return `${days}d ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1)
      setIsLiked(true)
    } else {
      setLikeCount((prev) => prev - 1)
      setIsLiked(false)
    }

    if (onLike) {
      onLike(comment.id)
    }
  }

  const handleReply = () => {
    setShowReplyForm(!showReplyForm)
  }

  const handleReplySubmitted = (newReply: Comment) => {
    setShowReplyForm(false)
    if (onReply) {
      onReply(newReply)
    }
  }

  const getIndentationLevel = () => {
    return Math.min(depth * 40, maxDepth * 40)
  }

  // Extract text content from Lexical rich text
  const getCommentText = (content: any): string => {
    if (!content || !content.root) return ''

    const extractText = (node: any): string => {
      if (!node) return ''

      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }

      return ''
    }

    return extractText(content.root)
  }

  const commentText = getCommentText(comment.content)

  return (
    <div className="relative" style={{ marginLeft: `${getIndentationLevel()}px` }}>
      {/* Thread Line for Nested Comments */}
      {depth > 0 && <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-700"></div>}

      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-[#9C6BFF] rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* Author Info */}
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-white">{comment.author.name}</h4>
                {comment.author.website && (
                  <a
                    href={comment.author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9C6BFF] hover:text-[#8B5CF6] text-sm"
                  >
                    🔗
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Content */}
        <div className="mb-4">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{commentText}</p>
        </div>

        {/* Comment Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>

          {allowReplies && depth < maxDepth && (
            <button
              onClick={handleReply}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-[#9C6BFF] transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}

          <button
            onClick={() => onReport && onReport(comment.id)}
            className="flex items-center space-x-1 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Flag className="w-4 h-4" />
            <span>Report</span>
          </button>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-6 border-t border-gray-700 pt-6">
            <CommentForm
              postId={typeof comment.post === 'string' ? comment.post : comment.post.id}
              parentCommentId={comment.id}
              onCommentAdded={handleReplySubmitted}
              onCancel={() => setShowReplyForm(false)}
              placeholder={`Reply to ${comment.author.name}...`}
              buttonText="Post Reply"
            />
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-6">
            {showReplies && (
              <div className="space-y-4">
                {comment.replies.map((reply) => (
                  <CommentComponent
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
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentComponent
