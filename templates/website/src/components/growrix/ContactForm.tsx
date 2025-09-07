'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { validateContactForm, type ContactFormData } from '@/lib/contact-validation'
import FileUpload from './FileUpload'
import RecaptchaComponent, { type RecaptchaRef } from './RecaptchaComponent'

interface FormErrors {
  [key: string]: string
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    attachments: [],
    recaptchaToken: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')
  const recaptchaRef = useRef<RecaptchaRef>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFilesChange = (fileIds: string[]) => {
    console.log('ContactForm: Received file IDs from FileUpload:', fileIds)
    setForm((prev) => ({ ...prev, attachments: fileIds }))
  }

  const handleRecaptchaChange = (token: string | null) => {
    setForm((prev) => ({ ...prev, recaptchaToken: token || '' }))

    // Clear recaptcha error if it exists
    if (errors.recaptchaToken) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.recaptchaToken
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setServerError('')
    setSuccess('')

    // Get reCAPTCHA token if not already set
    if (!form.recaptchaToken && recaptchaRef.current) {
      try {
        const token = await recaptchaRef.current.execute()
        if (token) {
          setForm((prev) => ({ ...prev, recaptchaToken: token }))
        } else {
          setErrors({ recaptchaToken: 'Please complete the reCAPTCHA verification' })
          setIsSubmitting(false)
          return
        }
      } catch (error) {
        setErrors({ recaptchaToken: 'reCAPTCHA verification failed' })
        setIsSubmitting(false)
        return
      }
    }

    // Validate form
    const validation = validateContactForm(form)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    try {
      console.log('ContactForm: Submitting form with data:', form)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Thanks  your message was sent successfully! We will get back to you soon.')
        setForm({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: '',
          attachments: [],
          recaptchaToken: '',
        })
        setErrors({})

        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }

        // Auto-hide success message after 10 seconds
        setTimeout(() => setSuccess(''), 10000)
      } else {
        if (result.validationErrors) {
          setErrors(result.validationErrors)
        } else {
          setServerError(result.error || 'An error occurred. Please try again.')
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0B0B0B] p-8 rounded-2xl border border-[#9C6BFF]/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">
            Full Name <span className="text-red-400">*</span>
          </span>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2`}
            disabled={isSubmitting}
          />
          {errors.name && <span className="text-red-400 text-sm mt-1">{errors.name}</span>}
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">
            Email <span className="text-red-400">*</span>
          </span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2`}
            disabled={isSubmitting}
          />
          {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email}</span>}
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">Company</span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.company
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2`}
            disabled={isSubmitting}
          />
          {errors.company && <span className="text-red-400 text-sm mt-1">{errors.company}</span>}
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-[#B0B0B0]">
            Project Type <span className="text-red-400">*</span>
          </span>
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.projectType
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2`}
            disabled={isSubmitting}
          >
            <option value="">Select...</option>
            <option value="website">Website</option>
            <option value="mobile-app">Mobile App</option>
            <option value="design">Design</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && (
            <span className="text-red-400 text-sm mt-1">{errors.projectType}</span>
          )}
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">
            Budget Range <span className="text-red-400">*</span>
          </span>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.budget
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2`}
            disabled={isSubmitting}
          >
            <option value="">Select...</option>
            <option value="5k-15k">$5k - $15k</option>
            <option value="15k-50k">$15k - $50k</option>
            <option value="50k-plus">$50k+</option>
          </select>
          {errors.budget && <span className="text-red-400 text-sm mt-1">{errors.budget}</span>}
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">
            Message <span className="text-red-400">*</span>
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us about your project requirements, goals, and any specific features you need..."
            className={`mt-2 p-3 bg-[#111111] rounded-lg border ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#222] focus:ring-[#9C6BFF]'
            } focus:outline-none focus:ring-2 resize-vertical`}
            disabled={isSubmitting}
          />
          {errors.message && <span className="text-red-400 text-sm mt-1">{errors.message}</span>}
          <span className="text-xs text-[#666] mt-1">{form.message.length}/2000 characters</span>
        </label>

        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-[#B0B0B0]">Upload Files</span>
          <div className="mt-2">
            <FileUpload onFilesChange={handleFilesChange} maxFiles={5} maxSize={10 * 1024 * 1024} />
          </div>
          {errors.attachments && (
            <span className="text-red-400 text-sm mt-1">{errors.attachments}</span>
          )}
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? 'bg-[#9C6BFF]/50 cursor-not-allowed'
                : 'bg-[#9C6BFF] hover:bg-[#8A5CE8]'
            } text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {success && (
            <div className="text-green-400 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </div>
          )}
        </div>

        {serverError && (
          <div className="text-red-400 text-sm flex items-center gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {serverError}
          </div>
        )}

        <div className="text-xs text-[#666] flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Your information is secure and will only be used to contact you about your project.
        </div>
        {/* reCAPTCHA: placed at the end of the form, under the security text and left-aligned */}
        <div className="mt-4 self-start w-fit">
          <RecaptchaComponent
            ref={recaptchaRef}
            siteKey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
              '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            onChange={handleRecaptchaChange}
            theme="dark"
          />
          {errors.recaptchaToken && (
            <span className="text-red-400 text-sm mt-2 block">{errors.recaptchaToken}</span>
          )}
        </div>
      </div>
    </motion.form>
  )
}
