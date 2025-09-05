'use client'

import React from 'react'
import Image from 'next/image'
import type { TestimonialBlock } from '@/payload-types'
import { BiSolidStar } from 'react-icons/bi'

type Props = {
  className?: string
} & TestimonialBlock

export const TestimonialBlockComponent: React.FC<Props> = ({
  className,
  heading = 'Klantbeoordelingen',
  subheading,
  testimonials = [],
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <BiSolidStar
        key={index}
        className={`size-6 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 ${className || ''}`}>
      <div className="container">
        {/* Header Section */}
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          {subheading && (
            <p className="md:text-md">
              {subheading}
            </p>
          )}
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {testimonials?.map((testimonial, index) => {
            const author = testimonial.author || {}
            const company = testimonial.company || {}
            
            return (
              <div
                key={index}
                className="flex h-full max-w-lg flex-col items-start justify-start text-left"
              >
                {/* Star Rating */}
                <div className="mb-5 flex md:mb-6">
                  {renderStars(testimonial.rating || 5)}
                </div>
                
                {/* Quote */}
                <blockquote className="text-md leading-[1.4] font-bold md:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                
                {/* Author Section */}
                <div className="mt-6 flex w-full items-center">
                  {/* Avatar */}
                  {author.avatar && typeof author.avatar === 'object' && author.avatar.url && (
                    <Image
                      src={author.avatar.url}
                      alt={author.avatar.alt || `${author.name || 'Klant'} avatar`}
                      width={56}
                      height={56}
                      className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                    />
                  )}
                  
                  {/* Author Info */}
                  <div className="ml-4 flex min-h-[3.5rem] flex-col justify-center">
                    {author.name && (
                      <p className="text-base font-semibold">
                        {author.name}
                      </p>
                    )}
                    {author.title && (
                      <p className="text-sm">
                        {author.title}
                      </p>
                    )}
                  </div>
                  
                  {/* Company Logo Separator */}
                  {company.name && (
                    <>
                      <div className="mx-4 hidden w-px self-stretch bg-black md:block" />
                      <div className="ml-4 flex flex-col items-center justify-center">
                        {company.logo && typeof company.logo === 'object' && company.logo.url && (
                          <Image
                            src={company.logo.url}
                            alt={company.logo.alt || `${company.name} logo`}
                            width={120}
                            height={48}
                            className="max-h-12 object-contain"
                          />
                        )}
                        {!company.logo && company.name && (
                          <p className="text-sm font-medium text-gray-600">
                            {company.name}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}