'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { MessageSquare, Users, Filter, Search, AlertCircle } from 'lucide-react'
import type { Comment } from '@/payload-types'
import CommentComponent from './Comment'
import CommentForm from './CommentForm'

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[]
}

interface CommentsListProps {
  postId: string
  title?: string
  allowComments?: boolean
  showCommentForm?: boolean
  maxDepth?: number
  initialComments?: CommentWithReplies[]
}

const CommentsList: React.FC<CommentsListProps> = ({
  postId,
  title = 'Comments',
  allowComments = true,
  showCommentForm = true,
  maxDepth = 3,
  initialComments = [],
}) => {
  const [comments, setComments] = useState<CommentWithReplies[]>(initialComments)
  const [isLoading, setIsLoading] = useState(!initialComments.length)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewCommentForm, setShowNewCommentForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ref to avoid overlapping fetches and to store the current AbortController
  const isLoadingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Fetch comments from API when component mounts or postId changes
  useEffect(() => {
    console.log('CommentsList useEffect triggered:', {
      postId,
      initialCommentsLength: initialComments.length,
    })

    // NOTE: don't include `initialComments` in the dependency array because the
    // default value (an empty array) is re-created on each render which caused
    // the effect to re-run infinitely. Only run when `postId` changes.
    if (initialComments.length > 0) {
      console.log('Using initial comments:', initialComments)
      setComments(initialComments)
      setIsLoading(false)
    } else {
      console.log('Loading comments from API for postId:', postId)
      loadComments()
    }
  }, [postId])

  const loadComments = useCallback(async () => {
    if (!postId) {
      console.log('No postId provided, skipping comment fetch')
      return
    }

    // Prevent overlapping calls
    if (isLoadingRef.current) {
      console.log('loadComments skipped because a fetch is already in progress')
      return
    }

    // Abort any previous fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    const controller = new AbortController()
    abortControllerRef.current = controller
    isLoadingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const url = `/api/comments?postId=${postId}`
      console.log('Fetching from URL:', url)

      const response = await fetch(url, { signal: controller.signal })
      console.log('API Response:', response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('API Data received:', data)

      setComments(data.comments || [])
      console.log('Comments set to:', data.comments?.length || 0, 'items')
    } catch (err: any) {
      // Ignore abort errors - these are expected when cancelling
      if (err?.name === 'AbortError') {
        console.log('Comments fetch aborted')
        return
      }

      console.error('Error loading comments:', err)
      setError('Failed to load comments. Please try again.')
      setComments([])
    } finally {
      // Clear refs/state
      isLoadingRef.current = false
      abortControllerRef.current = null
      setIsLoading(false)
      console.log('Loading complete')
    }
  }, [postId])

  const sortComments = (commentList: CommentWithReplies[]): CommentWithReplies[] => {
    return [...commentList].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'popular':
          return (b.replies?.length || 0) - (a.replies?.length || 0)
        default:
          return 0
      }
    })
  }

  const filteredComments = comments.filter(
    (comment) =>
      searchQuery === '' ||
      getCommentText(comment.content).toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const handleNewComment = (newComment: Comment) => {
    // Refresh comments list to show the new comment (will be pending)
    loadComments()
    setShowNewCommentForm(false)
  }

  const handleReply = (newReply: Comment) => {
    // Refresh comments to show the new reply
    loadComments()
  }

  const handleLike = (commentId: string) => {
    // TODO: Implement comment liking API
    console.log('Like comment:', commentId)
  }

  const handleReport = (commentId: string) => {
    // TODO: Implement comment reporting API
    console.log('Report comment:', commentId)
  }

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + (comment.replies?.length || 0)
  }, 0)

  return (
    <div className="bg-[#0B0B0B] rounded-xl p-8">
      {/* Comments Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-[#9C6BFF]" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <span className="bg-[#1A1A1A] text-gray-300 px-3 py-1 rounded-full text-sm">
            {totalComments}
          </span>
        </div>

        {allowComments && showCommentForm && (
          <button
            onClick={() => setShowNewCommentForm(!showNewCommentForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#9C6BFF] hover:bg-[#8B5CF6] text-white rounded-lg font-medium transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Add Comment</span>
          </button>
        )}
      </div>

      {/* New Comment Form */}
      {showNewCommentForm && allowComments && (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            onCommentAdded={handleNewComment}
            onCancel={() => setShowNewCommentForm(false)}
          />
        </div>
      )}

      {/* Comments Controls */}
      {comments.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
              className="bg-[#1A1A1A] border border-gray-700 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Replies</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="w-6 h-6 border-2 border-[#9C6BFF] border-t-transparent rounded-full animate-spin" />
            <span>Loading comments...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button
            onClick={loadComments}
            className="ml-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Comments List */}
      {!isLoading && !error && (
        <>
          {filteredComments.length > 0 ? (
            <div className="space-y-6">
              {filteredComments.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  onLike={handleLike}
                  onReport={handleReport}
                  allowReplies={allowComments}
                  depth={0}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          ) : comments.length > 0 ? (
            // Filtered results empty
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No comments found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            // No comments at all
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No comments yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your thoughts!</p>
              {allowComments && !showNewCommentForm && (
                <button
                  onClick={() => setShowNewCommentForm(true)}
                  className="px-6 py-2 bg-[#9C6BFF] hover:bg-[#8B5CF6] text-white rounded-lg font-medium transition-colors"
                >
                  Start the Conversation
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CommentsList
