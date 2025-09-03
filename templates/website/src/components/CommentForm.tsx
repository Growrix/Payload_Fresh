'use client'

import React, { useState } from 'react'
import { User, Mail, MessageSquare, Send, AlertCircle } from 'lucide-react'
import type { Comment } from '@/payload-types'

interface CreateCommentData {
  postId: string
  content: string
  authorName: string
  authorEmail: string
  authorWebsite?: string
  parentCommentId?: string
  userId?: string
}

interface CommentFormProps {
  postId: string
  parentCommentId?: string
  onCommentAdded?: (comment: Comment) => void
  onCancel?: () => void
  placeholder?: string
  buttonText?: string
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentCommentId,
  onCommentAdded,
  onCancel,
  placeholder = 'Join the conversation...',
  buttonText = 'Post Comment',
}) => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorWebsite: '',
    content: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Name is required'
    }

    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
      newErrors.authorEmail = 'Please enter a valid email'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Comment content is required'
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Comment must be at least 10 characters long'
    }

    if (formData.authorWebsite && formData.authorWebsite.trim()) {
      try {
        new URL(formData.authorWebsite)
      } catch {
        newErrors.authorWebsite = 'Please enter a valid URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const commentData: CreateCommentData = {
        postId,
        content: formData.content,
        authorName: formData.authorName,
        authorEmail: formData.authorEmail,
        authorWebsite: formData.authorWebsite || undefined,
        parentCommentId: parentCommentId || undefined,
      }

      const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData.error || 'Failed to submit comment')
      }

      const newComment = await result.json()

      setShowSuccess(true)
      setFormData({ authorName: '', authorEmail: '', authorWebsite: '', content: '' })

      if (onCommentAdded) {
        onCommentAdded(newComment)
      }

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to submit comment:', error)
      setErrors({ submit: 'Failed to submit comment. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  if (showSuccess) {
    return (
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-green-600">
        <div className="flex items-center space-x-2 text-green-400">
          <AlertCircle className="w-5 h-5" />
          <span>Comment submitted successfully! It will appear after moderation.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-5 h-5 text-[#9C6BFF]" />
        <h3 className="text-lg font-semibold text-white">
          {parentCommentId ? 'Post Reply' : 'Leave a Comment'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author Info Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="authorName"
                value={formData.authorName}
                onChange={(e) => handleChange('authorName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-[#0B0B0B] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors ${
                  errors.authorName ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Your name"
                required
              />
            </div>
            {errors.authorName && <p className="mt-1 text-sm text-red-400">{errors.authorName}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="authorEmail"
                value={formData.authorEmail}
                onChange={(e) => handleChange('authorEmail', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-[#0B0B0B] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors ${
                  errors.authorEmail ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="your@email.com"
                required
              />
            </div>
            {errors.authorEmail && (
              <p className="mt-1 text-sm text-red-400">{errors.authorEmail}</p>
            )}
          </div>
        </div>

        {/* Website Field */}
        <div>
          <label htmlFor="authorWebsite" className="block text-sm font-medium text-gray-300 mb-2">
            Website (optional)
          </label>
          <input
            type="url"
            id="authorWebsite"
            value={formData.authorWebsite}
            onChange={(e) => handleChange('authorWebsite', e.target.value)}
            className={`w-full px-4 py-3 bg-[#0B0B0B] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors ${
              errors.authorWebsite ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="https://yourwebsite.com"
          />
          {errors.authorWebsite && (
            <p className="mt-1 text-sm text-red-400">{errors.authorWebsite}</p>
          )}
        </div>

        {/* Comment Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Comment <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            rows={5}
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className={`w-full px-4 py-3 bg-[#0B0B0B] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] transition-colors resize-y ${
              errors.content ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder={placeholder}
            required
          />
          {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
          <p className="mt-1 text-xs text-gray-500">Minimum 10 characters required</p>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.submit}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-400">
            Your email will not be published. Required fields are marked *
          </div>

          <div className="flex space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-[#9C6BFF] hover:bg-[#8B5CF6] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{buttonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
