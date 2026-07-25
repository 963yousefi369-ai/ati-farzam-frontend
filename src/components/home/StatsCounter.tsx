'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import { Users, Radio, Trophy, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Stat {
  label: string
  value: number
  suffix?: string
  icon?: LucideIcon
}

const DEFAULT_STATS: Stat[] = [
  { label: 'مشتری فعال', value: 5000, suffix: '+', icon: Users },
  { label: 'دستگاه نصب‌شده', value: 25000, suffix: '+', icon: Radio },
  { label: 'سال تجربه', value: 12, suffix: '', icon: Trophy },
  { label: 'شهر تحت پوشش', value: 31, suffix: '', icon: Globe },
]

const EASE = [0.16, 1, 0.3, 1] as const

interface StatsCounterProps {
  stats?: Stat[]
  darkMode?: boolean
}

export default function StatsCounter({ stats, darkMode = false }: StatsCounterProps) {
  const items = stats && stats.length > 0 ? stats : DEFAULT_STATS
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Subtle background orbs */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>
      )}

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {items.map((stat, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="group"
            >
              <div
                className={darkMode
                  ? "relative bg-white/[0.06] border border-white/[0.1] rounded-2xl p-6 md:p-8 text-center hover:border-accent/25 hover:bg-white/[0.1] transition-all duration-300 overflow-hidden"
                  : "relative bg-white rounded-2xl p-6 md:p-8 text-center border border-border-soft hover:border-accent/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden shadow-card hover:shadow-hover hover-glow"
                }
              >
                {/* Hover accent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                {stat.icon && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 ${
                      darkMode
                        ? 'bg-white/[0.08] group-hover:bg-white/[0.12]'
                        : 'bg-gradient-to-br from-accent/10 to-accent/5 group-hover:from-accent/15 group-hover:to-accent/8'
                    }`}
                    style={!darkMode ? { boxShadow: '0 2px 8px rgba(20,184,166,0.06)' } : undefined}
                  >
                    <stat.icon
                      className={`w-5.5 h-5.5 ${darkMode ? 'text-accent-light' : 'text-accent'} transition-colors duration-300 group-hover:text-accent-dark`}
                      strokeWidth={1.75}
                    />
                  </motion.div>
                )}

                {/* Counter */}
                <div className={`text-4xl md:text-[2.75rem] font-semibold mb-2 tracking-tight leading-none ${darkMode ? 'text-white' : 'text-text-heading'}`}>
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix && (
                    <span className={`text-2xl md:text-3xl ml-0.5 ${darkMode ? 'text-accent-light' : 'text-accent'}`}>
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className={`text-sm font-medium ${darkMode ? 'text-white/60' : 'text-text-muted'}`}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
