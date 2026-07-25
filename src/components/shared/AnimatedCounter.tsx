'use client'
import { useRef, useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', className, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    let raf: number

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(rawProgress)
      setCount(Math.floor(easedProgress * value))
      if (rawProgress < 1) {
        raf = requestAnimationFrame(animate)
      }
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('fa-IR')}{suffix}
    </span>
  )
}
