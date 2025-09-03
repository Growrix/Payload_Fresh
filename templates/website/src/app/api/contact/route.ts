import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { validateContactForm, sanitizeContactForm } from '@/lib/contact-validation'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Parse and sanitize form data
    const body = await request.json()
    const sanitizedData = sanitizeContactForm(body)

    // Validate form data
    const validation = validateContactForm(sanitizedData)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors,
        },
        { status: 400 },
      )
    }

    const { name, email, company, projectType, budget, message, attachments, recaptchaToken } =
      sanitizedData

    // TODO: Verify reCAPTCHA token (Phase 5)
    // if (recaptchaToken) {
    //   const recaptchaValid = await verifyRecaptcha(recaptchaToken)
    //   if (!recaptchaValid) {
    //     return NextResponse.json(
    //       { success: false, error: 'reCAPTCHA verification failed' },
    //       { status: 400 }
    //     )
    //   }
    // }

    // Get client metadata
    const clientIP =
      request.ip ||
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || ''

    // Extract UTM parameters from referrer or headers
    const url = new URL(request.url)
    const utmSource = url.searchParams.get('utm_source') || ''
    const utmMedium = url.searchParams.get('utm_medium') || ''
    const utmCampaign = url.searchParams.get('utm_campaign') || ''

    // Create contact submission in Payload CMS
    const contactSubmission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        company,
        projectType,
        budget,
        message,
        attachments: attachments || [],
        status: 'new',
        priority: 'medium',
        source: 'website-contact-form',
        metadata: {
          ipAddress: clientIP,
          userAgent,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
        },
        submittedAt: new Date(),
      },
    })

    // TODO: Send notification emails (Phase 4)
    // await sendAdminNotification(contactSubmission)
    // await sendUserConfirmation(contactSubmission)

    console.log('Contact form submitted successfully:', {
      id: contactSubmission.id,
      name: contactSubmission.name,
      email: contactSubmission.email,
      company: contactSubmission.company,
      projectType: contactSubmission.projectType,
      submittedAt: contactSubmission.submittedAt,
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submissionId: contactSubmission.id,
    })
  } catch (error) {
    console.error('Contact form submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error:
          'An error occurred while processing your submission. Please try again or contact us directly.',
      },
      { status: 500 },
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
