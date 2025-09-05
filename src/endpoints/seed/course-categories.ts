import type { CourseCategory } from '@/payload-types'

// Helper function to convert text to richText format
const createRichText = (text: string): any => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '',
    indent: 0,
    version: 1,
  },
})

// Dutch course categories for SchermBlij target audiences
export const courseCategoriesData: Partial<CourseCategory>[] = [
  {
    name: 'Voor Ouders',
    slug: 'ouders',
    description: createRichText('Praktische cursussen voor ouders om gezonde schermgewoontes thuis te stimuleren. Leer hoe je grenzen stelt, alternatieven biedt en een goed voorbeeld geeft.'),
    target_audience: 'parents',
    order: 1,
  },
  {
    name: 'Voor Professionals',
    slug: 'professionals', 
    description: createRichText('Training voor leraren, pedagogen en zorgverleners. Professionele tools en methoden om kinderen te begeleiden in hun digitale ontwikkeling.'),
    target_audience: 'professionals',
    order: 2,
  },
  {
    name: 'Voor Kinderdagverblijf',
    slug: 'kinderdagverblijf',
    description: createRichText('Beleid en richtlijnen voor kinderopvang. Hoe implementeer je gezond schermgebruik in de dagelijkse opvang van jonge kinderen?'),
    target_audience: 'daycare',
    order: 3,
  },
  {
    name: 'Voor Gemeente',
    slug: 'gemeente',
    description: createRichText('Beleidsvorming en voorlichting op gemeentelijk niveau. Hoe creëer je een gezonde digitale omgeving voor alle inwoners?'),
    target_audience: 'municipalities',
    order: 4,
  },
]