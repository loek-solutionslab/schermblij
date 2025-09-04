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
  courseCategories, 
  getCategoryBySlug, 
  getAllCategorySlugs,
  generatePageTitle, 
  generatePageDescription 
} from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  // Generate params for all course categories
  return getAllCategorySlugs().map((category) => ({
    category,
  }))
}

type Args = {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryCoursesPage({ params: paramsPromise }: Args) {
  const { category } = await paramsPromise
  const categoryInfo = getCategoryBySlug(category)

  if (!categoryInfo) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  // Fetch courses for this specific category
  // This would be enhanced when proper course collections exist
  const courses = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      and: [
        {
          or: [
            {
              slug: {
                contains: 'cursus'
              }
            },
            {
              title: {
                contains: 'cursus'
              }
            }
          ]
        },
        {
          or: [
            {
              slug: {
                contains: category
              }
            },
            {
              title: {
                contains: categoryInfo.title
              }
            }
          ]
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
      
      {/* Breadcrumb Navigation */}
      <div className="container mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a 
                href={dutchRoutes.courses.path} 
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {dutchRoutes.courses.title}
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {categoryInfo.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Category Header */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">
            Cursussen {categoryInfo.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Category-specific content */}
      <div className="container mb-16">
        {category === 'ouders' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Waarom mediawijs opvoeden?</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Als ouder wil je het beste voor je kind. Mediawijs opvoeden helpt je om bewuste 
              keuzes te maken over schermtijd en digitale media, zodat je kind gezond en 
              verantwoord opgroeit in onze digitale wereld.
            </p>
          </div>
        )}

        {category === 'professionals' && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Voor pedagogische professionals</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Werk je in de kinderopvang, het onderwijs of ben je anderszins betrokken bij 
              de opvoeding van kinderen? Onze trainingen helpen je om mediawijs werken 
              te integreren in je dagelijkse praktijk.
            </p>
          </div>
        )}

        {category === 'kinderdagverblijf' && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Mediawijs in de kinderopvang</h2>
            <p className="text-gray-700 dark:text-gray-300">
              De kinderopvang speelt een belangrijke rol in de vroege ontwikkeling. 
              Leer hoe je media bewust en pedagogisch verantwoord kunt inzetten 
              in je werk met jonge kinderen.
            </p>
          </div>
        )}

        {category === 'gemeente' && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Gemeentelijk beleid en programma&apos;s</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Mediawijs opvoeden is een breed maatschappelijk thema. Ontdek hoe gemeenten 
              en organisaties kunnen bijdragen aan een mediawijs klimaat voor alle gezinnen.
            </p>
          </div>
        )}
      </div>

      {/* Courses List */}
      {courses.docs.length > 0 ? (
        <>
          <div className="container mb-8">
            <PageRange
              collection="pages"
              currentPage={courses.page}
              limit={12}
              totalDocs={courses.totalDocs}
            />
          </div>

          <CollectionArchive posts={courses.docs} />

          <div className="container">
            {courses.totalPages > 1 && courses.page && (
              <Pagination page={courses.page} totalPages={courses.totalPages} />
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">
              Binnenkort cursussen voor {categoryInfo.title.toLowerCase()}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We werken hard aan het ontwikkelen van cursussen speciaal voor deze doelgroep.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a 
                href={dutchRoutes.contact.path}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Neem contact op
              </a>
              <a 
                href={dutchRoutes.courses.path}
                className="inline-block border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Bekijk alle cursussen
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { category } = await paramsPromise
  const categoryInfo = getCategoryBySlug(category)

  if (!categoryInfo) {
    return {
      title: 'Categorie niet gevonden | SchermBlij',
    }
  }

  return {
    title: generatePageTitle(`Cursussen ${categoryInfo.title}`, dutchRoutes.courses.title),
    description: generatePageDescription(categoryInfo.description),
    openGraph: {
      title: generatePageTitle(`Cursussen ${categoryInfo.title}`),
      description: generatePageDescription(categoryInfo.description),
    },
  }
}