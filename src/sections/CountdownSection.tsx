import React, { FC } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import ScrollReveal from '@/components/ScrollReveal'
import { useIsClient } from '@/hooks/useIsClient'
import { useLocale } from '@/context/locale-context'
import { getCalendarUrl } from '@/utils/calendar'
import { getWeddingDate } from '@/utils/date'

const UNITS = ['weddingDays', 'weddingHours', 'weddingMinutes', 'weddingSeconds'] as const

const WEEKDAY_LABELS = {
  fr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
} as const

const formatMonthLabel = (date: Date, locale: 'fr' | 'en'): string => {
  const formatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  })

  return formatter.format(date)
}

const buildMonthCells = (date: Date): Array<{ key: string; day: number | null; isWeddingDay?: boolean }> => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const weddingDay = date.getUTCDate()
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1))
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const leadingEmptyCells = firstDayOfMonth.getUTCDay()
  const cells: Array<{ key: string; day: number | null; isWeddingDay?: boolean }> = []

  for (let index = 0; index < leadingEmptyCells; index += 1) {
    cells.push({ key: `empty-${index}`, day: null })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      key: `day-${day}`,
      day,
      isWeddingDay: day === weddingDay,
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `trailing-${cells.length}`, day: null })
  }

  return cells
}

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

const CountdownCalendar: FC = () => {
  const { locale } = useLocale()
  const weddingDate = getWeddingDate()
  const weekdayLabels = WEEKDAY_LABELS[locale]
  const monthLabel = formatMonthLabel(weddingDate, locale)
  const calendarCells = buildMonthCells(weddingDate)

  return (
    <div className="countdown__calendar" aria-label={monthLabel}>
      <div className="countdown__calendar-head">
        <p className="countdown__calendar-kicker">{locale === 'fr' ? 'Calendrier' : 'Calendar'}</p>
        <h3 className="countdown__calendar-title">{monthLabel}</h3>
      </div>

      <div className="countdown__weekday-row" aria-hidden="true">
        {weekdayLabels.map((weekday) => (
          <span key={weekday} className="countdown__weekday">
            {weekday}
          </span>
        ))}
      </div>

      <div className="countdown__day-grid">
        {calendarCells.map((cell) => {
          if (!cell.day) {
            return <span key={cell.key} className="countdown__day countdown__day--empty" aria-hidden="true" />
          }

          const dayDate = new Date(Date.UTC(weddingDate.getUTCFullYear(), weddingDate.getUTCMonth(), cell.day))

          return (
            <time
              key={cell.key}
              className={`countdown__day${cell.isWeddingDay ? ' countdown__day--wedding' : ''}`}
              dateTime={dayDate.toISOString().slice(0, 10)}
              aria-label={new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(dayDate)}
            >
              <span className="countdown__day-number">{cell.day}</span>
              {cell.isWeddingDay ? (
                <span className="countdown__heart" aria-hidden="true">
                  ♥
                </span>
              ) : null}
            </time>
          )
        })}
      </div>
    </div>
  )
}

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
          <div className="countdown__layout">
            <CountdownCalendar />
            <div className="countdown__timer">
              {isClient ? (
                <Countdown date={getWeddingDate()} renderer={renderer} />
              ) : (
                <CountdownGrid values={['—', '—', '—', '—']} labels={labels} />
              )}
              <a className="countdown__button" href={getCalendarUrl()} target="_blank" rel="noreferrer noopener">
                {t('calendarAddToCalendar')}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CountdownSection
