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

    // Debug: Log the attachments data
    console.log('Contact form attachments received:', attachments)

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
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || ''

    // Extract UTM parameters from referrer or headers
    const url = new URL(request.url)
    const utmSource = url.searchParams.get('utm_source') || ''
    const utmMedium = url.searchParams.get('utm_medium') || ''
    const utmCampaign = url.searchParams.get('utm_campaign') || ''

    // Process attachments - make sure we don't send invalid data
    let processedAttachments: string[] | undefined = undefined

    console.log('Processing attachments:', attachments)

    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      processedAttachments = []
      try {
        // Validate that all attachment IDs exist in the media collection
        for (const attachmentId of attachments) {
          console.log('Validating attachment ID:', attachmentId)
          if (typeof attachmentId === 'string' && attachmentId.trim()) {
            try {
              // Check if the media document exists
              const mediaDoc = await payload.findByID({
                collection: 'media',
                id: attachmentId,
              })

              console.log('Media document found:', mediaDoc ? mediaDoc.id : 'NOT FOUND')

              if (mediaDoc) {
                processedAttachments.push(attachmentId)
              } else {
                console.warn(`Media document with ID ${attachmentId} not found`)
              }
            } catch (findError) {
              console.warn(`Error finding media document ${attachmentId}:`, findError)
            }
          }
        }

        // If no valid attachments found, set to undefined
        if (processedAttachments.length === 0) {
          console.log('No valid attachments found, setting to undefined')
          processedAttachments = undefined
        } else {
          console.log('Valid attachments processed:', processedAttachments)
        }
      } catch (error) {
        console.warn('Error validating attachments:', error)
        // Continue without attachments rather than failing
        processedAttachments = undefined
      }
    } else {
      console.log('No attachments provided or invalid format')
    }

    // Prepare the submission data - only include attachments if we have valid ones
    const submissionData: any = {
      name,
      email,
      company,
      projectType,
      budget,
      message,
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
    }

    // Only add attachments if we have valid ones
    if (processedAttachments && processedAttachments.length > 0) {
      submissionData.attachments = processedAttachments
    }

    console.log('Final submission data being sent to Payload:', submissionData)

    // Create contact submission in Payload CMS
    const contactSubmission = await payload.create({
      collection: 'contact-submissions',
      data: submissionData,
    })

    console.log('Contact submission created successfully:', {
      id: (contactSubmission as any).id,
      attachments: (contactSubmission as any).attachments,
    })

    // TODO: Send notification emails (Phase 4)
    // await sendAdminNotification(contactSubmission)
    // await sendUserConfirmation(contactSubmission)

    console.log('Contact form submitted successfully:', {
      id: (contactSubmission as any).id,
      name: (contactSubmission as any).name,
      email: (contactSubmission as any).email,
      company: (contactSubmission as any).company,
      projectType: (contactSubmission as any).projectType,
      submittedAt: (contactSubmission as any).submittedAt,
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submissionId: (contactSubmission as any).id,
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
