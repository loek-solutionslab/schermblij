'use client'

import React from 'react'
// import type { Header01Block as Header01BlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const Header01Block: React.FC<any> = ({
  eyebrow,
  heading,
  description,
  buttons,
  images,
}) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            {eyebrow && (
              <p className="mb-3 text-sm font-medium text-muted-foreground md:mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {heading}
            </h1>
            {description && (
              <div className="md:text-md">
                <RichText content={description} enableGutter={false} />
              </div>
            )}
            {buttons && buttons.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {buttons.map((button, index) => (
                  <CMSLink
                    key={index}
                    {...button.link}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            {images && images.length > 0 && (
              <div className="space-y-4">
                {images.map((imageItem, index) => (
                  <Media
                    key={index}
                    resource={imageItem.image}
                    imgClassName="w-full rounded-image object-cover"
                    alt={imageItem.alt || undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}