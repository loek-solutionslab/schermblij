'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Course, CourseCategory, AgeGroup } from '@/payload-types'
import RichText from '@/components/RichText'
import { BiSolidStar } from 'react-icons/bi'
import { 
  FaCalendarAlt, 
  FaClock, 
  FaEuroSign, 
  FaUsers, 
  FaVideo, 
  FaMapMarkerAlt 
} from 'react-icons/fa'

interface CourseDetailClientProps {
  course: Course
  courseCategory: CourseCategory
  ageGroups: AgeGroup[]
}

const CourseDetailClient: React.FC<CourseDetailClientProps> = ({ 
  course, 
  courseCategory, 
  ageGroups 
}) => {
  // Format price
  const formatPrice = (price?: number | null) => {
    if (!price) return 'Prijs op aanvraag'
    return `€${price.toFixed(2)}`
  }

  // Format duration
  const formatDuration = (minutes?: number | null) => {
    if (!minutes) return null
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) return `${hours} uur ${mins} min`
    if (hours > 0) return `${hours} uur`
    return `${mins} minuten`
  }

  // Format course format
  const formatCourseFormat = (format?: string | null) => {
    switch (format) {
      case 'online': return 'Online'
      case 'physical': return 'Fysiek'
      case 'hybrid': return 'Hybride'
      default: return 'Niet gespecificeerd'
    }
  }

  // Scroll to booking section
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section')
    bookingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Pre-select session and scroll to booking
  const selectSessionAndScroll = (sessionIndex: number) => {
    const bookingSection = document.getElementById('booking-section')
    // Small delay to ensure the form is rendered
    setTimeout(() => {
      const radioButton = document.querySelector(`input[name="selectedSessionIndex"][value="${sessionIndex}"]`) as HTMLInputElement
      if (radioButton) {
        radioButton.checked = true
        radioButton.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }, 100)
    bookingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <article className="pt-16 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:py-20">
            {/* Left Column - Course Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {courseCategory.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {course.title}
              </h1>
              
              {course.description && (
                <div className="prose prose-lg max-w-none mb-8">
                  <RichText 
                    content={course.description}
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {course.price && (
                  <div className="flex items-center space-x-3">
                    <FaEuroSign className="text-green-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Prijs</p>
                      <p className="font-semibold text-lg">{formatPrice(course.price)}</p>
                    </div>
                  </div>
                )}
                
                {course.duration_minutes && (
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-blue-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duur</p>
                      <p className="font-semibold text-lg">{formatDuration(course.duration_minutes)}</p>
                    </div>
                  </div>
                )}
                
                {course.format && (
                  <div className="flex items-center space-x-3">
                    <FaVideo className="text-purple-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Format</p>
                      <p className="font-semibold text-lg">{formatCourseFormat(course.format)}</p>
                    </div>
                  </div>
                )}
                
                {course.max_participants && (
                  <div className="flex items-center space-x-3">
                    <FaUsers className="text-orange-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Groepsgrootte</p>
                      <p className="font-semibold text-lg">Max {course.max_participants} deelnemers</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Age Groups */}
              {ageGroups.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Geschikt voor leeftijdsgroepen:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ageGroups.map((ageGroup) => (
                      <Link
                        key={ageGroup.id}
                        href={`/voor-elke-leeftijd/${ageGroup.slug}`}
                        className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        {ageGroup.name} ({ageGroup.min_age}-{ageGroup.max_age} jaar)
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToBooking}
                  className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                >
                  Schrijf je in
                </button>
                <Link 
                  href="/contact" 
                  className="px-8 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
                >
                  Stel een vraag
                </Link>
              </div>
            </div>

            {/* Right Column - Featured Image */}
            <div className="relative">
              {course.featured_image && typeof course.featured_image === 'object' && course.featured_image.url ? (
                <Image
                  src={course.featured_image.url}
                  alt={course.featured_image.alt || course.title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                  priority
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 dark:text-gray-500">Geen afbeelding beschikbaar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Blocks would be rendered here but moved to server component for build compatibility */}

      {/* Course Booking Section - Form to be added */}
      <div id="booking-section" className="container mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Schrijf je in voor deze cursus</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Booking form component will be implemented here.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Dates Section */}
      {course.upcoming_dates && course.upcoming_dates.length > 0 && (
        <div className="container mt-16">
          <h2 className="text-3xl font-bold mb-8">Aankomende data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.upcoming_dates.map((session, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="text-blue-600 mr-3" />
                  <p className="font-semibold">
                    {session.date && new Date(session.date).toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                {session.location && (
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-red-600 mr-3" />
                    <p className="text-gray-600 dark:text-gray-400">{session.location}</p>
                  </div>
                )}
                
                {session.available_spots !== null && session.available_spots !== undefined && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm">
                      <span className="font-semibold">{session.available_spots}</span>
                      <span className="text-gray-600 dark:text-gray-400"> plekken beschikbaar</span>
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={() => selectSessionAndScroll(index)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!session.available_spots || session.available_spots <= 0}
                >
                  {session.available_spots && session.available_spots > 0 ? 'Reserveer deze datum' : 'Uitverkocht'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      {course.testimonials && course.testimonials.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 mt-16 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Wat cursisten zeggen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {course.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <BiSolidStar key={i} className="text-yellow-400 size-5" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </blockquote>
                  {(testimonial.author || testimonial.role) && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.author && <p className="font-semibold">{testimonial.author}</p>}
                      {testimonial.role && <p>{testimonial.role}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="container mt-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Schrijf je vandaag nog in voor deze cursus en investeer in jouw ontwikkeling.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button 
              onClick={scrollToBooking}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Schrijf je nu in
            </button>
            <Link 
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Meer informatie
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CourseDetailClient