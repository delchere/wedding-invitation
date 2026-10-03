import React, { createContext, FC, ReactNode, useContext, useState } from 'react'

export type Locale = 'fr' | 'en'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    youAreInvited: 'Vous êtes invités',
    tapToOpen: 'Toucher pour ouvrir',
    cardTogetherFamilies: 'De la part de leurs familles',
    cardRequestPleasure: 'ont le plaisir de vous inviter à célébrer leur union',
    scrollToDiscover: 'Faites défiler pour découvrir',
    cardAriaLabel: "Carte d'invitation au mariage",
    heroTitle: 'Thèse de l’amour',
    heroDate: 'Samedi 9 janvier 2027',
    heroImageAlt: 'Mariés marchant vers l’autel dans une église',
    heroEyebrow: 'Nous célébrons notre amour',
    heroTagline: 'Rejoignez-nous pour ce jour unique',
    viewInvitationCta: "Voir l'invitation",
    navHome: 'Accueil',
    navInvitation: "L'Invitation",
    navStory: 'Notre histoire',
    navCountdown: 'Décompte',
    navProgram: 'Programme',
    navDress: 'Dress code',
    navReserve: 'Réservez votre place',
    navOpen: 'Ouvrir le menu',
    navClose: 'Fermer le menu',
    reserveCta: 'Réservez votre place',
    footerCopy: '© {year} — Avec amour',
    academy: 'The Academy of Life',
    department: 'Department of Human Connection',
    thesis: 'Thèse de l’amour',
    doctoralJourney: 'A Doctoral Journey Exploring',
    loveValues: 'Love • Faith • Friendship • Commitment',
    authors: 'Authors',
    finalDefense: 'Final Defense',
    timeLabel: 'Time:',
    locationLabel: 'Location:',
    supervisor: 'Supervisor',
    invitation: 'Nous sommes heureux de vous inviter à assister à',
    ceremony: 'la soutenance de notre thèse de vie à deux',
    story: 'Notre histoire',
    storyEquationTitle: 'L’ÉQUATION DE NOUS',
    storyFinalWord: 'NOUS',
    storyBridgeLabel: 'Le grand jour',
    storyReadMore: 'Lire la suite',
    storyReadLess: 'Replier',
    storyIntro:
      'Parfois, la vie a une drôle de façon de rapprocher deux êtres. On pense simplement entamer un nouveau chapitre, puis on réalise plus tard que l’on venait de croiser la personne qui allait changer toute notre histoire.',
    storyChapter01:
      'En 2022, nos chemins se sont croisés à AIMS Cameroun, au milieu de la recherche, des sciences et des idées, sans qu’aucun signe ne laisse deviner que nous étions au tout début d’une grande aventure. Nous nous sommes rencontrés et nous parlions de travail, de recherche, de projets. Des sujets très sérieux. Du moins, c’est ce que nous croyions.',
    storyChapter02:
      'Après cette étape à AIMS, nous avons continué à échanger. Puis les conversations sont devenues de plus en plus longues, les appels de plus en plus fréquents. Les intérêts ont naturellement changé. Nous sommes passés de « Comment va la recherche ? » à parler de famille, de rêves, de foi, d’ambitions et de tout ce qu’on avait de plus profond.',
    storyChapter03: `Quelque part en chemin, quelque chose a changé. Le respect est devenu confiance, la confiance est devenue amitié, et l’amitié s’est transformée en quelque chose de plus profond. Puis est venue cette question que ni l’un ni l’autre ne pouvait plus vraiment éviter : « Attends… est-ce que tout cela est en train de devenir quelque chose de plus ? »`,
    storyChapter04b:
      'Mais ce qu’il y a de beau avec l’amour, c’est qu’il ne suit pas toujours l’équation la plus évidente. Plus nous apprenions à nous connaître, plus nous découvrions que nous partagions l’essentiel : la famille, la foi, le respect, le sens des valeurs, l’ambition et ce désir sincère de nous voir grandir l’un à côté de l’autre.',
    storyChapter04c: 'L’équation commençait enfin à prendre tout son sens.',
    storyChapter05: `Puis est venu le jour où nous nous sommes enfin rencontrés. Et, d’une certaine façon, cela ressemblait moins à un commencement qu’au fait de donner un visage, un sourire et une véritable étreinte à ce qui avait déjà grandi entre nous. Ce moment a tout changé. Il ne s’agissait plus seulement de se demander ce que nous ressentions ; il s’agissait de savoir ce que nous voulions en faire.`,
    storyChapter06: `Et nous nous sommes choisis.
Nous avons choisi de saisir cette magnifique et inattendue connexion pour en faire quelque chose de réel. Quelque chose d’intentionnel. Quelque chose qui mérite d’être bâti, protégé et cultivé ensemble. Notre histoire n’a peut-être pas suivi l’équation la plus simple. Il y avait des pays différents, des cultures différentes, la distance, le timing et tant d’inconnues. Mais à travers tout cela, une évidence n’a cessé de s’imposer : nous.`,
    storyFinalVariable: `Nous voici donc aujourd’hui, avec une histoire née de façon totalement inattendue et qui nous a menés là où nous n’aurions jamais pu l’imaginer.`,
    storyClosing: `Et parce que chaque belle histoire mérite de garder quelques surprises, nous réservons les prochains chapitres pour vous. Vous devrez patienter encore un tout petit peu, car le prochain chapitre s’écrira le jour de notre mariage.
Et cette fois, nous allons l’écrire ensemble. ❤️`,
    wedding: 'Le grand jour',
    weddingText: 'Nous vous attendons le samedi 9 janvier 2027 pour partager notre mariage religieux, puis célébrer ensemble lors de la réception.',
    weddingCountdownTitle: 'Le grand jour approche',
    weddingDays: 'Jours',
    weddingHours: 'Heures',
    weddingMinutes: 'Minutes',
    weddingSeconds: 'Secondes',
    weddingCountdownComplete: 'C’est le grand jour !',
    calendarAddToCalendar: 'Ajouter au calendrier',
    weddingLocationTitle: 'Lieux',
    weddingTimelineTitle: 'Notre journée',
    weddingCeremonyVenue: "All Saints' Anglican Church",
    weddingCeremonyAddress: 'World Bank Housing Estate, Umuahia, Nigéria',
    weddingReceptionVenue: 'Jubilee Hall',
    weddingReceptionAddress: 'Mater Dei Cathedral, Umuahia, Nigéria',
    whiteWedding: 'Cérémonie à l’église',
    whiteWeddingDate: 'Samedi 9 janvier 2027 · 11h30',
    reception: 'Réception',
    ceremonyDate: 'Samedi 9 janvier 2027. 9h30',
    ceremonyLocation: "All Saints' Anglican Church, World Bank Housing Estate, Umuahia, Nigéria",
    receptionDate: 'Samedi 9 janvier 2027 · 14h00',
    receptionLocation: 'Jubilee Hall, Mater Dei Cathedral, Umuahia, Nigéria',
    viewMap: 'Voir sur la carte',
    dress: 'Dress code',
    dressCodeHeadline: 'CODE',
    dressCodeSubtitle: 'ÉLÉGANT & FESTIF',
    dressCodeCtaLine: 'HABILLEZ-VOUS POUR L’IMPRESSION,',
    dressCodeCtaScript: 'célébrons avec style !',
    dressColorIvory: 'Ivoire',
    dressColorGold: 'Or Champagne',
    dressColorSage: 'Vert Sauge',
    dressCodeSwatchesLabel: 'Couleurs du dress code',
    dressText: `Notre palette de couleurs reflète la symbolique de notre histoire :

Ivoire : Le début d'un nouveau chapitre — la page blanche sur laquelle notre histoire continue de s'écrire.

Or Champagne : La valeur de tout ce que nous avons construit ensemble et la joie de célébrer cette étape importante : Découverte, Accomplissement et Célébration.

Vert Sauge : La vie, la croissance et l'harmonie. Un symbole de notre parcours pour bâtir une vie ensemble et grandir côte à côte, avec la simplicité et la chaleur que nous souhaitons apporter à notre foyer.

L'association de ces trois nuances crée un thème axé sur l'élégance, la nature, le savoir et l'amour intemporel.`,
    gifts: 'Cadeaux & contact',
    giftsTitle: 'Cadeaux',
    giftsText: `Votre présence à nos côtés sera déjà un très beau cadeau. Pour celles et ceux qui souhaitent nous témoigner une attention supplémentaire, vous pouvez participer à l’urne via :

• **TMoney** : **+228 92 06 94 98** (Titulaire : DON-TSA Delchere)
• **En main propre** : le jour de la célébration, dans l’urne prévue à cet effet.

Merci du fond du cœur pour votre générosité et votre bienveillance.`,
    contactTitle: 'Contact',
    contactText: `Pour toute question concernant la cérémonie ou la réception, vous pouvez nous contacter aux numéros suivants :

• **+228 92 06 94 98**
• **+27 65 30 71 427**`,
    rsvp: 'RSVP',
    rsvpText: 'Cela nous ferait grand plaisir d’obtenir votre réponse au plus tard fin octobre, afin de nous aider à préparer au mieux cette célébration.',
    invitationEyebrow: "02 / L'Invitation",
    invitationTitle: "Notre Carte d'Invitation",
    invitationLead: "Découvrez notre faire-part officiel. Explorez la carte avec son animation 3D interactive et téléchargez-la pour la conserver précieusement.",
    downloadCard: "Télécharger la carte",
    flipCard3d: "Retourner la carte (3D)",
    frontView: "Voir l'affiche",
    zoomCard: "Plein écran",
    rsvpFormInstruction: "Veuillez renseigner vos coordonnées ci-dessous pour confirmer votre présence.",
    fullNameLabel: "Nom & Prénom",
    fullNamePlaceholder: "Ex. Marie Dupont",
    emailLabel: "Adresse Email",
    emailPlaceholder: "Ex. marie.dupont@email.com",
    phoneLabel: "Téléphone / WhatsApp",
    phonePlaceholder: "Ex. +228 92 00 00 00",
    attendanceQuestion: "Serez-vous présent(e) parmi nous ?",
    attendingOptionYes: "Oui, je serai présent(e)",
    attendingOptionNo: "Je ne pourrai pas venir",
    attendingOptionMaybe: "Peut-être",
    plusOneQuestion: "Venez-vous accompagné(e) ?",
    plusOneAlone: "Seul(e)",
    plusOneWithGuest: "+1 Invité(e)",
    guestNameLabel: "Nom et prénom de l'accompagnant(e)",
    guestNamePlaceholder: "Nom complet de votre invité(e)",
    dietaryOrMessageLabel: "Vœux de bonheur pour les mariés",
    dietaryOrMessagePlaceholder: "Un message personnalisé, vœu ou précision (facultatif)...",
    wishesSectionTitle: "Vœux chaleureux pour les mariés",
    wishesSectionSubtitle: "Sélectionnez un vœu de bonheur pour accompagner votre réponse :",
    wish1: "💍 Un mariage comblé d’amour, de paix et de joie infinie !",
    wish2: "🕊️ Que votre foyer soit béni de prospérité, d’harmonie et de grâce divine.",
    wish3: "🌟 Une merveilleuse vie à deux pleine d’aventures et de rêves accomplis !",
    wish4: "🥂 Que votre amour grandisse chaque jour plus fort, main dans la main.",
    wish5: "🤍 Un bonheur éclatant, une complicité éternelle et une douce sérénité.",
    wishCustom: "✍️ Vœu personnalisé (rédigez votre propre message)",
    wishCustomTitle: "Vœu personnalisé",
    customWishPlaceholder: "Écrivez vos vœux ou votre mot personnalisé pour Delchere & Ihechukwu...",
    customWishLimit: "Limité à 250 caractères",
    customWishCounter: "caractères",
    customWishRequired: "Veuillez saisir votre vœu personnalisé",
    securityBadge: "Sécurisé",
    rsvpSuccessWishLabel: "Votre vœu transmis",
    submitRsvpButton: "Confirmer ma réservation",
    submittingRsvp: "Envoi en cours...",
    rsvpSuccessTitle: "Merci infiniment !",
    rsvpSuccessYes: "Votre présence a bien été confirmée. Nous sommes impatients de célébrer ce moment inoubliable avec vous !",
    rsvpSuccessMaybe: "Votre réponse a bien été enregistrée. Nous espérons sincèrement que vous pourrez vous joindre à nous !",
    rsvpSuccessNo: "Votre message a bien été transmis. Vous serez avec nous en pensée pour ce grand jour.",
    rsvpEditButton: "Modifier ma réponse",
    optional: "facultatif",
    menu: 'Navigation',
    photoPlaceholder: 'Photo individuelle ou montage IA à ajouter',
  },
  en: {
    youAreInvited: 'You are invited',
    tapToOpen: 'Tap to open',
    cardTogetherFamilies: 'Together with their families',
    cardRequestPleasure: 'request the pleasure of your company',
    scrollToDiscover: 'Scroll to discover',
    cardAriaLabel: 'Wedding invitation card',
    heroTitle: 'Thesis of Love',
    heroDate: 'Saturday, January 9, 2027',
    heroImageAlt: 'Newlyweds walking toward the altar in a church',
    heroEyebrow: 'We celebrate our love',
    heroTagline: 'Join us for this special day',
    viewInvitationCta: 'View Invitation',
    navHome: 'Home',
    navInvitation: 'Invitation',
    navStory: 'Our story',
    navCountdown: 'Countdown',
    navProgram: 'Schedule',
    navDress: 'Dress code',
    navReserve: 'Reserve your place',
    navOpen: 'Open menu',
    navClose: 'Close menu',
    reserveCta: 'Reserve your place',
    footerCopy: '© {year} — With love',
    academy: 'The Academy of Life',
    department: 'Department of Human Connection',
    thesis: 'Thesis of Love',
    doctoralJourney: 'A Doctoral Journey Exploring',
    loveValues: 'Love • Faith • Friendship • Commitment',
    authors: 'Authors',
    finalDefense: 'Final Defense',
    timeLabel: 'Time:',
    locationLabel: 'Location:',
    supervisor: 'Supervisor',
    invitation: 'We are delighted to invite you to defend',
    ceremony: 'the thesis of our life together',
    story: 'Our story',
    storyEquationTitle: 'THE EQUATION OF US',
    storyFinalWord: 'US',
    storyBridgeLabel: 'The wedding day',
    storyReadMore: 'Read more',
    storyReadLess: 'Show less',
    storyIntro:
      'Sometimes, life has a funny way of introducing two people. You think you are simply starting a new chapter, and only later realise that you were actually meeting someone who would change the whole story.',
    storyChapter01:
      'In 2022, our paths crossed at AIMS Cameroon, surrounded by research, science, ideas, and at least at the time, absolutely no obvious sign that we were sitting at the beginning of something much bigger. We met and started talking about work, research, and projects. Very serious things. Or so we thought.',
    storyChapter02:
      'After that chapter at AIMS, the conversations continued. Then they became longer. The calls became more frequent. And somehow, the conversations that once began with “How is the research going?” started wandering into everything else, life, family, dreams, faith, ambitions, and all the little things that make us who we are.',
    storyChapter03: `Somewhere along the way, something changed. Respect became trust, trust became friendship, and friendship quietly became something deeper. Then came the question neither of us could quite ignore: “Wait… is this becoming something more?”`,
    storyChapter04a:
      'There was, of course, the small matter of distance. And different backgrounds. And different cultures. And all the practical reasons why perhaps this should have been complicated.',
    storyChapter04b:
      'But the funny thing about love is that it does not always follow the most obvious equation. The more we got to know each other, the more we discovered that we shared the things that mattered most: family, faith, respect, purpose, ambition, and the desire to see each other grow.',
    storyChapter04c: 'Slowly, the equation was beginning to make sense.',
    storyChapter05: `Then came the moment we finally met in person. And somehow, it felt less like the beginning and more like putting a face, a smile and a real embrace to something that had already been growing between us. That moment changed something. It was no longer just about asking what we felt; it became about asking what we wanted to do with it.`,
    storyChapter06: `And we chose each other.
We chose to take this beautiful, unexpected connection and turn it into something real. Something intentional. Something worth building, protecting and growing together. Our story may not have followed the simplest equation. There were different countries, different cultures, distance, timing, and plenty of unknown variables. But somehow, through it all, one thing kept becoming clearer: us.`,
    storyEpilogue:
      'And perhaps that is the most beautiful part of the story, not that everything was easy or perfectly predictable, but that, step by step, we kept finding our way back to each other. We are still learning, still laughing, still dreaming, and still choosing each other.',
    storyFinalVariable: `So here we are, with a story that began quite unexpectedly and has brought us to a place we could not have predicted when our paths first crossed in 2022.`,
    storyClosing: `And because every beautiful story deserves a few surprises, we are keeping some of the next chapters for you. You will have to wait just a little longer, because the next chapter will be written on our wedding day.
And this time, we get to write it together. ❤️`,
    wedding: 'The wedding day',
    weddingText: 'Join us on Saturday, January 9, 2027 to share in our religious wedding ceremony, then celebrate together at the reception.',
    weddingCountdownTitle: 'The big day is approaching',
    weddingDays: 'Days',
    weddingHours: 'Hours',
    weddingMinutes: 'Minutes',
    weddingSeconds: 'Seconds',
    weddingCountdownComplete: 'It’s the big day!',
    calendarAddToCalendar: 'Add to calendar',
    weddingLocationTitle: 'Location',
    weddingTimelineTitle: 'Our Wedding Day',
    weddingCeremonyVenue: "All Saints' Anglican Church",
    weddingCeremonyAddress: 'World Bank Housing Estate, Umuahia, Nigeria',
    weddingReceptionVenue: 'Jubilee Hall',
    weddingReceptionAddress: 'Mater Dei Cathedral, Umuahia, Nigeria',
    whiteWedding: 'Church ceremony',
    whiteWeddingDate: 'Saturday, January 9, 2027 · 11:30 AM',
    reception: 'Reception',
    ceremonyDate: 'Saturday, January 9, 2027. 9:00 AM',
    ceremonyLocation: "All Saints' Anglican Church, World Bank Housing Estate, Umuahia, Nigeria",
    receptionDate: 'Saturday, January 9, 2027 · 2:00 PM',
    receptionLocation: 'Jubilee Hall, Mater Dei Cathedral, Umuahia, Nigeria',
    viewMap: 'View on map',
    dress: 'Dress code',
    dressCodeHeadline: 'CODE',
    dressCodeSubtitle: 'ELEGANT & FESTIVE',
    dressCodeCtaLine: 'DRESS TO IMPRESS,',
    dressCodeCtaScript: "let's celebrate in style!",
    dressColorIvory: 'Ivory',
    dressColorGold: 'Champagne Gold',
    dressColorSage: 'Sage Green',
    dressCodeSwatchesLabel: 'Dress code colours',
    dressText: `Our colour palette reflects the symbolism of our story:

Ivory: The beginning of a new chapter — the blank page on which our story continues to be written.

Champagne Gold: The worth of everything we have built together, and the joy of celebrating this important milestone: Discovery, Achievement and Celebration.

Sage Green: Life, growth and harmony. A symbol of our journey to build a life together and grow side by side, with the simplicity and warmth we wish to bring to our home.

Together, these three shades create a theme rooted in elegance, nature, wisdom and timeless love.`,
    gifts: 'Gifts & contact',
    giftsTitle: 'Gifts',
    giftsText: `Your presence by our side will already be a wonderful gift. For those who would like to show us some extra kindness, you can contribute to the gift fund via:

- **TMoney**: **+228 92 06 94 98** (Account holder: DON-TSA Delchere)
- **In person**: on the day of the celebration, in the box provided for this purpose.

Thank you from the bottom of our hearts for your generosity and kindness.`,
    contactTitle: 'Contact',
    contactText: `For any questions about the ceremony or reception, you can reach us at the following numbers:

- **+228 92 06 94 98**
- **+27 65 30 71 427**`,
    rsvp: 'RSVP',
    rsvpText: 'We would be delighted to receive your response by late October at the latest, to help us best prepare for this celebration.',
    invitationEyebrow: "02 / The Invitation",
    invitationTitle: "Our Wedding Invitation",
    invitationLead: "Discover our official wedding invitation below. Explore the card in 3D and download it as a keepsake.",
    downloadCard: "Download Invitation",
    flipCard3d: "Flip Card (3D)",
    frontView: "View Poster",
    zoomCard: "Full Screen",
    rsvpFormInstruction: "Please provide your details below to confirm your attendance.",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "e.g. John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "e.g. john.doe@email.com",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "e.g. +228 92 00 00 00",
    attendanceQuestion: "Will you be attending?",
    attendingOptionYes: "Yes, I will attend with pleasure",
    attendingOptionNo: "No, I will not be able to attend",
    attendingOptionMaybe: "Maybe / Pending confirmation",
    plusOneQuestion: "Will you bring a guest?",
    plusOneAlone: "Just me",
    plusOneWithGuest: "+1 Guest",
    guestNameLabel: "Guest Full Name",
    guestNamePlaceholder: "Full name of your guest",
    dietaryOrMessageLabel: "Joyful Wishes for the Couple",
    dietaryOrMessagePlaceholder: "A personal message or note for the newlyweds (optional)...",
    wishesSectionTitle: "Heartfelt Wishes for the Couple",
    wishesSectionSubtitle: "Select a joyful wish to accompany your RSVP:",
    wish1: "💍 A marriage filled with endless love, peace, and boundless joy!",
    wish2: "🕊️ May your home be blessed with prosperity, harmony, and divine grace.",
    wish3: "🌟 A wonderful life together filled with adventures and fulfilled dreams!",
    wish4: "🥂 May your love grow stronger with each passing day, hand in hand.",
    wish5: "🤍 Radiant happiness, everlasting companionship, and sweet serenity.",
    wishCustom: "✍️ Personalized wish (write your own message)",
    wishCustomTitle: "Personalized wish",
    customWishPlaceholder: "Write your warm wishes or personal note for Delchere & Ihechukwu...",
    customWishLimit: "Limited to 250 characters",
    customWishCounter: "characters",
    customWishRequired: "Please enter your custom wish",
    securityBadge: "Secure",
    rsvpSuccessWishLabel: "Your warm wish",
    submitRsvpButton: "Confirm My Reservation",
    submittingRsvp: "Submitting...",
    rsvpSuccessTitle: "Thank you so much!",
    rsvpSuccessYes: "Your attendance has been confirmed. We can't wait to celebrate this special day with you!",
    rsvpSuccessMaybe: "Your response has been saved. We truly hope you will be able to join us!",
    rsvpSuccessNo: "Your response has been noted. You will be in our thoughts on this special day.",
    rsvpEditButton: "Edit my response",
    optional: "optional",
    menu: 'Navigation',
    photoPlaceholder: 'Individual photo or AI montage to add',
  },
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('fr')
  const t = (key: string): string => translations[locale][key] || key

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}