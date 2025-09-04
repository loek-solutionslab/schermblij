'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'

import type { FooterBlock as FooterBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const socialIcons = {
  facebook: BiLogoFacebookCircle,
  instagram: BiLogoInstagram,
  twitter: FaXTwitter,
  linkedin: BiLogoLinkedinSquare,
  youtube: BiLogoYoutube,
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  logo,
  contact_info,
  social_links = [],
  footer_links = [],
  newsletter,
  partner_logos = [],
  legal_links = [],
  copyright_text = '© 2024 SchermBlij. All rights reserved.',
  use_footer_config = true,
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: 'newsletter',
          submissionData: [
            {
              field: 'email',
              value: email,
            },
          ],
        }),
      })

      if (response.ok) {
        setSubmitMessage('Bedankt voor je inschrijving!')
        setEmail('')
      } else {
        setSubmitMessage('Er ging iets mis. Probeer het opnieuw.')
      }
    } catch (error) {
      setSubmitMessage('Er ging iets mis. Probeer het opnieuw.')
    }

    setIsSubmitting(false)
  }

  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          {/* Logo and Contact Info */}
          <div>
            {logo && (
              <div className="mb-6 md:mb-8">
                <Link href="/">
                  <Media resource={logo} className="inline-block" />
                </Link>
              </div>
            )}
            
            {contact_info && (
              <div className="mb-6 md:mb-8">
                {contact_info.address && (
                  <>
                    <p className="mb-1 text-sm font-semibold">
                      {contact_info.address_label || 'Adres:'}
                    </p>
                    <p className="mb-5 text-sm md:mb-6 whitespace-pre-line">
                      {contact_info.address}
                    </p>
                  </>
                )}
                
                {(contact_info.phone || contact_info.email) && (
                  <>
                    <p className="mb-1 text-sm font-semibold">
                      {contact_info.contact_label || 'Contact:'}
                    </p>
                    {contact_info.phone && (
                      <a
                        href={`tel:${contact_info.phone.replace(/\s/g, '')}`}
                        className="block text-sm underline decoration-black underline-offset-1"
                      >
                        {contact_info.phone}
                      </a>
                    )}
                    {contact_info.email && (
                      <a
                        href={`mailto:${contact_info.email}`}
                        className="block text-sm underline decoration-black underline-offset-1"
                      >
                        {contact_info.email}
                      </a>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Social Links */}
            {social_links && social_links.length > 0 && (
              <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
                {social_links.map((social, index) => {
                  const IconComponent = socialIcons[social.platform as keyof typeof socialIcons]
                  if (!IconComponent) return null
                  
                  return (
                    <a key={index} href={social.url} className="hover:opacity-70 transition-opacity">
                      <IconComponent className={`size-6 ${social.platform === 'twitter' ? 'p-0.5' : ''}`} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer Links and Newsletter */}
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
            {/* Footer Link Groups */}
            {footer_links?.map((group, index) => (
              <ul key={index}>
                {group.title && (
                  <li className="py-2 text-sm font-semibold mb-2">
                    {group.title}
                  </li>
                )}
                {group.links?.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm font-semibold">
                    <a href={link.url} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}

            {/* Newsletter Section */}
            {newsletter?.enabled && (
              <div className="md:col-span-2">
                {newsletter.heading && (
                  <h3 className="text-lg font-semibold mb-4">{newsletter.heading}</h3>
                )}
                {newsletter.description && (
                  <p className="text-sm mb-4">{newsletter.description}</p>
                )}
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                  <Input
                    type="email"
                    placeholder={newsletter.placeholder_text || 'Voer je e-mail in'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSubmitting || !email}>
                    {isSubmitting ? 'Bezig...' : (newsletter.button_text || 'Inschrijven')}
                  </Button>
                </form>
                {submitMessage && (
                  <p className={`text-sm mt-2 ${submitMessage.includes('Bedankt') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Partner Logos */}
        {partner_logos && partner_logos.length > 0 && (
          <div className="border-t border-border-primary pt-8 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partner_logos.map((partner, index) => (
                <div key={index} className="flex items-center">
                  {partner.url ? (
                    <a 
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-70 transition-opacity"
                    >
                      <Media
                        resource={partner.logo}
                        className="h-8 md:h-10 w-auto"
                        alt={partner.name}
                      />
                    </a>
                  ) : (
                    <Media
                      resource={partner.logo}
                      className="h-8 md:h-10 w-auto"
                      alt={partner.name}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-black" />

        {/* Copyright and Legal Links */}
        <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
          <p className="mt-8 md:mt-0">{copyright_text}</p>
          {legal_links && legal_links.length > 0 && (
            <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
              {legal_links.map((link, index) => (
                <li key={index} className="underline">
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}