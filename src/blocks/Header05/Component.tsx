'use client'

import React from 'react'
import type { Header05Block as Header05BlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const Header05Block: React.FC<Header05BlockProps> = ({
  heading,
  description,
  buttons,
  backgroundImage,
  overlay = true,
}) => {
  return (
    <section className="relative px-[5%]">
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            {heading && (
              <h1 className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl">
                {heading}
              </h1>
            )}
            {description && (
              <p className="text-white md:text-md">
                {description}
              </p>
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
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Media
            resource={backgroundImage}
            imgClassName="size-full object-cover"
            alt=""
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}
      </div>
    </section>
  )
}