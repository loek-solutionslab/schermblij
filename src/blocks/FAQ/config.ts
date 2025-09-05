import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Veelgestelde vragen',
      admin: {
        description: 'Hoofdtitel van de FAQ sectie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
      admin: {
        description: 'Optionele beschrijving onder de titel',
        rows: 3,
      },
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Vragen',
      minRows: 1,
      maxRows: 20,
      admin: {
        description: 'Veelgestelde vragen met antwoorden',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Vraag',
          required: true,
          admin: {
            description: 'De vraag die vaak gesteld wordt',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Antwoord',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'Het uitgebreide antwoord op de vraag',
          },
        },
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      label: 'Contact Sectie',
      admin: {
        description: 'Optionele contact sectie onder de FAQ items',
      },
      fields: [
        {
          name: 'showContact',
          type: 'checkbox',
          label: 'Toon contact sectie',
          defaultValue: true,
          admin: {
            description: 'Schakel de contact sectie in of uit',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Contact titel',
          defaultValue: 'Heb je nog vragen?',
          admin: {
            description: 'Titel voor de contact sectie',
            condition: (_, siblingData) => siblingData.showContact,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Contact beschrijving',
          defaultValue: 'Neem contact met ons op voor meer informatie.',
          admin: {
            description: 'Beschrijving voor de contact sectie',
            rows: 2,
            condition: (_, siblingData) => siblingData.showContact,
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button tekst',
          defaultValue: 'Neem contact op',
          admin: {
            description: 'Tekst op de contact button',
            condition: (_, siblingData) => siblingData.showContact,
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button link',
          defaultValue: '/contact',
          admin: {
            description: 'URL waar de button naartoe verwijst',
            condition: (_, siblingData) => siblingData.showContact,
          },
        },
      ],
    },
  ],
}