import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { 
  dutchRoutes, 
  getCategoryBySlug, 
  getAllCategorySlugs,
  generatePageTitle 
} from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  
  // Get all course pages that follow the pattern
  const courses = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    where: {
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
    select: {
      slug: true,
    },
  })

  const params: Array<{category: string, slug: string}> = []
  const categories = getAllCategorySlugs()

  // Generate params for all combinations
  for (const category of categories) {
    for (const course of courses.docs) {
      if (course.slug) {
        params.push({
          category,
          slug: course.slug
        })
      }
    }
  }

  return params
}

type Args = {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function CourseDetailPage({ params: paramsPromise }: Args) {
  const { category, slug } = await paramsPromise
  const url = `/cursussen/${category}/${slug}`
  
  const categoryInfo = getCategoryBySlug(category)
  if (!categoryInfo) {
    notFound()
  }

  let course: PageType | null = await queryCourseBySlug({ slug })

  if (!course) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = course

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Breadcrumb Navigation */}
      <div className="container mb-8 pt-8">
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
                <a 
                  href={`${dutchRoutes.courses.path}/${category}`}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {categoryInfo.title}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {course.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />

      {/* Course-specific call-to-action */}
      <div className="container mt-16">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interesse in deze cursus?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Neem contact op voor meer informatie over beschikbaarheid, prijzen en inschrijving.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a 
              href={dutchRoutes.contact.path}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Neem contact op
            </a>
            <a 
              href={`${dutchRoutes.courses.path}/${category}`}
              className="inline-block border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Meer cursussen {categoryInfo.title.toLowerCase()}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { category, slug } = await paramsPromise
  const course = await queryCourseBySlug({ slug })
  const categoryInfo = getCategoryBySlug(category)

  if (!course || !categoryInfo) {
    return {
      title: 'Cursus niet gevonden | SchermBlij',
    }
  }

  const baseMeta = generateMeta({ doc: course })
  
  return {
    ...baseMeta,
    title: generatePageTitle(course.title, `${categoryInfo.title} Cursussen`),
  }
}

const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
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
        }
      ]
    },
  })

  return result.docs?.[0] || null
})