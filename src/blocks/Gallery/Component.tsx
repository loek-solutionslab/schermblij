import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import type { GalleryBlock, Gallery } from '@/payload-types'

export const GalleryBlockComponent: React.FC<GalleryBlock> = async (block) => {
  const {
    tagline,
    heading,
    description,
    layout_style = 'grid',
    display_mode = 'auto',
    gallery_items,
    category_filter,
    max_items = 8,
    enable_lightbox = true,
    show_captions = false,
  } = block

  // Fetch gallery items based on display mode
  let items: Gallery[] = []
  
  try {
    const { default: payload } = await import('payload')
    
    if (display_mode === 'manual' && gallery_items && Array.isArray(gallery_items)) {
      // Get manually selected gallery items
      const selectedIds = gallery_items.map(item => 
        typeof item === 'string' ? item : (typeof item === 'object' && item && 'id' in item ? item.id : null)
      ).filter(Boolean)
      
      if (selectedIds.length > 0) {
        const result = await payload.find({
          collection: 'gallery',
          where: {
            id: {
              in: selectedIds,
            },
            status: {
              equals: 'active',
            },
          },
          limit: max_items || 8,
          sort: 'order',
        })
        items = result.docs
      }
    } else if (display_mode === 'category' && category_filter) {
      // Get items by category
      const result = await payload.find({
        collection: 'gallery',
        where: {
          status: {
            equals: 'active',
          },
          category: {
            equals: category_filter,
          },
        },
        limit: max_items || 8,
        sort: 'order',
      })
      items = result.docs
    } else if (display_mode === 'featured') {
      // Get featured items
      const result = await payload.find({
        collection: 'gallery',
        where: {
          status: {
            equals: 'active',
          },
          featured: {
            equals: true,
          },
        },
        limit: max_items || 8,
        sort: 'order',
      })
      items = result.docs
    } else {
      // Get all active items (auto mode)
      const result = await payload.find({
        collection: 'gallery',
        where: {
          status: {
            equals: 'active',
          },
        },
        limit: max_items || 8,
        sort: 'order',
      })
      items = result.docs
    }
  } catch (error) {
    console.error('Error fetching gallery items:', error)
  }

  if (!items.length) {
    return null
  }

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
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

        {/* Gallery Grid */}
        {layout_style === 'masonry' ? (
          // Masonry Layout (like Gallery8)
          <div className="gap-x-8 md:columns-2">
            {items.map((item, index) => (
              <div key={item.id} className="mb-8 inline-block w-full">
                <div className={cn(
                  "relative inline-block w-full",
                  // Alternate aspect ratios for visual variety
                  index % 3 === 0 ? "pt-[100%]" : "pt-[66.66%]"
                )}>
                  {enable_lightbox && item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 block"
                    >
                      <GalleryImage item={item} className="absolute inset-0 size-full rounded-lg object-cover hover:opacity-90 transition-opacity" />
                    </a>
                  ) : (
                    <GalleryImage item={item} className="absolute inset-0 size-full rounded-lg object-cover" />
                  )}
                </div>
                {show_captions && item.title && (
                  <h3 className="mt-3 text-sm font-medium text-center">{item.title}</h3>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Grid Layout (like Gallery4)
          <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col">
                {enable_lightbox && item.link ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <GalleryImage item={item} className="size-full rounded-lg object-cover hover:opacity-90 transition-opacity" />
                  </a>
                ) : (
                  <GalleryImage item={item} className="size-full rounded-lg object-cover" />
                )}
                {show_captions && item.title && (
                  <h3 className="mt-3 text-sm font-medium text-center">{item.title}</h3>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Helper component for gallery images
const GalleryImage: React.FC<{ 
  item: Gallery; 
  className?: string;
}> = ({ item, className }) => {
  if (item.image && typeof item.image === 'object' && item.image.url) {
    return (
      <Image
        src={item.image.url}
        alt={item.image.alt || item.title || ''}
        width={400}
        height={400}
        className={className}
      />
    )
  }
  
  // Fallback for missing image
  return (
    <div className={cn("bg-gray-200 flex items-center justify-center", className)}>
      <span className="text-gray-500 text-sm">Geen afbeelding</span>
    </div>
  )
}