import type { Block } from 'payload'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: 'Prijzen',
    plural: 'Prijzen',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Hoofdtitel',
      required: true,
      defaultValue: 'Prijsplan',
      admin: {
        description: 'Hoofdtitel van de prijzen sectie',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Ondertitel',
      admin: {
        description: 'Optionele ondertitel boven de hoofdtitel',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
      admin: {
        description: 'Beschrijving onder de titel',
        rows: 2,
      },
    },
    {
      name: 'showBillingToggle',
      type: 'checkbox',
      label: 'Toon tariefperiode wisseling',
      defaultValue: true,
      admin: {
        description: 'Schakel de maandelijks/jaarlijks toggle in of uit',
      },
    },
    {
      name: 'billingPeriods',
      type: 'group',
      label: 'Tariefperioden',
      admin: {
        description: 'Configuratie voor verschillende tariefperioden',
        condition: (_, siblingData) => siblingData.showBillingToggle,
      },
      fields: [
        {
          name: 'monthly',
          type: 'group',
          label: 'Maandelijks',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              defaultValue: 'Maandelijks',
              admin: {
                description: 'Tekst voor maandelijke optie',
              },
            },
          ],
        },
        {
          name: 'yearly',
          type: 'group',
          label: 'Jaarlijks',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              defaultValue: 'Jaarlijks',
              admin: {
                description: 'Tekst voor jaarlijkse optie',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'pricingPlans',
      type: 'array',
      label: 'Prijsplannen',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Verschillende cursus prijsplannen',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Plan naam',
          required: true,
          admin: {
            description: 'Naam van het prijsplan (bijv. "Basisplan", "Premium plan")',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Uitgelicht plan',
          defaultValue: false,
          admin: {
            description: 'Markeer dit plan als aanbevolen/uitgelicht',
          },
        },
        {
          name: 'pricing',
          type: 'group',
          label: 'Prijzen',
          fields: [
            {
              name: 'monthly',
              type: 'group',
              label: 'Maandelijkse prijzen',
              fields: [
                {
                  name: 'price',
                  type: 'text',
                  label: 'Prijs',
                  required: true,
                  admin: {
                    description: 'Maandelijkse prijs (bijv. "€19" of "€19/maand")',
                  },
                },
                {
                  name: 'originalPrice',
                  type: 'text',
                  label: 'Originele prijs',
                  admin: {
                    description: 'Optionele doorgestreepte originele prijs voor kortingsweergave',
                  },
                },
              ],
            },
            {
              name: 'yearly',
              type: 'group',
              label: 'Jaarlijkse prijzen',
              fields: [
                {
                  name: 'price',
                  type: 'text',
                  label: 'Prijs',
                  admin: {
                    description: 'Jaarlijkse prijs (bijv. "€180" of "€180/jaar")',
                  },
                },
                {
                  name: 'originalPrice',
                  type: 'text',
                  label: 'Originele prijs',
                  admin: {
                    description: 'Optionele doorgestreepte originele prijs voor kortingsweergave',
                  },
                },
                {
                  name: 'savingsText',
                  type: 'text',
                  label: 'Bespaartekst',
                  admin: {
                    description: 'Tekst die de besparing toont (bijv. "Bespaar 20% met het jaarplan")',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Functies',
          minRows: 1,
          admin: {
            description: 'Lijst van functies/voordelen die bij dit plan horen',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Functie',
              required: true,
              admin: {
                description: 'Beschrijving van een functie of voordeel',
              },
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Actieknop',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Knop tekst',
              defaultValue: 'Aan de slag',
              admin: {
                description: 'Tekst op de actieknop',
              },
            },
            {
              name: 'link',
              type: 'text',
              label: 'Knop link',
              admin: {
                description: 'URL waar de knop naartoe verwijst',
              },
            },
            {
              name: 'variant',
              type: 'select',
              label: 'Knop stijl',
              defaultValue: 'default',
              options: [
                {
                  label: 'Standaard',
                  value: 'default',
                },
                {
                  label: 'Outline',
                  value: 'outline',
                },
                {
                  label: 'Secundair',
                  value: 'secondary',
                },
              ],
              admin: {
                description: 'Visuele stijl van de knop',
              },
            },
          ],
        },
      ],
    },
  ],
}