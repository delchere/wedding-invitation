import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'

const mapLink = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

type ProgramItem = {
  time: string
  titleKey: string
  venueKey: string
  addressKey: string
  mapQueryKey: string
}

const ProgramSection: FC = () => {
  const { t } = useLocale()

  const items: ProgramItem[] = [
    {
      time: weddingConfig.date.ceremonyTime.replace('h', ':'),
      titleKey: 'whiteWedding',
      venueKey: 'weddingCeremonyVenue',
      addressKey: 'weddingCeremonyAddress',
      mapQueryKey: 'ceremonyLocation',
    },
    {
      time: weddingConfig.date.receptionTime.replace('h', ':'),
      titleKey: 'reception',
      venueKey: 'weddingReceptionVenue',
      addressKey: 'weddingReceptionAddress',
      mapQueryKey: 'receptionLocation',
    },
  ]

  return (
    <section id="program" className="section section--program" aria-labelledby="program-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">03 / {t('wedding')}</p>
          <h2 id="program-title" className="section__title">
            {t('weddingTimelineTitle')}
          </h2>
          <p className="section__lead">{t('weddingText')}</p>
        </ScrollReveal>

        <ol className="program__timeline">
          {items.map((item, index) => (
            <li key={item.titleKey} className="program__item">
              <ScrollReveal delay={index * 0.08}>
                <span className="program__time">{item.time}</span>
                <div className="program__details">
                  <p className="program__event">{t(item.titleKey)}</p>
                  <p className="program__venue">{t(item.venueKey)}</p>
                  <p className="program__address">{t(item.addressKey)}</p>
                  <a
                    href={mapLink(t(item.mapQueryKey))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="program__map-link"
                  >
                    {t('viewMap')}
                  </a>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProgramSection
