import type { Block } from 'payload'

export const Statistics: Block = {
  slug: 'statistics',
  interfaceName: 'StatisticsBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Optionele tagline boven de hoofdtitel',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      admin: {
        description: 'De hoofdtitel van de statistieken sectie',
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
    {
      name: 'statistics',
      type: 'array',
      label: 'Statistieken',
      minRows: 1,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Nummer',
          required: true,
          admin: {
            description: 'Het statistiek nummer (bijv. "1000+", "95%", "50")',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'Het label voor deze statistiek (bijv. "Cursisten geholpen", "Tevredenheid")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschrijving',
          admin: {
            description: 'Optionele uitgebreide beschrijving van deze statistiek',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Pictogram',
          options: [
            { label: 'Gebruikers', value: 'users' },
            { label: 'Duim omhoog', value: 'thumbup' },
            { label: 'Ster', value: 'star' },
            { label: 'Trend omhoog', value: 'trending' },
            { label: 'Doel', value: 'target' },
            { label: 'Hart', value: 'heart' },
            { label: 'Bliksem', value: 'lightning' },
            { label: 'Schild', value: 'shield' },
            { label: 'Boek', value: 'book' },
            { label: 'Klok', value: 'clock' },
          ],
          admin: {
            description: 'Kies een pictogram dat bij deze statistiek past',
          },
        },
      ],
      admin: {
        description: 'Voeg statistieken toe die u wilt weergeven',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Achtergrondkleur',
      defaultValue: 'white',
      options: [
        { label: 'Wit', value: 'white' },
        { label: 'Lichtgrijs', value: 'gray' },
        { label: 'Primair', value: 'primary' },
        { label: 'Secundair', value: 'secondary' },
      ],
      admin: {
        description: 'Kies de achtergrondkleur voor deze sectie',
      },
    },
  ],
  labels: {
    plural: 'Statistieken Blokken',
    singular: 'Statistieken Blok',
  },
}