import React, { FC } from 'react'
import { motion } from 'framer-motion'
import weddingConfig from '@/config/wedding.config'
import { useLocale, Locale } from '@/context/locale-context'

type InvitationCardProps = {
  compact?: boolean
  showScrollCta?: boolean
  onDiscover?: () => void
}

const formatWeddingDate = (locale: Locale): string => {
  const date = new Date(weddingConfig.date.date + 'T12:00:00')
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const InvitationCard: FC<InvitationCardProps> = ({ compact = false, showScrollCta = false, onDiscover }) => {
  const { t, locale } = useLocale()
  const { bride, groom } = weddingConfig.people

  return (
    <motion.article
      className={`invitation-card${compact ? ' invitation-card--compact' : ''}${showScrollCta ? ' invitation-card--full' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      aria-label={t('cardAriaLabel')}
    >
      <div className="invitation-card__frame" aria-hidden="true">
        <span className="invitation-card__corner invitation-card__corner--tl" />
        <span className="invitation-card__corner invitation-card__corner--tr" />
        <span className="invitation-card__corner invitation-card__corner--bl" />
        <span className="invitation-card__corner invitation-card__corner--br" />
      </div>

      <motion.p className="invitation-card__eyebrow" variants={lineVariants}>
        {t('cardTogetherFamilies')}
      </motion.p>

      <motion.h1 className="invitation-card__names" variants={lineVariants}>
        {bride.firstName}
        <span className="invitation-card__amp">&</span>
        {groom.firstName}
      </motion.h1>

      <motion.div className="invitation-card__divider" variants={lineVariants} aria-hidden="true">
        <span />
        <span className="invitation-card__flourish">✦</span>
        <span />
      </motion.div>

      <motion.p className="invitation-card__request" variants={lineVariants}>
        {t('cardRequestPleasure')}
      </motion.p>

      <motion.p className="invitation-card__detail invitation-card__detail--date" variants={lineVariants}>
        {formatWeddingDate(locale)}
      </motion.p>

      <motion.p className="invitation-card__detail invitation-card__detail--time" variants={lineVariants}>
        {weddingConfig.date.ceremonyTime}
      </motion.p>

      <motion.p className="invitation-card__detail invitation-card__detail--location" variants={lineVariants}>
        {t('ceremonyLocation')}
      </motion.p>

      {showScrollCta && onDiscover && (
        <motion.button
          type="button"
          className="invitation-card__scroll-cta"
          variants={lineVariants}
          onClick={onDiscover}
        >
          <span>{t('scrollToDiscover')}</span>
          <span className="invitation-card__scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </motion.button>
      )}
    </motion.article>
  )
}

export default InvitationCard
