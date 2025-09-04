import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer-block',
  interfaceName: 'FooterBlock',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: false,
      admin: {
        description: 'Logo image for footer. If not set, will use logo from Header global.',
      },
    },
    {
      name: 'contact_info',
      type: 'group',
      label: 'Contact Informatie',
      fields: [
        {
          name: 'address_label',
          type: 'text',
          label: 'Adres Label',
          defaultValue: 'Adres:',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adres',
          admin: {
            rows: 3,
          },
        },
        {
          name: 'contact_label',
          type: 'text',
          label: 'Contact Label',
          defaultValue: 'Contact:',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefoonnummer',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Adres',
        },
      ],
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Twitter/X',
              value: 'twitter',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      maxRows: 10,
    },
    {
      name: 'footer_links',
      type: 'array',
      label: 'Footer Link Groepen',
      admin: {
        description: 'Groepen van links voor de footer navigatie',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Groep Titel',
          admin: {
            description: 'Optional title for link group. Leave empty for no title.',
          },
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
          maxRows: 10,
        },
      ],
      maxRows: 5,
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Nieuwsbrief Sectie',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Toon Nieuwsbrief Sectie',
          defaultValue: false,
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Titel',
          defaultValue: 'Blijf op de hoogte',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschrijving',
          admin: {
            rows: 3,
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'button_text',
          type: 'text',
          label: 'Knop Tekst',
          defaultValue: 'Inschrijven',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'placeholder_text',
          type: 'text',
          label: 'Placeholder Tekst',
          defaultValue: 'Voer je e-mail in',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'partner_logos',
      type: 'array',
      label: 'Partner Logos',
      admin: {
        description: 'Logos van partners/sponsors om in de footer te tonen',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Partner Naam',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Website URL',
        },
      ],
      maxRows: 10,
    },
    {
      name: 'legal_links',
      type: 'array',
      label: 'Juridische Links',
      admin: {
        description: 'Links like Privacy Policy, Terms of Service, etc.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      maxRows: 5,
    },
    {
      name: 'copyright_text',
      type: 'text',
      label: 'Copyright Tekst',
      defaultValue: '© 2024 SchermBlij. All rights reserved.',
    },
    {
      name: 'use_footer_config',
      type: 'checkbox',
      label: 'Gebruik Footer Configuratie',
      defaultValue: true,
      admin: {
        description: 'When enabled, this block will use the configuration from the Footer global instead of the fields above.',
      },
    },
  ],
  labels: {
    plural: 'Footer Blokken',
    singular: 'Footer Blok',
  },
}