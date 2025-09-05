'use client'

import React from 'react'
import type { Layout01Block as Layout01BlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const Layout01Block: React.FC<Layout01BlockProps> = ({
  eyebrow,
  heading,
  description,
  buttons,
  image,
  imageAlt,
}) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            {eyebrow && (
              <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
            )}
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            {description && (
              <div className="md:text-md">
                <RichText content={description} enableGutter={false} />
              </div>
            )}
            {buttons && buttons.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {buttons.map((button, index) => (
                  <CMSLink
                    key={index}
                    {...button.link}
                    appearance={button.link.appearance || 'default'}
                  />
                ))}
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