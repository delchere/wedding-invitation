import React, { FC, ReactNode, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroFlow from './phases/IntroFlow'
import { IntroCompleteProvider } from './IntroCompleteContext'
import { useIntroPhase } from './hooks/useIntroPhase'
import { useSkipIntro } from './hooks/useSkipIntro'

type InvitationExperienceProps = {
  children: ReactNode
}

const InvitationExperience: FC<InvitationExperienceProps> = ({ children }) => {
  const { shouldSkipIntro } = useSkipIntro()
  const { phase, openInvitation, showCard, completeIntro } = useIntroPhase(
    shouldSkipIntro ? 'complete' : 'idle'
  )

  useEffect(() => {
    if (shouldSkipIntro) {
      completeIntro()
    }
  }, [shouldSkipIntro, completeIntro])

  const handleDiscover = (): void => {
    completeIntro()
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const showIntro = phase !== 'complete'

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroFlow
            key="intro-flow"
            phase={phase}
            onOpen={openInvitation}
            onOpeningComplete={showCard}
            onDiscover={handleDiscover}
          />
        )}
      </AnimatePresence>

      <IntroCompleteProvider complete={!showIntro}>
        <motion.div
          initial={false}
          animate={{
            opacity: showIntro ? 0 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents: showIntro ? 'none' : 'auto',
          }}
          aria-hidden={showIntro}
        >
          {children}
        </motion.div>
      </IntroCompleteProvider>
    </>
  )
}

export default InvitationExperience
