'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface StaggerGridProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  amount?: number
}

export default function StaggerGrid({
  children,
  className,
  stagger = 0.06,
  amount = 0.1,
}: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
