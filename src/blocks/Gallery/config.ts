import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Galerij Blok',
    plural: 'Galerij Blokken',
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
      defaultValue: 'Afbeeldingen Galerij',
      admin: {
        description: 'Hoofdtitel van de galerij sectie',
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
      name: 'layout_style',
      type: 'select',
      options: [
        {
          label: 'Grid Layout (4 kolommen)',
          value: 'grid',
        },
        {
          label: 'Masonry Layout (2 kolommen)',
          value: 'masonry',
        },
      ],
      defaultValue: 'grid',
      admin: {
        description: 'Layout stijl voor de galerij',
      },
    },
    {
      name: 'display_mode',
      type: 'select',
      options: [
        {
          label: 'Automatisch (alle actieve items)',
          value: 'auto',
        },
        {
          label: 'Handmatig geselecteerd',
          value: 'manual',
        },
        {
          label: 'Op categorie',
          value: 'category',
        },
        {
          label: 'Alleen uitgelicht',
          value: 'featured',
        },
      ],
      defaultValue: 'auto',
      admin: {
        description: 'Hoe galerij items worden geselecteerd',
      },
    },
    {
      name: 'gallery_items',
      type: 'relationship',
      relationTo: 'gallery',
      hasMany: true,
      admin: {
        description: 'Selecteer specifieke galerij items',
        condition: (data) => data.display_mode === 'manual',
      },
    },
    {
      name: 'category_filter',
      type: 'select',
      options: [
        {
          label: 'Media Aandacht',
          value: 'media',
        },
        {
          label: 'Cursusmateriaal',
          value: 'course-materials',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'Team',
          value: 'team',
        },
        {
          label: 'Algemeen',
          value: 'general',
        },
      ],
      admin: {
        description: 'Filter op specifieke categorie',
        condition: (data) => data.display_mode === 'category',
      },
    },
    {
      name: 'max_items',
      type: 'number',
      min: 1,
      max: 24,
      defaultValue: 8,
      admin: {
        description: 'Maximum aantal items om te tonen',
      },
    },
    {
      name: 'enable_lightbox',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Schakel lightbox in voor afbeelding weergave',
      },
    },
    {
      name: 'show_captions',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Toon titels onder de afbeeldingen',
      },
    },
  ],
}