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

Un script prêt à l'emploi est inclus dans [`scripts/GoogleAppsScript_RSVP.js`](./GoogleAppsScript_RSVP.js).

### Étapes d'installation (2 minutes) :
1. Ouvrez Google Sheets et créez une feuille de calcul intitulée par exemple : **"Réservations Mariage Delchere & Ihechukwu"**.
2. Dans la barre de menus, cliquez sur **Extensions** > **Apps Script**.
3. Supprimez tout code existant dans la fenêtre et collez l'intégralité du code contenu dans le fichier [`scripts/GoogleAppsScript_RSVP.js`](./GoogleAppsScript_RSVP.js).
4. Cliquez sur l'icône **Enregistrer** 💾.
5. Cliquez sur le bouton bleu **Déployer** (en haut à droite) > **Nouveau déploiement**.
6. Cliquez sur l'icône d'engrenage ⚙️ à côté de *Sélectionner le type* et choisissez **Application Web**.
7. Remplissez :
   - **Description** : `Webhook RSVP Mariage`
   - **Exécuter en tant que** : `Moi (votre adresse email)`
   - **Qui a accès** : `Tout le monde` *(indispensable pour que le formulaire puisse enregistrer les réponses sans demander de connexion Google aux invités)*.
8. Cliquez sur **Déployer** et autorisez l'accès si Google vous le demande.
9. Copiez l'**URL de l'application Web** qui vous est donnée (elle se termine par `/exec`).
10. Ouvrez votre fichier `.env.local` et collez l'URL :
    ```env
    NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
    ```

Dès cet instant, chaque soumission du formulaire :
- Crée une ligne automatiquement dans votre Google Sheet (Nom, Email, Téléphone, Présence, +1, Régimes / Vœux).
- Envoie un email aux mariés.
- Envoie une confirmation à l'invité.

---

## 3. ✨ Améliorations de confort pour le remplissage

Le formulaire a été spécialement enrichi pour rendre la saisie rapide et agréable :
- **Sections numérotées claires** : 1. Coordonnées, 2. Présence, 3. Accompagnant, 4. Régime & Vœux.
- **Puces de suggestions en un clic** : des pastilles cliquables (*🥗 Végétarien, 🌾 Sans gluten, 🥩 Halal, 🚫 Sans porc, ✨ Aucune restriction, 🎵 Demande de chanson, ❤️ Félicitations aux mariés*) permettent d'ajouter ses souhaits sans avoir à taper sur mobile !
- **Validation en temps réel** : confirmation visuelle immédiate avec coche verte quand les champs sont correctement remplis.
- **Récapitulatif & Ajout Agenda** : confirmation immédiate avec export vers Google Agenda en 1 clic.
