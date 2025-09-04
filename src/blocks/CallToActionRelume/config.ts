import type { Block } from 'payload'

export const CallToActionRelume: Block = {
  slug: 'cta-relume',
  interfaceName: 'CallToActionRelumeBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Hoofdtitel',
      defaultValue: 'Schrijf je nu in!',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Ondertitel',
      defaultValue: 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
      admin: {
        rows: 3,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
      admin: {
        description: 'Optional image to display alongside the CTA form',
      },
    },
    {
      name: 'form_settings',
      type: 'group',
      label: 'Formulier Instellingen',
      fields: [
        {
          name: 'email_placeholder',
          type: 'text',
          label: 'Email Placeholder',
          defaultValue: 'Voer je e-mail in',
        },
        {
          name: 'button_text',
          type: 'text',
          label: 'Knop Tekst',
          defaultValue: 'Inschrijven',
        },
        {
          name: 'success_message',
          type: 'text',
          label: 'Succes Bericht',
          defaultValue: 'Bedankt voor je inschrijving! We houden je op de hoogte.',
        },
        {
          name: 'error_message',
          type: 'text',
          label: 'Fout Bericht',
          defaultValue: 'Er ging iets mis. Probeer het opnieuw.',
        },
        {
          name: 'form_identifier',
          type: 'text',
          label: 'Formulier Identifier',
          defaultValue: 'cta-signup',
          admin: {
            description: 'Unique identifier for this form to track submissions',
          },
        },
      ],
    },
    {
      name: 'terms_and_conditions',
      type: 'group',
      label: 'Algemene Voorwaarden',
      fields: [
        {
          name: 'show_terms',
          type: 'checkbox',
          label: 'Toon Algemene Voorwaarden',
          defaultValue: true,
        },
        {
          name: 'terms_text',
          type: 'text',
          label: 'Voorwaarden Tekst',
          defaultValue: 'Door op Inschrijven te klikken, ga je akkoord met onze',
          admin: {
            condition: (_, siblingData) => siblingData?.show_terms,
          },
        },
        {
          name: 'terms_link_text',
          type: 'text',
          label: 'Link Tekst',
          defaultValue: 'Algemene Voorwaarden',
          admin: {
            condition: (_, siblingData) => siblingData?.show_terms,
          },
        },
        {
          name: 'terms_link_url',
          type: 'text',
          label: 'Link URL',
          defaultValue: '/algemene-voorwaarden',
          admin: {
            condition: (_, siblingData) => siblingData?.show_terms,
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'image-right',
      options: [
        {
          label: 'Afbeelding Rechts',
          value: 'image-right',
        },
        {
          label: 'Afbeelding Links',
          value: 'image-left',
        },
        {
          label: 'Alleen Tekst',
          value: 'text-only',
        },
        {
          label: 'Gecentreerd',
          value: 'centered',
        },
      ],
    },
    {
      name: 'background_color',
      type: 'select',
      label: 'Achtergrond Kleur',
      defaultValue: 'default',
      options: [
        {
          label: 'Standaard',
          value: 'default',
        },
        {
          label: 'Licht',
          value: 'light',
        },
        {
          label: 'Donker',
          value: 'dark',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
      ],
    },
  ],
  labels: {
    plural: 'Call-to-Action Relume Blokken',
    singular: 'Call-to-Action Relume Blok',
  },
}