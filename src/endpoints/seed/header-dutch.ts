import type { Header } from '@/payload-types'

// Default Dutch header configuration for SchermBlij
export const headerDutch: Partial<Header> = {
  menu_items: [
    {
      label: 'Home',
      type: 'link',
      url: '/',
    },
    {
      label: 'Voor elke leeftijd',
      type: 'dropdown',
      children: [
        {
          label: 'Baby\'s (0-2 jaar)',
          url: '/voor-elke-leeftijd/baby',
          description: 'Schermtijd voor de allerkleinsten',
        },
        {
          label: 'Peuters (2-4 jaar)',
          url: '/voor-elke-leeftijd/peuters',
          description: 'Eerste ervaring met schermen',
        },
        {
          label: 'Kleuters (4-6 jaar)',
          url: '/voor-elke-leeftijd/kleuters',
          description: 'Spelend leren met technologie',
        },
        {
          label: 'Schoolkinderen (6-12 jaar)',
          url: '/voor-elke-leeftijd/schoolkinderen',
          description: 'Balans tussen spelen en leren',
        },
        {
          label: 'Tieners (12-18 jaar)',
          url: '/voor-elke-leeftijd/tieners',
          description: 'Verantwoordelijk omgaan met sociale media',
        },
        {
          label: 'Jongvolwassenen (18+ jaar)',
          url: '/voor-elke-leeftijd/jongvolwassenen',
          description: 'Zelfstandig een gezonde balans vinden',
        },
      ],
    },
    {
      label: 'Cursussen',
      type: 'dropdown',
      children: [
        {
          label: 'Voor Ouders',
          url: '/cursussen/ouders',
          description: 'Praktische tips voor thuis',
        },
        {
          label: 'Voor Professionals',
          url: '/cursussen/professionals',
          description: 'Training voor leraren en zorgverleners',
        },
        {
          label: 'Voor Kinderdagverblijf',
          url: '/cursussen/kinderdagverblijf',
          description: 'Beleid en richtlijnen voor de opvang',
        },
        {
          label: 'Voor Gemeente',
          url: '/cursussen/gemeente',
          description: 'Beleidsvorming en voorlichting',
        },
      ],
    },
    {
      label: 'Blog',
      type: 'link',
      url: '/blog',
    },
    {
      label: 'Contact',
      type: 'link',
      url: '/contact',
    },
  ],
  cta_button: {
    text: 'Cursus Boeken',
    url: '/cursussen',
    style: 'primary',
  },
}