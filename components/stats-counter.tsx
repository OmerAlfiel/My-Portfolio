"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  duration?: number
}

export default function StatsCounter({ value, label, suffix = "", duration = 2 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let start = 0
      const end = value
      const totalFrames = Math.min(end, 60 * duration)
      const incrementPerFrame = end / totalFrames

      const counter = setInterval(() => {
        start += incrementPerFrame
        if (start > end) {
          setCount(end)
          setHasAnimated(true)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(counter)
    }
  }, [isInView, value, duration, hasAnimated])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-primary mb-2"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {count}
        {suffix}
      </motion.div>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  )
}
