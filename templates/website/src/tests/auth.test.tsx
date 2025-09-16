import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NextRouter } from 'next/router'
import SigninPage from '@/app/(frontend)/signin/page'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock fetch
global.fetch = vi.fn()

describe('Authentication System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPush.mockClear()
  })

  describe('Signin Page', () => {
    it('renders signin form with email and password fields', () => {
      render(<SigninPage />)

      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.getByText('Sign in to your GrowRix account')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    })

    it('displays Google and Apple OAuth buttons', () => {
      render(<SigninPage />)

      expect(screen.getByText('Continue with Google')).toBeInTheDocument()
      expect(screen.getByText('Continue with Apple')).toBeInTheDocument()
    })

    it('validates email format', async () => {
      render(<SigninPage />)

      const emailInput = screen.getByPlaceholderText('Enter your email')
      const passwordInput = screen.getByPlaceholderText('Enter your password')
      const submitButton = screen.getByText('Sign In')

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
      })
    })

    it('validates required fields', async () => {
      render(<SigninPage />)

      const submitButton = screen.getByText('Sign In')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
        expect(screen.getByText('Password is required')).toBeInTheDocument()
      })
    })

    it('handles successful email/password signin', async () => {
      const mockResponse = {
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: { email: 'test@example.com', id: 123 },
          }),
      }

      ;(global.fetch as any).mockResolvedValueOnce(mockResponse)

      render(<SigninPage />)

      const emailInput = screen.getByPlaceholderText('Enter your email')
      const passwordInput = screen.getByPlaceholderText('Enter your password')
      const submitButton = screen.getByText('Sign In')

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('handles signin API error', async () => {
      const mockResponse = {
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Invalid credentials',
          }),
      }

      ;(global.fetch as any).mockResolvedValueOnce(mockResponse)

      render(<SigninPage />)

      const emailInput = screen.getByPlaceholderText('Enter your email')
      const passwordInput = screen.getByPlaceholderText('Enter your password')
      const submitButton = screen.getByText('Sign In')

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
      })
    })
  })

  describe('OAuth Configuration', () => {
    it('checks Google OAuth provider availability', async () => {
      const mockProvidersResponse = {
        ok: true,
        json: () => Promise.resolve([{ id: 'google', name: 'Google', type: 'oauth' }]),
      }

      ;(global.fetch as any).mockResolvedValueOnce(mockProvidersResponse)

      render(<SigninPage />)

      const googleButton = screen.getByText('Continue with Google')
      fireEvent.click(googleButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/providers')
      })
    })

    it('shows error when Google OAuth is not configured', async () => {
      const mockProvidersResponse = {
        ok: true,
        json: () => Promise.resolve([]), // No providers configured
      }

      ;(global.fetch as any).mockResolvedValueOnce(mockProvidersResponse)

      // Mock alert
      const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})

      render(<SigninPage />)

      const googleButton = screen.getByText('Continue with Google')
      fireEvent.click(googleButton)

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith(
          expect.stringContaining('Google OAuth is not configured'),
        )
      })

      mockAlert.mockRestore()
    })
  })
})
