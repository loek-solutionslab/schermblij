'use client'

import React, { useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Course } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/cn'
import { getClientSideURL } from '@/utilities/getURL'
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPlus, 
  FaTimes,
  FaChild,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa'

// Types for the form data
interface Child {
  age: number
  name: string
}

interface BookingFormData {
  parentName: string
  parentEmail: string
  parentPhone: string
  children: Child[]
  selectedSessionIndex: number
  gdprConsent: boolean
  additionalInfo?: string
}

interface CourseBookingFormProps {
  course: Course
  className?: string
  onBookingComplete?: () => void
}

interface FormErrors {
  [key: string]: string
}

interface SubmissionState {
  isLoading: boolean
  isSuccess: boolean
  error?: string
}

const CourseBookingForm: React.FC<CourseBookingFormProps> = ({ 
  course, 
  className,
  onBookingComplete 
}) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isLoading: false,
    isSuccess: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      children: [{ age: 5, name: '' }], // Start with one child
      selectedSessionIndex: -1,
      gdprConsent: false,
      additionalInfo: '',
    },
    mode: 'onChange'
  })

  const { fields: childrenFields, append, remove } = useFieldArray({
    control,
    name: 'children',
  })

  const selectedSessionIndex = watch('selectedSessionIndex')
  const gdprConsent = watch('gdprConsent')

  // Get the selected session details
  const selectedSession = selectedSessionIndex >= 0 && course.upcoming_dates 
    ? course.upcoming_dates[selectedSessionIndex] 
    : null

  // Check if the selected session has available spots
  const hasAvailableSpots = selectedSession 
    ? (selectedSession.available_spots || 0) > 0 
    : false

  // Add a new child
  const addChild = useCallback(() => {
    append({ age: 5, name: '' })
  }, [append])

  // Remove a child
  const removeChild = useCallback((index: number) => {
    if (childrenFields.length > 1) {
      remove(index)
    }
  }, [remove, childrenFields.length])

  // Format session date for display
  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Handle form submission
  const onSubmit = useCallback(async (data: BookingFormData) => {
    if (!hasAvailableSpots && selectedSession) {
      setSubmissionState({
        isLoading: false,
        isSuccess: false,
        error: 'De geselecteerde sessie is uitverkocht. Selecteer een andere datum.',
      })
      return
    }

    setSubmissionState({ isLoading: true, isSuccess: false })

    try {
      // Prepare the submission data for the FormSubmissions collection
      const childrenAges = data.children.map(child => child.age).join(', ')
      const childrenNames = data.children.map(child => child.name).filter(name => name.trim()).join(', ')
      
      const sessionInfo = selectedSession 
        ? `Datum: ${formatSessionDate(selectedSession.date)} ${selectedSession.location ? `- Locatie: ${selectedSession.location}` : ''}`
        : 'Geen sessie geselecteerd'

      const message = `
Cursusboeking voor: ${course.title}
${sessionInfo}

Kinderen (${data.children.length}):
${data.children.map(child => `- ${child.name || 'Naamloos'} (${child.age} jaar oud)`).join('\n')}

${data.additionalInfo ? `\nAanvullende informatie:\n${data.additionalInfo}` : ''}
      `.trim()

      // Submit to the FormSubmissions collection using Payload API
      const response = await fetch(`${getClientSideURL()}/api/form_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type: 'enrollment',
          name: data.parentName,
          email: data.parentEmail,
          phone: data.parentPhone,
          message,
          course_reference: course.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden bij het verzenden van je boeking')
      }

      // Success
      setSubmissionState({ 
        isLoading: false, 
        isSuccess: true 
      })
      
      reset() // Clear the form
      onBookingComplete?.()
      
    } catch (error) {
      setSubmissionState({
        isLoading: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Er is een onbekende fout opgetreden',
      })
    }
  }, [course, selectedSession, hasAvailableSpots, reset, onBookingComplete])

  // Show success state
  if (submissionState.isSuccess) {
    return (
      <div className={cn(
        "bg-green-50 border border-green-200 rounded-lg p-8 text-center",
        "dark:bg-green-900/20 dark:border-green-800",
        className
      )}>
        <FaCheckCircle className="mx-auto text-green-600 text-4xl mb-4" />
        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
          Boeking verzonden!
        </h3>
        <p className="text-green-700 dark:text-green-400 mb-4">
          Bedankt voor je interesse in <strong>{course.title}</strong>. 
          We nemen binnen 1 werkdag contact met je op om je boeking te bevestigen.
        </p>
        <p className="text-sm text-green-600 dark:text-green-500">
          Je ontvangt een bevestigingsmail op {getValues('parentEmail')}.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8",
      "border border-gray-200 dark:border-gray-700",
      className
    )}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schrijf je in voor deze cursus</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Vul onderstaand formulier in om je in te schrijven voor <strong>{course.title}</strong>.
          We nemen binnen 1 werkdag contact met je op om je boeking te bevestigen.
        </p>
      </div>

      {submissionState.error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 dark:bg-red-900/20 dark:border-red-800">
          <FaExclamationTriangle className="text-red-600 text-lg" />
          <p className="text-red-700 dark:text-red-400">{submissionState.error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parent Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FaUser className="text-blue-600" />
            <h3 className="text-lg font-semibold">Jouw gegevens</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parentName" className="text-sm font-medium">
                Jouw naam *
              </Label>
              <Input
                id="parentName"
                type="text"
                {...register('parentName', { 
                  required: 'Naam is verplicht',
                  minLength: { value: 2, message: 'Naam moet minstens 2 karakters bevatten' }
                })}
                className={errors.parentName ? 'border-red-500' : ''}
                placeholder="Volle naam"
              />
              {errors.parentName && (
                <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="parentPhone" className="text-sm font-medium">
                Telefoonnummer *
              </Label>
              <Input
                id="parentPhone"
                type="tel"
                {...register('parentPhone', { 
                  required: 'Telefoonnummer is verplicht',
                  pattern: {
                    value: /^[\d\s+()-]{8,}$/,
                    message: 'Voer een geldig telefoonnummer in'
                  }
                })}
                className={errors.parentPhone ? 'border-red-500' : ''}
                placeholder="06-12345678"
              />
              {errors.parentPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.parentPhone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="parentEmail" className="text-sm font-medium">
              E-mailadres *
            </Label>
            <Input
              id="parentEmail"
              type="email"
              {...register('parentEmail', { 
                required: 'E-mailadres is verplicht',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Voer een geldig e-mailadres in'
                }
              })}
              className={errors.parentEmail ? 'border-red-500' : ''}
              placeholder="naam@voorbeeld.nl"
            />
            {errors.parentEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>
            )}
          </div>
        </div>

        {/* Children Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaChild className="text-green-600" />
              <h3 className="text-lg font-semibold">Kinderen</h3>
            </div>
            <Button
              type="button"
              onClick={addChild}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <FaPlus className="mr-2" />
              Kind toevoegen
            </Button>
          </div>

          {childrenFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Kind {index + 1}</h4>
                {childrenFields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeChild(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FaTimes />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`children.${index}.name`} className="text-sm font-medium">
                    Naam (optioneel)
                  </Label>
                  <Input
                    {...register(`children.${index}.name` as const)}
                    placeholder="Naam van het kind"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`children.${index}.age`} className="text-sm font-medium">
                    Leeftijd *
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="18"
                    {...register(`children.${index}.age` as const, {
                      required: 'Leeftijd is verplicht',
                      min: { value: 0, message: 'Leeftijd moet minstens 0 zijn' },
                      max: { value: 18, message: 'Leeftijd mag maximaal 18 zijn' },
                      valueAsNumber: true
                    })}
                    className={errors.children?.[index]?.age ? 'border-red-500' : ''}
                    placeholder="5"
                  />
                  {errors.children?.[index]?.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.children[index]?.age?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session Selection */}
        {course.upcoming_dates && course.upcoming_dates.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FaCalendarAlt className="text-purple-600" />
              <h3 className="text-lg font-semibold">Selecteer een datum</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {course.upcoming_dates.map((session, index) => {
                const isAvailable = (session.available_spots || 0) > 0
                const isSelected = selectedSessionIndex === index
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all",
                      isSelected 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300",
                      !isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (isAvailable) {
                        setValue('selectedSessionIndex', index)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            {...register('selectedSessionIndex', {
                              required: 'Selecteer een datum',
                              validate: (value) => value >= 0 || 'Selecteer een datum'
                            })}
                            value={index}
                            checked={isSelected}
                            disabled={!isAvailable}
                            className="mr-3"
                            onChange={() => setValue('selectedSessionIndex', index)}
                          />
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {formatSessionDate(session.date)}
                          </p>
                        </div>
                        
                        {session.location && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <FaMapMarkerAlt className="mr-2" />
                            {session.location}
                          </div>
                        )}
                        
                        <div className="text-sm">
                          {isAvailable ? (
                            <span className="text-green-600 font-medium">
                              {session.available_spots} plekken beschikbaar
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">Uitverkocht</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {errors.selectedSessionIndex && (
              <p className="text-red-500 text-sm">{errors.selectedSessionIndex.message}</p>
            )}
          </div>
        )}

        {/* Additional Information */}
        <div>
          <Label htmlFor="additionalInfo" className="text-sm font-medium">
            Aanvullende informatie (optioneel)
          </Label>
          <textarea
            id="additionalInfo"
            {...register('additionalInfo')}
            rows={3}
            className={cn(
              "w-full px-3 py-2 text-sm border border-gray-300 rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            )}
            placeholder="Bijzonderheden, vragen of opmerkingen..."
          />
        </div>

        {/* GDPR Consent */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="gdprConsent"
              checked={gdprConsent}
              onCheckedChange={(checked) => setValue('gdprConsent', !!checked)}
              className={errors.gdprConsent ? 'border-red-500' : ''}
            />
            <div>
              <Label 
                htmlFor="gdprConsent" 
                className="text-sm font-medium cursor-pointer"
              >
                Privacyverklaring *
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Ik ga akkoord met het verwerken van mijn persoonsgegevens zoals beschreven in de{' '}
                <a 
                  href="/privacy" 
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacyverklaring
                </a>
                . Mijn gegevens worden gebruikt voor het verwerken van deze cursusboeking en 
                het versturen van gerelateerde communicatie.
              </p>
            </div>
          </div>
          
          {!gdprConsent && errors.gdprConsent && (
            <p className="text-red-500 text-sm">
              Je moet akkoord gaan met de privacyverklaring om door te gaan
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={submissionState.isLoading || !gdprConsent}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          >
            {submissionState.isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Boeking versturen...
              </>
            ) : (
              'Verstuur boeking'
            )}
          </Button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Na verzending nemen we binnen 1 werkdag contact met je op voor bevestiging.
          </p>
        </div>
      </form>
    </div>
  )
}

export default CourseBookingForm