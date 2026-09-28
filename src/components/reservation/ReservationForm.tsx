import React, { FC, useState, useEffect, FormEvent } from 'react'
import { useLocale } from '@/context/locale-context'
import { buildGoogleCalendarUrl } from '@/utils/calendar'

const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/formResponse'
const GOOGLE_FORM_VIEW_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/viewform'

const STORAGE_KEY = 'wedding_rsvp_submission_v1'

type AttendanceOption = 'yes' | 'no' | 'maybe'

const GOOGLE_ATTENDANCE_MAP: Record<AttendanceOption, string> = {
  yes: 'Je serai présent(e) / I will attend',
  no: 'Je ne pourrai pas venir / I will not be able to attend',
  maybe: 'Peut-être / Maybe',
}

const ReservationForm: FC = () => {
  const { t } = useLocale()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [attendance, setAttendance] = useState<AttendanceOption>('yes')
  const [hasPlusOne, setHasPlusOne] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [dietaryOrMessage, setDietaryOrMessage] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  // Check saved submission from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data && data.fullName) {
          setSubmittedName(data.fullName)
          setIsSubmitted(true)
        }
      }
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!fullName.trim()) return

    setIsSubmitting(true)

    // Build compound name if plus-one or email included
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

    const attendanceValue = GOOGLE_ATTENDANCE_MAP[attendance]

    try {
      // 1. Submit via FormData POST with mode: no-cors
      const formData = new FormData()
      formData.append('entry.137059600', fullSubmissionName)
      formData.append('entry.334886026', attendanceValue)

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
    } catch (err) {
      console.warn('Form fetch submitted with fallback', err)
    }

    // 2. Fallback invisible iframe form submission to ensure 100% Google Forms capture
    try {
      const iframeName = 'hidden_rsvp_iframe_' + Date.now()
      const iframe = document.createElement('iframe')
      iframe.name = iframeName
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      const form = document.createElement('form')
      form.target = iframeName
      form.action = GOOGLE_FORM_ACTION_URL
      form.method = 'POST'
      form.style.display = 'none'

      const inputName = document.createElement('input')
      inputName.type = 'hidden'
      inputName.name = 'entry.137059600'
      inputName.value = fullSubmissionName
      form.appendChild(inputName)

      const inputAttend = document.createElement('input')
      inputAttend.type = 'hidden'
      inputAttend.name = 'entry.334886026'
      inputAttend.value = attendanceValue
      form.appendChild(inputAttend)

      document.body.appendChild(form)
      form.submit()

      setTimeout(() => {
        try {
          document.body.removeChild(form)
          document.body.removeChild(iframe)
        } catch {
          // ignore
        }
      }, 3000)
    } catch {
      // fallback handled
    }

    // Save locally
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          fullName,
          attendance,
          email,
          phone,
          hasPlusOne,
          guestName,
          dietaryOrMessage,
          date: new Date().toISOString(),
        })
      )
    } catch {
      // Ignore storage error
    }

    setSubmittedName(fullName)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleEdit = (): void => {
    setIsSubmitted(false)
  }

  const calendarUrl = buildGoogleCalendarUrl()

  return (
    <div className="reservation-card-container">
      {isSubmitted ? (
        <div className="reservation-success-card" role="status" aria-live="polite">
          <div className="reservation-success-card__badge" aria-hidden="true">
            ✦
          </div>
          <h3 className="reservation-success-card__title">
            {t('rsvpSuccessTitle') || 'Merci infiniment !'}
          </h3>
          <p className="reservation-success-card__name">
            Cher(e) <strong>{submittedName}</strong>,
          </p>
          <p className="reservation-success-card__desc">
            {attendance === 'yes'
              ? (t('rsvpSuccessYes') ||
                'Votre présence a bien été confirmée. Nous sommes impatients de célébrer ce moment inoubliable avec vous !')
              : attendance === 'maybe'
              ? (t('rsvpSuccessMaybe') ||
                'Votre réponse a bien été enregistrée. Nous espérons sincèrement que vous pourrez vous joindre à nous !')
              : (t('rsvpSuccessNo') ||
                'Votre message a bien été transmis. Vous serez avec nous en pensée pour ce grand jour.')}
          </p>

          <div className="reservation-success-card__actions">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
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
          <div className="reservation-form__header">
            <span className="reservation-form__crest" aria-hidden="true">
              D × I
            </span>
            <p className="reservation-form__instruction">
              {t('rsvpFormInstruction') ||
                'Veuillez renseigner vos coordonnées ci-dessous pour confirmer votre présence.'}
            </p>
          </div>

          <div className="reservation-form__grid">
            {/* Full Name */}
            <div className="reservation-field">
              <label htmlFor="rsvp-name" className="reservation-label">
                {t('fullNameLabel') || 'Nom & Prénom'} <span className="req">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                className="reservation-input"
                placeholder={t('fullNamePlaceholder') || 'Ex. Delphine Dupont'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="reservation-field">
              <label htmlFor="rsvp-email" className="reservation-label">
                {t('emailLabel') || 'Adresse Email'} <span className="req">*</span>
              </label>
              <input
                id="rsvp-email"
                type="email"
                required
                className="reservation-input"
                placeholder={t('emailPlaceholder') || 'exemple@email.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="reservation-field">
              <label htmlFor="rsvp-phone" className="reservation-label">
                {t('phoneLabel') || 'Téléphone / WhatsApp'}{' '}
                <span className="opt">({t('optional') || 'facultatif'})</span>
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                className="reservation-input"
                placeholder={t('phonePlaceholder') || '+228 ... / +27 ...'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Attendance Choice */}
            <div className="reservation-field reservation-field--full">
              <span className="reservation-label">
                {t('attendanceQuestion') || 'Serez-vous présent(e) parmi nous ?'}{' '}
                <span className="req">*</span>
              </span>
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
                  <span className="attendance-option__text">
                    {t('attendingOptionYes') || 'Oui, je serai présent(e)'}
                  </span>
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
                  <span className="attendance-option__text">
                    {t('attendingOptionNo') || 'Je ne pourrai pas venir'}
                  </span>
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
                  <span className="attendance-option__text">
                    {t('attendingOptionMaybe') || 'Peut-être'}
                  </span>
                </label>
              </div>
            </div>

            {/* Plus One Selector */}
            {attendance !== 'no' && (
              <div className="reservation-field reservation-field--full">
                <div className="plus-one-toggle-row">
                  <span className="reservation-label">
                    {t('plusOneQuestion') || 'Venez-vous accompagné(e) ?'}
                  </span>
                  <div className="plus-one-chips">
                    <button
                      type="button"
                      className={`chip ${!hasPlusOne ? 'chip--active' : ''}`}
                      onClick={() => setHasPlusOne(false)}
                    >
                      {t('plusOneAlone') || 'Seul(e)'}
                    </button>
                    <button
                      type="button"
                      className={`chip ${hasPlusOne ? 'chip--active' : ''}`}
                      onClick={() => setHasPlusOne(true)}
                    >
                      {t('plusOneWithGuest') || '+1 Invité(e)'}
                    </button>
                  </div>
                </div>

                {hasPlusOne && (
                  <div className="plus-one-input-wrap">
                    <label htmlFor="rsvp-guest-name" className="reservation-label">
                      {t('guestNameLabel') || "Nom et prénom de l'accompagnant(e)"}
                    </label>
                    <input
                      id="rsvp-guest-name"
                      type="text"
                      className="reservation-input"
                      placeholder={t('guestNamePlaceholder') || 'Nom complet de votre invité(e)'}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Dietary or Wishes */}
            <div className="reservation-field reservation-field--full">
              <label htmlFor="rsvp-notes" className="reservation-label">
                {t('dietaryOrMessageLabel') || 'Régime alimentaire, musique ou petit mot pour les mariés'}{' '}
                <span className="opt">({t('optional') || 'facultatif'})</span>
              </label>
              <textarea
                id="rsvp-notes"
                rows={3}
                className="reservation-textarea"
                placeholder={
                  t('dietaryOrMessagePlaceholder') ||
                  'Allergies, régime particulier, chanson pour la soirée, ou vos vœux...'
                }
                value={dietaryOrMessage}
                onChange={(e) => setDietaryOrMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="reservation-form__footer">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn--primary btn--large reservation-submit-btn"
            >
              {isSubmitting ? (
                <span>{t('submittingRsvp') || 'Envoi en cours...'}</span>
              ) : (
                <>
                  <span>{t('submitRsvpButton') || 'Confirmer ma réservation'}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </>
              )}
            </button>

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
