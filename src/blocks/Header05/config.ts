import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const Header05: Block = {
  slug: 'header05',
  interfaceName: 'Header05Block',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      admin: {
        description: 'De grote hoofdtitel van de hero sectie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
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
          description: 'Call-to-action knoppen onder de beschrijving',
        },
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Achtergrond afbeelding',
      required: true,
      admin: {
        description: 'De achtergrond afbeelding die over de volledige sectie wordt getoond',
      },
    },
    {
      name: 'overlay',
      type: 'checkbox',
      label: 'Donkere overlay',
      defaultValue: true,
      admin: {
        description: 'Voegt een donkere overlay toe over de achtergrond afbeelding voor betere tekstleesbaarheid',
      },
    },
  ],
  labels: {
    plural: 'Header 05 Blokken',
    singular: 'Header 05 Blok',
  },
}