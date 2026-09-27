import React, { FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import WaxSeal from './WaxSeal'
import InvitationCard from './InvitationCard'

type EnvelopeStage = 'idle' | 'opening' | 'open'

type EnvelopeAnimatedProps = {
  stage: EnvelopeStage
}

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1]

const EnvelopeAnimated: FC<EnvelopeAnimatedProps> = ({ stage }) => {
  const prefersReducedMotion = useReducedMotion()
  const isOpening = stage === 'opening' || stage === 'open'
  const isOpen = stage === 'open'

  const sealAnimate = prefersReducedMotion
    ? { scale: 0, opacity: 0 }
    : isOpening
      ? { scale: [1, 1.08, 0], opacity: [1, 1, 0], rotate: [0, -4, 8] }
      : { scale: 1, opacity: 1, rotate: 0 }

  const flapRotate = isOpen ? -178 : isOpening ? -178 : 0

  const cardY = isOpen ? (prefersReducedMotion ? -90 : -105) : isOpening ? -55 : 28
  const cardScale = isOpen ? (prefersReducedMotion ? 0.92 : 1) : isOpening ? 0.72 : 0.58
  const cardOpacity = isOpening || isOpen ? 1 : 0.35

  return (
    <div className="env-scene" aria-hidden={isOpen}>
      <div className="env-perspective">
        <motion.div
          className="env-stack"
          animate={
            prefersReducedMotion
              ? {}
              : isOpening
                ? { rotateX: [0, -2, 4], rotateY: [0, 3, -2] }
                : { rotateX: 0, rotateY: 0 }
          }
          transition={{ duration: 2.8, ease: EASE_PREMIUM }}
        >
          <div className="env-shadow" />

          {/* Back panel */}
          <div className="env-back" />

          {/* Card inside envelope */}
          <motion.div
            className="env-card-slot"
            style={{ left: '50%' }}
            animate={{
              x: '-50%',
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 1.6,
              delay: prefersReducedMotion ? 0 : isOpening ? 0.85 : 0,
              ease: EASE_PREMIUM,
            }}
          >
            <InvitationCard compact />
          </motion.div>

          {/* Body sides (V fold) */}
          <div className="env-pocket-left" />
          <div className="env-pocket-right" />
          <div className="env-pocket-bottom" />

          {/* Front face */}
          <div className="env-front">
            <div className="env-front__inner" />
          </div>

          {/* Top flap */}
          <motion.div
            className="env-flap"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
            animate={{ rotateX: flapRotate }}
            transition={{
              duration: prefersReducedMotion ? 0.25 : 1.35,
              delay: prefersReducedMotion ? 0.1 : 0.55,
              ease: EASE_PREMIUM,
            }}
          >
            <div className="env-flap__face env-flap__face--front" />
            <div className="env-flap__face env-flap__face--back" />
          </motion.div>

          {/* Wax seal */}
          <motion.div
            className="env-seal"
            animate={sealAnimate}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.75,
              ease: EASE_PREMIUM,
              times: prefersReducedMotion ? undefined : [0, 0.35, 1],
            }}
          >
            <WaxSeal />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default EnvelopeAnimated
