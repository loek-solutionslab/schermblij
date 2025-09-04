import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Navigation'
  },
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contact_info',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          admin: {
            rows: 3,
          },
        },
      ],
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      maxRows: 10,
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            rows: 3,
          },
        },
        {
          name: 'button_text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Subscribe',
        },
      ],
    },
    {
      name: 'footer_links',
      type: 'array',
      label: 'Footer Link Groups',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Group Title',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
          maxRows: 10,
        },
      ],
      maxRows: 5,
    },
    {
      name: 'partner_logos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Partner Logos',
      admin: {
        description: 'Logos of partners/sponsors to display in footer',
      },
    },
    {
      name: 'copyright_text',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2024 SchermBlij. All rights reserved.',
    },
    // Keep legacy navItems for backward compatibility during transition
    {
      name: 'navItems',
      type: 'array',
      label: 'Legacy Nav Items (Deprecated)',
      admin: {
        description: 'This field is deprecated. Use footer_links instead.',
        hidden: true,
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
