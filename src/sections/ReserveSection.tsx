import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import ReservationForm from '@/components/reservation/ReservationForm'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const ReserveSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="reserve" className="section section--reserve" aria-labelledby="reserve-title">
      <div className="section__inner section__inner--form">
        <ScrollReveal>
          <p className="section__eyebrow">06 / {t('navReserve')}</p>
          <h2 id="reserve-title" className="section__title">
            {t('reserveCta')}
          </h2>
          <p className="section__lead">{t('rsvpText')}</p>

          <ReservationForm />

          <div className="reserve__floral-wrap">
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
