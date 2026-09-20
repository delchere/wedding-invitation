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
    heroTitle: 'The Thesis of Love',
    heroDate: 'Samedi 9 janvier 2027',
    heroEyebrow: 'Nous célébrons notre amour',
    heroTagline: 'Rejoignez-nous pour ce jour unique',
    navHome: 'Accueil',
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
    thesis: 'The Thesis of Love',
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
    storyChapterPrefix: 'CHAPITRE',
    storyChapter01Title: '2022',
    storyChapter02Title: 'CONNEXION',
    storyChapter03Title: 'DÉCOUVERTE',
    storyChapter04Title: 'LES VARIABLES',
    storyChapter05Title: 'LA RENCONTRE',
    storyChapter06Title: 'LE CHOIX',
    storyFinalWord: 'NOUS',
    storyBridgeLabel: 'Le grand jour',
    storyReadMore: 'Lire la suite',
    storyReadLess: 'Replier',
    storyIntro:
      'Parfois, ce qui semble n’être qu’un épisode dans une vie devient, avec le temps, le début d’un tout autre récit.',
    storyChapter01:
      'En 2022, nos chemins se sont croisés à AIMS Cameroon, dans un cadre consacré à la recherche et aux sciences. À ce moment-là, rien ne laissait présager que cette rencontre deviendrait le début de l’histoire que nous écrivons aujourd’hui.',
    storyChapter02:
      'Après cette période, les échanges ont continué. D’abord autour du travail, de la recherche et des projets, puis progressivement autour de bien plus que cela. Les conversations sont devenues plus personnelles, les appels plus fréquents, et nous avons commencé à nous découvrir autrement.',
    storyChapter03: `Sans vraiment nous en rendre compte, le respect s’est transformé en confiance, la confiance en amitié, et l’amitié en complicité. Puis, lorsque la complicité a commencé à laisser place à l’attirance, une question s’est naturellement imposée :
Et si cette histoire était en train de devenir autre chose ?`,
    storyChapter04a:
      'Nos réalités, nos cultures étaient différentes, et la distance faisait encore partie de l’équation.',
    storyChapter04b:
      'Au fil du temps, nous avons découvert que ce qui nous rapprochait allait bien au-delà de l’attirance. La famille, le respect, la foi, le travail, l’ambition, et le désir de nous soutenir dans nos projets étaient autant de valeurs que nous partagions.',
    storyChapter04c: 'L’équation commençait à prendre forme.',
    storyChapter05: `Puis est arrivée la rencontre en personne.
Ce moment n’a pas créé quelque chose qui n’existait pas encore.
Il a donné une réalité à quelque chose qui avait déjà grandi entre nous.`,
    storyChapter06: `À partir de là, il ne s’agissait plus seulement de comprendre ce que nous ressentions, mais de décider ce que nous voulions en faire.
Nous avons choisi de nous engager l’un envers l’autre et de construire une vie qui nous ressemble.`,
    storyEpilogue:
      'Notre histoire n’est peut-être pas l’équation la plus simple. Mais elle est, sans aucun doute, l’une des plus belles que la vie ait mise sur notre chemin.',
    storyFinalVariable: `Et après toutes ces étapes, une seule variable est devenue certaine :
NOUS.`,
    storyClosing: `Et parce qu’une belle histoire mérite d’être racontée jusqu’au bout, nous gardons encore quelques chapitres pour vous…
La suite, le jour du mariage.`,
    wedding: 'Le grand jour',
    weddingText: 'Nous vous attendons le samedi 9 janvier 2027 pour partager notre mariage religieux, puis célébrer ensemble lors de la réception.',
    weddingCountdownTitle: 'Le grand jour approche',
    weddingDays: 'Jours',
    weddingHours: 'Heures',
    weddingMinutes: 'Minutes',
    weddingSeconds: 'Secondes',
    weddingCountdownComplete: 'C’est le grand jour !',
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
    name: 'Votre nom',
    attending: 'Je serai présent(e)',
    notAttending: 'Je ne pourrai pas venir',
    submit: 'Envoyer ma réponse',
    submitted: 'Un nouvel onglet va s’ouvrir : merci de confirmer votre réponse dans le formulaire.',    menu: 'Navigation',
    photoPlaceholder: 'Photo individuelle ou montage IA à ajouter',
  },
  en: {
    youAreInvited: 'You are invited',
    tapToOpen: 'Tap to open',
    cardTogetherFamilies: 'Together with their families',
    cardRequestPleasure: 'request the pleasure of your company',
    scrollToDiscover: 'Scroll to discover',
    cardAriaLabel: 'Wedding invitation card',
    heroTitle: 'THE THESIS OF LOVE',
    heroEyebrow: 'We celebrate our love',
    heroTagline: 'Join us for this special day',
    navHome: 'Home',
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
    thesis: 'The Thesis of Love',
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
    storyChapterPrefix: 'CHAPTER',
    storyChapter01Title: '2022',
    storyChapter02Title: 'CONNECTION',
    storyChapter03Title: 'DISCOVERY',
    storyChapter04Title: 'THE VARIABLES',
    storyChapter05Title: 'THE MEETING',
    storyChapter06Title: 'THE CHOICE',
    storyFinalWord: 'US',
    storyBridgeLabel: 'The wedding day',
    storyReadMore: 'Read more',
    storyReadLess: 'Show less',
    storyIntro:
      'Sometimes, what seems like just one chapter in a life becomes, over time, the beginning of an entirely different story.',
    storyChapter01:
      'In 2022, our paths crossed at AIMS Cameroon, in an environment devoted to research and science. At the time, nothing suggested that this meeting would become the beginning of the story we are writing today.',
    storyChapter02:
      'After that period, our conversations continued. At first, they centred on work, research and projects, then gradually became about so much more. Our conversations became more personal, our calls more frequent, and we began to discover one another in a different way.',
    storyChapter03: `Without really noticing, respect became trust, trust became friendship, and friendship became a deep connection. Then, as that connection began to make room for attraction, a question naturally arose:
What if this story was becoming something more?`,
    storyChapter04a:
      'Our backgrounds and cultures were different, and distance was still part of the equation.',
    storyChapter04b:
      'Over time, we discovered that what brought us closer went far beyond attraction. Family, respect, faith, work, ambition and the desire to support one another in our dreams were values we shared.',
    storyChapter04c: 'The equation was beginning to take shape.',
    storyChapter05: `Then came the moment when we met in person.
That moment did not create something that had not existed before.
It gave reality to something that had already grown between us.`,
    storyChapter06: `From then on, it was no longer only about understanding what we felt, but deciding what we wanted to do with it.
We chose to commit to one another and build a life that reflects who we are.`,
    storyEpilogue:
      'Our story may not be the simplest equation. But it is, without a doubt, one of the most beautiful that life has placed in our path.',
    storyFinalVariable: `And after every one of these steps, one variable became certain:
US.`,
    storyClosing: `Because a beautiful story deserves to be told to the very end, we are still keeping a few chapters for you...
The next chapter will be written on our wedding day.`,
    wedding: 'The wedding day',
    weddingText: 'Join us on Saturday, January 9, 2027 to share in our religious wedding ceremony, then celebrate together at the reception.',
    weddingCountdownTitle: 'The big day is approaching',
    weddingDays: 'Days',
    weddingHours: 'Hours',
    weddingMinutes: 'Minutes',
    weddingSeconds: 'Seconds',
    weddingCountdownComplete: 'It’s the big day!',
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
    name: 'Your name',
    attending: 'I will attend',
    notAttending: 'I cannot attend',
    submit: 'Send my response',
    submitted: 'A new tab will open — please confirm your response in the form.',    menu: 'Navigation',
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