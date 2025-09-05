import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Layout04: Block = {
  slug: 'layout04',
  interfaceName: 'Layout04Block',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Kleine tekst boven de hoofdtitel (bijv. "Interactief")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      admin: {
        description: 'De hoofdtitel van de sectie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
      required: true,
      admin: {
        description: 'Beschrijvende tekst onder de hoofdtitel',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Kenmerken',
      maxRows: 2,
      minRows: 2,
      admin: {
        description: 'Twee kenmerken die naast elkaar worden getoond',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
          admin: {
            description: 'Titel van het kenmerk',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschrijving',
          required: true,
          admin: {
            description: 'Beschrijving van het kenmerk',
          },
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Knoppen',
      maxRows: 2,
      admin: {
        description: 'Knoppen onder de tekst (maximaal 2)',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Knop tekst',
          required: true,
          admin: {
            description: 'Tekst die op de knop wordt getoond',
          },
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Knop type',
          required: true,
          defaultValue: 'secondary',
          options: [
            {
              label: 'Primair',
              value: 'default',
            },
            {
              label: 'Secundair',
              value: 'secondary',
            },
            {
              label: 'Link',
              value: 'link',
            },
            {
              label: 'Omlijning',
              value: 'outline',
            },
          ],
          admin: {
            description: 'Visuele stijl van de knop',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Link waar de knop naar toe gaat (optioneel)',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in nieuw tabblad',
          defaultValue: false,
          admin: {
            description: 'Vink aan om de link in een nieuw tabblad te openen',
            condition: (data) => Boolean(data.url),
          },
        },
      ],
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
    plural: 'Layout 04 Blokken',
    singular: 'Layout 04 Blok',
  },
}