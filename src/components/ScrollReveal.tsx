import React, { FC, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useIsClient } from '@/hooks/useIsClient'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

const ScrollReveal: FC<ScrollRevealProps> = ({ children, className, delay = 0 }) => {
  const isClient = useIsClient()
  const prefersReducedMotion = useReducedMotion()

  if (!isClient || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
