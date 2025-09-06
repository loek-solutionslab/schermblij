import type { Post, BlogGridBlock as BlogGridBlockProps } from '@/payload-types'
import Image from 'next/image'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { cn } from '@/utilities/cn'

type Props = BlogGridBlockProps & {
  id?: string
}

export const BlogGridBlock: React.FC<Props> = async (props) => {
  const {
    id,
    tagline,
    heading,
    description,
    populateBy,
    categories,
    ageGroups,
    limit: limitFromProps,
    selectedPosts,
    showViewAllButton,
    viewAllButtonText,
    viewAllButtonLink,
  } = props

  const limit = limitFromProps || 6

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    // Build where conditions for filtering
    const whereConditions: any = {}
    
    // Filter by categories if specified
    if (categories && categories.length > 0) {
      const flattenedCategories = categories.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      })
      whereConditions.categories = {
        in: flattenedCategories,
      }
    }

    // Filter by age groups if specified
    if (ageGroups && ageGroups.length > 0) {
      const flattenedAgeGroups = ageGroups.map((ageGroup) => {
        if (typeof ageGroup === 'object') return ageGroup.id
        else return ageGroup
      })
      whereConditions.age_groups = {
        in: flattenedAgeGroups,
      }
    }

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedAt', // Show newest posts first
      where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
    })

    posts = fetchedPosts.docs
  } else if (populateBy === 'selection' && selectedPosts?.length) {
    // Use manually selected posts
    const filteredSelectedPosts = selectedPosts.map((post) => {
      if (typeof post === 'object') return post
    }).filter(Boolean) as Post[]

    posts = filteredSelectedPosts
  }

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" id={`block-${id}`}>
      <div className="container">
        {/* Header Section */}
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                {tagline}
              </p>
            )}
            {heading && (
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {heading}
              </h2>
            )}
            {description && (
              <div className="md:text-md text-muted-foreground">
                <RichText content={description} enableGutter={false} />
              </div>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {posts.map((post, index) => {
              if (typeof post === 'object' && post !== null) {
                // Extract reading time from the post if available
                const readingTime = post.reading_time ? `${post.reading_time} min lezen` : null
                
                return (
                  <div key={post.id || index} className="flex flex-col">
                    <div className="flex size-full flex-col">
                      {/* Post Image */}
                      <Link href={`/blog/${post.slug}`} className="block w-full mb-6">
                        <div className="aspect-[3/2] w-full overflow-hidden rounded-lg">
                          {post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url ? (
                            <Image
                              src={post.meta.image.url}
                              alt={post.meta.image.alt || post.title || ''}
                              width={400}
                              height={267}
                              className="size-full object-cover transition-transform hover:scale-105"
                            />
                          ) : (
                            <div className="size-full bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground">Geen afbeelding</span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Post Content */}
                      <div className="flex-1">
                        {/* Categories and Reading Time */}
                        <div className="mb-4 flex w-full items-center justify-start">
                          {post.categories && post.categories.length > 0 && (
                            <div className="mr-4">
                              {post.categories.map((category, catIndex) => {
                                if (typeof category === 'object' && category.title) {
                                  return (
                                    <span
                                      key={category.id || catIndex}
                                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                                    >
                                      {category.title}
                                    </span>
                                  )
                                }
                                return null
                              })}
                            </div>
                          )}
                          {readingTime && (
                            <p className="text-sm font-semibold text-muted-foreground">
                              {readingTime}
                            </p>
                          )}
                        </div>

                        {/* Post Title */}
                        <Link href={`/blog/${post.slug}`} className="mb-2 block">
                          <h3 className="text-xl font-bold hover:text-primary transition-colors md:text-2xl">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Post Description */}
                        {post.meta?.description && (
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {post.meta.description}
                          </p>
                        )}

                        {/* Read More Link */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all"
                        >
                          Lees meer
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Er zijn momenteel geen blog posts beschikbaar.
            </p>
          </div>
        )}

        {/* View All Button */}
        {showViewAllButton && posts.length > 0 && (
          <div className="flex items-center justify-center">
            <Link
              href={viewAllButtonLink || '/blog'}
              className={cn(
                "mt-10 md:mt-14 lg:mt-16",
                "inline-flex items-center justify-center rounded-md text-sm font-medium",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "h-10 px-4 py-2",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              {viewAllButtonText || 'Bekijk alles'}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}