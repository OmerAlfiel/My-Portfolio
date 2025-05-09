"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export default function AnimatedSection({ 
  children, 
  className, 
  delay = 0.2, 
  id 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (id) {
      const event = new CustomEvent('sectionMounted', { detail: { id } });
      window.dispatchEvent(event);
    }
  }, [id]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className || ""}`} 
    >
      {children}
    </motion.section>
  )
}