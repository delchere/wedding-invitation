import React, { FC } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import ScrollReveal from '@/components/ScrollReveal'
import { useIsClient } from '@/hooks/useIsClient'
import { useLocale } from '@/context/locale-context'
import { getWeddingDate } from '@/utils/date'

const UNITS = ['weddingDays', 'weddingHours', 'weddingMinutes', 'weddingSeconds'] as const

const CountdownGrid: FC<{ values: (number | string)[]; labels: string[] }> = ({ values, labels }) => (
  <div className="countdown__grid" role="timer" aria-live="polite">
    {values.map((value, index) => (
      <div key={labels[index]} className="countdown__cell">
        <span className="countdown__value">{value}</span>
        <span className="countdown__label">{labels[index]}</span>
      </div>
    ))}
  </div>
)

const CountdownSection: FC = () => {
  const { t } = useLocale()
  const isClient = useIsClient()
  const labels = UNITS.map((key) => t(key))

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps): React.ReactNode => {
    if (completed) {
      return <p className="countdown__complete">{t('weddingCountdownComplete')}</p>
    }

    return <CountdownGrid values={[days, hours, minutes, seconds]} labels={labels} />
  }

  return (
    <section id="countdown" className="section section--countdown" aria-labelledby="countdown-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">02 / {t('navCountdown')}</p>
          <h2 id="countdown-title" className="section__title">
            {t('weddingCountdownTitle')}
          </h2>
          {isClient ? (
            <Countdown date={getWeddingDate()} renderer={renderer} />
          ) : (
            <CountdownGrid values={['—', '—', '—', '—']} labels={labels} />
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CountdownSection
