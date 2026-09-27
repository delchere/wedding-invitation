import React, { FC, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import LanguageToggle from '@/components/language-toggle'
import { useLocale } from '@/context/locale-context'
import { IntroPhase } from '../hooks/useIntroPhase'
import BotanicalBranch from '../botanical/BotanicalBranch'
import EnvelopeScene from '../envelope/EnvelopeScene'
import InvitationCard from '../envelope/InvitationCard'

type IntroFlowProps = {
  phase: IntroPhase
  onOpen: () => void
  onOpeningComplete: () => void
  onDiscover: () => void
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const IntroFlow: FC<IntroFlowProps> = ({ phase, onOpen, onOpeningComplete, onDiscover }) => {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()

  const envelopeStage = phase === 'idle' ? 'idle' : phase === 'opening' ? 'opening' : 'open'
  const showIdleChrome = phase === 'idle'
  const showCardFull = phase === 'card'

  useEffect(() => {
    if (phase !== 'opening') return

    const delay = prefersReducedMotion ? 450 : 2800
    const timer = window.setTimeout(onOpeningComplete, delay)
    return () => window.clearTimeout(timer)
  }, [phase, prefersReducedMotion, onOpeningComplete])

  const handleOpen = (): void => {
    if (phase === 'idle') onOpen()
  }

  return (
    <motion.div
      className="invitation-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="invitation-intro__top">
        <LanguageToggle />
      </div>

      <div className={`invitation-intro__content${showCardFull ? ' invitation-intro__content--card' : ''}`}>
        <AnimatePresence mode="wait">
          {showIdleChrome && (
            <motion.p
              key="eyebrow"
              className="invitation-intro__eyebrow"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {t('youAreInvited')}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showCardFull ? (
            <motion.div
              key="card-full"
              className="invitation-intro__card-stage"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <InvitationCard showScrollCta onDiscover={onDiscover} />
            </motion.div>
          ) : (
            <motion.div
              key="envelope-stage"
              className="invitation-intro__scene"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              {showIdleChrome && (
                <>
                  <motion.div
                    className="invitation-intro__botanical invitation-intro__botanical--tl"
                    animate={prefersReducedMotion ? undefined : { rotate: [-14, -10, -14] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <BotanicalBranch />
                  </motion.div>
                  <motion.div
                    className="invitation-intro__botanical invitation-intro__botanical--tr"
                    animate={prefersReducedMotion ? undefined : { rotate: [-6, -2, -6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <BotanicalBranch />
                  </motion.div>
                  <motion.div
                    className="invitation-intro__botanical invitation-intro__botanical--bl"
                    animate={prefersReducedMotion ? undefined : { rotate: [14, 18, 14] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  >
                    <BotanicalBranch />
                  </motion.div>
                  <motion.div
                    className="invitation-intro__botanical invitation-intro__botanical--br"
                    animate={prefersReducedMotion ? undefined : { rotate: [10, 14, 10] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  >
                    <BotanicalBranch />
                  </motion.div>
                </>
              )}

              <motion.button
                type="button"
                className="invitation-intro__envelope-button"
                onClick={handleOpen}
                disabled={phase !== 'idle'}
                aria-label={t('tapToOpen')}
                whileTap={phase === 'idle' ? { scale: 0.98 } : undefined}
              >
                <div className={`invitation-intro__envelope-wrap${phase === 'idle' ? ' invitation-intro__float' : ''}`}>
                  <EnvelopeScene stage={envelopeStage} />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showIdleChrome && (
            <motion.p
              key="cta"
              className="invitation-intro__cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="invitation-intro__cta-pulse">{t('tapToOpen')}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default IntroFlow
