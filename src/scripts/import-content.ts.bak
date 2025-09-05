/**
 * SchermBlij Content Import Script
 * 
 * This script prepares seed data for importing Relume content into Payload CMS.
 * Based on content analysis from /src/scripts/content-mapping.md
 * 
 * DO NOT EXECUTE - This is a preparation script for future import
 */

import type { AgeGroup, CourseCategory, Course, Post, Category } from '../payload-types'

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Generate URL-safe slug from Dutch text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e') 
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[çć]/g, 'c')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Create rich text content structure for Payload
 */
export function createRichText(content: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: content
            }
          ]
        }
      ]
    }
  }
}

/**
 * Generate current timestamp for publishedAt fields
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

// ==========================================
// TYPESCRIPT INTERFACES
// ==========================================

interface SeedAgeGroup extends Partial<AgeGroup> {
  name: string
  min_age: number
  max_age: number
  description: any // Rich text
  order: number
  color?: string
  who_guidelines?: string
}

interface SeedCourseCategory extends Partial<CourseCategory> {
  name: string
  description: any // Rich text
  target_audience: 'parents' | 'professionals' | 'municipalities' | 'daycare'
  order: number
}

interface SeedCourse {
  title: string
  description: any // Rich text
  category: string // Will be resolved to ID during import
  age_groups?: string[] // Will be resolved to IDs during import
  price?: number
  duration_minutes?: number
  format?: 'online' | 'physical' | 'hybrid'
  status: 'active' | 'archived' | 'draft'
}

interface SeedBlogCategory extends Partial<Category> {
  name: string
  description?: string
}

interface SeedBlogPost {
  title: string
  content: any // Rich text
  excerpt?: string
  categories?: string[] // Will be resolved to IDs during import
  publishedAt: string
  _status: 'published' | 'draft'
}

// ==========================================
// SEED DATA: AGE GROUPS
// ==========================================

export const seedAgeGroups: SeedAgeGroup[] = [
  {
    name: 'Baby',
    slug: 'baby',
    min_age: 0,
    max_age: 1,
    order: 1,
    color: '#FFE5E5',
    who_guidelines: 'De Wereldgezondheidsorganisatie (WHO) adviseert geen schermtijd voor baby\'s onder de 1 jaar. Echte interactie met verzorgers is essentieel voor hun ontwikkeling.',
    description: createRichText(
      'In de eerste levensfase is directe, menselijke interactie cruciaal voor de ontwikkeling van je baby. ' +
      'De WHO raadt aan om schermtijd volledig te vermijden voor kinderen onder de 1 jaar. ' +
      'Focus op face-to-face communicatie, voorlezen, zingen en fysiek spel voor optimale hersenontwikkeling.'
    )
  },
  {
    name: 'Peuters', 
    slug: 'peuters',
    min_age: 1,
    max_age: 3,
    order: 2,
    color: '#E5F3FF',
    who_guidelines: 'Voor peuters tussen 1-3 jaar beveelt de WHO aan om schermtijd te beperken en altijd samen te kijken met een volwassene.',
    description: createRichText(
      'Peuters leren het beste door actieve interactie. Samen kijken naar schermen en erover praten ' +
      'bevordert hun ontwikkeling. Kies hoogwaardige, educatieve content en maak er een sociale ' +
      'ervaring van door vragen te stellen en het verhaal uit te breiden.'
    )
  },
  {
    name: 'Kleuters',
    slug: 'kleuters', 
    min_age: 3,
    max_age: 5,
    order: 3,
    color: '#E5FFE5',
    who_guidelines: 'De WHO adviseert maximaal 1 uur schermtijd per dag voor kleuters tussen 3-5 jaar, bij voorkeur met hoogwaardige content.',
    description: createRichText(
      'Kleuters kunnen meer profiteren van schermtijd als deze goed wordt beheerd. Maximaal één uur per dag ' +
      'van hoogwaardige, educatieve content helpt bij hun cognitieve ontwikkeling. Kies programma\'s die ' +
      'interactie stimuleren en sluit aan bij hun leerervaringen.'
    )
  },
  {
    name: 'Onderbouw',
    slug: 'onderbouw',
    min_age: 6, 
    max_age: 8,
    order: 4,
    color: '#FFF5E5',
    who_guidelines: 'Voor schoolgaande kinderen zijn duidelijke regels en grenzen belangrijk, met focus op kwaliteit boven kwantiteit.',
    description: createRichText(
      'Kinderen in de onderbouw kunnen meer gestructureerde schermtijd aan. Focus op educatieve content ' +
      'die hun schoolse vaardigheden ondersteunt. Stel duidelijke tijdslimieten in en creëer ' +
      'schermvrije zones voor huiswerk, maaltijden en voor het slapen gaan.'
    )
  },
  {
    name: 'Bovenbouw',
    slug: 'bovenbouw', 
    min_age: 9,
    max_age: 12,
    order: 5,
    color: '#F0E5FF',
    who_guidelines: 'Oudere kinderen hebben meer autonomie nodig, maar nog steeds begeleiding bij digitale vaardigheden en online veiligheid.',
    description: createRichText(
      'Kinderen in de bovenbouw ontwikkelen meer zelfstandigheid in hun schermgebruik. Dit is het moment ' +
      'om mediawijsheid te onderwijzen: kritisch denken, online veiligheid, en het herkennen van ' +
      'betrouwbare informatie. Betrek hen bij het opstellen van gezinsregels voor schermgebruik.'
    )
  },
  {
    name: 'Tieners',
    slug: 'tieners',
    min_age: 13,
    max_age: 18,
    order: 6, 
    color: '#FFE5F0',
    who_guidelines: 'Tieners hebben meer zelfstandigheid, maar hebben nog steeds begeleiding nodig bij online privacy, cyberpesten en gezonde schermgewoonten.',
    description: createRichText(
      'Tieners gebruiken schermen als belangrijk sociaal hulpmiddel. Focus op open communicatie over ' +
      'online ervaringen, privacy-instellingen, en het balanceren van digitale en offline activiteiten. ' +
      'Help hen gezonde gewoonten te ontwikkelen die ze hun hele leven kunnen gebruiken.'
    )
  }
]

// ==========================================
// SEED DATA: COURSE CATEGORIES  
// ==========================================

export const seedCourseCategories: SeedCourseCategory[] = [
  {
    name: 'Cursussen voor Ouders',
    slug: 'ouders',
    target_audience: 'parents',
    order: 1,
    description: createRichText(
      'Praktische cursussen die ouders helpen bij het navigeren van schermtijd in het gezin. ' +
      'Leer evidence-based strategieën voor het creëren van een gezonde balans tussen online ' +
      'en offline activiteiten voor kinderen van alle leeftijden.'
    )
  },
  {
    name: 'Training voor Professionals',
    slug: 'professionals', 
    target_audience: 'professionals',
    order: 2,
    description: createRichText(
      'Gespecialiseerde training voor zorgprofessionals, pedagogen, en andere professionals ' +
      'die werken met kinderen en gezinnen. Ontwikkel expertise in mediawijsheid en ' +
      'leer evidence-based interventiestrategieën toe te passen.'
    )
  },
  {
    name: 'Programma\'s voor Kinderdagverblijven',
    slug: 'kinderdagverblijf',
    target_audience: 'daycare', 
    order: 3,
    description: createRichText(
      'Opleidingen voor kinderopvangprofessionals over verantwoord schermgebruik in ' +
      'kinderopvang settings. Leer hoe digitale media de ontwikkeling van jonge kinderen ' +
      'kan ondersteunen zonder de persoonlijke interactie te vervangen.'
    )
  },
  {
    name: 'Gemeentelijke Programma\'s',
    slug: 'gemeenten',
    target_audience: 'municipalities',
    order: 4, 
    description: createRichText(
      'Community-brede programma\'s voor lokale overheden die mediawijsheid willen ' +
      'promoten. Inclusief informatiesessies, e-learning modules, en groepsgesprekken ' +
      'om ouders en gezinnen continue ondersteuning te bieden.'
    )
  }
]

// ==========================================
// SEED DATA: SAMPLE COURSES
// ==========================================

export const seedCourses: SeedCourse[] = [
  // Courses for Parents
  {
    title: 'Schermbalans voor het Hele Gezin',
    slug: 'schermbalans-gezin',
    category: 'ouders',
    age_groups: ['baby', 'peuters', 'kleuters', 'onderbouw'],
    price: 89.00,
    duration_minutes: 90,
    format: 'online',
    status: 'active',
    description: createRichText(
      'Leer hoe je een gezonde balans tussen schermtijd en offline activiteiten kunt creëren ' +
      'voor kinderen van alle leeftijden. Deze cursus behandelt praktische strategieën, ' +
      'wetenschappelijke inzichten, en geeft je tools om positieve schermgewoonten te ' +
      'ontwikkelen in je gezin.'
    )
  },
  {
    title: 'Online Veiligheid voor Kinderen',
    slug: 'online-veiligheid-kinderen',
    category: 'ouders', 
    age_groups: ['onderbouw', 'bovenbouw', 'tieners'],
    price: 75.00,
    duration_minutes: 120,
    format: 'hybrid',
    status: 'active',
    description: createRichText(
      'Essentiële strategieën om je kinderen veilig online te houden. Ontdek hoe je hen ' +
      'kunt begeleiden in de digitale wereld, privacy-instellingen kunt instellen, en ' +
      'open gesprekken kunt voeren over online ervaringen en uitdagingen.'
    )
  },
  
  // Professional Training
  {
    title: 'Mediawijsheid in de Zorgpraktijk',
    slug: 'mediawijsheid-zorgpraktijk', 
    category: 'professionals',
    price: 150.00,
    duration_minutes: 240,
    format: 'physical',
    status: 'active',
    description: createRichText(
      'Gespecialiseerde training voor zorgprofessionals over het integreren van ' +
      'mediawijsheid in therapeutische en begeleidingspraktijken. Leer evidence-based ' +
      'interventies en strategieën voor verschillende leeftijdsgroepen en ontwikkelingsniveaus.'
    )
  },
  
  // Daycare Programs  
  {
    title: 'Verantwoord Schermgebruik in de Kinderopvang',
    slug: 'schermgebruik-kinderopvang',
    category: 'kinderdagverblijf',
    age_groups: ['baby', 'peuters', 'kleuters'], 
    price: 120.00,
    duration_minutes: 180,
    format: 'physical',
    status: 'active',
    description: createRichText(
      'Ontdek hoe verantwoord schermgebruik de ontwikkeling van kinderen in de kinderopvang ' +
      'kan versterken. Leer wanneer en hoe digitale media ingezet kunnen worden als ' +
      'educatief hulpmiddel, zonder de essentiële persoonlijke interactie te vervangen.'
    )
  },
  
  // Municipal Programs
  {
    title: 'Community Mediawijsheid Programma',
    slug: 'community-mediawijsheid', 
    category: 'gemeenten',
    price: 0, // Free municipal service
    duration_minutes: 120,
    format: 'hybrid',
    status: 'active',
    description: createRichText(
      'Een uitgebreid programma voor gemeenten om mediawijsheid te promoten in de lokale ' +
      'gemeenschap. Inclusief informatiesessies voor ouders, e-learning modules, en ' +
      'faciliteit voor groepsgesprekken om continue ondersteuning te bieden aan gezinnen.'
    )
  }
]

// ==========================================
// SEED DATA: BLOG CATEGORIES
// ==========================================

export const seedBlogCategories: SeedBlogCategory[] = [
  {
    name: 'Ouderschap Tips',
    slug: 'ouderschap-tips',
    description: 'Praktische tips en advies voor ouders over opvoeding in het digitale tijdperk'
  },
  {
    name: 'Schermgebruik Advies', 
    slug: 'schermgebruik-advies',
    description: 'Evidence-based advies over gezond schermgebruik voor kinderen'
  },
  {
    name: 'Gezinsactiviteiten',
    slug: 'gezinsactiviteiten', 
    description: 'Leuke offline activiteiten en creatieve ideeën voor gezinnen'
  },
  {
    name: 'Online Veiligheid',
    slug: 'online-veiligheid',
    description: 'Tips en strategie&#xEB;n voor het veilig houden van kinderen online'
  },
  {
    name: 'Mediawijsheid',
    slug: 'mediawijsheid',
    description: 'Educatie over kritisch mediagebruik en digitale geletterdheid'
  }
]

// ==========================================
// SEED DATA: BLOG POSTS
// ==========================================

export const seedBlogPosts: SeedBlogPost[] = [
  {
    title: 'Hoe schermtijd een positieve ervaring kan zijn',
    slug: 'schermtijd-positieve-ervaring',
    categories: ['ouderschap-tips', 'schermgebruik-advies'],
    excerpt: 'Ontdek hoe je schermtijd kunt integreren in het gezinsleven op een manier die ontwikkeling bevordert.',
    publishedAt: getCurrentTimestamp(),
    _status: 'published',
    content: createRichText(
      'Schermtijd hoeft niet negatief te zijn. Met de juiste aanpak kan het een waardevolle ' +
      'aanvulling zijn op de ontwikkeling van je kind. In dit artikel delen we praktische ' +
      'strategieën om van schermtijd een positieve, educatieve ervaring te maken die ' +
      'de band tussen ouder en kind versterkt.'
    )
  },
  {
    title: 'Tips voor het veilig gebruik van media',
    slug: 'veilig-gebruik-media',
    categories: ['online-veiligheid', 'ouderschap-tips'],
    excerpt: 'Leer hoe kinderen veilig kunnen omgaan met digitale media met deze praktische tips.',
    publishedAt: getCurrentTimestamp(), 
    _status: 'published',
    content: createRichText(
      'Online veiligheid begint met open communicatie en duidelijke afspraken. Ontdek ' +
      'hoe je je kinderen kunt voorbereiden op de digitale wereld met praktische tips ' +
      'voor privacy-instellingen, het herkennen van gevaren, en het creëren van een ' +
      'veilige online omgeving thuis.'
    )
  },
  {
    title: 'Creatieve offline activiteiten voor gezinnen',
    slug: 'offline-activiteiten-gezinnen',
    categories: ['gezinsactiviteiten', 'ouderschap-tips'],
    excerpt: 'Ontdek leuke manieren om offline tijd door te brengen met je gezin.',
    publishedAt: getCurrentTimestamp(),
    _status: 'published', 
    content: createRichText(
      'Het creëren van betekenisvolle offline momenten is essentieel voor een gezonde ' +
      'schermbalans. Van creatieve knutselprojecten tot buitenspelen - ontdek activiteiten ' +
      'die niet alleen leuk zijn, maar ook de ontwikkeling en gezinsbanden versterken.'
    )
  },
  {
    title: 'Balans tussen schermtijd en spel',
    slug: 'balans-schermtijd-spel',
    categories: ['schermgebruik-advies', 'mediawijsheid'],
    excerpt: 'Leer hoe je een gezonde balans kunt vinden tussen digitale en analoge activiteiten.',
    publishedAt: getCurrentTimestamp(),
    _status: 'published',
    content: createRichText(
      'Een gezonde balans tussen schermtijd en vrij spel is cruciaal voor de ontwikkeling ' +
      'van kinderen. Leer praktische strategieën om beide te integreren op een manier ' +
      'die de voordelen maximaliseert en potenti&#xEB;le nadelen minimaliseert.'
    )
  },
  {
    title: 'De voordelen van digitale media voor kinderen',
    slug: 'voordelen-digitale-media',
    categories: ['mediawijsheid', 'schermgebruik-advies'],
    excerpt: 'Ontdek de positieve impact van technologie op de ontwikkeling van kinderen.',
    publishedAt: getCurrentTimestamp(),
    _status: 'published',
    content: createRichText(
      'Digitale media kunnen, mits goed gebruikt, de creativiteit, probleemoplossend ' +
      'vermogen en sociale vaardigheden van kinderen versterken. Ontdek hoe je de ' +
      'voordelen van technologie kunt benutten voor de optimale ontwikkeling van je kind.'
    )
  },
  {
    title: 'Effectieve communicatie met kinderen over schermtijd',
    slug: 'communicatie-kinderen-schermtijd',
    categories: ['ouderschap-tips', 'mediawijsheid'],
    excerpt: 'Leer hoe je open en constructieve gesprekken met je kinderen kunt voeren over media.',
    publishedAt: getCurrentTimestamp(),
    _status: 'published',
    content: createRichText(
      'Open communicatie is de sleutel tot het succesvol managen van schermtijd in gezinnen. ' +
      'Leer technieken om constructieve gesprekken te voeren, grenzen samen te stellen, ' +
      'en kinderen te betrekken bij het maken van gezonde keuzes rond mediagebruik.'
    )
  }
]

// ==========================================
// IMPORT ORCHESTRATION FUNCTIONS
// ==========================================

/**
 * Main import orchestration function
 * This demonstrates the order of operations for importing data
 * DO NOT EXECUTE - This is a structure template
 */
export async function executeContentImport() {
  console.log('🚀 SchermBlij Content Import Started')
  console.log('⚠️  This is a preparation script - manual execution required')
  
  try {
    // Step 1: Import Blog Categories (no dependencies)
    console.log('📁 Importing blog categories...')
    // const blogCategories = await importBlogCategories(seedBlogCategories)
    
    // Step 2: Import Age Groups (no dependencies) 
    console.log('👶 Importing age groups...')
    // const ageGroups = await importAgeGroups(seedAgeGroups)
    
    // Step 3: Import Course Categories (no dependencies)
    console.log('🎓 Importing course categories...')
    // const courseCategories = await importCourseCategories(seedCourseCategories)
    
    // Step 4: Import Courses (depends on categories and age groups)
    console.log('📚 Importing courses...')
    // const courses = await importCourses(seedCourses, courseCategories, ageGroups)
    
    // Step 5: Import Blog Posts (depends on categories)
    console.log('✍️ Importing blog posts...')
    // const blogPosts = await importBlogPosts(seedBlogPosts, blogCategories)
    
    console.log('✅ Content import completed successfully')
    
    return {
      // blogCategories,
      // ageGroups, 
      // courseCategories,
      // courses,
      // blogPosts
    }
    
  } catch (error) {
    console.error('❌ Content import failed:', error)
    throw error
  }
}

/**
 * Individual import functions (to be implemented)
 */
export async function importAgeGroups(seedData: SeedAgeGroup[]) {
  // Implementation needed - create AgeGroup documents
  console.log(`Importing ${seedData.length} age groups...`)
  return seedData
}

export async function importCourseCategories(seedData: SeedCourseCategory[]) {
  // Implementation needed - create CourseCategory documents  
  console.log(`Importing ${seedData.length} course categories...`)
  return seedData
}

export async function importCourses(seedData: SeedCourse[], categories: any[], ageGroups: any[]) {
  // Implementation needed - create Course documents with relationships
  console.log(`Importing ${seedData.length} courses...`)
  return seedData
}

export async function importBlogCategories(seedData: SeedBlogCategory[]) {
  // Implementation needed - create Category documents
  console.log(`Importing ${seedData.length} blog categories...`)
  return seedData
}

export async function importBlogPosts(seedData: SeedBlogPost[], categories: any[]) {
  // Implementation needed - create Post documents with relationships
  console.log(`Importing ${seedData.length} blog posts...`)
  return seedData
}

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

/**
 * Validate seed data before import
 */
export function validateSeedData() {
  console.log('🔍 Validating seed data...')
  
  // Check required fields
  const ageGroupErrors = seedAgeGroups.filter(group => !group.name || !group.min_age === undefined)
  if (ageGroupErrors.length > 0) {
    throw new Error(`Invalid age groups: ${ageGroupErrors.map(g => g.name).join(', ')}`)
  }
  
  const categoryErrors = seedCourseCategories.filter(cat => !cat.name || !cat.target_audience)
  if (categoryErrors.length > 0) {
    throw new Error(`Invalid course categories: ${categoryErrors.map(c => c.name).join(', ')}`)
  }
  
  // Check age range logic
  const ageRangeErrors = seedAgeGroups.filter(group => group.min_age >= group.max_age)
  if (ageRangeErrors.length > 0) {
    throw new Error(`Invalid age ranges: ${ageRangeErrors.map(g => g.name).join(', ')}`)
  }
  
  console.log('✅ Seed data validation passed')
}

/**
 * Generate import summary
 */
export function generateImportSummary() {
  return {
    ageGroups: seedAgeGroups.length,
    courseCategories: seedCourseCategories.length, 
    courses: seedCourses.length,
    blogCategories: seedBlogCategories.length,
    blogPosts: seedBlogPosts.length,
    totalRecords: seedAgeGroups.length + seedCourseCategories.length + seedCourses.length + seedBlogCategories.length + seedBlogPosts.length
  }
}

// Export seed data for individual use
export {
  seedAgeGroups,
  seedCourseCategories, 
  seedCourses,
  seedBlogCategories,
  seedBlogPosts
}