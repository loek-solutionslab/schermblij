// Dutch route translations and utilities for SchermBlij website

export const dutchRoutes = {
  // Main navigation routes
  home: {
    slug: '',
    title: 'Home',
    path: '/'
  },
  courses: {
    slug: 'cursussen',
    title: 'Cursussen',
    path: '/cursussen'
  },
  ageGroups: {
    slug: 'voor-elke-leeftijd',
    title: 'Voor elke leeftijd',
    path: '/voor-elke-leeftijd'
  },
  blog: {
    slug: 'blog',
    title: 'Blog',
    path: '/blog'
  },
  contact: {
    slug: 'contact',
    title: 'Contact',
    path: '/contact'
  }
} as const

// Age group mappings
export const ageGroups = {
  baby: {
    slug: 'baby',
    title: 'Baby (0-1 jaar)',
    description: 'Mediawijs voor de allerkleinsten'
  },
  peuters: {
    slug: 'peuters',
    title: 'Peuters (2-4 jaar)',
    description: 'Eerste stappen naar schermwijsheid'
  },
  kleuters: {
    slug: 'kleuters',
    title: 'Kleuters (4-6 jaar)',
    description: 'Speels leren omgaan met schermen'
  },
  onderbouw: {
    slug: 'onderbouw',
    title: 'Onderbouw (6-8 jaar)',
    description: 'Bewust schermgebruik voor schoolkinderen'
  },
  bovenbouw: {
    slug: 'bovenbouw',
    title: 'Bovenbouw (8-12 jaar)',
    description: 'Zelfstandig en verantwoord schermgebruik'
  },
  tieners: {
    slug: 'tieners',
    title: 'Tieners (12+ jaar)',
    description: 'Digitale vaardigheden voor adolescenten'
  }
} as const

// Course categories
export const courseCategories = {
  ouders: {
    slug: 'ouders',
    title: 'Voor Ouders',
    description: 'Cursussen en workshops speciaal voor ouders'
  },
  professionals: {
    slug: 'professionals',
    title: 'Voor Professionals',
    description: 'Training voor pedagogische professionals'
  },
  kinderdagverblijf: {
    slug: 'kinderdagverblijf',
    title: 'Kinderdagverblijf',
    description: 'Mediawijs voor de kinderopvang'
  },
  gemeente: {
    slug: 'gemeente',
    title: 'Gemeente',
    description: 'Programma\'s voor gemeenten en organisaties'
  }
} as const

// Helper functions
export const getAgeGroupBySlug = (slug: string) => {
  return Object.values(ageGroups).find(group => group.slug === slug)
}

export const getCategoryBySlug = (slug: string) => {
  return Object.values(courseCategories).find(category => category.slug === slug)
}

export const getAllAgeGroupSlugs = () => {
  return Object.values(ageGroups).map(group => group.slug)
}

export const getAllCategorySlugs = () => {
  return Object.values(courseCategories).map(category => category.slug)
}

// SEO and metadata helpers
export const generatePageTitle = (title: string, section?: string) => {
  const baseSite = 'SchermBlij'
  if (section) {
    return `${title} | ${section} | ${baseSite}`
  }
  return `${title} | ${baseSite}`
}

export const generatePageDescription = (description: string) => {
  return description.length > 160 
    ? `${description.substring(0, 157)}...`
    : description
}

// Dutch URL slug utilities
export const toUrlSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '')
}

export type AgeGroupSlug = keyof typeof ageGroups
export type CategorySlug = keyof typeof courseCategories