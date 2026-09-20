import React, { FC } from 'react'
import { useLocale } from '@/context/locale-context'
import WeddingDayCountdown from './wedding-day/WeddingDayCountdown'
import WeddingDayLocations from './wedding-day/WeddingDayLocations'
import WeddingDayTimeline from './wedding-day/WeddingDayTimeline'

const WeddingDaySection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="wedding" className="wedding-day" aria-labelledby="wedding-day-title">
      <div className="wedding-day__inner">
        <header className="wedding-day__header">
          <p className="wedding-day__eyebrow">02 / {t('wedding')}</p>
          <h2 id="wedding-day-title" className="wedding-day__heading">
            {t('wedding')}
          </h2>
          <p className="wedding-day__intro">{t('weddingText')}</p>
        </header>

        <WeddingDayCountdown />
        <WeddingDayLocations />
        <WeddingDayTimeline />
      </div>
    </section>
  )
}

export default WeddingDaySection
