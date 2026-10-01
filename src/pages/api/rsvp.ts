import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import axios from 'axios'
import weddingConfig from '@/config/wedding.config'
import adminConfig from '@/config/admin.config'
import { buildGoogleCalendarUrl } from '@/utils/calendar'

type RsvpRequestBody = {
  fullName: string
  email: string
  phone?: string
  attendance: 'yes' | 'no' | 'maybe'
  hasPlusOne?: boolean
  guestName?: string
  dietaryOrMessage?: string
}

type RsvpResponse = {
  success: boolean
  message: string
  emailSent?: boolean
  sheetSaved?: boolean
  error?: string
}

const ATTENDANCE_MAP: Record<string, { labelFr: string; labelEn: string; icon: string }> = {
  yes: { labelFr: 'Présent(e)', labelEn: 'Attending', icon: '✅' },
  no: { labelFr: 'Absent(e) / Ne peut pas venir', labelEn: 'Not attending', icon: '❌' },
  maybe: { labelFr: 'Peut-être / En attente', labelEn: 'Maybe', icon: '⏳' },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RsvpResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, message: `Méthode ${req.method} non autorisée` })
  }

  const {
    fullName,
    email,
    phone = '',
    attendance = 'yes',
    hasPlusOne = false,
    guestName = '',
    dietaryOrMessage = '',
  } = (req.body || {}) as RsvpRequestBody

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Le nom complet est obligatoire' })
  }

  const attendanceInfo = ATTENDANCE_MAP[attendance] || ATTENDANCE_MAP.yes
  const dateFormatted = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'medium',
  })
  const calendarUrl = buildGoogleCalendarUrl()

  let emailSent = false
  let sheetSaved = false

  // =========================================================================
  // 1. SMTP EMAIL NOTIFICATIONS (Admin + Guest confirmation)
  // =========================================================================
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = Number(process.env.SMTP_PORT) || 587
  const smtpSecure = process.env.SMTP_SECURE === 'true'
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || adminConfig.email || 'delchere.dontsa@aims-cameroon.org'
  const smtpFrom = process.env.SMTP_FROM || `"Mariage Delchere & Ihechukwu" <${smtpUser || 'no-reply@wedding.com'}>`

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransporter({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      // A) Email to Admin / Bride & Groom
      const adminHtml = `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #c49a52; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <div style="background: #3f5248; color: #f7f2e9; padding: 24px; text-align: center;">
            <p style="font-family: monospace; letter-spacing: 3px; font-size: 13px; margin: 0; color: #c49a52;">✦ D × I ✦</p>
            <h1 style="margin: 8px 0; font-size: 24px; font-weight: normal;">Nouvelle Réservation Reçue</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.85;">Mariage de Delchere & Ihechukwu — 9 Janvier 2027</p>
          </div>
          <div style="padding: 28px 24px; color: #1a2621; line-height: 1.6;">
            <div style="background: #fbf9f4; border: 1px solid #e3d5be; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
              <h2 style="font-size: 18px; margin-top: 0; color: #8a5f28; border-bottom: 1px solid #e3d5be; padding-bottom: 8px;">Détails de l'invité</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr>
                  <td style="padding: 6px 0; color: #5f7568; width: 140px;"><strong>Nom complet :</strong></td>
                  <td style="padding: 6px 0;"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #5f7568;"><strong>Statut :</strong></td>
                  <td style="padding: 6px 0; color: ${attendance === 'yes' ? '#2e7d32' : attendance === 'no' ? '#c62828' : '#e65100'}; font-weight: bold;">
                    ${attendanceInfo.icon} ${attendanceInfo.labelFr}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #5f7568;"><strong>Email :</strong></td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #8a5f28; text-decoration: none;">${email || 'Non renseigné'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #5f7568;"><strong>Téléphone :</strong></td>
                  <td style="padding: 6px 0;">${phone || 'Non renseigné'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #5f7568;"><strong>Accompagnant (+1) :</strong></td>
                  <td style="padding: 6px 0;">${hasPlusOne ? `Oui : <strong>${guestName || 'Non précisé'}</strong>` : 'Non (Seul)'}</td>
                </tr>
                ${
                  dietaryOrMessage
                    ? `<tr>
                        <td style="padding: 6px 0; color: #5f7568; vertical-align: top;"><strong>Message / Régime :</strong></td>
                        <td style="padding: 6px 0; background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #ebdcc5;">${dietaryOrMessage}</td>
                      </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 6px 0; color: #5f7568;"><strong>Date d'envoi :</strong></td>
                  <td style="padding: 6px 0; font-size: 13px; color: #777;">${dateFormatted}</td>
                </tr>
              </table>
            </div>
            <p style="text-align: center; margin: 20px 0 0; font-size: 13px; color: #888;">
              Notification automatique du site de mariage <a href="https://delchere.github.io/wedding-invitation" style="color: #c49a52;">Delchere & Ihechukwu</a>
            </p>
          </div>
        </div>
      `

      await transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        subject: `💍 Réservation mariage : ${fullName} — ${attendanceInfo.labelFr}`,
        html: adminHtml,
      })

      // B) Confirmation email to Guest (if email provided)
      if (email && email.includes('@')) {
        const guestHtml = `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #c49a52; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="background: #3f5248; color: #f7f2e9; padding: 32px 24px; text-align: center;">
              <p style="font-family: monospace; letter-spacing: 4px; font-size: 12px; margin: 0; color: #c49a52;">✦ DELCHERE & IHECHUKWU ✦</p>
              <h1 style="margin: 12px 0 6px; font-size: 26px; font-weight: normal;">Thèse de l'amour</h1>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Confirmation de votre réponse</p>
            </div>
            <div style="padding: 30px 24px; color: #1a2621; line-height: 1.6;">
              <p style="font-size: 16px;">Bonjour <strong>${fullName}</strong>,</p>
              <p style="font-size: 15px;">
                ${
                  attendance === 'yes'
                    ? 'Nous avons bien reçu votre confirmation et nous nous réjouissons de célébrer cette journée inoubliable avec vous !'
                    : attendance === 'maybe'
                    ? 'Nous avons bien noté votre réponse d’attente. N’hésitez pas à nous recontacter pour nous confirmer votre venue dès que possible.'
                    : 'Nous avons bien reçu votre message. Vous serez assurément avec nous par la pensée en ce grand jour !'
                }
              </p>
              
              <div style="background: #fbf9f4; border: 1px solid #e3d5be; border-radius: 8px; padding: 18px; margin: 24px 0;">
                <h3 style="margin-top: 0; font-size: 16px; color: #8a5f28;">Rappel du rendez-vous</h3>
                <p style="margin: 4px 0; font-size: 14px;"><strong>📅 Date :</strong> Samedi 9 janvier 2027</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>⛪ Cérémonie (11h30) :</strong> ${weddingConfig.calendar.location}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>🥂 Réception (14h00) :</strong> Jubilee Hall, Mater Dei Cathedral, Umuahia, Nigéria</p>
                ${hasPlusOne && guestName ? `<p style="margin: 4px 0; font-size: 14px;"><strong>👥 Accompagnant(e) :</strong> ${guestName}</p>` : ''}
              </div>

              <div style="text-align: center; margin: 28px 0 10px;">
                <a href="${calendarUrl}" style="background: #3f5248; color: #f7f2e9; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-family: monospace; font-size: 12px; letter-spacing: 1px; display: inline-block;">
                  📅 AJOUTER À MON AGENDA
                </a>
              </div>

              <p style="text-align: center; margin-top: 30px; font-size: 14px; font-style: italic; color: #5f7568;">
                « Deux âmes, un seul chemin, scellés par l'amour et la foi. »
              </p>
            </div>
            <div style="background: #f7f2e9; padding: 14px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ebdcc5;">
              Delchere & Ihechukwu — 2027
            </div>
          </div>
        `

        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject: `💍 Confirmation réservation mariage — Delchere & Ihechukwu`,
          html: guestHtml,
        })
      }

      emailSent = true
    } catch (mailErr) {
      console.error('Erreur lors de l’envoi SMTP :', mailErr)
    }
  } else {
    console.info('SMTP non configuré (SMTP_USER ou SMTP_PASS manquant). L’email a été ignoré.')
  }

  // =========================================================================
  // 2. GOOGLE SHEETS FORWARDING
  // =========================================================================
  const sheetWebhookUrl =
    process.env.GOOGLE_SHEET_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL

  if (sheetWebhookUrl) {
    try {
      await axios.post(sheetWebhookUrl, {
        timestamp: new Date().toISOString(),
        dateFormatted,
        fullName,
        email,
        phone,
        attendance: attendanceInfo.labelFr,
        attendanceCode: attendance,
        hasPlusOne: hasPlusOne ? 'Oui' : 'Non',
        guestName: hasPlusOne ? guestName : '',
        dietaryOrMessage,
      })
      sheetSaved = true
    } catch (sheetErr) {
      console.warn('Erreur lors de l’enregistrement dans le Webhook Google Sheet :', sheetErr)
    }
  }

  // =========================================================================
  // 3. GOOGLE FORM FALLBACK (Auto-saves directly to connected Google Sheet)
  // =========================================================================
  try {
    const GOOGLE_FORM_ACTION_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/formResponse'

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

    const GOOGLE_ATTENDANCE_MAP: Record<string, string> = {
      yes: 'Je serai présent(e) / I will attend',
      no: 'Je ne pourrai pas venir / I will not be able to attend',
      maybe: 'Peut-être / Maybe',
    }

    const formParams = new URLSearchParams()
    formParams.append('entry.137059600', fullSubmissionName)
    formParams.append('entry.334886026', GOOGLE_ATTENDANCE_MAP[attendance] || GOOGLE_ATTENDANCE_MAP.yes)

    await axios.post(GOOGLE_FORM_ACTION_URL, formParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    sheetSaved = true
  } catch {
    // Form action can return opaque or redirect which is normal
  }

  return res.status(200).json({
    success: true,
    message: 'Réservation enregistrée avec succès',
    emailSent,
    sheetSaved,
  })
}
