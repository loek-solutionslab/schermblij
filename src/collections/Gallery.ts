import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'order', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content Management',
  },
  labels: {
    singular: 'Galerij Item',
    plural: 'Galerij',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Titel van het galerij item',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Afbeelding voor de galerij',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optionele beschrijving van de afbeelding',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optionele link wanneer op de afbeelding geklikt wordt',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Media Aandacht',
          value: 'media',
        },
        {
          label: 'Cursusmateriaal',
          value: 'course-materials',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'Team',
          value: 'team',
        },
        {
          label: 'Algemeen',
          value: 'general',
        },
      ],
      defaultValue: 'general',
      admin: {
        description: 'Categorie van de afbeelding',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Volgorde waarin afbeeldingen worden weergegeven (laagste eerst)',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Uitgelichte afbeelding',
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
        description: 'Status van het galerij item',
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