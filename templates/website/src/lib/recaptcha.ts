// reCAPTCHA verification utility

interface RecaptchaResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  score?: number
  action?: string
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification')
    return true // Skip verification in development if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    })

    const data: RecaptchaResponse = await response.json()

    // For reCAPTCHA v2, just check success
    // For reCAPTCHA v3, you might want to check score as well
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}
