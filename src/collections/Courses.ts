import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { slugField } from '../fields/slug'
import { getServerSideURL } from '../utilities/getURL'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'price', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content Management',
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'courses',
        })
        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'courses',
      })
      return `${getServerSideURL()}${path}`
    },
  },
  labels: {
    singular: 'Cursus',
    plural: 'Cursussen',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Naam van de cursus',
      },
    },
    ...slugField('title'),
    {
      name: 'description',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      admin: {
        description: 'Beschrijving van de cursus',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'course_categories',
      hasMany: false,
      required: true,
      admin: {
        description: 'Cursuscategorie',
        position: 'sidebar',
      },
    },
    {
      name: 'age_groups',
      type: 'relationship',
      relationTo: 'age_groups',
      hasMany: true,
      admin: {
        description: 'Leeftijdsgroepen waarvoor deze cursus geschikt is',
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      admin: {
        description: 'Prijs in euro\'s',
        step: 0.01,
      },
    },
    {
      name: 'duration_minutes',
      type: 'number',
      min: 0,
      admin: {
        description: 'Duur van de cursus in minuten',
      },
    },
    {
      name: 'format',
      type: 'select',
      options: [
        {
          label: 'Online',
          value: 'online',
        },
        {
          label: 'Fysiek',
          value: 'physical',
        },
        {
          label: 'Hybride',
          value: 'hybrid',
        },
      ],
      admin: {
        description: 'Format van de cursus',
      },
    },
    {
      name: 'max_participants',
      type: 'number',
      min: 1,
      admin: {
        description: 'Maximum aantal deelnemers',
      },
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Uitgelichte afbeelding voor de cursus',
      },
    },
    {
      name: 'content_blocks',
      type: 'blocks',
      blocks: [Banner, Code, MediaBlock],
      admin: {
        description: 'Inhoud blokken voor gedetailleerde cursuspagina',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'testimonial',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial tekst',
          },
        },
        {
          name: 'author',
          type: 'text',
          admin: {
            description: 'Naam van de auteur (optioneel)',
          },
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            description: 'Rol/functie van de auteur (optioneel)',
          },
        },
      ],
      admin: {
        description: 'Testimonials van cursusdeelnemers',
      },
    },
    {
      name: 'upcoming_dates',
      type: 'array',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'Datum en tijd van de cursus',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Locatie (voor fysieke of hybride cursussen)',
          },
        },
        {
          name: 'available_spots',
          type: 'number',
          min: 0,
          admin: {
            description: 'Aantal beschikbare plekken',
          },
        },
      ],
      admin: {
        description: 'Aankomende cursusdata',
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
          label: 'Gearchiveerd',
          value: 'archived',
        },
        {
          label: 'Concept',
          value: 'draft',
        },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Status van de cursus',
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
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}