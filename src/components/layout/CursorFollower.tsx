'use client'
import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const el = dotRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        if (!visibleRef.current) {
          visibleRef.current = true
          el.style.opacity = '1'
        }
      })
    }
    const handleLeave = () => {
      visibleRef.current = false
      el.style.opacity = '0'
    }
    const handleEnter = (e: MouseEvent) => {
      visibleRef.current = true
      el.style.opacity = '1'
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="hidden lg:block pointer-events-none"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
        opacity: 0,
        willChange: 'transform',
        zIndex: 9999,
      }}
    />
  )
}
