import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FormSubmissions: CollectionConfig = {
  slug: 'form_submissions',
  access: {
    create: anyone, // Public can submit forms
    delete: authenticated, // Only authenticated users can delete
    read: authenticated, // Only authenticated users can read
    update: authenticated, // Only authenticated users can update
  },
  admin: {
    defaultColumns: ['form_type', 'name', 'email', 'submitted_at', 'status'],
    useAsTitle: 'name',
    group: 'Forms & Submissions',
  },
  labels: {
    singular: 'Formulier Inzending',
    plural: 'Formulier Inzendingen',
  },
  fields: [
    {
      name: 'form_type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'Inschrijving',
          value: 'enrollment',
        },
        {
          label: 'Nieuwsbrief',
          value: 'newsletter',
        },
        {
          label: 'Download',
          value: 'download',
        },
      ],
      admin: {
        description: 'Type formulier dat is ingevuld',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Naam van de persoon',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'E-mailadres van de persoon',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Telefoonnummer (optioneel)',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        description: 'Bericht of vraag',
      },
    },
    {
      name: 'course_reference',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: false,
      admin: {
        description: 'Gerelateerde cursus (indien van toepassing)',
        position: 'sidebar',
      },
    },
    {
      name: 'submitted_at',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Datum en tijd van inzending',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Nieuw',
          value: 'new',
        },
        {
          label: 'Contact opgenomen',
          value: 'contacted',
        },
        {
          label: 'Afgehandeld',
          value: 'completed',
        },
      ],
      defaultValue: 'new',
      admin: {
        description: 'Status van de inzending',
        position: 'sidebar',
      },
    },
    {
      name: 'admin_notes',
      type: 'textarea',
      access: {
        create: authenticated,
        read: authenticated,
        update: authenticated,
      },
      admin: {
        description: 'Interne notities voor beheerders',
        condition: (_, { user }) => Boolean(user), // Only show for authenticated users
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Set submitted_at for new submissions
        if (operation === 'create' && !data.submitted_at) {
          data.submitted_at = new Date()
        }
        return data
      },
    ],
  },
}