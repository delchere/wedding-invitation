import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import { getRsvpUrl } from '@/utils/rsvp'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

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

          <div className="reserve__cta-wrap">
            <a
              href={getRsvpUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--large"
            >
              {t('reserveCta')}
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/banners/fleur.png`}
              alt=""
              className="reserve__floral"
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ReserveSection
