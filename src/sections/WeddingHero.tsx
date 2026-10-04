import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const WeddingHero: FC = () => {
  const { t } = useLocale()
  const { bride, groom } = weddingConfig.people

  return (
    <section id="home" className="hero">
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/banners/home-hero.png`}
          alt={t('heroImageAlt')}
          className="hero__image"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <ScrollReveal>
          <p className="hero__title-script">{t('heroTitle')}</p>
          <h1 className="hero__names">
            <span className="hero__name-line">
              {bride.firstName}
              <span className="hero__amp">&</span>
            </span>
            <span className="hero__name-line">{groom.firstName}</span>
          </h1>
          <p className="hero__date">{t('heroDate')}</p>
          <p className="hero__location">{t('ceremonyLocation')}</p>
          <div className="hero__cta-group">
            <a href="#reserve" className="hero__cta btn btn--primary">
              {t('reserveCta')}
            </a>
            <a href="#invitation" className="hero__cta btn btn--outline">
              {t('viewInvitationCta')}
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className="hero__botanical" aria-hidden="true">
        <svg viewBox="0 0 120 40" fill="none">
          <path d="M10 28C24 18 36 8 60 8C84 8 96 18 110 28" stroke="currentColor" strokeWidth="0.8" />
          <path d="M60 8V22" stroke="currentColor" strokeWidth="0.6" />
          <ellipse cx="60" cy="6" rx="4" ry="6" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </div>
    </section>
  )
}

export default WeddingHero