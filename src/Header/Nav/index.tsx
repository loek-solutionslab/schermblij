'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const menuItems = header?.menu_items || []
  const navItems = header?.navItems || [] // Fallback to legacy
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // If no menu_items, fall back to legacy navItems
  const itemsToRender = menuItems.length > 0 ? menuItems : navItems

  return (
    <nav className="flex gap-6 items-center">
      {menuItems.length > 0 ? (
        // New menu structure
        menuItems.map((item, i) => {
          if (item.type === 'link') {
            return (
              <Link 
                key={i} 
                href={item.url || '/'} 
                className="hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            )
          }
          
          if (item.type === 'dropdown' && item.children) {
            return (
              <div key={i} className="relative">
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
                  onMouseEnter={() => setActiveDropdown(item.label || '')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.label}
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                
                {activeDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 border border-border rounded-lg shadow-lg py-2 min-w-48 z-50"
                    onMouseEnter={() => setActiveDropdown(item.label || '')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.url || '/'}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="font-medium">{child.label}</div>
                        {child.description && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {child.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          
          return null
        })
      ) : (
        // Fallback to legacy navigation
        navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })
      )}
      
      <Link href="/search" className="hover:text-primary transition-colors">
        <span className="sr-only">Zoeken</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
