import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { dutchRoutes, courseCategories, generatePageTitle, generatePageDescription } from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function CursussenPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch courses/training content - using pages collection for now
  // This would be replaced with a proper courses collection when it exists
  const courses = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      or: [
        {
          slug: {
            contains: 'cursus'
          }
        },
        {
          slug: {
            contains: 'training'
          }
        },
        {
          title: {
            contains: 'cursus'
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
          <h1 className="text-4xl font-bold mb-6">{dutchRoutes.courses.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Ontdek onze cursussen en trainingen voor mediawijs opvoeden. Van baby tot tiener, 
            voor ouders én professionals.
          </p>
        </div>
      </div>

      {/* Course Categories Grid */}
      <div className="container mb-16">
        <h2 className="text-2xl font-bold mb-8">Cursussen per doelgroep</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(courseCategories).map(([key, category]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-3">
                <a 
                  href={`${dutchRoutes.courses.path}/${category.slug}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {category.title}
                </a>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Courses List */}
      {courses.docs.length > 0 && (
        <>
          <div className="container mb-8">
            <h2 className="text-2xl font-bold mb-4">Beschikbare cursussen</h2>
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
      )}

      {/* No courses message */}
      {courses.docs.length === 0 && (
        <div className="container">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Binnenkort meer cursussen!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We werken hard aan het toevoegen van meer cursussen en trainingen.
            </p>
            <a 
              href={dutchRoutes.contact.path}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Neem contact op voor meer informatie
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: generatePageTitle(dutchRoutes.courses.title),
    description: generatePageDescription(
      'Ontdek onze cursussen en trainingen voor mediawijs opvoeden. Van baby tot tiener, voor ouders én professionals.'
    ),
    openGraph: {
      title: generatePageTitle(dutchRoutes.courses.title),
      description: generatePageDescription(
        'Cursussen en trainingen voor mediawijs opvoeden bij SchermBlij'
      ),
    },
  }
}