import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { dutchRoutes, generatePageTitle, generatePageDescription } from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      
      {/* Hero Section */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">{dutchRoutes.blog.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Praktische tips, inzichten en het laatste nieuws over mediawijs opvoeden. 
            Ontdek hoe je kinderen kunt begeleiden in hun digitale wereld.
          </p>
        </div>
      </div>

      {posts.docs.length > 0 ? (
        <>
          <div className="container mb-8">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>

          <CollectionArchive posts={posts.docs} />

          <div className="container">
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </>
      ) : (
        <div className="container">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Binnenkort nieuwe blogposts!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We werken hard aan het schrijven van nuttige content over mediawijs opvoeden.
            </p>
            <a 
              href={dutchRoutes.contact.path}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Heb je een vraag? Neem contact op
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: generatePageTitle(dutchRoutes.blog.title),
    description: generatePageDescription(
      'Praktische tips, inzichten en het laatste nieuws over mediawijs opvoeden bij SchermBlij.'
    ),
    openGraph: {
      title: generatePageTitle(dutchRoutes.blog.title),
      description: generatePageDescription(
        'Blog van SchermBlij vol tips en inzichten over mediawijs opvoeden'
      ),
    },
  }
}
