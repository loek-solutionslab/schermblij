import type { AgeGroup } from '@/payload-types'

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
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

// Dutch age groups for SchermBlij with screen time guidelines  
export const ageGroupsData: Partial<AgeGroup>[] = [
  {
    name: "Baby's",
    slug: 'baby',
    description: createRichText('Voor de allerkleinsten (0-2 jaar). In deze fase is face-to-face interactie het belangrijkst voor ontwikkeling.'),
    min_age: 0,
    max_age: 2,
    order: 1,
    color: '#FFE4E1', // Light pink
  },
  {
    name: 'Peuters',
    slug: 'peuters', 
    description: createRichText('Eerste kennismaking met schermen (2-4 jaar). Focus op educatieve content en samen kijken.'),
    min_age: 2,
    max_age: 4,
    order: 2,
    color: '#E0F2E7', // Light green
  },
  {
    name: 'Kleuters',
    slug: 'kleuters',
    description: createRichText('Spelend leren met technologie (4-6 jaar). Introduceer creativiteit en probleemoplossing.'),
    min_age: 4,
    max_age: 6, 
    order: 3,
    color: '#FFF2E0', // Light orange
  },
  {
    name: 'Schoolkinderen',
    slug: 'schoolkinderen',
    description: createRichText('Balans tussen spelen en leren (6-12 jaar). Tijd voor regels en eigenverantwoordelijkheid.'),
    min_age: 6,
    max_age: 12,
    order: 4,
    color: '#E0F0FF', // Light blue
  },
  {
    name: 'Tieners',
    slug: 'tieners',
    description: createRichText('Sociale media en zelfstandigheid (12-18 jaar). Focus op gezonde digitale gewoontes.'),
    min_age: 12,
    max_age: 18,
    order: 5,
    color: '#F0E0FF', // Light purple
  },
  {
    name: 'Jongvolwassenen',
    slug: 'jongvolwassenen',
    description: createRichText('Zelfstandig een gezonde balans vinden (18+ jaar). Verantwoordelijkheid en bewustwording.'),
    min_age: 18,
    max_age: 99,
    order: 6,
    color: '#FFE0F0', // Light magenta
  },
]