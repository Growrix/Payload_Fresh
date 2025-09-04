'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface RecaptchaComponentProps {
  siteKey: string
  onChange?: (token: string | null) => void
  theme?: 'light' | 'dark'
  size?: 'compact' | 'normal' | 'invisible'
}

export interface RecaptchaRef {
  execute: () => Promise<string | null>
  reset: () => void
  getValue: () => string | null
}

const RecaptchaComponent = forwardRef<RecaptchaRef, RecaptchaComponentProps>(
  ({ siteKey, onChange, theme = 'dark', size = 'normal' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    useImperativeHandle(ref, () => ({
      execute: async () => {
        if (recaptchaRef.current) {
          return await recaptchaRef.current.executeAsync()
        }
        return null
      },
      reset: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      },
      getValue: () => {
        if (recaptchaRef.current) {
          return recaptchaRef.current.getValue()
        }
        return null
      },
    }))

    // Default site key for testing (will work on localhost)
    const defaultSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

    return (
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey || defaultSiteKey}
          onChange={onChange}
          theme={theme}
          size={size}
        />
      </div>
    )
  },
)

RecaptchaComponent.displayName = 'RecaptchaComponent'

export default RecaptchaComponent
