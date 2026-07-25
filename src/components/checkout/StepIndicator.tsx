'use client'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  { id: 1, label: 'آدرس تحویل' },
  { id: 2, label: 'روش ارسال' },
  { id: 3, label: 'تأیید و پرداخت' },
]

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex items-center justify-center mb-6" dir="rtl" role="list" aria-label="مراحل سفارش">
      {STEPS.map((step, idx) => {
        const isCompleted = step.id < currentStep
        const isActive = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center" role="listitem">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { delay: idx * 0.1, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center gap-2.5"
            >
              <div
                className={cn(
                  'w-11 h-11 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-moderate shadow-sm',
                  isCompleted && 'bg-accent border-accent text-white',
                  isActive && 'bg-primary border-accent text-white shadow-teal/20',
                  !isCompleted && !isActive && 'bg-white border-border-soft text-text-muted'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-semibold whitespace-nowrap transition-colors duration-moderate',
                  isActive ? 'text-accent' : isCompleted ? 'text-accent-dark' : 'text-text-muted'
                )}
              >
                {step.label}
              </span>
            </motion.div>
            {idx < STEPS.length - 1 && (
              <div className="relative mx-3 mb-6 w-16 sm:w-28">
                <div className="h-0.5 w-full rounded-full bg-border-soft" aria-hidden="true" />
                <motion.div
                  initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                  animate={prefersReducedMotion ? {} : { scaleX: isCompleted ? 1 : 0 }}
                  transition={prefersReducedMotion ? {} : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-0.5 rounded-full bg-accent origin-right"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
