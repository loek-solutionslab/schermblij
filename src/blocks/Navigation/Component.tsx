'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { RxChevronDown, RxChevronRight } from 'react-icons/rx'

import type { NavigationBlock as NavigationBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

// Custom hook for managing navigation state (based on Relume useRelume)
const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  
  const toggleDropdown = (id: string, isMobile: boolean = false) => {
    if (isMobile) {
      setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }))
    } else {
      setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }))
    }
  }

  const setDropdownOpen = (id: string, isOpen: boolean) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: isOpen }))
  }

  const animateMobileMenu = isMobileMenuOpen ? 'open' : 'close'
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ['open', 'rotatePhase']
    : 'closed'

  return {
    isMobileMenuOpen,
    openDropdowns,
    toggleMobileMenu,
    toggleDropdown,
    setDropdownOpen,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
  }
}

export const NavigationBlock: React.FC<NavigationBlockProps> = ({
  logo,
  menu_items = [],
  cta_buttons = [],
  use_header_config = true,
}) => {
  const navigation = useNavigation()

  // If use_header_config is true, we should fetch header data
  // For now, we'll use the block's own configuration
  const menuItems = menu_items || []
  const ctaButtons = cta_buttons || []

  const renderMegaMenuSection = (section: any) => (
    <div key={section.section_title} className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_repeat(auto-fit,_max-content)] gap-y-2 md:gap-y-4">
      <h4 className="text-sm leading-[1.3] font-semibold">
        {section.section_title}
      </h4>
      {section.items?.map((item: any, idx: number) => (
        <a
          key={idx}
          href={item.url}
          className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
        >
          <div className="flex size-6 flex-col items-center justify-center">
            {item.icon && (
              <Media
                resource={item.icon}
                className="shrink-0 size-6"
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <h5 className="font-semibold">{item.label}</h5>
            {item.description && (
              <p className="hidden text-sm md:block">
                {item.description}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  )

  const renderFeaturedContent = (featured: any) => (
    <div className="relative mb-4 flex max-w-none flex-1 p-6 md:max-w-[50rem] md:p-8 lg:mb-0 lg:max-w-xxs lg:py-8 lg:pr-0 lg:pl-8">
      <div className="relative z-10 grid w-full grid-cols-1 grid-rows-[auto_max-content] gap-y-4">
        <h4 className="text-sm leading-[1.3] font-semibold">
          {featured.subtitle || 'Uitgelicht uit Blog'}
        </h4>
        <div className="grid w-full max-w-none grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start gap-y-2 md:block">
          <a href={featured.link_url} className="flex flex-col py-2">
            {featured.image && (
              <div className="relative mb-3 w-full overflow-hidden pt-[56.25%]">
                <Media
                  resource={featured.image}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            )}
            <div className="mt-2 flex max-w-[18rem] flex-col justify-start md:mt-0">
              <h5 className="mb-1 font-semibold">
                {featured.title || 'Artikel Titel'}
              </h5>
              {featured.description && (
                <p className="text-sm">{featured.description}</p>
              )}
              <div className="mt-2">
                <Button
                  variant="link"
                  size="sm"
                  className="text-sm underline p-0 h-auto"
                >
                  {featured.link_text || 'Lees meer'}
                </Button>
              </div>
            </div>
          </a>
        </div>
        <div className="flex items-center">
          <a href={featured.view_all_url} className="inline-flex items-center text-sm underline">
            {featured.view_all_text || 'Bekijk alle artikelen'}
            <RxChevronRight className="ml-1" />
          </a>
        </div>
      </div>
      <div className="absolute top-0 right-auto bottom-0 left-0 min-w-full bg-background-secondary lg:min-w-[100vw]" />
    </div>
  )

  const renderMegaMenu = (item: any, index: number) => {
    const dropdownId = `mega-${index}`
    const isOpen = navigation.openDropdowns[dropdownId] || false
    
    return (
      <div
        key={index}
        onMouseEnter={() => navigation.setDropdownOpen(dropdownId, true)}
        onMouseLeave={() => navigation.setDropdownOpen(dropdownId, false)}
      >
        <button
          className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
          onClick={() => navigation.toggleDropdown(dropdownId, true)}
        >
          <span>{item.label}</span>
          <motion.span
            animate={isOpen ? 'rotated' : 'initial'}
            variants={{
              rotated: { rotate: 180 },
              initial: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <RxChevronDown />
          </motion.span>
        </button>
        <AnimatePresence>
          <motion.nav
            variants={{
              open: {
                opacity: 1,
                display: 'block',
                height: 'var(--height-open, auto)',
              },
              close: {
                opacity: 0,
                display: 'none',
                height: 'var(--height-close, 0)',
              },
            }}
            animate={isOpen ? 'open' : 'close'}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
          >
            <div className="mx-auto flex size-full max-w-full items-center justify-between">
              <div className="flex w-full flex-col lg:flex-row">
                <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                  {item.dropdown_sections?.map((section: any) => renderMegaMenuSection(section))}
                </div>
                {item.featured_content && renderFeaturedContent(item.featured_content)}
              </div>
            </div>
          </motion.nav>
        </AnimatePresence>
      </div>
    )
  }

  const renderDropdown = (item: any, index: number) => {
    const dropdownId = `dropdown-${index}`
    const isOpen = navigation.openDropdowns[dropdownId] || false

    return (
      <div
        key={index}
        onMouseEnter={() => navigation.setDropdownOpen(dropdownId, true)}
        onMouseLeave={() => navigation.setDropdownOpen(dropdownId, false)}
      >
        <button
          className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
          onClick={() => navigation.toggleDropdown(dropdownId, true)}
        >
          <span>{item.label}</span>
          <motion.span
            animate={isOpen ? 'rotated' : 'initial'}
            variants={{
              rotated: { rotate: 180 },
              initial: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <RxChevronDown />
          </motion.span>
        </button>
        <AnimatePresence>
          <motion.div
            variants={{
              open: {
                opacity: 1,
                display: 'block',
                height: 'auto',
              },
              close: {
                opacity: 0,
                display: 'none',
                height: 0,
              },
            }}
            animate={isOpen ? 'open' : 'close'}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="lg:absolute lg:top-full lg:left-0 lg:bg-background-primary lg:border lg:border-border-primary lg:shadow-lg lg:min-w-[200px] lg:py-2"
          >
            {item.simple_dropdown_items?.map((dropdownItem: any, idx: number) => (
              <a
                key={idx}
                href={dropdownItem.url}
                className="block px-4 py-2 text-sm hover:bg-background-secondary"
              >
                {dropdownItem.label}
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      if (item.type === 'mega_menu') {
        return renderMegaMenu(item, index)
      } else if (item.type === 'dropdown') {
        return renderDropdown(item, index)
      } else {
        return (
          <a
            key={index}
            href={item.url || '#'}
            className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
          >
            {item.label}
          </a>
        )
      }
    })
  }

  return (
    <section className="relative z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] md:min-h-18">
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        {/* Logo */}
        <Link href="/">
          {logo && <Media resource={logo} className="inline-block" />}
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-24 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            {renderMenuItems()}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.style === 'secondary' ? 'secondary' : 'default'}
                size="sm"
                asChild
              >
                <a href={button.url}>{button.text}</a>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={navigation.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={navigation.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={navigation.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: '1.5rem',
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={navigation.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: '100dvh' }, close: { height: 'auto' } }}
          animate={navigation.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute top-full right-0 left-0 w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: '-100%' } }}
            animate={navigation.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 left-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-8"
          >
            <div className="flex flex-col">
              {renderMenuItems()}
              <div className="mt-6 flex flex-col gap-4">
                {ctaButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.style === 'secondary' ? 'secondary' : 'default'}
                    size="sm"
                    asChild
                  >
                    <a href={button.url}>{button.text}</a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}