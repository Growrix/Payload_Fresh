import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true, // Allow anyone to create contact submissions
    read: authenticated, // Only authenticated users (admins) can read submissions
    update: authenticated, // Only authenticated users (admins) can update
    delete: authenticated, // Only authenticated users (admins) can delete
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'projectType', 'status', 'submittedAt'],
    group: 'Contact',
    description: 'Manage contact form submissions from website',
    listSearchableFields: ['name', 'email', 'company', 'message'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Full name of the person submitting the form',
      },
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address for contact',
      },
      index: true,
    },
    {
      name: 'company',
      type: 'text',
      maxLength: 150,
      admin: {
        description: 'Company or organization name (optional)',
      },
    },
    {
      name: 'projectType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Website',
          value: 'website',
        },
        {
          label: 'Mobile App',
          value: 'mobile-app',
        },
        {
          label: 'Design',
          value: 'design',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        description: 'Type of project they are inquiring about',
      },
      index: true,
    },
    {
      name: 'budget',
      type: 'select',
      required: true,
      options: [
        {
          label: '$5k - $15k',
          value: '5k-15k',
        },
        {
          label: '$15k - $50k',
          value: '15k-50k',
        },
        {
          label: '$50k+',
          value: '50k-plus',
        },
      ],
      admin: {
        description: 'Budget range for the project',
      },
      index: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Detailed message about their project requirements',
        rows: 6,
      },
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Files uploaded with the contact form',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Review',
          value: 'in-review',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current status of the contact submission',
      },
      index: true,
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Priority level for follow-up',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website-contact-form',
      admin: {
        position: 'sidebar',
        description: 'Source of the contact submission',
        readOnly: true,
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Technical metadata for tracking and security',
      },
      fields: [
        {
          name: 'ipAddress',
          type: 'text',
          admin: {
            description: 'IP address of the submitter',
            readOnly: true,
          },
        },
        {
          name: 'userAgent',
          type: 'text',
          admin: {
            description: 'Browser user agent string',
            readOnly: true,
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            description: 'Page referrer URL',
            readOnly: true,
          },
        },
        {
          name: 'utmSource',
          type: 'text',
          admin: {
            description: 'UTM source parameter',
            readOnly: true,
          },
        },
        {
          name: 'utmMedium',
          type: 'text',
          admin: {
            description: 'UTM medium parameter',
            readOnly: true,
          },
        },
        {
          name: 'utmCampaign',
          type: 'text',
          admin: {
            description: 'UTM campaign parameter',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Date and time of submission',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      index: true,
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes for admins (not visible to submitter)',
        rows: 4,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Set submission timestamp and metadata for new submissions
        if (operation === 'create') {
          data.submittedAt = new Date()

          // Capture IP and User Agent
          if (req.headers) {
            data.metadata = data.metadata || {}
            data.metadata.ipAddress =
              req.ip ||
              req.headers['x-forwarded-for'] ||
              req.headers['x-real-ip'] ||
              req.connection?.remoteAddress
            data.metadata.userAgent = req.headers['user-agent']
            data.metadata.referrer = req.headers.referer || req.headers.referrer
          }
        }
        return data
      },
    ],
  },
  timestamps: true,
}
