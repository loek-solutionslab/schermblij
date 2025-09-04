import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Navigation'
  },
  label: 'Navigatie',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'menu_items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Type',
          defaultValue: 'link',
          options: [
            {
              label: 'Link',
              value: 'link',
            },
            {
              label: 'Dropdown',
              value: 'dropdown',
            },
            {
              label: 'Mega Menu',
              value: 'mega_menu',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Child Items',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown' || siblingData?.type === 'mega_menu',
          },
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
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              admin: {
                condition: (_, siblingData) => {
                  return (siblingData as any)?.type === 'mega_menu';
                },
              },
            },
          ],
        },
      ],
      maxRows: 8,
    },
    {
      name: 'age_groups_menu',
      type: 'relationship',
      relationTo: 'age_groups',
      hasMany: true,
      label: 'Age Groups Menu',
      admin: {
        description: 'Select age groups to display in navigation menu',
      },
    },
    {
      name: 'course_categories_menu',
      type: 'relationship',
      relationTo: 'course_categories',
      hasMany: true,
      label: 'Course Categories Menu',
      admin: {
        description: 'Select course categories to display in navigation menu',
      },
    },
    {
      name: 'cta_button',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
          ],
        },
      ],
    },
    // Keep legacy navItems for backward compatibility during transition
    {
      name: 'navItems',
      type: 'array',
      label: 'Legacy Nav Items (Deprecated)',
      admin: {
        description: 'This field is deprecated. Use menu_items instead.',
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
    afterChange: [revalidateHeader],
  },
}
