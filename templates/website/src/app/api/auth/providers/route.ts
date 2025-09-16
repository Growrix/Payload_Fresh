import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if Google OAuth is configured
    const isGoogleConfigured = () => {
      const clientId = process.env.GOOGLE_CLIENT_ID
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET

      return (
        clientId &&
        clientSecret &&
        clientId !== 'your-google-client-id' &&
        clientSecret !== 'your-google-client-secret' &&
        clientId !== 'test-google-client-id' &&
        clientSecret !== 'test-google-client-secret'
      )
    }

    const providers = []

    if (isGoogleConfigured()) {
      providers.push({
        id: 'google',
        name: 'Google',
        type: 'oauth',
        signinUrl: '/api/auth/signin/google',
        callbackUrl: '/api/auth/callback/google',
      })
    }

    return NextResponse.json(providers)
  } catch (error) {
    console.error('Error checking providers:', error)
    return NextResponse.json([], { status: 500 })
  }
}
