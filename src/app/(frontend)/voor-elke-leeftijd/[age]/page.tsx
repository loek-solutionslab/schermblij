import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { 
  dutchRoutes,
  generatePageTitle, 
  generatePageDescription 
} from '@/utilities/dutchRoutes'
import type { AgeGroup, Course } from '@/payload-types'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const ageGroups = await payload.find({
      collection: 'age_groups',
      limit: 20,
      select: {
        slug: true,
      },
    })
    
    return ageGroups.docs.map((ageGroup) => ({
      age: ageGroup.slug,
    }))
  } catch (error) {
    console.error('Error fetching age groups for static params:', error)
    return []
  }
}

type Args = {
  params: Promise<{
    age: string
  }>
}

export default async function AgeGroupPage({ params: paramsPromise }: Args) {
  const { age } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  // Fetch the specific age group by slug
  const ageGroupResult = await payload.find({
    collection: 'age_groups',
    where: {
      slug: {
        equals: age,
      },
    },
    limit: 1,
  })

  const ageGroup = ageGroupResult.docs[0] as AgeGroup | undefined

  if (!ageGroup) {
    notFound()
  }

  // Fetch all age groups for navigation
  const allAgeGroupsResult = await payload.find({
    collection: 'age_groups',
    limit: 20,
    sort: 'order',
  })
  
  const allAgeGroups = allAgeGroupsResult.docs as AgeGroup[]

  // Fetch courses related to this age group
  let relatedCourses: any = { docs: [] }
  try {
    relatedCourses = await payload.find({
      collection: 'courses',
      depth: 2,
      limit: 6,
      where: {
        age_groups: {
          contains: ageGroup.id,
        },
        _status: {
          equals: 'published',
        },
      },
      select: {
        title: true,
        slug: true,
        description: true,
        price: true,
        duration_minutes: true,
        format: true,
        featured_image: true,
        category: true,
      },
    })
  } catch (error) {
    console.log('Error fetching related courses:', error)
  }

  // Get related blog posts if blog collection exists
  let relatedPosts: any = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
  try {
    relatedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 6,
      overrideAccess: false,
      where: {
        or: [
          {
            title: {
              contains: ageGroup.name
            }
          },
          {
            slug: {
              contains: age
            }
          }
        ]
      },
      select: {
        title: true,
        slug: true,
        meta: true,
        publishedAt: true,
      },
    })
  } catch (error) {
    console.log('Posts collection not found, skipping related posts')
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      
      {/* Breadcrumb Navigation */}
      <div className="container mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a 
                href={dutchRoutes.ageGroups.path} 
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {dutchRoutes.ageGroups.title}
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {ageGroup.name} ({ageGroup.min_age}-{ageGroup.max_age} jaar)
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Age Group Header */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6" style={{ color: ageGroup.color || undefined }}>
            Mediawijs voor {ageGroup.name}
          </h1>
          <div className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {ageGroup.description && <RichText content={ageGroup.description} />}
          </div>
        </div>
      </div>

      {/* Age-specific guidance */}
      <div className="container mb-16">
        <AgeSpecificGuidance ageGroup={ageGroup} />
      </div>

      {/* Related Courses */}
      {relatedCourses.docs.length > 0 && (
        <div className="container mb-16">
          <h2 className="text-2xl font-bold mb-8">Cursussen voor deze leeftijdsgroep</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.docs.map((course) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                {course.featured_image && typeof course.featured_image === 'object' && (
                  <Image 
                    src={course.featured_image.url || ''} 
                    alt={course.featured_image.alt || course.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      <a 
                        href={`/cursussen/${typeof course.category === 'object' ? course.category.slug : ''}/${course.slug}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {course.title}
                      </a>
                    </h3>
                    {course.price && (
                      <span className="text-lg font-bold" style={{ color: ageGroup.color || undefined }}>
                        €{(course.price / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mb-3">
                    {course.format && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {course.format === 'online' ? 'Online' : course.format === 'physical' ? 'Fysiek' : 'Hybride'}
                      </span>
                    )}
                    {course.duration_minutes && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {Math.floor(course.duration_minutes / 60)}h {course.duration_minutes % 60}m
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {course.description && <RichText content={course.description} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation to other age groups */}
      <div className="container mb-16">
        <h2 className="text-2xl font-bold mb-8">Andere leeftijdsgroepen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAgeGroups
            .filter((otherAge) => otherAge.id !== ageGroup.id)
            .map((otherAge) => (
            <div key={otherAge.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              {otherAge.icon && typeof otherAge.icon === 'object' && (
                <Image 
                  src={otherAge.icon.url || ''} 
                  alt={otherAge.icon.alt || otherAge.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-full mb-3"
                />
              )}
              <h3 className="font-semibold mb-2">
                <a 
                  href={`${dutchRoutes.ageGroups.path}/${otherAge.slug}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  style={{ color: otherAge.color || undefined }}
                >
                  {otherAge.name} ({otherAge.min_age}-{otherAge.max_age} jaar)
                </a>
              </h3>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {otherAge.description && <RichText content={otherAge.description} />}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Related Blog Posts */}
      {relatedPosts.docs.length > 0 && (
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Gerelateerde blog posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.docs.map((post, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {post.title}
                  </a>
                </h3>
                {post.meta?.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {post.meta.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Age-specific guidance component
function AgeSpecificGuidance({ ageGroup }: { ageGroup: AgeGroup }) {
  const getGuidanceData = (minAge: number, maxAge: number) => {
    if (maxAge <= 2) {
      // Baby's
      return {
        title: `Tips voor ${ageGroup.name.toLowerCase()} (${minAge}-${maxAge} jaar)`,
        backgroundColor: 'bg-blue-50 dark:bg-blue-900/20',
        doList: [
          'Focus op echte interactie en oogcontact',
          'Lees voor en zing liedjes',
          'Stimuleer zintuiglijke ontwikkeling',
          'Geef veel knuffels en aandacht',
        ],
        dontList: [
          'Schermtijd wordt niet aanbevolen',
          'Televisie op de achtergrond',
          'Baby alleen laten met schermen',
          'Schermen als rustigstellingsmiddel',
        ]
      }
    } else if (maxAge <= 4) {
      // Peuters
      return {
        title: `Tips voor ${ageGroup.name.toLowerCase()} (${minAge}-${maxAge} jaar)`,
        backgroundColor: 'bg-green-50 dark:bg-green-900/20',
        doList: [
          'Maximaal 15-30 minuten per dag',
          'Kijk samen en bespreek wat je ziet',
          'Kies kwaliteitsvolle, rustige content',
          'Zet schermen uit tijdens maaltijden',
        ],
        dontList: [
          'Snelle, flitsende beelden',
          'Schermen vlak voor het slapen',
          'Peuter alleen laten kijken',
          'Schermen als tijdvuller',
        ]
      }
    } else if (maxAge <= 6) {
      // Kleuters
      return {
        title: `Tips voor ${ageGroup.name.toLowerCase()} (${minAge}-${maxAge} jaar)`,
        backgroundColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        doList: [
          'Maximaal 1 uur per dag',
          'Maak duidelijke afspraken',
          'Gebruik een timer voor schermtijd',
          'Bespreek wat ze gezien hebben',
        ],
        dontList: [
          'Gewelddadige of enge content',
          'Schermen in de slaapkamer',
          'Schermtijd als beloning/straf',
          'Eindeloos doorscrollen',
        ]
      }
    } else if (maxAge <= 12) {
      // Schoolkinderen
      return {
        title: `Tips voor ${ageGroup.name.toLowerCase()} (${minAge}-${maxAge} jaar)`,
        backgroundColor: 'bg-orange-50 dark:bg-orange-900/20',
        doList: [
          'Stel duidelijke tijdslimieten in',
          'Leer over online veiligheid',
          'Stimuleer kritisch denken',
          'Maak een mediaplan samen',
        ],
        dontList: [
          'Onbeperkte toegang tot internet',
          'Sociale media voor deze leeftijd',
          'Schermen tijdens huiswerk',
          'Geen toezicht op content',
        ]
      }
    } else {
      // Tieners en ouder
      return {
        title: `Tips voor ${ageGroup.name.toLowerCase()} (${minAge}+ jaar)`,
        backgroundColor: 'bg-purple-50 dark:bg-purple-900/20',
        doList: [
          'Bouw vertrouwen en open dialoog',
          'Respecteer hun privacy',
          'Bespreek digitale reputatie',
          'Blijf bereikbaar voor vragen',
        ],
        dontList: [
          'Stiekem controleren zonder reden',
          'Volledig afstand nemen',
          'Negeren van online problemen',
          'Geen interesse tonen',
        ]
      }
    }
  }

  const guidance = getGuidanceData(ageGroup.min_age, ageGroup.max_age)

  return (
    <div className={`${guidance.backgroundColor} rounded-lg p-8 mb-8`}>
      <h2 className="text-2xl font-bold mb-6">{guidance.title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {guidance.doList.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {guidance.dontList.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { age } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const ageGroupResult = await payload.find({
    collection: 'age_groups',
    where: {
      slug: {
        equals: age,
      },
    },
    limit: 1,
  })

  const ageGroup = ageGroupResult.docs[0] as AgeGroup | undefined

  if (!ageGroup) {
    return {
      title: 'Leeftijdsgroep niet gevonden | SchermBlij',
    }
  }

  // Extract plain text from rich text description
  const plainTextDescription = extractPlainText(ageGroup.description)

  return {
    title: generatePageTitle(`Mediawijs voor ${ageGroup.name}`, dutchRoutes.ageGroups.title),
    description: generatePageDescription(plainTextDescription),
    openGraph: {
      title: generatePageTitle(`Mediawijs voor ${ageGroup.name}`),
      description: generatePageDescription(plainTextDescription),
    },
  }
}

// Helper function to extract plain text from rich text
function extractPlainText(richTextContent: any): string {
  if (!richTextContent || !richTextContent.root) return ''
  
  const extractFromNode = (node: any): string => {
    if (node.type === 'text') {
      return node.text || ''
    }
    if (node.children) {
      return node.children.map(extractFromNode).join('')
    }
    return ''
  }
  
  return richTextContent.root.children.map(extractFromNode).join(' ').trim()
}