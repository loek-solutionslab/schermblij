'use client'

import React from 'react'
import type { Layout04Block as Layout04BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { RxChevronRight } from 'react-icons/rx'

export const Layout04Block: React.FC<Layout04BlockProps> = ({
  tagline,
  heading,
  description,
  features,
  buttons,
  image,
  imageAlt,
}) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            )}
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            {description && (
              <p className="mb-6 md:mb-8 md:text-md">
                {description}
              </p>
            )}
            
            {/* Features Grid */}
            {features && features.length > 0 && (
              <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                      {feature.title}
                    </h6>
                    <p>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {buttons.map((button, index) => {
                  const buttonContent = (
                    <>
                      {button.text}
                      {button.variant === 'link' && <RxChevronRight className="ml-1" />}
                    </>
                  )

                  const buttonProps = {
                    variant: button.variant as 'default' | 'secondary' | 'link' | 'outline',
                    size: button.variant === 'link' ? ('clear' as const) : ('default' as const),
                    className: button.variant === 'link' ? 'p-0 h-auto font-medium' : undefined,
                  }

                  if (button.url) {
                    return (
                      <Button
                        key={index}
                        asChild
                        {...buttonProps}
                      >
                        <a
                          href={button.url}
                          target={button.openInNewTab ? '_blank' : undefined}
                          rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          {buttonContent}
                        </a>
                      </Button>
                    )
                  }

                  return (
                    <Button key={index} {...buttonProps}>
                      {buttonContent}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
          
          {/* Image */}
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