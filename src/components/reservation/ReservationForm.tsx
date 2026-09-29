import React, { FC, useState, useEffect, FormEvent } from 'react'
import { useLocale } from '@/context/locale-context'
import { buildGoogleCalendarUrl } from '@/utils/calendar'

const STORAGE_KEY = 'wedding_rsvp_submission_v2'

type AttendanceOption = 'yes' | 'no' | 'maybe'

const GOOGLE_ATTENDANCE_MAP: Record<AttendanceOption, string> = {
  yes: 'Je serai présent(e) / I will attend',
  no: 'Je ne pourrai pas venir / I will not be able to attend',
  maybe: 'Peut-être / Maybe',
}

const WISH_KEYS = ['wish1', 'wish2', 'wish3', 'wish4', 'wish5'] as const
const CUSTOM_WISH_MAX_CHARS = 250

const triggerJoyfulConfetti = async (): Promise<void> => {
  try {
    const confettiModule = await import('canvas-confetti')
    const confetti = confettiModule.default || confettiModule
    const end = Date.now() + 2.5 * 1000
    const colors = ['#c49a52', '#3f5248', '#d6be96', '#ffffff', '#e3a857', '#ff6b81']

    const frame = (): void => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Grand central celebratory burst
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors,
    })
  } catch (err) {
    console.warn('Confetti animation error:', err)
  }
}

const ReservationForm: FC = () => {
  const { t, locale } = useLocale()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [attendance, setAttendance] = useState<AttendanceOption>('yes')
  const [hasPlusOne, setHasPlusOne] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [selectedWishKey, setSelectedWishKey] = useState<string>('wish1')
  const [customWish, setCustomWish] = useState<string>('')

  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStep, setSubmissionStep] = useState<'idle' | 'sending' | 'done'>('idle')
  const [submittedData, setSubmittedData] = useState<{
    fullName: string
    attendance: AttendanceOption
    hasPlusOne: boolean
    guestName?: string
    wish?: string
  } | null>(null)

  // Load previous submission from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.fullName) {
          setSubmittedData(parsed)
          setSubmissionStep('done')
          if (parsed.wish) {
            const isPredefined = (WISH_KEYS as readonly string[]).includes(parsed.wishKey)
            if (!isPredefined && parsed.wish) {
              setSelectedWishKey('custom')
              setCustomWish(parsed.wish)
            } else if (parsed.wishKey) {
              setSelectedWishKey(parsed.wishKey)
            }
          }
        }
      }
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  // Email format validation
  const validateEmail = (val: string): boolean => {
    if (!val) {
      setEmailValid(null)
      return false
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    setEmailValid(isValid)
    return isValid
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) return
    if (selectedWishKey === 'custom' && !customWish.trim()) return

    setIsSubmitting(true)
    setSubmissionStep('sending')

    const attendanceValue = GOOGLE_ATTENDANCE_MAP[attendance]
    const chosenWishText =
      selectedWishKey === 'custom'
        ? (customWish.trim() || (locale === 'en' ? 'Best wishes to Delchere & Ihechukwu!' : 'Tous nos vœux de bonheur à Delchere & Ihechukwu !'))
        : (t(selectedWishKey) || '')

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attendance,
      hasPlusOne,
      guestName: hasPlusOne ? guestName.trim() : '',
      dietaryOrMessage: chosenWishText,
      timestamp: new Date().toISOString(),
    }

    // 1. Send via Next.js Backend API (SMTP Nodemailer + Google Sheets Webhook)
    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
      await fetch(`${basePath}/api/rsvp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (apiErr) {
      console.warn('API /api/rsvp execution note:', apiErr)
    }

    // 2. Direct Google Sheets Webhook (Client-side fallback for static export / GitHub Pages)
    const directSheetWebhook = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL
    if (directSheetWebhook) {
      try {
        await fetch(directSheetWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            attendanceLabel: attendanceValue,
          }),
        })
      } catch (sheetErr) {
        console.warn('Direct Google Sheet Webhook note:', sheetErr)
      }
    }

    // 3. Save locally so user sees confirmation card
    const savedState = {
      fullName: fullName.trim(),
      attendance,
      hasPlusOne,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      wish: chosenWishText,
      wishKey: selectedWishKey,
      date: new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US'),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState))
    } catch {
      // storage unavailable
    }

    setSubmittedData(savedState)
    setIsSubmitting(false)
    setSubmissionStep('done')

    // Trigger joyful confetti animation
    triggerJoyfulConfetti()
  }

  const handleEdit = (): void => {
    setSubmissionStep('idle')
  }

  const calendarUrl = buildGoogleCalendarUrl()

  return (
    <div className="reservation-card-container">
      {submissionStep === 'done' && submittedData ? (
        <div className="reservation-success-card" role="status" aria-live="polite">
          <div className="reservation-success-card__badge" aria-hidden="true">
            ✦
          </div>
          <h3 className="reservation-success-card__title">
            {t('rsvpSuccessTitle') || 'Merci infiniment !'}
          </h3>
          <p className="reservation-success-card__name">
            {locale === 'en' ? 'Dear' : 'Cher(e)'} <strong>{submittedData.fullName}</strong>,
          </p>

          <div className="reservation-success-card__summary">
            <div className="summary-item">
              <span className="summary-label">
                {locale === 'en' ? 'Attendance Status' : 'Votre présence'} :
              </span>
              <strong className={`summary-status status--${submittedData.attendance}`}>
                {submittedData.attendance === 'yes'
                  ? (locale === 'en' ? '✅ Confirmed (Attending)' : '✅ Confirmé (Présent)')
                  : submittedData.attendance === 'maybe'
                  ? (locale === 'en' ? '⏳ Maybe / Pending' : '⏳ En attente (Peut-être)')
                  : (locale === 'en' ? '❌ Regretfully absent' : '❌ Absent(e)')}
              </strong>
            </div>
            {submittedData.hasPlusOne && submittedData.guestName && (
              <div className="summary-item">
                <span className="summary-label">
                  {locale === 'en' ? 'Guest (+1)' : 'Accompagnant (+1)'} :
                </span>
                <strong>{submittedData.guestName}</strong>
              </div>
            )}
            {submittedData.wish && (
              <div className="summary-item summary-item--wish">
                <span className="summary-label">
                  {t('rsvpSuccessWishLabel') || (locale === 'en' ? 'Your wish' : 'Votre vœu transmis')} :
                </span>
                <p className="summary-wish-text">“{submittedData.wish}”</p>
              </div>
            )}
          </div>

          <p className="reservation-success-card__desc">
            {submittedData.attendance === 'yes'
              ? (t('rsvpSuccessYes') ||
                'Votre présence a bien été enregistrée et transmise avec succès. Nous avons hâte de célébrer ce moment magique avec vous !')
              : submittedData.attendance === 'maybe'
              ? (t('rsvpSuccessMaybe') ||
                'Votre réponse d’attente a bien été transmise. N’hésitez pas à revenir confirmer votre venue dès que votre calendrier sera fixé !')
              : (t('rsvpSuccessNo') ||
                'Votre réponse a bien été transmise. Vous serez présent(e) dans nos cœurs pour cette journée unique.')}
          </p>

          <div className="reservation-success-card__actions">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--calendar"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{t('calendarAddToCalendar') || 'Ajouter à mon agenda'}</span>
            </a>

            <button type="button" className="btn btn--outline" onClick={handleEdit}>
              {t('rsvpEditButton') || 'Modifier ma réponse'}
            </button>
          </div>
        </div>
      ) : (
        <form className="reservation-form" onSubmit={handleSubmit} noValidate={false}>
          {/* Header */}
          <div className="reservation-form__header">
            <span className="reservation-form__crest" aria-hidden="true">
              ✦ D × I ✦
            </span>
            <h3 className="reservation-form__title">
              {locale === 'en' ? 'Guest Attendance Confirmation' : 'Confirmation de votre présence'}
            </h3>
            <p className="reservation-form__instruction">
              {t('rsvpFormInstruction') ||
                'Veuillez renseigner vos coordonnées ci-dessous. Votre réservation sera directement transmise aux mariés.'}
            </p>
          </div>

          {/* Step 1: Personal Coordinates */}
          <div className="form-section-title">
            <span className="form-section-number">1</span>
            <span>{locale === 'en' ? 'Your Contact Details' : 'Vos coordonnées'}</span>
          </div>

          <div className="reservation-form__grid">
            {/* Full Name */}
            <div className="reservation-field">
              <label htmlFor="rsvp-name" className="reservation-label">
                {t('fullNameLabel') || 'Nom & Prénom'} <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  autoComplete="name"
                  className={`reservation-input ${fullName.trim().length > 2 ? 'input--valid' : ''}`}
                  placeholder={t('fullNamePlaceholder') || 'Ex. Delphine Dupont'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {fullName.trim().length > 2 && <span className="input-check-icon">✓</span>}
              </div>
            </div>

            {/* Email */}
            <div className="reservation-field">
              <label htmlFor="rsvp-email" className="reservation-label">
                {t('emailLabel') || 'Adresse Email'} <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  id="rsvp-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  className={`reservation-input ${emailValid === true ? 'input--valid' : emailValid === false ? 'input--invalid' : ''}`}
                  placeholder={t('emailPlaceholder') || 'exemple@email.com'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value)
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                />
                {emailValid === true && <span className="input-check-icon">✓</span>}
              </div>
              {emailValid === false && (
                <span className="field-hint error-hint">
                  {locale === 'en' ? 'Please enter a valid email address' : 'Veuillez saisir un email valide'}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="reservation-field reservation-field--full">
              <label htmlFor="rsvp-phone" className="reservation-label">
                {t('phoneLabel') || 'Téléphone / WhatsApp'}{' '}
                <span className="opt">({t('optional') || 'facultatif'})</span>
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="reservation-input"
                placeholder={t('phonePlaceholder') || 'Ex. +228 92 00 00 00 / +27 65 00 00 00'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Step 2: Attendance */}
          <div className="form-section-title" style={{ marginTop: '24px' }}>
            <span className="form-section-number">2</span>
            <span>{t('attendanceQuestion') || 'Serez-vous présent(e) parmi nous ?'}</span>
            <span className="req">*</span>
          </div>

          <div className="reservation-attendance-options">
            <label
              className={`attendance-option ${attendance === 'yes' ? 'attendance-option--active' : ''}`}
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === 'yes'}
                onChange={() => setAttendance('yes')}
                className="visually-hidden"
              />
              <span className="attendance-option__indicator">✓</span>
              <div className="attendance-option__details">
                <span className="attendance-option__text">
                  {t('attendingOptionYes') || 'Oui, je serai présent(e)'}
                </span>
                <span className="attendance-option__subtext">
                  {locale === 'en' ? 'Celebrating together!' : 'Avec grand bonheur !'}
                </span>
              </div>
            </label>

            <label
              className={`attendance-option ${attendance === 'no' ? 'attendance-option--active' : ''}`}
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === 'no'}
                onChange={() => setAttendance('no')}
                className="visually-hidden"
              />
              <span className="attendance-option__indicator">✕</span>
              <div className="attendance-option__details">
                <span className="attendance-option__text">
                  {t('attendingOptionNo') || 'Je ne pourrai pas venir'}
                </span>
                <span className="attendance-option__subtext">
                  {locale === 'en' ? 'With you in spirit' : 'Avec vous en pensée'}
                </span>
              </div>
            </label>

            <label
              className={`attendance-option ${attendance === 'maybe' ? 'attendance-option--active' : ''}`}
            >
              <input
                type="radio"
                name="attendance"
                value="maybe"
                checked={attendance === 'maybe'}
                onChange={() => setAttendance('maybe')}
                className="visually-hidden"
              />
              <span className="attendance-option__indicator">✦</span>
              <div className="attendance-option__details">
                <span className="attendance-option__text">
                  {t('attendingOptionMaybe') || 'Peut-être'}
                </span>
                <span className="attendance-option__subtext">
                  {locale === 'en' ? 'Pending confirmation' : 'À confirmer d’ici fin octobre'}
                </span>
              </div>
            </label>
          </div>

          {/* Step 3: Plus One Guest */}
          {attendance !== 'no' && (
            <div className="plus-one-section">
              <div className="form-section-title" style={{ marginTop: '24px' }}>
                <span className="form-section-number">3</span>
                <span>{t('plusOneQuestion') || 'Venez-vous accompagné(e) ?'}</span>
              </div>

              <div className="plus-one-chips-container">
                <button
                  type="button"
                  className={`chip-button ${!hasPlusOne ? 'chip-button--active' : ''}`}
                  onClick={() => setHasPlusOne(false)}
                >
                  <span className="chip-icon">👤</span>
                  <span>{t('plusOneAlone') || 'Je viens seul(e)'}</span>
                </button>

                <button
                  type="button"
                  className={`chip-button ${hasPlusOne ? 'chip-button--active' : ''}`}
                  onClick={() => setHasPlusOne(true)}
                >
                  <span className="chip-icon">👥</span>
                  <span>{t('plusOneWithGuest') || '+1 Invité(e)'}</span>
                </button>
              </div>

              {hasPlusOne && (
                <div className="plus-one-input-wrap">
                  <label htmlFor="rsvp-guest-name" className="reservation-label">
                    {t('guestNameLabel') || "Nom et prénom de l'accompagnant(e)"} <span className="req">*</span>
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required={hasPlusOne}
                    className="reservation-input"
                    placeholder={t('guestNamePlaceholder') || 'Nom complet de votre invité(e)'}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: ONLY the 5 Joyful Wishes Selection */}
          <div className="form-section-title" style={{ marginTop: '24px' }}>
            <span className="form-section-number">{attendance === 'no' ? '3' : '4'}</span>
            <span>
              {t('wishesSectionTitle') || (locale === 'en' ? 'Heartfelt Wishes for the Couple' : 'Vœux de bonheur pour les mariés')}
            </span>
          </div>

          <p className="wishes-section-subtitle">
            {t('wishesSectionSubtitle') || (locale === 'en' ? 'Select a wish to accompany your RSVP:' : 'Choisissez un vœu de bonheur pour accompagner votre réponse :')}
          </p>

          <div className="wishes-selection-list" role="radiogroup" aria-label={t('wishesSectionTitle')}>
            {WISH_KEYS.map((key, idx) => {
              const isSelected = selectedWishKey === key
              const wishText = t(key)
              return (
                <label
                  key={key}
                  className={`wish-option-card ${isSelected ? 'wish-option-card--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="wedding-wish"
                    value={key}
                    checked={isSelected}
                    onChange={() => setSelectedWishKey(key)}
                    className="visually-hidden"
                  />
                  <div className="wish-option-indicator">
                    <span className="wish-option-check">{isSelected ? '●' : '○'}</span>
                    <span className="wish-option-num">#{idx + 1}</span>
                  </div>
                  <div className="wish-option-content">
                    <p className="wish-option-text">{wishText}</p>
                  </div>
                </label>
              )
            })}

            {/* Custom Personalized Wish Option */}
            <label
              className={`wish-option-card wish-option-card--custom ${selectedWishKey === 'custom' ? 'wish-option-card--active' : ''}`}
            >
              <input
                type="radio"
                name="wedding-wish"
                value="custom"
                checked={selectedWishKey === 'custom'}
                onChange={() => setSelectedWishKey('custom')}
                className="visually-hidden"
              />
              <div className="wish-option-indicator">
                <span className="wish-option-check">{selectedWishKey === 'custom' ? '●' : '○'}</span>
                <span className="wish-option-num">✍️</span>
              </div>
              <div className="wish-option-content">
                <p className="wish-option-text wish-option-text--custom-title">
                  {t('wishCustom') || (locale === 'en' ? '✍️ Personalized wish (write your own message)' : '✍️ Vœu personnalisé (rédigez votre propre message)')}
                </p>

                {selectedWishKey === 'custom' && (
                  <div
                    className="custom-wish-wrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <textarea
                      id="rsvp-custom-wish"
                      className="custom-wish-textarea"
                      rows={3}
                      maxLength={CUSTOM_WISH_MAX_CHARS}
                      placeholder={
                        t('customWishPlaceholder') ||
                        (locale === 'en'
                          ? 'Write your warm wishes or personal note for Delchere & Ihechukwu...'
                          : 'Écrivez vos vœux ou votre mot personnalisé pour Delchere & Ihechukwu...')
                      }
                      value={customWish}
                      onChange={(e) => setCustomWish(e.target.value)}
                      required={selectedWishKey === 'custom'}
                      autoFocus
                    />
                    <div className="custom-wish-footer">
                      <span className="custom-wish-hint">
                        {t('customWishLimit') || (locale === 'en' ? 'Limited to 250 characters' : 'Limité à 250 caractères')}
                      </span>
                      <span
                        className={`custom-wish-counter ${customWish.length >= CUSTOM_WISH_MAX_CHARS ? 'counter--limit' : ''}`}
                        aria-live="polite"
                      >
                        {customWish.length} / {CUSTOM_WISH_MAX_CHARS}{' '}
                        {t('customWishCounter') || (locale === 'en' ? 'characters' : 'caractères')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Footer Submit */}
          <div className="reservation-form__footer">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !fullName.trim() ||
                !email.trim() ||
                (selectedWishKey === 'custom' && !customWish.trim())
              }
              className="btn btn--primary btn--large reservation-submit-btn"
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  <span>{t('submittingRsvp') || 'Envoi en cours...'}</span>
                </span>
              ) : (
                <>
                  <span>{t('submitRsvpButton') || 'Confirmer ma réservation'}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </>
              )}
            </button>

            <div className="form-security-badge">
              <span className="security-icon">🔒</span>
              <span>{t('securityBadge') || (locale === 'en' ? 'Secure' : 'Sécurisé')}</span>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default ReservationForm
