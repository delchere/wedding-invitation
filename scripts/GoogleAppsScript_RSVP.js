/**
 * =========================================================================
 * GOOGLE APPS SCRIPT POUR LES RÉSERVATIONS DU MARIAGE DELCHERE & IHECHUKWU
 * =========================================================================
 * 
 * Ce script permet de :
 * 1. Enregistrer automatiquement chaque réservation dans votre Google Sheet
 * 2. Envoyer un email de notification instantané aux mariés
 * 3. Envoyer un email de confirmation à l'invité
 * 
 * GUIDE D'INSTALLATION EN 2 MINUTES :
 * -----------------------------------
 * 1. Ouvrez votre Google Sheet (ou créez-en une nouvelle : "Réservations Mariage Delchere & Ihechukwu")
 * 2. Dans le menu, cliquez sur : Extensions > Apps Script
 * 3. Effacez tout le code existant dans l'éditeur et collez l'intégralité de ce fichier.
 * 4. Modifiez la variable ADMIN_EMAIL ci-dessous si nécessaire.
 * 5. Cliquez sur l'icône Disquette (Enregistrer) 💾
 * 6. Cliquez en haut à droite sur : "Déployer" > "Nouveau déploiement"
 * 7. Cliquez sur la roue dentée ⚙️ à côté de "Sélectionner le type" et choisissez "Application Web"
 * 8. Remplissez les champs :
 *    - Description : "Webhook RSVP Mariage"
 *    - Exécuter en tant que : "Moi" (votre adresse Google)
 *    - Qui a accès : "Tout le monde" (Anyone) -> TRÈS IMPORTANT pour recevoir les formulaires du site
 * 9. Cliquez sur "Déployer", autorisez les accès si demandé.
 * 10. Copiez l'URL de l'application Web fournie (se terminant par /exec)
 * 11. Collez cette URL dans votre fichier .env.local du projet sous :
 *     NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

const ADMIN_EMAIL = "delchere.dontsa@aims-cameroon.org"; // Email des mariés

function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Vérifier si l'en-tête existe, sinon le créer
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Horodatage",
        "Date formatée",
        "Nom complet",
        "Email",
        "Téléphone / WhatsApp",
        "Présence",
        "Accompagnant (+1)",
        "Nom de l'accompagnant",
        "Régime / Message"
      ]);
      
      // Mettre en gras la première ligne et fixer
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#3f5248").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    const now = new Date();
    const dateFormatted = data.dateFormatted || Utilities.formatDate(now, "GMT+1", "dd/MM/yyyy HH:mm:ss");

    const row = [
      data.timestamp || now.toISOString(),
      dateFormatted,
      data.fullName || "Anonyme",
      data.email || "",
      data.phone || "",
      data.attendance || "Oui",
      data.hasPlusOne || "Non",
      data.guestName || "",
      data.dietaryOrMessage || ""
    ];

    sheet.appendRow(row);

    // Envoi de l'email de notification aux mariés
    try {
      const subject = "💍 Nouvelle réservation mariage : " + (data.fullName || "Nouvel invité") + " (" + (data.attendance || "Présent") + ")";
      const htmlBody = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; border: 1px solid #c49a52; border-radius: 10px; overflow: hidden;">
          <div style="background: #3f5248; color: #f7f2e9; padding: 20px; text-align: center;">
            <p style="letter-spacing: 2px; font-size: 12px; margin: 0; color: #c49a52;">✦ DELCHERE & IHECHUKWU ✦</p>
            <h2 style="margin: 8px 0; font-size: 22px;">Nouvelle Réservation Reçue</h2>
          </div>
          <div style="padding: 24px; color: #1a2621; line-height: 1.6;">
            <p><strong>Nom :</strong> ${data.fullName}</p>
            <p><strong>Présence :</strong> ${data.attendance}</p>
            <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email || 'Non renseigné'}</a></p>
            <p><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</p>
            <p><strong>Accompagnant (+1) :</strong> ${data.hasPlusOne === 'Oui' ? 'Oui (' + data.guestName + ')' : 'Non'}</p>
            ${data.dietaryOrMessage ? `<p><strong>Message / Régime :</strong> ${data.dietaryOrMessage}</p>` : ''}
            <p style="font-size: 12px; color: #888; margin-top: 20px;">Enregistré dans votre Google Sheet le ${dateFormatted}</p>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: subject,
        htmlBody: htmlBody
      });

      // Email de confirmation à l'invité si email fourni
      if (data.email && data.email.indexOf("@") !== -1) {
        MailApp.sendEmail({
          to: data.email,
          subject: "💍 Confirmation de votre réservation — Mariage Delchere & Ihechukwu",
          htmlBody: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; border: 1px solid #c49a52; border-radius: 10px; overflow: hidden;">
              <div style="background: #3f5248; color: #f7f2e9; padding: 24px; text-align: center;">
                <p style="letter-spacing: 3px; font-size: 11px; margin: 0; color: #c49a52;">✦ DELCHERE & IHECHUKWU ✦</p>
                <h2 style="margin: 8px 0; font-size: 24px;">La thèse de l'amour</h2>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Confirmation de votre réponse</p>
              </div>
              <div style="padding: 24px; color: #1a2621; line-height: 1.6;">
                <p>Bonjour <strong>${data.fullName}</strong>,</p>
                <p>Nous avons bien enregistré votre réponse pour notre mariage. C'est un immense plaisir de partager ce moment unique avec vous !</p>
                <div style="background: #fbf9f4; border: 1px solid #e3d5be; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="margin: 4px 0;"><strong>📅 Date :</strong> Samedi 9 janvier 2027</p>
                  <p style="margin: 4px 0;"><strong>⛪ Cérémonie :</strong> 11h30 · All Saints' Anglican Church, Umuahia, Nigéria</p>
                  <p style="margin: 4px 0;"><strong>🥂 Réception :</strong> 14h00 · Jubilee Hall, Mater Dei Cathedral</p>
                </div>
                <p style="text-align: center; font-style: italic; color: #5f7568;">
                  « Deux vies unies par l'amour, la foi et l'engagement éternel. »
                </p>
              </div>
            </div>
          `
        });
      }
    } catch (mailErr) {
      Logger.log("Erreur mail: " + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Enregistrement réussi" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "Webhook de réservation de mariage opérationnel." }))
    .setMimeType(ContentService.MimeType.JSON);
}
