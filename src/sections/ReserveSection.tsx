import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import { getRsvpUrl } from '@/utils/rsvp'

const ReserveSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="reserve" className="section section--reserve" aria-labelledby="reserve-title">
      <div className="section__inner section__inner--narrow">
        <ScrollReveal>
          <p className="section__eyebrow">05 / {t('navReserve')}</p>
          <h2 id="reserve-title" className="section__title">
            {t('reserveCta')}
          </h2>
          <p className="section__lead">{t('rsvpText')}</p>
          <a
            href={getRsvpUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--large"
          >
            {t('reserveCta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ReserveSection
