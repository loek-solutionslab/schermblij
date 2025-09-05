import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Klantbeoordelingen',
      admin: {
        description: 'Hoofdtitel van de testimonial sectie',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Ondertitel',
      admin: {
        description: 'Optionele beschrijving onder de titel',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Klantbeoordelingen en ervaringen',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: 'Sterren (1-5)',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: {
            description: 'Aantal sterren (1 tot 5)',
            step: 1,
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Citaat',
          required: true,
          admin: {
            description: 'De testimonial tekst of citaat',
            rows: 3,
          },
        },
        {
          name: 'author',
          type: 'group',
          label: 'Auteur',
          admin: {
            description: 'Informatie over de persoon die de testimonial heeft gegeven',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Naam',
              required: true,
              admin: {
                description: 'Voor- en achternaam van de persoon',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Functie/Rol',
              admin: {
                description: 'Bijv. "Moeder, Lerares" of "Vader, IT Specialist"',
              },
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Profielfoto',
              admin: {
                description: 'Foto van de persoon (vierkante afbeelding werkt het best)',
              },
            },
          ],
        },
        {
          name: 'company',
          type: 'group',
          label: 'Organisatie',
          admin: {
            description: 'Optionele organisatie of bedrijf informatie',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Organisatie naam',
              admin: {
                description: 'Naam van het bedrijf of organisatie',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: {
                description: 'Logo van de organisatie (transparante achtergrond aanbevolen)',
              },
            },
          ],
        },
      ],
    },
  ],
}