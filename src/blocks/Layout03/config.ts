import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Layout03: Block = {
  slug: 'layout03',
  interfaceName: 'Layout03Block',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Titel',
      required: true,
      admin: {
        description: 'De hoofdtitel van de sectie',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
      required: true,
      admin: {
        description: 'Afbeelding die rechts van de tekst wordt getoond',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Alt tekst afbeelding',
      admin: {
        description: 'Alternatieve tekst voor de afbeelding voor toegankelijkheid. Indien niet ingevuld wordt de alt tekst van de media gebruikt.',
      },
    },
  ],
  labels: {
    plural: 'Layout 03 Blokken',
    singular: 'Layout 03 Blok',
  },
}