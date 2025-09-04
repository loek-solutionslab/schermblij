import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { dutchRoutes, ageGroups, generatePageTitle, generatePageDescription } from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function VoorElkeLeeftijdPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch age-related content
  const ageContent = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 20,
    overrideAccess: false,
    where: {
      or: [
        {
          slug: {
            in: ['baby', 'peuters', 'kleuters', 'onderbouw', 'bovenbouw', 'tieners']
          }
        },
        {
          title: {
            contains: 'jaar'
          }
        },
        {
          title: {
            contains: 'leeftijd'
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

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      
      {/* Hero Section */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">{dutchRoutes.ageGroups.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Mediawijs opvoeden begint vanaf de geboorte. Ontdek wat past bij de leeftijd 
            van jouw kind en krijg praktische tips voor elke ontwikkelingsfase.
          </p>
        </div>
      </div>

      {/* Age Groups Grid */}
      <div className="container mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(ageGroups).map(([key, ageGroup]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  <a 
                    href={`${dutchRoutes.ageGroups.path}/${ageGroup.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {ageGroup.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {ageGroup.description}
                </p>
                
                {/* Age-specific highlights */}
                {key === 'baby' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Geen schermtijd aanbevolen
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Focus op echte interactie
                    </div>
                  </div>
                )}
                
                {key === 'peuters' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Zeer beperkte schermtijd
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Samen kijken en bespreken
                    </div>
                  </div>
                )}
                
                {key === 'kleuters' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Kwaliteit boven kwantiteit
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Eerste regels en grenzen
                    </div>
                  </div>
                )}
                
                {key === 'onderbouw' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                      Duidelijke afspraken
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                      Bewustwording ontwikkelen
                    </div>
                  </div>
                )}
                
                {key === 'bovenbouw' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Meer zelfstandigheid
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Kritisch denken stimuleren
                    </div>
                  </div>
                )}
                
                {key === 'tieners' && (
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Begeleiding op afstand
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Vertrouwen en dialoog
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-8 pb-8">
                <a 
                  href={`${dutchRoutes.ageGroups.path}/${ageGroup.slug}`}
                  className="inline-block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Lees meer →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Tips Section */}
      <div className="container mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Algemene tips voor mediawijs opvoeden</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Tijd & Timing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Stel duidelijke tijden en grenzen in die passen bij de leeftijd
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Samen Doen</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Participeer actief in het mediagedrag van je kind
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Open Communicatie</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Bespreek ervaringen en stel vragen over mediagebruik
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Content */}
      {ageContent.docs.length > 0 && (
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Gerelateerde content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ageContent.docs.slice(0, 6).map((content, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">
                  <a 
                    href={`/${content.slug}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {content.title}
                  </a>
                </h3>
                {content.meta?.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {content.meta.description}
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

export function generateMetadata(): Metadata {
  return {
    title: generatePageTitle(dutchRoutes.ageGroups.title),
    description: generatePageDescription(
      'Mediawijs opvoeden begint vanaf de geboorte. Ontdek wat past bij de leeftijd van jouw kind en krijg praktische tips voor elke ontwikkelingsfase.'
    ),
    openGraph: {
      title: generatePageTitle(dutchRoutes.ageGroups.title),
      description: generatePageDescription(
        'Tips en advies voor mediawijs opvoeden per leeftijdsgroep bij SchermBlij'
      ),
    },
  }
}