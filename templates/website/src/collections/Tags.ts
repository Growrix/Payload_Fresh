import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'A brief description of this tag',
      },
    },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Purple', value: 'purple' },
        { label: 'Red', value: 'red' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Gray', value: 'gray' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Teal', value: 'teal' },
      ],
      defaultValue: 'blue',
      admin: {
        description: 'Color theme for this tag',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this tag in tag clouds and homepage',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Custom meta title for SEO (optional)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Custom meta description for SEO (optional)',
          },
        },
      ],
    },
    ...slugField(),
  ],
}
