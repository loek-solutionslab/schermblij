import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BlogGrid: Block = {
  slug: 'blog-grid',
  interfaceName: 'BlogGridBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Kleine tekst boven de hoofdtitel (bijv. "Blog")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      defaultValue: 'Ontdek onze nieuwste blogs',
      admin: {
        description: 'De hoofdtitel van de blog sectie',
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
      defaultValue: [
        {
          children: [
            {
              text: 'Informatie en tips voor een gezonde balans',
            },
          ],
        },
      ],
      admin: {
        description: 'Beschrijvende tekst onder de hoofdtitel',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      label: 'Vullen met',
      options: [
        {
          label: 'Automatisch (nieuwste berichten)',
          value: 'collection',
        },
        {
          label: 'Handmatige selectie',
          value: 'selection',
        },
      ],
      admin: {
        description: 'Kies hoe de blog posts worden geselecteerd',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'Selecteer categorieën om te filteren (leeg = alle categorieën)',
      },
      hasMany: true,
      label: 'Filter op categorieën',
      relationTo: 'categories',
    },
    {
      name: 'ageGroups',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'Selecteer leeftijdsgroepen om te filteren (leeg = alle leeftijdsgroepen)',
      },
      hasMany: true,
      label: 'Filter op leeftijdsgroepen',
      relationTo: 'age_groups',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
        description: 'Aantal blog posts om te tonen',
      },
      defaultValue: 6,
      label: 'Aantal posts',
      min: 1,
      max: 12,
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
        description: 'Selecteer handmatig welke blog posts getoond worden',
      },
      hasMany: true,
      label: 'Geselecteerde posts',
      relationTo: 'posts',
    },
    {
      name: 'showViewAllButton',
      type: 'checkbox',
      defaultValue: true,
      label: 'Toon "Bekijk alles" knop',
      admin: {
        description: 'Toon een knop onderaan die naar alle blog posts linkt',
      },
    },
    {
      name: 'viewAllButtonText',
      type: 'text',
      defaultValue: 'Bekijk alles',
      label: 'Tekst "Bekijk alles" knop',
      admin: {
        condition: (_, siblingData) => siblingData.showViewAllButton === true,
        description: 'De tekst op de "Bekijk alles" knop',
      },
    },
    {
      name: 'viewAllButtonLink',
      type: 'text',
      defaultValue: '/blog',
      label: 'Link "Bekijk alles" knop',
      admin: {
        condition: (_, siblingData) => siblingData.showViewAllButton === true,
        description: 'Waar de "Bekijk alles" knop naartoe linkt (bijv. /blog)',
      },
    },
  ],
  labels: {
    plural: 'Blog Grid Blokken',
    singular: 'Blog Grid Blok',
  },
}