/**
 * =========================================================================
 * GOOGLE APPS SCRIPT POUR LES RÉSERVATIONS DU MARIAGE DELCHERE & IHECHUKWU
 * =========================================================================
 * 
 * 1. PARAMÈTRES DE VOTRE GOOGLE SHEET :
 */

// Nom de l'onglet dans votre Google Sheet (ex: "Réservations" ou "Feuille 1" ou "Sheet1")
// S'il n'existe pas, le script le créera automatiquement !
const SHEET_NAME = "Réservations";

// ID de votre Google Sheet (Optionnel) :
// Si vous avez ouvert Apps Script depuis votre feuille (Extensions > Apps Script), laissez vide "".
// Si vous avez créé le script sur script.google.com, collez l'ID présent dans l'URL de votre Google Sheet :
// https://docs.google.com/spreadsheets/d/VOTRE_ID_ICI/edit
const SPREADSHEET_ID = ""; 

// Email des mariés pour recevoir les alertes instantanées
const ADMIN_EMAIL = "delchere.dontsa@aims-cameroon.org";


/**
 * FONCTION POUR TROUVER OU CRÉER L'ONGLET DE DESTINATION
 */
function getTargetSheet() {
  let ss;
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Impossible d'accéder au classeur Google Sheet. Si vous utilisez un script autonome, renseignez la variable SPREADSHEET_ID tout en haut.");
  }

  // Cherche l'onglet avec le nom configuré
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Si l'onglet n'existe pas, on tente de le créer
    try {
      sheet = ss.insertSheet(SHEET_NAME);
    } catch (e) {
      // Sinon on prend le premier onglet actif existant
      sheet = ss.getSheets()[0];
    }
  }

  return sheet;
}

/**
 * RÉCEPTION DES RÉSERVATIONS ENVOYÉES DEPUIS LE SITE WEB (MÉTHODE POST)
 */
function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const sheet = getTargetSheet();

    // Si la feuille est vide, créer les en-têtes avec style
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
        "Vœu / Message pour les mariés"
      ]);
      
      // Mise en forme de l'en-tête (Vert sauge & Or du thème de mariage)
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#3f5248");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    const now = new Date();
    const dateFormatted = data.dateFormatted || Utilities.formatDate(now, "GMT+1", "dd/MM/yyyy HH:mm:ss");

    const row = [
      data.timestamp || now.toISOString(),
      dateFormatted,
      data.fullName || "Invité anonyme",
      data.email || "",
      data.phone || "",
      data.attendance || "Oui",
      data.hasPlusOne ? "Oui" : "Non",
      data.guestName || "",
      data.dietaryOrMessage || ""
    ];

    sheet.appendRow(row);

    // Envoi de l'email de notification aux mariés (facultatif si quota dépassé)
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
            <p><strong>Accompagnant (+1) :</strong> ${data.hasPlusOne ? 'Oui (' + (data.guestName || 'Non précisé') + ')' : 'Non'}</p>
            ${data.dietaryOrMessage ? `<p><strong>Vœu / Message :</strong> ${data.dietaryOrMessage}</p>` : ''}
            <p style="font-size: 12px; color: #888; margin-top: 20px;">Enregistré dans votre Google Sheet le ${dateFormatted}</p>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch (mailErr) {
      Logger.log("Notification mail ignorée ou quota atteint: " + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Enregistrement réussi dans Google Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erreur doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * VÉRIFICATION DU STATUT DE L'APPLICATION WEB (MÉTHODE GET)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Webhook Google Sheet pour les réservations de mariage opérationnel.",
      sheetName: SHEET_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =========================================================================
 * FONCTION DE TEST IMMÉDIAT EN 1 CLIC :
 * =========================================================================
 * Pour vérifier que votre Google Sheet est bien relié :
 * 1. En haut de l'éditeur Apps Script, sélectionnez "testerEnregistrement" dans le menu déroulant à côté de "Déboguer".
 * 2. Cliquez sur le bouton "Exécuter".
 * 3. Allez voir votre Google Sheet : une ligne de test doit apparaître immédiatement !
 */
function testerEnregistrement() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        fullName: "Test Invité",
        email: "test@example.com",
        phone: "+228 90 00 00 00",
        attendance: "Présent(e)",
        hasPlusOne: false,
        guestName: "",
        dietaryOrMessage: "💍 Tous nos vœux de bonheur pour Delchere & Ihechukwu !"
      })
    }
  };

  const output = doPost(fakeEvent);
  Logger.log("Résultat du test : " + output.getContent());
}
