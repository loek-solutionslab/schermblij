import type { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: {
    singular: 'Team Blok',
    plural: 'Team Blokken',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Kleine tagline boven de hoofdtitel',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Ons Team',
      admin: {
        description: 'Hoofdtitel van het team sectie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Beschrijving onder de titel',
      },
    },
    {
      name: 'display_mode',
      type: 'select',
      options: [
        {
          label: 'Automatisch (alle actieve teamleden)',
          value: 'auto',
        },
        {
          label: 'Handmatig geselecteerd',
          value: 'manual',
        },
        {
          label: 'Alleen uitgelichte teamleden',
          value: 'featured',
        },
      ],
      defaultValue: 'auto',
      admin: {
        description: 'Hoe teamleden worden geselecteerd',
      },
    },
    {
      name: 'team_members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      admin: {
        description: 'Selecteer specifieke teamleden (alleen bij handmatige modus)',
        condition: (data) => data.display_mode === 'manual',
      },
    },
    {
      name: 'max_members',
      type: 'number',
      min: 1,
      max: 20,
      defaultValue: 8,
      admin: {
        description: 'Maximum aantal teamleden om te tonen',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: '2 kolommen (tablet/desktop)',
          value: 'cols-2',
        },
        {
          label: '3 kolommen (desktop)',
          value: 'cols-3',
        },
        {
          label: '4 kolommen (desktop)',
          value: 'cols-4',
        },
      ],
      defaultValue: 'cols-4',
      admin: {
        description: 'Grid layout voor teamleden',
      },
    },
    {
      name: 'show_social_links',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toon social media links voor teamleden',
      },
    },
    {
      name: 'cta_section',
      type: 'group',
      fields: [
        {
          name: 'show_cta',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Toon call-to-action sectie onderaan',
          },
        },
        {
          name: 'cta_heading',
          type: 'text',
          admin: {
            description: 'Titel voor CTA sectie',
            condition: (_, siblingData) => siblingData?.show_cta,
          },
        },
        {
          name: 'cta_description',
          type: 'textarea',
          admin: {
            description: 'Beschrijving voor CTA sectie',
            condition: (_, siblingData) => siblingData?.show_cta,
          },
        },
        {
          name: 'cta_button_text',
          type: 'text',
          admin: {
            description: 'Tekst voor CTA knop',
            condition: (_, siblingData) => siblingData?.show_cta,
          },
        },
        {
          name: 'cta_button_link',
          type: 'text',
          admin: {
            description: 'Link voor CTA knop',
            condition: (_, siblingData) => siblingData?.show_cta,
          },
        },
      ],
      admin: {
        description: 'Optionele call-to-action sectie (bijv. "We werven!")',
      },
    },
  ],
}