import React, { FC } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useLocale } from '@/context/locale-context'
import { getWeddingDate } from '@/utils/date'
import SectionTitle from './SectionTitle'

const UNITS = ['weddingDays', 'weddingHours', 'weddingMinutes', 'weddingSeconds'] as const

const WeddingDayCountdown: FC = () => {
  const { t } = useLocale()

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps): React.ReactNode => {
    if (completed) {
      return <p className="wedding-day__countdown-complete">{t('weddingCountdownComplete')}</p>
    }

    const values = [days, hours, minutes, seconds]

    return (
      <div className="wedding-day__countdown-grid" role="timer" aria-live="polite">
        {values.map((value, index) => (
          <div key={UNITS[index]} className="wedding-day__countdown-cell">
            <span className="wedding-day__countdown-value">{value}</span>
            <span className="wedding-day__countdown-label">{t(UNITS[index])}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="wedding-day__block wedding-day__block--countdown">
      <SectionTitle>{t('weddingCountdownTitle')}</SectionTitle>
      <Countdown date={getWeddingDate()} renderer={renderer} />
    </div>
  )
}

export default WeddingDayCountdown
