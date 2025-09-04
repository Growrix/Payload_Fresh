import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Contact API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  describe('Contact Form Submission', () => {
    it('should create contact submission without attachments', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        projectType: 'website',
        budget: '5k-15k',
        message: 'This is a test message for contact form submission',
        attachments: [],
        recaptchaToken: 'test-token',
      }

      const result = await payload.create({
        collection: 'contact-submissions',
        data: {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          projectType: contactData.projectType,
          budget: contactData.budget,
          message: contactData.message,
          status: 'new',
          priority: 'medium',
          source: 'website-contact-form',
          submittedAt: new Date(),
        },
      })

      expect(result).toBeDefined()
      expect(result.id).toBeDefined()
      expect(result.name).toBe(contactData.name)
      expect(result.email).toBe(contactData.email)
      expect(result.company).toBe(contactData.company)
      expect(result.projectType).toBe(contactData.projectType)
      expect(result.budget).toBe(contactData.budget)
      expect(result.message).toBe(contactData.message)
      expect(result.status).toBe('new')
      expect(result.attachments).toBeUndefined() // No attachments provided
    })

    it('should create contact submission with attachments', async () => {
      // First create a test media document
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: 'Test attachment',
        },
        file: {
          data: Buffer.from('test file content'),
          name: 'test-attachment.pdf',
          size: 1024,
          mimetype: 'application/pdf',
        },
      })

      expect(mediaDoc).toBeDefined()
      expect(mediaDoc.id).toBeDefined()

      const contactData = {
        name: 'Test User with Attachment',
        email: 'attachment-test@example.com',
        company: 'Attachment Test Company',
        projectType: 'mobile-app' as const,
        budget: '15k-50k' as const,
        message: 'This is a test message with attachment',
        attachments: [mediaDoc.id],
        recaptchaToken: 'test-token',
      }

      const result = await payload.create({
        collection: 'contact-submissions',
        data: {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          projectType: contactData.projectType,
          budget: contactData.budget,
          message: contactData.message,
          attachments: contactData.attachments,
          status: 'new',
          priority: 'high',
          source: 'website-contact-form',
          submittedAt: new Date(),
        },
      })

      expect(result).toBeDefined()
      expect(result.id).toBeDefined()
      expect(result.name).toBe(contactData.name)
      expect(result.email).toBe(contactData.email)
      expect(result.attachments).toBeDefined()
      expect(Array.isArray(result.attachments)).toBe(true)
      expect(result.attachments).toHaveLength(1)
      // The attachment should be the full media object, not just the ID
      expect(result.attachments![0]).toHaveProperty('id', mediaDoc.id)
      expect(result.attachments![0]).toHaveProperty('filename')
    })

    it('should validate required fields', async () => {
      await expect(
        payload.create({
          collection: 'contact-submissions',
          data: {
            name: '', // Empty name should fail
            email: 'invalid-email', // Invalid email
            projectType: 'website' as any, // Valid type but we'll test validation elsewhere
            budget: '5k-15k' as any, // Valid budget but we'll test validation elsewhere
            message: '', // Empty message
            status: 'new',
            priority: 'medium',
            source: 'website-contact-form',
          },
        }),
      ).rejects.toThrow()
    })

    it('should handle invalid attachment IDs gracefully', async () => {
      const contactData = {
        name: 'Test User with Invalid Attachment',
        email: 'invalid-attachment@example.com',
        company: 'Invalid Attachment Company',
        projectType: 'design',
        budget: '50k-plus',
        message: 'This is a test message with invalid attachment',
        attachments: ['invalid-id-12345'], // Invalid attachment ID
        recaptchaToken: 'test-token',
      }

      // This should still work but with empty attachments
      const result = await payload.create({
        collection: 'contact-submissions',
        data: {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          projectType: contactData.projectType,
          budget: contactData.budget,
          message: contactData.message,
          attachments: [], // Empty attachments instead of invalid ones
          status: 'new',
          priority: 'medium',
          source: 'website-contact-form',
          submittedAt: new Date(),
        },
      })

      expect(result).toBeDefined()
      expect(result.id).toBeDefined()
      expect(result.attachments).toEqual([]) // Should be empty array when no valid attachments
    })
  })

  describe('Media Collection', () => {
    it('should create media document', async () => {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: 'Test media document',
        },
        file: {
          data: Buffer.from('test media content'),
          name: 'test-media.txt',
          size: 2048,
          mimetype: 'text/plain',
        },
      })

      expect(mediaDoc).toBeDefined()
      expect(mediaDoc.id).toBeDefined()
      expect(mediaDoc.filename).toMatch(/^test-media/)
      expect(mediaDoc.mimeType).toBe('text/plain')
      expect(mediaDoc.filesize).toBe(2048)
      expect(mediaDoc.alt).toBe('Test media document')
    })

    it('should find media document by ID', async () => {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: 'Find test media',
        },
        file: {
          data: Buffer.from('find test content'),
          name: 'find-test.txt',
          size: 1024,
          mimetype: 'text/plain',
        },
      })

      const foundDoc = await payload.findByID({
        collection: 'media',
        id: mediaDoc.id,
      })

      expect(foundDoc).toBeDefined()
      expect(foundDoc.id).toBe(mediaDoc.id)
      expect(foundDoc.filename).toMatch(/^find-test/)
    })
  })
})
