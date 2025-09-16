'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, Mail, Lock, Sparkles } from 'lucide-react'

// Animated character component - same as signup but simpler
const WatchingCharacter = ({
  isTypingPassword,
  cursorPosition,
}: {
  isTypingPassword: boolean
  cursorPosition: { x: number; y: number }
}) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const characterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isTypingPassword && characterRef.current) {
      const rect = characterRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = cursorPosition.x - centerX
      const deltaY = cursorPosition.y - centerY

      const maxMovement = 8
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const factor = Math.min(distance / 200, 1)

      setEyePosition({
        x: (deltaX / distance) * maxMovement * factor || 0,
        y: (deltaY / distance) * maxMovement * factor || 0,
      })
    }
  }, [cursorPosition, isTypingPassword])

  return (
    <div ref={characterRef} className="relative">
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-full flex items-center justify-center shadow-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          {isTypingPassword ? (
            <motion.div
              key="hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-white text-2xl"
            >
              🙈
            </motion.div>
          ) : (
            <motion.div
              key="watching"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <div className="text-white text-3xl">👀</div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    x: eyePosition.x,
                    y: eyePosition.y,
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                >
                  <div
                    className="w-2 h-2 bg-black rounded-full opacity-60"
                    style={{ marginLeft: '-2px' }}
                  />
                  <div className="w-2 h-2 bg-black rounded-full opacity-60 ml-3" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute -top-2 -right-2 text-yellow-400"
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
    </div>
  )
}

export default function SigninPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isTypingPassword, setIsTypingPassword] = useState(false)

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    if (field === 'password') {
      setIsTypingPassword(value.length > 0)
    }
  }

  const handlePasswordFocus = () => {
    setIsTypingPassword(true)
  }

  const handlePasswordBlur = () => {
    setTimeout(() => setIsTypingPassword(false), 500)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.user))

        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setErrors({ submit: data.error || 'Login failed. Please check your credentials.' })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialSignin = async (provider: string) => {
    try {
      if (provider === 'google') {
        // Check if Google OAuth is configured
        const response = await fetch('/api/auth/providers')
        const providers = await response.json()

        if (providers.find((p: any) => p.id === 'google')) {
          // Redirect to NextAuth Google OAuth
          window.location.href = '/api/auth/signin/google'
        } else {
          alert(
            'Google OAuth is not configured. Please set up Google OAuth credentials in the .env file. Check OAUTH_SETUP_GUIDE.md for instructions.',
          )
        }
      } else if (provider === 'apple') {
        // For now, show a message that Apple OAuth needs setup
        alert('Apple OAuth requires additional setup. Please use Google or email signin for now.')
      }
    } catch (error) {
      console.error('Social signin error:', error)
      setErrors({ submit: 'Social signin failed. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Character */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <WatchingCharacter isTypingPassword={isTypingPassword} cursorPosition={cursorPosition} />
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="bg-[#181818] rounded-xl p-8 border border-gray-800 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk']"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              className="text-gray-400 font-['Inter']"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Sign in to your GrowRix account
            </motion.p>
          </div>

          {/* Social Signin Buttons */}
          <motion.div
            className="space-y-3 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => handleSocialSignin('google')}
              className="w-full flex items-center justify-center px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg transition-all transform hover:scale-[1.02] font-['Inter'] font-medium"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleSocialSignin('apple')}
              className="w-full flex items-center justify-center px-4 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-all transform hover:scale-[1.02] border border-gray-700 font-['Inter'] font-medium"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#181818] text-gray-400 font-['Inter']">
                Or continue with email
              </span>
            </div>
          </motion.div>

          {/* Email Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2 font-['Inter']"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] focus:border-transparent transition-all font-['Inter']"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 font-['Inter']">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2 font-['Inter']"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="w-full pl-10 pr-12 py-3 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] focus:border-transparent transition-all font-['Inter']"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400 font-['Inter']">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-[#9C6BFF] hover:text-[#8A5FE6] transition-colors font-['Inter']"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center px-6 py-3 bg-[#9C6BFF] hover:bg-[#8A5FE6] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all font-['Inter'] font-medium"
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
            </motion.button>

            {errors.submit && (
              <motion.p
                className="text-sm text-red-400 text-center font-['Inter']"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.submit}
              </motion.p>
            )}
          </motion.form>

          {/* Footer Links */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm text-gray-400 font-['Inter']">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-sm text-[#9C6BFF] hover:text-[#8A5FE6] transition-colors font-['Inter'] font-medium"
            >
              Sign up here
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
