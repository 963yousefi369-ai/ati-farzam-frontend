---
name: motion-framer
description: Modern animation library for React and JavaScript. Create smooth, production-ready animations with motion components, variants, gestures (hover/tap/drag), layout animations, AnimatePresence exit animations, spring physics, and scroll-based effects. Use when building interactive UI components, micro-interactions, page transitions, or complex animation sequences.
---

# Motion & Framer Motion

## Overview

Motion (formerly Framer Motion) is a production-ready animation library for React and JavaScript that enables declarative, performant animations with minimal code.

**When to use this skill:**
- Building interactive UI components (buttons, cards, menus)
- Creating micro-interactions and hover effects
- Implementing page transitions and route animations
- Adding scroll-based animations and parallax effects
- Animating layout changes (resizing, reordering, shared element transitions)
- Drag-and-drop interfaces
- Complex animation sequences and state-based animations

**Technology:**
- **Motion** (v11+) or **Framer Motion**
- React 18+ compatible, also supports Vue
- Works with Next.js, Vite, Remix, and all modern React frameworks

## Core Concepts

### 1. Motion Components

```jsx
import { motion } from "framer-motion"

<motion.div />
<motion.button />
<motion.svg />
<motion.path />
```

### 2. Animate Prop

```jsx
<motion.div animate={{ x: 100, opacity: 1, scale: 1.2 }} />

const [isOpen, setIsOpen] = useState(false)
<motion.div animate={{ width: isOpen ? 300 : 100 }} />
```

### 3. Initial State

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

### 4. Transitions

```jsx
// Duration-based
<motion.div animate={{ x: 100 }} transition={{ duration: 0.5, ease: "easeInOut" }} />

// Spring physics
<motion.div animate={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />

// Different transitions for different properties
<motion.div
  animate={{ x: 100, opacity: 1 }}
  transition={{
    x: { type: "spring", stiffness: 300 },
    opacity: { duration: 0.2 }
  }}
/>
```

### 5. Variants

```jsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9 }
}

<motion.div variants={variants} initial="hidden" animate="visible" exit="exit" />

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
```

## Common Patterns

### Hover Animations

```jsx
<motion.button whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
  Hover me
</motion.button>

<motion.div whileHover={{
  scale: 1.05,
  backgroundColor: "#f0f0f0",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)"
}}>
  Hover card
</motion.div>
```

### Tap/Press Animations

```jsx
<motion.button whileTap={{ scale: 0.9 }}>Click me</motion.button>

<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95, rotate: 3 }}>
  Interactive button
</motion.button>
```

### Drag Interactions

```jsx
<motion.div drag />
<motion.div drag="x" />  // Only horizontal
<motion.div drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} />

<motion.div
  drag
  whileDrag={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
  dragElastic={0.1}
/>
```

### Exit Animations (AnimatePresence)

```jsx
import { AnimatePresence } from "framer-motion"

<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### Layout Animations

```jsx
<motion.div layout />
<motion.div layout="position" />
<motion.div layout="size" />

// Shared layout animations
<motion.div layoutId="underline" />
```

### Scroll-Based Animations

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.8 }}
  transition={{ duration: 0.5 }}
>
  Animates when scrolled into view
</motion.div>
```

### Spring Animations

```jsx
<motion.div animate={{ x: 100 }} transition={{
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1
}} />

// Visual duration
<motion.div animate={{ rotate: 90 }} transition={{
  type: "spring",
  visualDuration: 0.5,
  bounce: 0.25
}} />
```

**Spring presets:**
- **Gentle**: `stiffness: 100, damping: 20`
- **Wobbly**: `stiffness: 200, damping: 10`
- **Stiff**: `stiffness: 400, damping: 30`
- **Slow**: `stiffness: 50, damping: 20`

## Gesture Props

```jsx
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  whileFocus={{ outline: "2px" }}
  whileDrag={{ scale: 1.1 }}
  whileInView={{ opacity: 1 }}
/>
```

## Hooks

### useAnimate

```jsx
import { useAnimate } from "framer-motion"

const [scope, animate] = useAnimate()
animate([scope.current, { opacity: 1 }])
```

### useSpring

```jsx
import { useSpring } from "framer-motion"

const x = useSpring(0, { stiffness: 300, damping: 20 })
<motion.div style={{ x }} />
```

### useInView

```jsx
import { useInView } from "framer-motion"

const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.5 })
```

## Performance

- Use transform properties (x, y, scale, rotate) — hardware-accelerated
- Avoid animating layout properties (left, top, width, height)
- Respect `prefers-reduced-motion`
- Use `layout="position"` when only position changes
- Use `layoutId` sparingly

## Common Pitfalls

1. **Forgetting AnimatePresence** for exit animations
2. **Missing key prop** in lists with AnimatePresence
3. **Animating non-transform properties** — janky, poor performance
4. **Overusing layout animations** — expensive with many elements
5. **Not using variants** for complex animations
6. **Incorrect transition timing** — general transition won't apply to whileHover
