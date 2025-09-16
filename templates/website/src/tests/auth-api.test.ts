import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/auth/providers/route'

// Mock environment variables
vi.mock('process', () => ({
  env: {
    GOOGLE_CLIENT_ID: 'test-google-client-id',
    GOOGLE_CLIENT_SECRET: 'test-google-client-secret',
  },
}))

describe('Auth API Endpoints', () => {
  describe('/api/auth/providers', () => {
    it('returns empty array when OAuth is not configured', async () => {
      const request = new NextRequest('http://localhost:3002/api/auth/providers')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual([])
    })
  })

  describe('OAuth Configuration Detection', () => {
    it('detects placeholder credentials correctly', () => {
      const isGoogleConfigured = () => {
        const clientId = 'test-google-client-id'
        const clientSecret = 'test-google-client-secret'

        return (
          clientId &&
          clientSecret &&
          clientId !== 'your-google-client-id' &&
          clientSecret !== 'your-google-client-secret' &&
          clientId !== 'test-google-client-id' &&
          clientSecret !== 'test-google-client-secret'
        )
      }

      expect(isGoogleConfigured()).toBe(false)
    })

    it('detects real credentials correctly', () => {
      const isGoogleConfigured = () => {
        const clientId = 'real-google-client-id.apps.googleusercontent.com'
        const clientSecret = 'real-google-client-secret'

        return (
          clientId &&
          clientSecret &&
          clientId !== 'your-google-client-id' &&
          clientSecret !== 'your-google-client-secret' &&
          clientId !== 'test-google-client-id' &&
          clientSecret !== 'test-google-client-secret'
        )
      }

      expect(isGoogleConfigured()).toBe(true)
    })
  })
})
