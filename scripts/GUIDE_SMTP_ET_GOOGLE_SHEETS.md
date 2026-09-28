# 💌 Guide de Configuration : SMTP & Google Sheets pour les Réservations

Ce guide vous explique pas à pas comment activer l'envoi d'emails par **SMTP** et l'enregistrement automatique de toutes les réservations dans votre **Google Sheet**.

---

## 1. 📧 Configuration de l'envoi d'emails (SMTP)

Le système utilise **Nodemailer** pour envoyer :
1. Un email d'alerte instantané aux mariés (`delchere.dontsa@aims-cameroon.org`) avec tous les détails de l'invité.
2. Un email de confirmation somptueux à l'invité avec le lieu, la date et le lien pour l'ajouter à son calendrier Google.

### Configuration avec Gmail (Recommandé) :
1. Connectez-vous à votre compte Google (ou celui des mariés).
2. Vérifiez que la **Validation en deux étapes** est activée sur votre compte Google : [Sécurité Google](https://myaccount.google.com/security).
3. Rendez-vous sur la page des **Mots de passe des applications** : [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
4. Saisissez un nom d'application (par exemple `Mariage Website`) et cliquez sur **Créer**.
5. Google affiche un code de 16 lettres (ex: `abcd efgh ijkl mnop`).
6. Ouvrez le fichier `.env.local` à la racine du projet et renseignez :
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=votre-adresse@gmail.com
   SMTP_PASS=abcdefghijklmnop
   SMTP_FROM="Mariage Delchere & Ihechukwu <votre-adresse@gmail.com>"
   ADMIN_NOTIFICATION_EMAIL=delchere.dontsa@aims-cameroon.org
   ```

---

## 2. 📊 Configuration de Google Sheets (Enregistrement en direct)

Un script complet et amélioré est inclus dans [`scripts/GoogleAppsScript_RSVP.js`](./GoogleAppsScript_RSVP.js).

### Étapes d'installation pas à pas :

1. Ouvrez Google Sheets et créez votre feuille de calcul (ex: **"Réservations Mariage Delchere & Ihechukwu"**).
   - Nommez votre premier onglet en bas **`Réservations`** (ou laissez le nom par défaut, le script gère les deux automatiquement !).
2. Dans le menu en haut de votre Google Sheet, cliquez sur **Extensions** > **Apps Script**.
3. Supprimez tout code existant dans la fenêtre et collez l'intégralité du code de [`scripts/GoogleAppsScript_RSVP.js`](./GoogleAppsScript_RSVP.js).
4. *(Optionnel)* Tout en haut du script :
   - `SHEET_NAME` : le nom de l'onglet (par défaut `"Réservations"`).
   - `SPREADSHEET_ID` : si vous avez ouvert Apps Script depuis votre feuille, laissez vide `""`. Si vous utilisez un script autonome, collez l'ID qui se trouve dans l'URL de votre Google Sheet.
5. Cliquez sur l'icône **Enregistrer** 💾.

### Test immédiat en 1 clic (dans Apps Script) :
Avant même de brancher le site, vous pouvez tester que le script écrit bien dans votre feuille :
- Dans la barre d'outils en haut d'Apps Script, à côté de "Déboguer", choisissez la fonction **`testerEnregistrement`**.
- Cliquez sur **Exécuter**.
- Retournez sur votre Google Sheet : une ligne de test apparaît instantanément !

### Déploiement de l'Application Web :
6. Cliquez en haut à droite sur le bouton bleu **Déployer** > **Nouveau déploiement** (ou *Gérer les déploiements* > ✏️ *Modifier* si déjà déployé).
7. Cliquez sur l'icône d'engrenage ⚙️ et choisissez **Application Web**.
8. Renseignez :
   - **Description** : `Webhook RSVP Mariage`
   - **Exécuter en tant que** : `Moi (votre adresse email)`
   - **Qui a accès** : **`Tout le monde`** *(TRÈS IMPORTANT pour que le site puisse transmettre les formulaires sans demander de connexion Google à l'invité)*.
9. Cliquez sur **Déployer** et autorisez l'accès si Google vous le demande.
10. Copiez l'**URL de l'application Web** (qui se termine obligatoirement par `/exec`).
11. Ouvrez votre fichier `.env.local` à la racine du projet et collez cette URL :
    ```env
    NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
    ```

> [!IMPORTANT]
> Si vous modifiez le code dans Google Apps Script ultérieurement, vous devez toujours faire :
> **Déployer** > **Gérer les déploiements** > ✏️ **Modifier** > **Version : Nouvelle version** > **Déployer**, sinon Google continue d'exécuter l'ancienne version.

---

## 3. ✨ Améliorations de confort pour le remplissage

Le formulaire a été spécialement enrichi pour rendre la saisie rapide et agréable :
- **Sections numérotées claires** : 1. Coordonnées, 2. Présence, 3. Accompagnant, 4. Régime & Vœux.
- **Puces de suggestions en un clic** : des pastilles cliquables (*🥗 Végétarien, 🌾 Sans gluten, 🥩 Halal, 🚫 Sans porc, ✨ Aucune restriction, 🎵 Demande de chanson, ❤️ Félicitations aux mariés*) permettent d'ajouter ses souhaits sans avoir à taper sur mobile !
- **Validation en temps réel** : confirmation visuelle immédiate avec coche verte quand les champs sont correctement remplis.
- **Récapitulatif & Ajout Agenda** : confirmation immédiate avec export vers Google Agenda en 1 clic.
