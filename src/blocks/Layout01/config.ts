import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const Layout01: Block = {
  slug: 'layout01',
  interfaceName: 'Layout01Block',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Bovenlabel',
      admin: {
        description: 'Klein label boven de hoofdtitel (bijv. "Veiligheid")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      admin: {
        description: 'De hoofdtitel van deze sectie',
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
        maxRows: 2,
        admin: {
          description: 'Call-to-action knoppen (max. 2)',
        },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
      required: true,
      admin: {
        description: 'Hoofdafbeelding die rechts van de tekst wordt getoond',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Alt tekst afbeelding',
      admin: {
        description: 'Alternatieve tekst voor toegankelijkheid. Indien niet ingevuld wordt de alt tekst van de media gebruikt.',
      },
    },
  ],
  labels: {
    plural: 'Layout 01 Blokken',
    singular: 'Layout 01 Blok',
  },
}