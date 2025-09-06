import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import type { TeamBlock, Team } from '@/payload-types'

import type { Media } from '@/payload-types'

interface TeamMemberMedia {
  url?: string
  alt?: string
}

const SocialIcons = {
  linkedin: () => (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: () => (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  instagram: () => (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.131 5.42.333 4.844.63c-.611.311-1.08.66-1.486 1.066C2.952 2.098 2.603 2.567 2.292 3.178 1.995 3.754 1.793 4.428 1.734 5.375.675 6.323.662 6.73.662 10.351s.013 4.028.072 4.976c.059.947.261 1.621.558 2.197.311.611.66 1.08 1.066 1.486.406.406.875.755 1.486 1.066.576.297 1.25.499 2.197.558.948.059 1.355.072 4.976.072s4.028-.013 4.976-.072c.947-.059 1.621-.261 2.197-.558.611-.311 1.08-.66 1.486-1.066.406-.406.755-.875 1.066-1.486.297-.576.499-1.25.558-2.197.059-.948.072-1.355.072-4.976s-.013-4.028-.072-4.976c-.059-.947-.261-1.621-.558-2.197-.311-.611-.66-1.08-1.066-1.486-.406-.406-.875-.755-1.486-1.066-.576-.297-1.25-.499-2.197-.558C16.045.013 15.638 0 12.017 0zm0 2.162c3.584 0 4.01.014 5.425.072.869.04 1.34.179 1.653.297.415.162.711.355 1.022.666.311.311.504.607.666 1.022.118.313.257.784.297 1.653.058 1.415.072 1.841.072 5.425s-.014 4.01-.072 5.425c-.04.869-.179 1.34-.297 1.653-.162.415-.355.711-.666 1.022-.311.311-.607.504-1.022.666-.313.118-.784.257-1.653.297-1.415.058-1.841.072-5.425.072s-4.01-.014-5.425-.072c-.869-.04-1.34-.179-1.653-.297-.415-.162-.711-.355-1.022-.666-.311-.311-.504-.607-.666-1.022-.118-.313-.257-.784-.297-1.653-.058-1.415-.072-1.841-.072-5.425s.014-4.01.072-5.425c.04-.869.179-1.34.297-1.653.162-.415.355-.711.666-1.022.311-.311.607-.504 1.022-.666.313-.118.784-.257 1.653-.297 1.415-.058 1.841-.072 5.425-.072z"/>
      <circle cx="12.017" cy="12.017" r="3.705"/>
      <circle cx="18.408" cy="5.592" r="1.065"/>
    </svg>
  ),
  website: () => (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
}

export const TeamBlockComponent: React.FC<TeamBlock> = async (block) => {
  const {
    tagline,
    heading,
    description,
    display_mode,
    team_members,
    max_members = 8,
    layout = 'cols-4',
    show_social_links = true,
    cta_section,
  } = block

  // Fetch team members based on display mode
  let members: Team[] = []
  
  try {
    const { default: payload } = await import('payload')
    
    if (display_mode === 'manual' && team_members && Array.isArray(team_members)) {
      // Get manually selected team members
      const selectedIds = team_members.map(member => 
        typeof member === 'string' ? member : (typeof member === 'object' && member && 'id' in member ? member.id : null)
      ).filter(Boolean)
      
      if (selectedIds.length > 0) {
        const result = await payload.find({
          collection: 'team',
          where: {
            id: {
              in: selectedIds,
            },
            status: {
              equals: 'active',
            },
          },
          limit: max_members || 8,
          sort: 'order',
        })
        members = result.docs
      }
    } else if (display_mode === 'featured') {
      // Get featured team members
      const result = await payload.find({
        collection: 'team',
        where: {
          status: {
            equals: 'active',
          },
          featured: {
            equals: true,
          },
        },
        limit: max_members || 8,
        sort: 'order',
      })
      members = result.docs
    } else {
      // Get all active team members (auto mode)
      const result = await payload.find({
        collection: 'team',
        where: {
          status: {
            equals: 'active',
          },
        },
        limit: max_members || 8,
        sort: 'order',
      })
      members = result.docs
    }
  } catch (error) {
    console.error('Error fetching team members:', error)
  }

  if (!members.length) {
    return null
  }

  const gridClasses = {
    'cols-2': 'grid-cols-1 md:grid-cols-2',
    'cols-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'cols-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          {tagline && (
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          )}
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          {description && (
            <p className="md:text-md">{description}</p>
          )}
        </div>

        {/* Team Grid */}
        <div className={cn(
          'grid gap-x-8 gap-y-12 md:gap-y-16',
          gridClasses[layout || 'cols-4']
        )}>
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-start">
              {/* Profile Image */}
              <div className="mb-5 md:mb-6">
                {member.profile_image && typeof member.profile_image === 'object' && member.profile_image.url ? (
                  <Image
                    src={member.profile_image.url}
                    alt={member.profile_image.alt || member.name || ''}
                    width={80}
                    height={80}
                    className="size-20 min-h-20 min-w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-20 min-h-20 min-w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-500">
                      {member.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="mb-3 md:mb-4">
                <h5 className="text-md font-semibold md:text-lg">
                  {member.name}
                </h5>
                <h6 className="md:text-md">{member.role}</h6>
              </div>

              {/* Bio */}
              {member.bio && <p className="mb-6">{member.bio}</p>}

              {/* Social Links */}
              {show_social_links && member.social_links && (
                <div className="mt-6 flex gap-3.5">
                  {member.social_links.linkedin && (
                    <a 
                      href={member.social_links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <SocialIcons.linkedin />
                    </a>
                  )}
                  {member.social_links.twitter && (
                    <a 
                      href={member.social_links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <SocialIcons.twitter />
                    </a>
                  )}
                  {member.social_links.instagram && (
                    <a 
                      href={member.social_links.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <SocialIcons.instagram />
                    </a>
                  )}
                  {member.social_links.website && (
                    <a 
                      href={member.social_links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <SocialIcons.website />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {cta_section?.show_cta && (
          <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
            {cta_section.cta_heading && (
              <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                {cta_section.cta_heading}
              </h4>
            )}
            {cta_section.cta_description && (
              <p className="md:text-md">{cta_section.cta_description}</p>
            )}
            {cta_section.cta_button_text && cta_section.cta_button_link && (
              <div className="mt-6 md:mt-8">
                <a
                  href={cta_section.cta_button_link}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                >
                  {cta_section.cta_button_text}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}