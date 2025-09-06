'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { PricingBlock } from '@/payload-types'
import { BiCheck } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

type Props = {
  className?: string
} & PricingBlock

export const PricingBlockComponent: React.FC<Props> = ({
  className,
  heading = 'Prijsplan',
  subheading,
  description,
  showBillingToggle = true,
  billingPeriods,
  pricingPlans = [],
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const monthlyLabel = billingPeriods?.monthly?.label || 'Maandelijks'
  const yearlyLabel = billingPeriods?.yearly?.label || 'Jaarlijks'

  return (
    <section id="relume" className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container max-w-6xl">
        {/* Header Section */}
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-16 lg:mb-20">
          {subheading && (
            <p className="mb-3 font-semibold text-primary md:mb-4">{subheading}</p>
          )}
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          {description && (
            <p className="md:text-md text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Billing Period Toggle */}
        {showBillingToggle && (
          <div className="mx-auto mb-12 w-fit">
            <div className="inline-flex items-center rounded-lg bg-muted p-1">
              <button
                className={cn(
                  "rounded-md px-6 py-2 text-sm font-medium transition-all",
                  billingPeriod === 'monthly'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setBillingPeriod('monthly')}
              >
                {monthlyLabel}
              </button>
              <button
                className={cn(
                  "rounded-md px-6 py-2 text-sm font-medium transition-all",
                  billingPeriod === 'yearly'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setBillingPeriod('yearly')}
              >
                {yearlyLabel}
              </button>
            </div>
          </div>
        )}

        {/* Pricing Plans Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans?.map((plan, index) => {
            const currentPricing = billingPeriod === 'yearly' ? plan.pricing?.yearly : plan.pricing?.monthly
            const price = currentPricing?.price || ''
            const originalPrice = currentPricing?.originalPrice
            const savingsText = billingPeriod === 'yearly' ? plan.pricing?.yearly?.savingsText : null

            return (
              <div
                key={index}
                className={cn(
                  "flex h-full flex-col justify-between rounded-lg border p-6 md:p-8",
                  plan.featured 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/10" 
                    : "border-border bg-card"
                )}
              >
                <div>
                  {/* Plan Header */}
                  <div className="mb-6 text-center md:mb-8">
                    {plan.featured && (
                      <div className="mb-4">
                        <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          Aanbevolen
                        </span>
                      </div>
                    )}
                    
                    <h3 className="mb-2 text-lg font-bold md:text-xl">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center gap-2">
                      {originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {originalPrice}
                        </span>
                      )}
                      <h4 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                        {price}
                      </h4>
                    </div>
                    
                    {savingsText && (
                      <p className="mt-2 text-sm font-medium text-primary">
                        {savingsText}
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="mb-8 space-y-4">
                    {plan.features?.map((featureItem, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="mr-4 flex-shrink-0 mt-0.5">
                          <BiCheck className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm leading-relaxed">
                          {featureItem.feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  {plan.cta?.text && (
                    <Button
                      asChild={!!plan.cta.link}
                      variant={plan.cta.variant as "default" | "outline" | "secondary" || "default"}
                      className="w-full"
                    >
                      {plan.cta.link ? (
                        <Link href={plan.cta.link}>
                          {plan.cta.text}
                        </Link>
                      ) : (
                        <span>{plan.cta.text}</span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}