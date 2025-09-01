'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { mockUserService } from '@/lib/mocks/commentsMockData';

interface LoginFormProps {
  onSuccess?: (user: any, token: string) => void;
  redirectUrl?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectUrl = '/auth/profile' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      // UI-ONLY: Simulate login
      const result = await mockUserService.loginUser(formData.email, formData.password);
      
      if (result.success && result.user && result.token) {
        // UI-ONLY: Store mock session data
        localStorage.setItem('mockAuthToken', result.token);
        localStorage.setItem('mockUser', JSON.stringify(result.user));
        
        if (onSuccess) {
          onSuccess(result.user, result.token);
        } else {
          // UI-ONLY: Simulate redirect
          window.location.href = redirectUrl;
        }
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
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
    <div className="max-w-md mx-auto">
      <div className="bg-[#181818] rounded-xl p-8 border border-gray-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 bg-[#0b0b0b] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#9333ea]'
                }`}
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full pl-11 pr-12 py-3 bg-[#0b0b0b] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-700 focus:border-[#9333ea]'
                }`}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <div className="flex items-center text-red-400">
                <AlertCircle className="w-4 h-4 mr-2" />
                <p className="text-sm">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 bg-[#9333ea] hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 space-y-4">
          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#9333ea] hover:text-purple-400 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          
          <div className="text-center text-gray-400">
            <span className="text-sm">Don't have an account? </span>
            <Link
              href="/auth/register"
              className="text-sm text-[#9333ea] hover:text-purple-400 transition-colors"
            >
              Sign up here
            </Link>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-300">
              <p className="font-medium mb-1">Demo Mode</p>
              <p className="text-blue-400">
                Try: <strong>sarah@growrix.com</strong> with any password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
