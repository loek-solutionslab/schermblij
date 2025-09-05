import type { Course } from '@/payload-types'

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

// Sample courses for SchermBlij with realistic Dutch content
export const coursesData: Partial<Course>[] = [
  // Courses for Parents
  {
    title: 'Gezonde Schermtijd voor Peuters',
    slug: 'gezonde-schermtijd-peuters',
    description: createRichText('Leer hoe je op een verantwoorde manier schermen introduceert bij peuters van 2-4 jaar. Praktische tips voor het stellen van grenzen en het kiezen van educatieve content.'),
    // category_id will be set to 'ouders' 
    price: 4500, // €45.00
    duration_minutes: 120,
    format: 'online',
    max_participants: 25,
  },
  {
    title: 'Schermvrije Momenten Creëren',
    slug: 'schermvrije-momenten-creeren',
    description: createRichText('Ontdek hoe je thuis schermvrije zones en tijden creëert. Van gezinstafel tot slaapkamer - maak jouw huis een plek waar verbinding centraal staat.'),
    // category_id will be set to 'ouders'
    price: 3900, // €39.00
    duration_minutes: 90,
    format: 'online',
    max_participants: 30,
  },
  {
    title: 'Omgaan met Sociale Media bij Tieners',
    slug: 'sociale-media-tieners',
    description: createRichText('Hoe begeleid je je tiener veilig door de wereld van sociale media? Leer over privacy, cyberpesten en het ontwikkelen van kritisch denkvermogen.'),
    // category_id will be set to 'ouders'
    price: 5200, // €52.00
    duration_minutes: 150,
    format: 'hybrid',
    max_participants: 20,
  },

  // Courses for Professionals
  {
    title: 'Digitaal Burgerschap in het Onderwijs',
    slug: 'digitaal-burgerschap-onderwijs',
    description: createRichText('Training voor leraren over het integreren van digitaal burgerschap in het curriculum. Praktische lesmethoden en tools voor verschillende leeftijdsgroepen.'),
    // category_id will be set to 'professionals'
    price: 12500, // €125.00
    duration_minutes: 300, // 5 hours
    format: 'physical',
    max_participants: 15,
  },
  {
    title: 'Signalen van Problematisch Schermgebruik',
    slug: 'signalen-problematisch-schermgebruik',
    description: createRichText('Herken vroegtijdig signalen van ongezond schermgebruik bij kinderen en jongeren. Leer interventietechnieken en doorverwijsmogelijkheden.'),
    // category_id will be set to 'professionals'
    price: 9800, // €98.00
    duration_minutes: 180,
    format: 'online',
    max_participants: 40,
  },

  // Courses for Childcare
  {
    title: 'Schermbeleid voor Kinderopvang 0-4 jaar',
    slug: 'schermbeleid-kinderopvang',
    description: createRichText('Ontwikkel een doordacht schermbeleid voor je kinderopvang. Richtlijnen voor verschillende leeftijden en praktische implementatietips.'),
    // category_id will be set to 'kinderdagverblijf'
    price: 8900, // €89.00
    duration_minutes: 240,
    format: 'physical',
    max_participants: 12,
  },
  {
    title: 'Ouders Betrekken bij Schermbeleid',
    slug: 'ouders-betrekken-schermbeleid',
    description: createRichText('Hoe betrek je ouders actief bij het schermbeleid van je kinderopvang? Communicatiestrategieën en workshops voor een consistent beleid thuis en op de opvang.'),
    // category_id will be set to 'kinderdagverblijf'
    price: 6500, // €65.00
    duration_minutes: 120,
    format: 'online',
    max_participants: 25,
  },

  // Courses for Municipality
  {
    title: 'Gemeentelijk Beleid Digitaal Welzijn',
    slug: 'gemeentelijk-beleid-digitaal-welzijn',
    description: createRichText('Ontwikkel effectief gemeentelijk beleid voor digitaal welzijn van inwoners. Van preventie tot interventie - een holistische benadering.'),
    // category_id will be set to 'gemeente'
    price: 25000, // €250.00
    duration_minutes: 480, // 8 hours
    format: 'physical',
    max_participants: 8,
  },
  {
    title: 'Voorlichtingscampagnes Gezonde Schermtijd',
    slug: 'voorlichtingscampagnes-schermtijd',
    description: createRichText('Leer effectieve voorlichtingscampagnes opzetten over gezond schermgebruik. Van doelgroepanalyse tot evaluatie - een praktische workshop.'),
    // category_id will be set to 'gemeente'
    price: 15000, // €150.00
    duration_minutes: 360, // 6 hours
    format: 'hybrid',
    max_participants: 15,
  },
]