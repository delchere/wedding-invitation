import React, { FC, useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import weddingConfig from '@/config/wedding.config'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const InvitationSection: FC = () => {
  const { t } = useLocale()
  const { bride, groom } = weddingConfig.people

  // 3D Card Interactive State
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAutoFloating, setIsAutoFloating] = useState(true)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return
    setIsAutoFloating(false)
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt +-14deg
    const rX = ((y - centerY) / centerY) * -12
    const rY = ((x - centerX) / centerX) * 12

    setRotateX(rX)
    setRotateY(rY)

    // Glare position
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseLeave = (): void => {
    setRotateX(0)
    setRotateY(0)
    setGlare((prev) => ({ ...prev, opacity: 0 }))
    setIsAutoFloating(true)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (!cardRef.current || e.touches.length === 0) return
    setIsAutoFloating(false)
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rX = ((y - centerY) / centerY) * -10
    const rY = ((x - centerX) / centerX) * 10

    setRotateX(rX)
    setRotateY(rY)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    })
  }

  const handleTouchEnd = (): void => {
    setRotateX(0)
    setRotateY(0)
    setGlare((prev) => ({ ...prev, opacity: 0 }))
    setIsAutoFloating(true)
  }

  const toggleFlip = (): void => {
    setIsFlipped((prev) => !prev)
  }

  // Handle escape key to close zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setIsZoomOpen(false)
    }
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isZoomOpen])

  return (
    <section id="invitation" className="section section--invitation" aria-labelledby="invitation-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">{t('invitationEyebrow') || "02 / L'Invitation"}</p>
          <h2 id="invitation-title" className="section__title">
            {t('invitationTitle') || "Notre Carte d'Invitation"}
          </h2>
          <p className="section__lead">
            {t('invitationLead') ||
              "Découvrez notre faire-part officiel. Explorez la carte avec son animation 3D interactive et téléchargez-la pour la conserver précieusement."}
          </p>
        </ScrollReveal>

        {/* 3D Card Stage */}
        <div className="invitation-stage">
          <div
            ref={cardRef}
            className={`invitation-card-3d-wrap ${isAutoFloating ? 'invitation-card--floating' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`invitation-card-3d ${isFlipped ? 'invitation-card-3d--flipped' : ''}`}
              style={{
                transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
              }}
            >
              {/* FRONT FACE (Poster) */}
              <div className="invitation-card-face invitation-card-face--front">
                <div
                  className="invitation-card-glare"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(201,166,107,0.25) 35%, transparent 70%)`,
                    opacity: glare.opacity,
                  }}
                />
                <img
                  src={`${basePath}/images/invitation_poster.png`}
                  alt="Carte d'invitation officielle - Delchere & Ihechukwu"
                  className="invitation-card__poster-img"
                  loading="lazy"
                />
                <div className="invitation-card__gold-border" aria-hidden="true" />
                <span className="invitation-card__corner-seal" title="D × I">
                  ✦ D × I ✦
                </span>
              </div>

              {/* BACK FACE (Official Ceremonial Letterpress) */}
              <div className="invitation-card-face invitation-card-face--back">
                <div className="invitation-card-back__inner">
                  <div className="invitation-card-back__border">
                    <span className="invitation-card-back__corner tl" />
                    <span className="invitation-card-back__corner tr" />
                    <span className="invitation-card-back__corner bl" />
                    <span className="invitation-card-back__corner br" />

                    <div className="invitation-card-back__monogram">D × I</div>
                    <p className="invitation-card-back__script">{t('heroTitle') || 'Thèse de l’amour'}</p>
                    <div className="invitation-card-back__line" />

                    <p className="invitation-card-back__families">
                      {t('cardTogetherFamilies') || 'De la part de leurs familles'}
                    </p>

                    <h3 className="invitation-card-back__names">
                      {bride.firstName} <span className="amp">&</span> {groom.firstName}
                    </h3>

                    <p className="invitation-card-back__invitation">
                      {t('cardRequestPleasure') || 'ont l’immense joie de vous convier à célébrer leur mariage.'}
                    </p>

                    <div className="invitation-card-back__details">
                      <div className="invitation-card-back__detail-item">
                        <span className="invitation-card-back__icon">✦</span>
                        <strong>{t('heroDate') || 'Samedi 9 janvier 2027'}</strong>
                      </div>
                      <div className="invitation-card-back__detail-item">
                        <span className="invitation-card-back__icon">⏱</span>
                        <span>{weddingConfig.date.ceremonyTime} — Cérémonie religieuse</span>
                      </div>
                      <div className="invitation-card-back__detail-item">
                        <span className="invitation-card-back__icon">📍</span>
                        <span>{weddingConfig.calendar.location}</span>
                      </div>
                      <div className="invitation-card-back__detail-item">
                        <span className="invitation-card-back__icon">🥂</span>
                        <span>{weddingConfig.date.receptionTime} — Réception au Jubilee Hall</span>
                      </div>
                    </div>

                    <p className="invitation-card-back__blessing">
                      « Deux vies unies par l’amour, la foi et l’engagement éternel. »
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="invitation-actions">
          <a
            href={`${basePath}/images/invitation_poster.png`}
            download="Invitation-Mariage-Delchere-Ihechukwu.png"
            className="btn btn--primary btn--download"
            title="Télécharger la carte haute définition"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t('downloadCard') || "Télécharger la carte"}</span>
          </a>

          <button
            type="button"
            className="btn btn--outline btn--flip"
            onClick={toggleFlip}
            aria-label="Retourner la carte d'invitation en 3D"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>
              {isFlipped
                ? (t('frontView') || 'Voir face avant')
                : (t('flipCard3d') || 'Retourner la carte (3D)')}
            </span>
          </button>

          <button
            type="button"
            className="btn btn--ghost btn--zoom"
            onClick={() => setIsZoomOpen(true)}
            aria-label="Agrandir en plein écran"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span>{t('zoomCard') || 'Plein écran'}</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomOpen && (
        <div className="invitation-modal" onClick={() => setIsZoomOpen(false)} role="dialog" aria-modal="true">
          <div className="invitation-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="invitation-modal__close"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Fermer le plein écran"
            >
              ✕
            </button>
            <img
              src={`${basePath}/images/invitation_poster.png`}
              alt="Carte d'invitation officielle - Plein écran"
              className="invitation-modal__img"
            />
            <div className="invitation-modal__footer">
              <a
                href={`${basePath}/images/invitation_poster.png`}
                download="Invitation-Mariage-Delchere-Ihechukwu.png"
                className="btn btn--primary"
              >
                {t('downloadCard') || "Télécharger l'affiche"}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default InvitationSection
