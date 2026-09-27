import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'
import { useLocale } from '@/context/locale-context'
import SectionTitle from './SectionTitle'
import { ChampagneIcon, RingsIcon } from './icons'

type TimelineItem = {
  time: string
  titleKey: string
  venueKey: string
  icon: React.ReactNode
}

const WeddingDayTimeline: FC = () => {
  const { t } = useLocale()

  const items: TimelineItem[] = [
    {
      time: weddingConfig.date.ceremonyTime.replace('h', ':'),
      titleKey: 'whiteWedding',
      venueKey: 'weddingCeremonyVenue',
      icon: <RingsIcon />,
    },
    {
      time: weddingConfig.date.receptionTime.replace('h', ':'),
      titleKey: 'reception',
      venueKey: 'weddingReceptionVenue',
      icon: <ChampagneIcon />,
    },
  ]

  return (
    <div className="wedding-day__block wedding-day__block--timeline">
      <SectionTitle>{t('weddingTimelineTitle')}</SectionTitle>
      <ol className="wedding-day__timeline">
        {items.map((item, index) => (
          <li key={item.titleKey} className="wedding-day__timeline-item">
            <div className="wedding-day__timeline-icon-wrap">{item.icon}</div>
            <div className="wedding-day__timeline-axis" aria-hidden="true">
              <span className="wedding-day__timeline-dot" />
              {index < items.length - 1 && <span className="wedding-day__timeline-line" />}
            </div>
            <div className="wedding-day__timeline-content">
              <p className="wedding-day__timeline-time">{item.time}</p>
              <p className="wedding-day__timeline-event">{t(item.titleKey)}</p>
              <p className="wedding-day__timeline-venue">{t(item.venueKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default WeddingDayTimeline
