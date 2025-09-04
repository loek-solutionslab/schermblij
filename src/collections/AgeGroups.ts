import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '../fields/slug'

export const AgeGroups: CollectionConfig = {
  slug: 'age_groups',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'min_age', 'max_age', 'order'],
    useAsTitle: 'name',
    group: 'Content Management',
  },
  labels: {
    singular: 'Leeftijdsgroep',
    plural: 'Leeftijdsgroepen',
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
      name: 'min_age',
      type: 'number',
      required: true,
      min: 0,
      max: 18,
      admin: {
        description: 'Minimale leeftijd in jaren',
      },
    },
    {
      name: 'max_age',
      type: 'number',
      required: true,
      min: 0,
      max: 18,
      admin: {
        description: 'Maximale leeftijd in jaren',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icoon voor deze leeftijdsgroep',
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
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex kleurcode voor UI theming (bijv. #FF5733)',
        position: 'sidebar',
      },
      validate: (val) => {
        if (val && !/^#[0-9A-F]{6}$/i.test(val)) {
          return 'Kleur moet een geldige hex code zijn (bijv. #FF5733)'
        }
        return true
      },
    },
  ],
}