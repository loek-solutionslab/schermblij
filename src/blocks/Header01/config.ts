import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const Header01: Block = {
  slug: 'header01',
  interfaceName: 'Header01Block',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Bovenlabel',
      admin: {
        description: 'Optioneel klein label boven de hoofdtitel',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      admin: {
        description: 'De hoofdtitel van de header sectie',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschrijving',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Beschrijvende tekst onder de hoofdtitel',
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'buttons',
        label: 'Knoppen',
        maxRows: 3,
        admin: {
          description: 'Call-to-action knoppen onder de beschrijving',
        },
      },
    }),
    {
      name: 'images',
      type: 'array',
      label: 'Afbeeldingen',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Afbeelding',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt tekst',
          admin: {
            description: 'Alternatieve tekst voor toegankelijkheid. Indien niet ingevuld wordt de alt tekst van de media gebruikt.',
          },
        },
      ],
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Afbeeldingen die rechts van de tekst worden getoond',
      },
    },
  ],
  labels: {
    plural: 'Header 01 Blokken',
    singular: 'Header 01 Blok',
  },
}