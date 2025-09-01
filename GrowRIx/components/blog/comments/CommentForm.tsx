'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, AlertCircle } from 'lucide-react';
import { mockCommentService, MockComment } from '@/lib/mocks/commentsMockData';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentAdded?: (comment: MockComment) => void;
  onCancel?: () => void;
  placeholder?: string;
  buttonText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId,
  onCommentAdded,
  onCancel,
  placeholder = "Join the conversation...",
  buttonText = "Post Comment"
}) => {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Name is required';
    }
    
    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
      newErrors.authorEmail = 'Please enter a valid email';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Comment content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Comment must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // UI-ONLY: Simulate comment submission
      const result = await mockCommentService.addComment({
        postId,
        parentId,
        authorName: formData.authorName,
        authorEmail: formData.authorEmail,
        content: formData.content
      });
      
      if (result.success) {
        setShowSuccess(true);
        setFormData({ authorName: '', authorEmail: '', content: '' });
        
        if (onCommentAdded && result.comment) {
          onCommentAdded(result.comment);
        }
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit comment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-gray-800">
      {/* Header */}
      <div className="flex items-center mb-6">
        <MessageSquare className="w-5 h-5 mr-2 text-[#9333ea]" />
        <h3 className="text-lg font-semibold text-white">
          {parentId ? 'Reply to Comment' : 'Leave a Comment'}
        </h3>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
          <div className="flex items-center text-green-400">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>Your comment has been submitted and is awaiting moderation.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Name *
            </label>
            <input
              type="text"
              id="authorName"
              value={formData.authorName}
              onChange={(e) => handleChange('authorName', e.target.value)}
              className={`w-full px-4 py-3 bg-[#0b0b0b] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors ${
                errors.authorName ? 'border-red-500' : 'border-gray-700 focus:border-[#9333ea]'
              }`}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.authorName && (
              <p className="mt-1 text-sm text-red-400">{errors.authorName}</p>
            )}
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              id="authorEmail"
              value={formData.authorEmail}
              onChange={(e) => handleChange('authorEmail', e.target.value)}
              className={`w-full px-4 py-3 bg-[#0b0b0b] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors ${
                errors.authorEmail ? 'border-red-500' : 'border-gray-700 focus:border-[#9333ea]'
              }`}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
            {errors.authorEmail && (
              <p className="mt-1 text-sm text-red-400">{errors.authorEmail}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Your email won't be published</p>
          </div>
        </div>

        {/* Comment Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Comment *
          </label>
          <textarea
            id="content"
            rows={5}
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className={`w-full px-4 py-3 bg-[#0b0b0b] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors resize-none ${
              errors.content ? 'border-red-500' : 'border-gray-700 focus:border-[#9333ea]'
            }`}
            placeholder={placeholder}
            disabled={isSubmitting}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-400">{errors.content}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-500">
            Comments are moderated and may take some time to appear.
          </p>
          
          <div className="flex space-x-3">
            {parentId && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-[#9333ea] hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {buttonText}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
