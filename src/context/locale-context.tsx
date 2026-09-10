import React, { createContext, FC, ReactNode, useContext, useState } from 'react'

export type Locale = 'fr' | 'en'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    academy: 'The Academy of Life',
    thesis: 'The Thesis of Love',
    invitation: 'Nous avons le plaisir de vous inviter à soutenir',
    ceremony: 'la soutenance de notre thèse de vie à deux',
    story: 'Notre histoire',
    readMore: 'Lire plus',
    readLess: 'Lire moins',
    storyText: `Parfois, ce qui semble n’être qu’un épisode dans une vie devient, avec le temps, le début d’un tout autre récit.

En 2022, nos chemins se sont croisés à AIMS Cameroon, dans un cadre consacré à la recherche et aux sciences. À ce moment-là, rien ne laissait présager que cette rencontre deviendrait le début de l’histoire que nous écrivons aujourd’hui.

Après cette période, les échanges ont continué. D’abord autour du travail, de la recherche et des projets, puis progressivement autour de bien plus que cela. Les conversations sont devenues plus personnelles, les appels plus fréquents, et nous avons commencé à nous découvrir autrement.

Sans vraiment nous en rendre compte, le respect s’est transformé en confiance, la confiance en amitié, et l’amitié en complicité. Puis, lorsque la complicité a commencé à laisser place à l’attirance, une question s’est naturellement imposée :
Et si cette histoire était en train de devenir autre chose ?

Nos réalités, nos cultures étaient différentes, et la distance faisait encore partie de l’équation.

Au fil du temps, nous avons découvert que ce qui nous rapprochait allait bien au-delà de l’attirance. La famille, le respect, la foi, le travail, l’ambition, et le désir de nous soutenir dans nos projets étaient autant de valeurs que nous partagions.

L’équation commençait à prendre forme.

Puis est arrivée la rencontre en personne.
Ce moment n’a pas créé quelque chose qui n’existait pas encore.
Il a donné une réalité à quelque chose qui avait déjà grandi entre nous.

À partir de là, il ne s’agissait plus seulement de comprendre ce que nous ressentions, mais de décider ce que nous voulions en faire.
Nous avons choisi de nous engager l’un envers l’autre et de construire une vie qui nous ressemble.

Notre histoire n’est peut-être pas l’équation la plus simple. Mais elle est, sans aucun doute, l’une des plus belles que la vie ait mise sur notre chemin.

Et après toutes ces étapes, une seule variable est devenue certaine :
NOUS.

Et parce qu’une belle histoire mérite d’être racontée jusqu’au bout, nous gardons encore quelques chapitres pour vous…
La suite, le jour du mariage.`,
    wedding: 'Le grand jour',
    weddingText: 'Nous vous attendons le samedi 9 janvier 2027 pour partager notre mariage religieux, puis célébrer ensemble lors de la réception. Les informations concernant la réception seront communiquées prochainement.',
    whiteWedding: 'Cérémonie à l’église',
    reception: 'Réception',
    ceremonyDate: 'Samedi 9 janvier 2027',
    ceremonyLocation: 'Nigéria, Umuahia, Abia State',
    receptionDate: 'Samedi 9 janvier 2027 · 14h00',
    receptionLocation: 'Nigéria, Umuahia, Abia State',
    dress: 'Dress code',
    dressText: `Chaque couleur de cette palette (« The Thesis of Love ») incarne une dimension symbolique du parcours du couple :

Ivoire (Ivory) : Symbole de douceur, de pureté et de renouveau. Il représente le début d'un nouveau chapitre et la page blanche sur laquelle s'écrit l'histoire.

Or Champagne (Champagne Gold) : Incarnation de l'excellence, de l'accomplissement et de la découverte. Il célèbre la valeur de tout ce qui a été construit ensemble et la joie de marquer les grandes étapes.

Vert Sauge (Sage Green) : Symbole de vie, de croissance et d'harmonie. Il reflète la simplicité, la chaleur naturelle et l'évolution côte à côte au quotidien.

L'association de ces trois nuances crée un thème axé sur l'élégance, la nature, le savoir et l'amour intemporel.`,
    gifts: 'Cadeaux & contact',
    giftsTitle: 'Cadeaux',
    giftsText: 'Votre présence et vos prières sont notre plus beau cadeau. Si vous souhaitez nous offrir quelque chose, les informations seront ajoutées ici prochainement.',
    contactTitle: 'Contact',
    contactText: 'Pour toute question concernant la cérémonie ou la réception, les coordonnées seront ajoutées ici prochainement.',
    rsvp: 'RSVP',
    rsvpText: 'Merci de confirmer votre présence afin de nous aider à préparer cette célébration.',
    name: 'Votre nom',
    attending: 'Je serai présent(e)',
    notAttending: 'Je ne pourrai pas venir',
    submit: 'Envoyer ma réponse',
    submitted: 'Votre messagerie va s’ouvrir avec votre réponse prête à être envoyée.',
    menu: 'Navigation',
    photoPlaceholder: 'Photo individuelle ou montage IA à ajouter',
  },
  en: {
    academy: 'The Academy of Life',
    thesis: 'The Thesis of Love',
    invitation: 'We are delighted to invite you to defend',
    ceremony: 'the thesis of our life together',
    story: 'Our story',
    readMore: 'Read more',
    readLess: 'Read less',
    storyText: `Sometimes, what seems like just one chapter in a life becomes, over time, the beginning of an entirely different story.

In 2022, our paths crossed at AIMS Cameroon, in an environment devoted to research and science. At the time, nothing suggested that this meeting would become the beginning of the story we are writing today.

After that period, our conversations continued. At first, they centred on work, research and projects, then gradually became about so much more. Our conversations became more personal, our calls more frequent, and we began to discover one another in a different way.

Without really noticing, respect became trust, trust became friendship, and friendship became a deep connection. Then, as that connection began to make room for attraction, a question naturally arose:
What if this story was becoming something more?

Our backgrounds and cultures were different, and distance was still part of the equation.

Over time, we discovered that what brought us closer went far beyond attraction. Family, respect, faith, work, ambition and the desire to support one another in our dreams were values we shared.

The equation was beginning to take shape.

Then came the moment when we met in person.
That moment did not create something that had not existed before.
It gave reality to something that had already grown between us.

From then on, it was no longer only about understanding what we felt, but deciding what we wanted to do with it.
We chose to commit to one another and build a life that reflects who we are.

Our story may not be the simplest equation. But it is, without a doubt, one of the most beautiful that life has placed in our path.

And after every one of these steps, one variable became certain:
US.

Because a beautiful story deserves to be told to the very end, we are still keeping a few chapters for you...
The next chapter will be written on our wedding day.`,
    wedding: 'The wedding day',
    weddingText: 'Join us on Saturday, January 9, 2027 to share in our religious wedding ceremony, then celebrate together at the reception. Reception details will be shared soon.',
    whiteWedding: 'Church ceremony',
    reception: 'Reception',
    ceremonyDate: 'Saturday, January 9, 2027',
    ceremonyLocation: 'Nigeria, Umuahia, Abia State',
    receptionDate: 'Saturday, January 9, 2027 · 2:00 PM',
    receptionLocation: 'Nigeria, Umuahia, Abia State',
    dress: 'Dress code',
    dressText: `Each colour in this palette ("The Thesis of Love") reflects a symbolic dimension of the couple's journey:

Ivory: A symbol of softness, purity and renewal. It represents the beginning of a new chapter and the blank page on which the story is written.

Champagne Gold: A celebration of excellence, achievement and discovery. It honours everything that has been built together and the joy of marking life’s great milestones.

Sage Green: A symbol of life, growth and harmony. It reflects simplicity, natural warmth and the journey of growing side by side each day.

Together, these three shades create a theme rooted in elegance, nature, wisdom and timeless love.`,
    gifts: 'Gifts & contact',
    giftsTitle: 'Gifts',
    giftsText: 'Your presence and prayers are our greatest gift. If you would like to give us something, the details will be added here soon.',
    contactTitle: 'Contact',
    contactText: 'For any questions about the ceremony or reception, contact details will be added here soon.',
    rsvp: 'RSVP',
    rsvpText: 'Please confirm your attendance so we can prepare this celebration.',
    name: 'Your name',
    attending: 'I will attend',
    notAttending: 'I cannot attend',
    submit: 'Send my response',
    submitted: 'Your email application will open with your RSVP ready to send.',
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
