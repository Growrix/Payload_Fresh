// Contact form validation utilities

export interface ContactFormData {
  name: string
  email: string
  company?: string
  projectType: string
  budget: string
  message: string
  attachments?: string[]
  recaptchaToken?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateContactForm = (data: Partial<ContactFormData>): ValidationResult => {
  const errors: Record<string, string> = {}

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
  }

  // Company validation (optional)
  if (data.company && data.company.trim().length > 150) {
    errors.company = 'Company name must be less than 150 characters'
  }

  // Project type validation
  const validProjectTypes = ['website', 'mobile-app', 'design', 'other']
  if (!data.projectType) {
    errors.projectType = 'Project type is required'
  } else if (!validProjectTypes.includes(data.projectType)) {
    errors.projectType = 'Please select a valid project type'
  }

  // Budget validation
  const validBudgets = ['5k-15k', '15k-50k', '50k-plus']
  if (!data.budget) {
    errors.budget = 'Budget range is required'
  } else if (!validBudgets.includes(data.budget)) {
    errors.budget = 'Please select a valid budget range'
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be less than 2000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const sanitizeContactForm = (data: Partial<ContactFormData>): ContactFormData => {
  return {
    name: data.name?.trim() || '',
    email: data.email?.toLowerCase().trim() || '',
    company: data.company?.trim() || '',
    projectType: data.projectType || '',
    budget: data.budget || '',
    message: data.message?.trim() || '',
    attachments: data.attachments || [],
    recaptchaToken: data.recaptchaToken || '',
  }
}

// Project type display labels
export const PROJECT_TYPE_LABELS = {
  website: 'Website',
  'mobile-app': 'Mobile App',
  design: 'Design',
  other: 'Other',
} as const

// Budget range display labels
export const BUDGET_LABELS = {
  '5k-15k': '$5k - $15k',
  '15k-50k': '$15k - $50k',
  '50k-plus': '$50k+',
} as const

// Status labels for admin
export const STATUS_LABELS = {
  new: 'New',
  'in-review': 'In Review',
  contacted: 'Contacted',
  closed: 'Closed',
} as const

// Priority labels for admin
export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
} as const
