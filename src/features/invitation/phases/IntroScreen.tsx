import React, { FC } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import LanguageToggle from '@/components/language-toggle'
import { useLocale } from '@/context/locale-context'
import BotanicalBranch from '../botanical/BotanicalBranch'
import Envelope from '../envelope/Envelope'
import WaxSeal from '../envelope/WaxSeal'
import RingsFallback from '../rings/RingsFallback'

type IntroScreenProps = {
  onOpen: () => void
}

const IntroScreen: FC<IntroScreenProps> = ({ onOpen }) => {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="invitation-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="invitation-intro__top">
        <LanguageToggle />
      </div>

      <div className="invitation-intro__content">
        <motion.p
          className="invitation-intro__eyebrow"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          {t('youAreInvited')}
        </motion.p>

        <motion.button
          type="button"
          className="invitation-intro__scene"
          onClick={onOpen}
          aria-label={t('tapToOpen')}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
        >
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

          <div className="invitation-intro__envelope-wrap invitation-intro__float">
            <Envelope />
            <WaxSeal className="invitation-intro__seal" />
            <RingsFallback className="invitation-intro__rings" />
          </div>
        </motion.button>

        <motion.p
          className="invitation-intro__cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="invitation-intro__cta-pulse">{t('tapToOpen')}</span>
        </motion.p>
      </div>
    </motion.div>
  )
}

export default IntroScreen
