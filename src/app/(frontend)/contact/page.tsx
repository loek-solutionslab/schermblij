import type { Metadata } from 'next/types'

import React from 'react'
import { dutchRoutes, generatePageTitle, generatePageDescription } from '@/utilities/dutchRoutes'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ContactPage() {
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      
      {/* Hero Section */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">{dutchRoutes.contact.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Heb je vragen over mediawijs opvoeden, of ben je geïnteresseerd in een cursus of training? 
            Ik help je graag verder!
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact informatie</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">E-mail</h3>
                  <p className="text-gray-600 dark:text-gray-300">info@schermblij.nl</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Telefoon</h3>
                  <p className="text-gray-600 dark:text-gray-300">06 12 34 56 78</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Locatie</h3>
                  <p className="text-gray-600 dark:text-gray-300">Nederland (online en op locatie)</p>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Reactietijd</h3>
                  <p className="text-gray-600 dark:text-gray-300">Binnen 24 uur op werkdagen</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Waar ik je mee kan helpen</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Cursussen en workshops voor ouders
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Trainingen voor professionals
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Advies over mediagebruik per leeftijd
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Spreekbeurten en presentaties
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Maatwerk programma&apos;s voor organisaties
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Stuur een bericht</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Je voornaam"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Je achternaam"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="je@email.nl"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Onderwerp *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Selecteer een onderwerp</option>
                  <option value="cursus-ouders">Cursus voor ouders</option>
                  <option value="training-professionals">Training voor professionals</option>
                  <option value="advies-persoonlijk">Persoonlijk advies</option>
                  <option value="spreker">Spreker voor evenement</option>
                  <option value="samenwerking">Samenwerking</option>
                  <option value="anders">Anders</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Vertel me waar je hulp bij nodig hebt..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Ik ga akkoord met de verwerking van mijn gegevens voor het beantwoorden van mijn vraag *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Verstuur bericht
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                * Verplichte velden
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Veelgestelde vragen</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Hoe snel krijg ik antwoord?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ik streef ernaar om binnen 24 uur te reageren op werkdagen. 
                  In drukke periodes kan het soms iets langer duren.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Zijn de cursussen ook online beschikbaar?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ja! Veel van mijn cursussen en trainingen bied ik zowel fysiek 
                  als online aan, zodat het voor iedereen toegankelijk is.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Wat zijn de kosten?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  De kosten variëren per type training of cursus. Neem contact op 
                  voor een offerte op maat voor jouw situatie.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Kan ik een maatwerk training krijgen?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Absoluut! Ik ontwikkel graag programma&apos;s die perfect passen 
                  bij jouw organisatie, school of specifieke doelgroep.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Voor welke leeftijden geef je advies?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Van baby tot tiener - ik help ouders en professionals met 
                  mediawijs opvoeden voor alle leeftijdsgroepen.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Werk je samen met scholen?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ja, ik werk regelmatig samen met basisscholen, kinderopvang 
                  en andere educatieve instellingen voor trainingen en workshops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: generatePageTitle(dutchRoutes.contact.title),
    description: generatePageDescription(
      'Heb je vragen over mediawijs opvoeden, of ben je geïnteresseerd in een cursus of training? Neem contact op met SchermBlij.'
    ),
    openGraph: {
      title: generatePageTitle(dutchRoutes.contact.title),
      description: generatePageDescription(
        'Contact opnemen met SchermBlij voor vragen over mediawijs opvoeden, cursussen en trainingen'
      ),
    },
  }
}