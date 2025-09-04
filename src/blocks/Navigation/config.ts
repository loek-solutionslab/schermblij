import type { Block } from 'payload'

export const Navigation: Block = {
  slug: 'navigation',
  interfaceName: 'NavigationBlock',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: false,
      admin: {
        description: 'Logo image for navigation. If not set, will use logo from Header global.',
      },
    },
    {
      name: 'menu_items',
      type: 'array',
      label: 'Menu Items',
      admin: {
        description: 'Navigation menu items. Can be simple links or dropdown/mega menus.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Type',
          defaultValue: 'link',
          options: [
            {
              label: 'Eenvoudige Link',
              value: 'link',
            },
            {
              label: 'Dropdown Menu',
              value: 'dropdown',
            },
            {
              label: 'Mega Menu',
              value: 'mega_menu',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
        {
          name: 'dropdown_sections',
          type: 'array',
          label: 'Dropdown Secties',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'mega_menu',
          },
          fields: [
            {
              name: 'section_title',
              type: 'text',
              required: true,
              label: 'Sectie Titel',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Menu Items',
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
                {
                  name: 'description',
                  type: 'text',
                  label: 'Beschrijving',
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icoon',
                },
              ],
              maxRows: 10,
            },
          ],
          maxRows: 5,
        },
        {
          name: 'simple_dropdown_items',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
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
          maxRows: 10,
        },
        {
          name: 'featured_content',
          type: 'group',
          label: 'Uitgelichte Content',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'mega_menu',
            description: 'Optional featured content for mega menu (like blog post or promotional content)',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Ondertitel',
            },
            {
              name: 'description',
              type: 'text',
              label: 'Beschrijving',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Afbeelding',
            },
            {
              name: 'link_text',
              type: 'text',
              label: 'Link Tekst',
              defaultValue: 'Lees meer',
            },
            {
              name: 'link_url',
              type: 'text',
              label: 'Link URL',
            },
            {
              name: 'view_all_text',
              type: 'text',
              label: 'Bekijk Alles Tekst',
              defaultValue: 'Bekijk alle artikelen',
            },
            {
              name: 'view_all_url',
              type: 'text',
              label: 'Bekijk Alles URL',
            },
          ],
        },
      ],
      maxRows: 8,
    },
    {
      name: 'cta_buttons',
      type: 'array',
      label: 'CTA Knoppen',
      admin: {
        description: 'Call-to-action buttons shown on the right side of navigation',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Knop Tekst',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Knop URL',
        },
        {
          name: 'style',
          type: 'select',
          label: 'Knop Stijl',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
          ],
        },
      ],
      maxRows: 2,
    },
    {
      name: 'use_header_config',
      type: 'checkbox',
      label: 'Gebruik Header Configuratie',
      defaultValue: true,
      admin: {
        description: 'When enabled, this block will use the menu configuration from the Header global instead of the fields above.',
      },
    },
  ],
  labels: {
    plural: 'Navigatie Blokken',
    singular: 'Navigatie Blok',
  },
}