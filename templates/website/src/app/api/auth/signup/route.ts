import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Create user in database
    // 4. Send verification email (optional)

    // For now, we'll simulate a successful signup
    // In production, integrate with Payload CMS user creation
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: { name, email, id: Date.now() },
      },
      { status: 201 },
    )

    // Set authentication cookie
    response.cookies.set('auth-token', 'dummy-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
