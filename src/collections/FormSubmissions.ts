import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { emailService } from '../services/email'

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
    afterChange: [
      async ({ doc, req, operation }) => {
        // Send email notifications for new course bookings
        if (operation === 'create' && doc.form_type === 'enrollment') {
          try {
            // Get the related course data if available
            let courseData: any = null
            if (doc.course_reference && typeof doc.course_reference === 'string') {
              try {
                courseData = await req.payload.findByID({
                  collection: 'courses',
                  id: doc.course_reference,
                })
              } catch (error) {
                console.warn('Could not fetch course data for email:', error)
              }
            }

            // Parse children data from the message
            const childrenMatches = doc.message?.match(/Kinderen \((\d+)\):\n([\s\S]*?)(?=\n\n|$)/)
            const children: Array<{ name: string; age: number }> = []
            
            if (childrenMatches && childrenMatches[2]) {
              const childrenLines = childrenMatches[2].split('\n')
              childrenLines.forEach(line => {
                const match = line.match(/- (.+?) \((\d+) jaar oud\)/)
                if (match) {
                  children.push({
                    name: match[1] === 'Naamloos' ? '' : match[1],
                    age: parseInt(match[2])
                  })
                }
              })
            }

            // Parse session info from message
            const sessionMatch = doc.message?.match(/Datum: (.+?)(?:\n|$)/)
            const locationMatch = doc.message?.match(/- Locatie: (.+?)(?:\n|$)/)
            const additionalInfoMatch = doc.message?.match(/Aanvullende informatie:\n([\s\S]*)$/)
            
            const sessionDate = sessionMatch ? sessionMatch[1] : 'Datum niet beschikbaar'
            const sessionLocation = locationMatch ? locationMatch[1] : 'Locatie niet beschikbaar'
            const additionalInfo = additionalInfoMatch ? additionalInfoMatch[1].trim() : undefined
            
            const courseTitle = courseData?.title || 'Onbekende cursus'

            // Send customer confirmation email
            await emailService.sendCustomerConfirmation(
              doc.email,
              doc.name,
              courseTitle,
              sessionDate,
              sessionLocation,
              children
            )

            // Send admin notification email
            const adminEmail = process.env.ADMIN_EMAIL || 'info@schermblij.nl'
            await emailService.sendAdminNotification(
              adminEmail,
              doc.name,
              doc.email,
              doc.phone || 'Geen telefoonnummer opgegeven',
              courseTitle,
              sessionDate,
              sessionLocation,
              children,
              additionalInfo
            )

            console.log(`Course booking emails sent successfully for submission ${doc.id}`)

          } catch (error) {
            console.error('Failed to send course booking emails:', error)
            // Don't throw the error to prevent blocking the form submission
            // Instead, log it for manual follow-up
          }
        }
      },
    ],
  },
}