import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Course, CourseCategory, AgeGroup } from '@/payload-types'

import CourseDetailClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  
  // Get all courses with their categories
  const courses = await payload.find({
    collection: 'courses',
    draft: false,
    limit: 1000,
    depth: 1,
    select: {
      slug: true,
      category: true,
    },
  })

  const params = courses.docs.map(course => {
    const categorySlug = typeof course.category === 'object' && course.category?.slug 
      ? course.category.slug 
      : ''
    
    return {
      category: categorySlug,
      slug: course.slug || '',
    }
  }).filter(param => param.category && param.slug)

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
  
  const course = await queryCourseBySlug({ slug })

  if (!course) {
    return <PayloadRedirects url={url} />
  }

  // Type guard for populated category
  const courseCategory = typeof course.category === 'object' ? course.category : null
  
  if (!courseCategory || courseCategory.slug !== category) {
    notFound()
  }

  // Type guard for populated age groups
  const ageGroups = course.age_groups?.filter((group): group is AgeGroup => 
    typeof group === 'object' && group !== null
  ) || []

  return (
    <>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Breadcrumb Navigation */}
      <div className="container mb-8 pt-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link 
                href="/cursussen" 
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Cursussen
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link 
                  href={`/cursussen/${category}`}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {courseCategory.name}
                </Link>
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

      {/* Client Component with all interactive functionality */}
      <CourseDetailClient 
        course={course}
        courseCategory={courseCategory}
        ageGroups={ageGroups}
      />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const course = await queryCourseBySlug({ slug })

  if (!course) {
    return {
      title: 'Cursus niet gevonden | SchermBlij',
    }
  }

  const category = typeof course.category === 'object' ? course.category : null

  return {
    title: `${course.title} | ${category?.name || 'Cursussen'} | SchermBlij`,
    description: course.description ? 
      (typeof course.description === 'string' ? 
        course.description : 
        'Cursus bij SchermBlij - Gezonde schermtijd voor kinderen'
      ) : 'Cursus bij SchermBlij',
    openGraph: {
      title: course.title,
      description: 'Cursus bij SchermBlij - Gezonde schermtijd voor kinderen',
      images: course.featured_image && typeof course.featured_image === 'object' && course.featured_image.url ? [
        {
          url: course.featured_image.url,
          width: 1200,
          height: 630,
          alt: course.title,
        }
      ] : undefined,
    },
  }
}

const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
    draft,
    limit: 1,
    depth: 2,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})