import React from 'react'
import type { StatisticsBlock as StatisticsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

// Icon components for different statistics
const icons = {
  users: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 20H4v-2a3 3 0 015.196-2.121M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  thumbup: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  ),
  star: (
    <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  trending: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  target: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 12a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  heart: (
    <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  ),
  lightning: (
    <svg className="size-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  shield: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  book: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  clock: (
    <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
}

export const StatisticsBlock: React.FC<StatisticsBlockProps> = ({
  tagline,
  heading,
  description,
  statistics,
  backgroundColor = 'white',
}) => {
  const bgClass = backgroundClasses[backgroundColor as keyof typeof backgroundClasses] || backgroundClasses.white

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', bgClass)}>
      <div className="container">
        <div className="flex flex-col items-center">
          {/* Header section */}
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="mx-auto w-full max-w-lg">
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
          </div>

          {/* Statistics grid */}
          <div className={cn(
            'grid gap-8 w-full',
            statistics.length === 1 && 'grid-cols-1 max-w-sm',
            statistics.length === 2 && 'grid-cols-1 md:grid-cols-2 max-w-2xl',
            statistics.length === 3 && 'grid-cols-1 md:grid-cols-3',
            statistics.length === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            statistics.length === 5 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
            statistics.length === 6 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          )}>
            {statistics.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Icon */}
                {stat.icon && (
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icons[stat.icon as keyof typeof icons]}
                  </div>
                )}
                
                {/* Number */}
                <div className="mb-2">
                  <span className="text-4xl font-bold lg:text-5xl xl:text-6xl">
                    {stat.number}
                  </span>
                </div>
                
                {/* Label */}
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  {stat.label}
                </h3>
                
                {/* Description */}
                {stat.description && (
                  <p className="text-sm text-muted-foreground md:text-base">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}