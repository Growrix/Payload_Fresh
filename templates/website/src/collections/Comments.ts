import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: () => true, // Allow anyone to create comments (guest commenting)
    read: authenticatedOrPublished, // Comments are public when approved
    update: authenticated, // Only authenticated users (admins) can update
    delete: authenticated, // Only authenticated users (admins) can delete
  },
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['content', 'author', 'post', 'status', 'createdAt'],
    group: 'Blog',
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'The comment content',
      },
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          maxLength: 100,
          admin: {
            description: 'Commenter name',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            description: 'Commenter email (not displayed publicly)',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Optional website URL',
          },
          validate: (val: string) => {
            if (!val) return true
            try {
              new URL(val)
              return true
            } catch {
              return 'Please enter a valid URL'
            }
          },
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'Linked user account (if logged in)',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending Review',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Spam',
          value: 'spam',
        },
        {
          label: 'Trash',
          value: 'trash',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Comment moderation status',
      },
      index: true,
    },
    {
      name: 'parentComment',
      type: 'relationship',
      relationTo: 'comments',
      admin: {
        position: 'sidebar',
        description: 'Parent comment for threading (replies)',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Technical metadata for moderation',
      },
      fields: [
        {
          name: 'ipAddress',
          type: 'text',
          admin: {
            description: 'IP address for spam detection',
          },
        },
        {
          name: 'userAgent',
          type: 'text',
          admin: {
            description: 'Browser user agent',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Capture IP and User Agent for new comments
        if (!data.id && req.headers) {
          data.metadata = data.metadata || {}
          data.metadata.ipAddress =
            req.ip || req.headers['x-forwarded-for'] || req.headers['x-real-ip']
          data.metadata.userAgent = req.headers['user-agent']
        }
        return data
      },
    ],
  },
  timestamps: true,
}
