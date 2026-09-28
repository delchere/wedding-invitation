import React, { FC, useState, useEffect, FormEvent } from 'react'
import { useLocale } from '@/context/locale-context'
import { buildGoogleCalendarUrl } from '@/utils/calendar'

const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/formResponse'
const GOOGLE_FORM_VIEW_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/viewform'

const STORAGE_KEY = 'wedding_rsvp_submission_v2'

type AttendanceOption = 'yes' | 'no' | 'maybe'

const GOOGLE_ATTENDANCE_MAP: Record<AttendanceOption, string> = {
  yes: 'Je serai présent(e) / I will attend',
  no: 'Je ne pourrai pas venir / I will not be able to attend',
  maybe: 'Peut-être / Maybe',
}

const QUICK_SUGGESTIONS_FR = [
  '🥗 Végétarien',
  '🌾 Sans gluten',
  '🥩 Halal',
  '🚫 Sans porc',
  '✨ Aucune restriction',
  '🎵 Demande de chanson',
  '❤️ Tous nos vœux de bonheur !',
]

const QUICK_SUGGESTIONS_EN = [
  '🥗 Vegetarian',
  '🌾 Gluten free',
  '🥩 Halal',
  '🚫 Pork-free',
  '✨ No restrictions',
  '🎵 Song request',
  '❤️ Congratulations to the couple!',
]

const ReservationForm: FC = () => {
  const { t, locale } = useLocale()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [attendance, setAttendance] = useState<AttendanceOption>('yes')
  const [hasPlusOne, setHasPlusOne] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [dietaryOrMessage, setDietaryOrMessage] = useState('')

  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStep, setSubmissionStep] = useState<'idle' | 'sending' | 'done'>('idle')
  const [submittedData, setSubmittedData] = useState<{
    fullName: string
    attendance: AttendanceOption
    hasPlusOne: boolean
    guestName?: string
  } | null>(null)

  // Quick suggestion chips based on active locale
  const quickSuggestions = locale === 'en' ? QUICK_SUGGESTIONS_EN : QUICK_SUGGESTIONS_FR

  // Load previous submission from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.fullName) {
          setSubmittedData(parsed)
          setSubmissionStep('done')
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

  // Toggle quick tag in dietary/message textarea
  const handleToggleTag = (tag: string): void => {
    setDietaryOrMessage((prev) => {
      if (prev.includes(tag)) {
        return prev
          .replace(tag, '')
          .replace(/,\s*,/g, ',')
          .replace(/^\s*,\s*/, '')
          .replace(/\s*,\s*$/, '')
          .trim()
      } else {
        return prev ? `${prev}, ${tag}` : tag
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) return

    setIsSubmitting(true)
    setSubmissionStep('sending')

    const attendanceValue = GOOGLE_ATTENDANCE_MAP[attendance]
    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attendance,
      hasPlusOne,
      guestName: hasPlusOne ? guestName.trim() : '',
      dietaryOrMessage: dietaryOrMessage.trim(),
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

    // 3. Native Google Forms submission (Records row automatically in linked Google Sheet)
    let fullSubmissionName = fullName.trim()
    if (hasPlusOne && guestName.trim()) {
      fullSubmissionName += ` (+1: ${guestName.trim()})`
    }
    if (email.trim()) {
      fullSubmissionName += ` [Email: ${email.trim()}]`
    }
    if (phone.trim()) {
      fullSubmissionName += ` [Tél: ${phone.trim()}]`
    }
    if (dietaryOrMessage.trim()) {
      fullSubmissionName += ` [Note: ${dietaryOrMessage.trim()}]`
    }

    try {
      const formData = new FormData()
      formData.append('entry.137059600', fullSubmissionName)
      formData.append('entry.334886026', attendanceValue)

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
    } catch {
      // Ignored for no-cors
    }

    // 4. Save locally so user sees confirmation card
    const savedState = {
      fullName: fullName.trim(),
      attendance,
      hasPlusOne,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dietaryOrMessage: dietaryOrMessage.trim(),
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
            Cher(e) <strong>{submittedData.fullName}</strong>,
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
          </div>

          <p className="reservation-success-card__desc">
            {submittedData.attendance === 'yes'
              ? (t('rsvpSuccessYes') ||
                'Votre présence a bien été enregistrée et transmise par email et sur Google Sheet. Nous avons hâte de célébrer ce moment magique avec vous !')
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
                'Veuillez renseigner vos coordonnées ci-dessous. Votre réservation sera directement envoyée aux mariés et enregistrée.'}
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
                  {locale === 'en' ? 'Célébrons ensemble !' : 'Avec grand bonheur !'}
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
                  {locale === 'en' ? 'En pensée avec vous' : 'Avec vous en pensée'}
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
                  {locale === 'en' ? 'En attente de confirmation' : 'À confirmer d’ici fin octobre'}
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

          {/* Step 4: Quick Tags & Message */}
          <div className="form-section-title" style={{ marginTop: '24px' }}>
            <span className="form-section-number">{attendance === 'no' ? '3' : '4'}</span>
            <span>
              {t('dietaryOrMessageLabel') || 'Régime alimentaire, musique ou petit mot'}
            </span>
          </div>

          <div className="quick-suggestions-wrap">
            <span className="quick-suggestions-label">
              {locale === 'en' ? '💡 Click to add quickly :' : '💡 Cliquez pour ajouter rapidement :'}
            </span>
            <div className="quick-suggestions-chips">
              {quickSuggestions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`quick-tag-chip ${dietaryOrMessage.includes(tag) ? 'quick-tag-chip--active' : ''}`}
                  onClick={() => handleToggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="reservation-field reservation-field--full" style={{ marginTop: '10px' }}>
            <textarea
              id="rsvp-notes"
              rows={3}
              className="reservation-textarea"
              placeholder={
                t('dietaryOrMessagePlaceholder') ||
                'Allergies, régime particulier, chanson pour la soirée, ou vos vœux aux mariés...'
              }
              value={dietaryOrMessage}
              onChange={(e) => setDietaryOrMessage(e.target.value)}
            />
          </div>

          {/* Footer Submit */}
          <div className="reservation-form__footer">
            <button
              type="submit"
              disabled={isSubmitting || !fullName.trim() || !email.trim()}
              className="btn btn--primary btn--large reservation-submit-btn"
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  <span>{t('submittingRsvp') || 'Envoi en cours vers Google Sheet & Email...'}</span>
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
              <span>
                {locale === 'en'
                  ? 'Your response is directly transmitted via secure SMTP email & stored in Google Sheet'
                  : 'Votre réponse est directement transmise par email SMTP sécurisé & enregistrée sur Google Sheet'}
              </span>
            </div>

            <p className="reservation-form__fallback">
              {t('googleFormHelp') || 'Une question ou préférence particulière ?'}{' '}
              <a
                href={GOOGLE_FORM_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="reservation-form__google-link"
              >
                {t('openGoogleFormLink') || 'Accéder au formulaire Google Forms'} ↗
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  )
}

export default ReservationForm
