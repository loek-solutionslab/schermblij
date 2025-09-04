import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { 
  dutchRoutes, 
  ageGroups, 
  getAgeGroupBySlug, 
  getAllAgeGroupSlugs,
  generatePageTitle, 
  generatePageDescription 
} from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  // Generate params for all age groups
  return getAllAgeGroupSlugs().map((age) => ({
    age,
  }))
}

type Args = {
  params: Promise<{
    age: string
  }>
}

export default async function AgeGroupPage({ params: paramsPromise }: Args) {
  const { age } = await paramsPromise
  const ageGroupInfo = getAgeGroupBySlug(age)

  if (!ageGroupInfo) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  // Fetch content specific to this age group
  const ageContent = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      or: [
        {
          slug: {
            equals: age
          }
        },
        {
          slug: {
            contains: age
          }
        },
        {
          title: {
            contains: ageGroupInfo.title.split('(')[0].trim()
          }
        }
      ]
    },
    select: {
      title: true,
      slug: true,
      meta: true,
    },
  })

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
              contains: age
            }
          },
          {
            title: {
              contains: ageGroupInfo.title.split('(')[0].trim()
            }
          }
        ]
      },
      select: {
        title: true,
        slug: true,
        meta: true,
      },
    })
  } catch (error) {
    // Posts collection might not exist yet
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
                  {ageGroupInfo.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Age Group Header */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">
            Mediawijs voor {ageGroupInfo.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {ageGroupInfo.description}
          </p>
        </div>
      </div>

      {/* Age-specific guidance */}
      <div className="container mb-16">
        {age === 'baby' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor baby&apos;s (0-1 jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Focus op echte interactie en oogcontact</li>
                  <li>• Lees voor en zing liedjes</li>
                  <li>• Stimuleer zintuiglijke ontwikkeling</li>
                  <li>• Geef veel knuffels en aandacht</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Schermtijd wordt niet aanbevolen</li>
                  <li>• Televisie op de achtergrond</li>
                  <li>• Baby alleen laten met schermen</li>
                  <li>• Schermen als rustigstellingsmiddel</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {age === 'peuters' && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor peuters (2-4 jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Maximaal 15-30 minuten per dag</li>
                  <li>• Kijk samen en bespreek wat je ziet</li>
                  <li>• Kies kwaliteitsvolle, rustige content</li>
                  <li>• Zet schermen uit tijdens maaltijden</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Snelle, flitsende beelden</li>
                  <li>• Schermen vlak voor het slapen</li>
                  <li>• Peuter alleen laten kijken</li>
                  <li>• Schermen als tijdvuller</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {age === 'kleuters' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor kleuters (4-6 jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Maximaal 1 uur per dag</li>
                  <li>• Maak duidelijke afspraken</li>
                  <li>• Gebruik een timer voor schermtijd</li>
                  <li>• Bespreek wat ze gezien hebben</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Gewelddadige of enge content</li>
                  <li>• Schermen in de slaapkamer</li>
                  <li>• Schermtijd als beloning/straf</li>
                  <li>• Eindeloos doorscrollen</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {age === 'onderbouw' && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor de onderbouw (6-8 jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Stel duidelijke tijdslimieten in</li>
                  <li>• Leer over online veiligheid</li>
                  <li>• Stimuleer kritisch denken</li>
                  <li>• Maak een mediaplan samen</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Onbeperkte toegang tot internet</li>
                  <li>• Sociale media voor deze leeftijd</li>
                  <li>• Schermen tijdens huiswerk</li>
                  <li>• Geen toezicht op content</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {age === 'bovenbouw' && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor de bovenbouw (8-12 jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Geef meer verantwoordelijkheid</li>
                  <li>• Bespreek online ervaringen</li>
                  <li>• Leer over digitaal burgerschap</li>
                  <li>• Balanceer scherm- en offline tijd</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Volledig vrije toegang</li>
                  <li>• Geen communicatie over risico&apos;s</li>
                  <li>• Negeren van online problemen</li>
                  <li>• Schermen als hoofdactiviteit</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {age === 'tieners' && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Tips voor tieners (12+ jaar)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">✓ Doe wel</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Bouw vertrouwen en open dialoog</li>
                  <li>• Respecteer hun privacy</li>
                  <li>• Bespreek digitale reputatie</li>
                  <li>• Blijf bereikbaar voor vragen</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">✗ Vermijd</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Stiekem controleren zonder reden</li>
                  <li>• Volledig afstand nemen</li>
                  <li>• Negeren van online problemen</li>
                  <li>• Geen interesse tonen</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation to other age groups */}
      <div className="container mb-16">
        <h2 className="text-2xl font-bold mb-8">Andere leeftijdsgroepen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(ageGroups)
            .filter(([key]) => key !== age)
            .map(([key, otherAge]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">
                <a 
                  href={`${dutchRoutes.ageGroups.path}/${otherAge.slug}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {otherAge.title}
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {otherAge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Content */}
      {ageContent.docs.length > 0 && (
        <>
          <div className="container mb-8">
            <h2 className="text-2xl font-bold mb-4">Gerelateerde content</h2>
            <PageRange
              collection="pages"
              currentPage={ageContent.page}
              limit={12}
              totalDocs={ageContent.totalDocs}
            />
          </div>

          <CollectionArchive posts={ageContent.docs} />

          <div className="container mb-16">
            {ageContent.totalPages > 1 && ageContent.page && (
              <Pagination page={ageContent.page} totalPages={ageContent.totalPages} />
            )}
          </div>
        </>
      )}

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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { age } = await paramsPromise
  const ageGroupInfo = getAgeGroupBySlug(age)

  if (!ageGroupInfo) {
    return {
      title: 'Leeftijdsgroep niet gevonden | SchermBlij',
    }
  }

  return {
    title: generatePageTitle(`Mediawijs voor ${ageGroupInfo.title}`, dutchRoutes.ageGroups.title),
    description: generatePageDescription(ageGroupInfo.description),
    openGraph: {
      title: generatePageTitle(`Mediawijs voor ${ageGroupInfo.title}`),
      description: generatePageDescription(ageGroupInfo.description),
    },
  }
}