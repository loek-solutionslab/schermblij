import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'role', 'order', 'status', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Content Management',
  },
  labels: {
    singular: 'Teamlid',
    plural: 'Team',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Volledige naam van het teamlid',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Functie of rol binnen het team',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Korte biografie of beschrijving',
      },
    },
    {
      name: 'profile_image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profielfoto van het teamlid',
      },
    },
    {
      name: 'social_links',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profiel URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profiel URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profiel URL',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Persoonlijke website URL',
          },
        },
      ],
      admin: {
        description: 'Social media links',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Volgorde waarin teamleden worden weergegeven (laagste eerst)',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Actief',
          value: 'active',
        },
        {
          label: 'Inactief',
          value: 'inactive',
        },
        {
          label: 'Concept',
          value: 'draft',
        },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Status van het teamlid',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Toon dit teamlid als uitgelicht',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  defaultSort: 'order',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}