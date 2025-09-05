'use client'

import React from 'react'
import type { Layout03Block as Layout03BlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const Layout03Block: React.FC<Layout03BlockProps> = ({
  heading,
  description,
  image,
  imageAlt,
}) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            {description && (
              <div className="md:text-md">
                <RichText content={description} enableGutter={false} />
              </div>
            )}
          </div>
          <div>
            {image && (
              <Media
                resource={image}
                imgClassName="w-full rounded-image object-cover"
                alt={imageAlt || undefined}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}