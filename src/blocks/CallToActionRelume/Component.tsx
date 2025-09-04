'use client'

import React, { useState } from 'react'
import { cn } from 'src/utilities/cn'

import type { CallToActionRelumeBlock as CTARelumeBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Media } from '@/components/Media'

export const CallToActionRelumeBlock: React.FC<CTARelumeBlockProps> = ({
  heading = 'Schrijf je nu in!',
  subheading = 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  image,
  form_settings,
  terms_and_conditions,
  layout = 'image-right',
  background_color = 'default',
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form_settings?.form_identifier || 'cta-signup',
          submissionData: [
            {
              field: 'email',
              value: email,
            },
          ],
        }),
      })

      if (response.ok) {
        setSubmitMessage(form_settings?.success_message || 'Bedankt voor je inschrijving! We houden je op de hoogte.')
        setIsSuccess(true)
        setEmail('')
      } else {
        setSubmitMessage(form_settings?.error_message || 'Er ging iets mis. Probeer het opnieuw.')
        setIsSuccess(false)
      }
    } catch (error) {
      setSubmitMessage(form_settings?.error_message || 'Er ging iets mis. Probeer het opnieuw.')
      setIsSuccess(false)
    }

    setIsSubmitting(false)
  }

  const backgroundClasses = {
    default: '',
    light: 'bg-background-secondary',
    dark: 'bg-background-primary text-white',
    primary: 'bg-primary text-primary-foreground',
  }

  const layoutClasses = {
    'image-right': 'lg:grid-cols-2',
    'image-left': 'lg:grid-cols-2',
    'text-only': 'lg:grid-cols-1 justify-center',
    'centered': 'lg:grid-cols-1 text-center',
  }

  const shouldShowImage = layout !== 'text-only' && image
  const imageOrder = layout === 'image-left' ? 'lg:order-1' : 'lg:order-2'
  const contentOrder = layout === 'image-left' ? 'lg:order-2' : 'lg:order-1'

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', backgroundClasses[background_color || 'white'])}>
      <div className="container">
        <div className={cn(
          'grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:items-center',
          layoutClasses[layout || 'centered']
        )}>
          {/* Content */}
          <div className={cn(layout === 'centered' && 'max-w-4xl mx-auto', contentOrder)}>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            {subheading && (
              <p className="md:text-md mb-6 md:mb-8">
                {subheading}
              </p>
            )}
            
            {/* Form */}
            <div className={cn('w-full max-w-sm', layout === 'centered' && 'mx-auto')}>
              <form onSubmit={handleSubmit} className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input
                  id="email"
                  type="email"
                  placeholder={form_settings?.email_placeholder || 'Voer je e-mail in'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? 'Bezig...' : (form_settings?.button_text || 'Inschrijven')}
                </Button>
              </form>

              {/* Submit Message */}
              {submitMessage && (
                <div className={cn(
                  'mb-4 p-3 rounded-md text-sm',
                  isSuccess 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                )}>
                  {submitMessage}
                </div>
              )}

              {/* Terms and Conditions */}
              {terms_and_conditions?.show_terms && (
                <div className="text-xs">
                  <p>
                    {terms_and_conditions.terms_text || 'Door op Inschrijven te klikken, ga je akkoord met onze'}{' '}
                    <a 
                      href={terms_and_conditions.terms_link_url || '/algemene-voorwaarden'} 
                      className="underline hover:no-underline"
                    >
                      {terms_and_conditions.terms_link_text || 'Algemene Voorwaarden'}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          {shouldShowImage && (
            <div className={cn(imageOrder)}>
              <Media
                resource={image}
                className="w-full rounded-image object-cover"
                alt={`${heading} - afbeelding`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}