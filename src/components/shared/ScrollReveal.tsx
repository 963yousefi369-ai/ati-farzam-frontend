'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import StaggerGrid from './StaggerGrid'
import { StaggerItem } from './StaggerGrid'

// Re-export for backward compatibility
export { StaggerGrid as StaggerContainer, StaggerItem }

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  amount?: number
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  amount = 0.15,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  const initial = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 0, ...directionMap[direction] }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
