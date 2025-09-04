import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '../fields/slug'

export const CourseCategories: CollectionConfig = {
  slug: 'course_categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'target_audience', 'order'],
    useAsTitle: 'name',
    group: 'Content Management',
  },
  labels: {
    singular: 'Cursuscategorie',
    plural: 'Cursuscategorieën',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    ...slugField('name'),
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icoon voor deze cursuscategorie',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Volgorde voor weergave (lagere nummers eerst)',
        position: 'sidebar',
      },
    },
    {
      name: 'target_audience',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Ouders',
          value: 'parents',
        },
        {
          label: 'Professionals',
          value: 'professionals',
        },
        {
          label: 'Gemeenten',
          value: 'municipalities',
        },
        {
          label: 'Kinderdagverblijven',
          value: 'daycare',
        },
      ],
      admin: {
        description: 'Doelgroep voor deze cursuscategorie',
        position: 'sidebar',
      },
    },
  ],
}