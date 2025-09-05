'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { FAQBlock } from '@/payload-types'
import { RxPlus } from 'react-icons/rx'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & FAQBlock

export const FAQBlockComponent: React.FC<Props> = ({
  className,
  heading = 'Veelgestelde vragen',
  description,
  questions = [],
  contactSection,
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const showContactSection = contactSection?.showContact !== false

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 ${className || ''}`}>
      <div className="container">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          {description && (
            <p className="md:text-md max-w-lg mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Grid */}
        <div className="grid items-start justify-stretch gap-4">
          {questions?.map((faqItem, index) => {
            const isOpen = openItems.has(index)
            
            return (
              <div
                key={index}
                className="border border-border-primary bg-background-primary p-6 rounded-lg"
              >
                {/* Question Header */}
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-xl font-bold md:text-2xl pr-4">
                    {faqItem.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <RxPlus
                      className={`size-6 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="mt-6 animate-fadeIn"
                  >
                    {faqItem.answer && (
                      <RichText
                        content={faqItem.answer}
                        enableGutter={false}
                        enableProse={true}
                        className="max-w-none"
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        {showContactSection && contactSection && (
          <div className="mt-12 text-center md:mt-18 lg:mt-20">
            <div className="max-w-lg mx-auto">
              {contactSection.title && (
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
                  {contactSection.title}
                </h2>
              )}
              {contactSection.description && (
                <p className="mb-6 md:text-md">
                  {contactSection.description}
                </p>
              )}
              {contactSection.buttonText && contactSection.buttonLink && (
                <Link
                  href={contactSection.buttonLink}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-text-alternative bg-background-alternative border border-border-alternative rounded-md hover:bg-background-alternative-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background-alternative transition-colors duration-200"
                >
                  {contactSection.buttonText}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  )
}