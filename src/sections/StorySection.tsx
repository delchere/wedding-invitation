import React, { FC, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import { STORY_CHAPTERS } from './story/storyChapterConfig'

const INITIAL_CHAPTER_COUNT = 2

const LEAD_PHRASES: readonly string[] = [
  // French
  'Parfois,',
  'En 2022,',
  'Après ce chapitre à AIMS,',
  'Après ce chapitre,',
  'Quelque part sur ce chemin,',
  'Il y avait, bien sûr,',
  'Mais ce qui est fascinant avec l’amour,',
  'Mais ce qui est fascinant avec l\'amour,',
  'Lentement,',
  'Puis est arrivé le moment',
  'Et nous nous sommes choisis.',
  'Nous avons choisi',
  'Et c’est peut-être là',
  'Et c\'est peut-être là',
  'Nous voici donc aujourd’hui,',
  'Nous voici donc aujourd\'hui,',
  'Et parce que chaque belle histoire',
  'Et cette fois,',
  // English
  'Sometimes,',
  'In 2022,',
  'After that chapter at AIMS,',
  'After that chapter,',
  'Somewhere along the way,',
  'There was, of course,',
  'But the funny thing about love',
  'Slowly,',
  'Then came the moment',
  'And we chose each other.',
  'We chose to',
  'We chose',
  'And perhaps that is',
  'So here we are,',
  'And because every beautiful story',
  'And this time,',
]

const KEYWORD_PATTERN =
  /(AIMS Cameroon|l[’']amour|amour|l[’']équation|the equation|notre histoire|our story|notre mariage|our wedding day|wedding day|nous nous sommes choisis|chose each other|amitié|friendship|confiance|trust|famille|family|la foi|foi|faith|le respect|respect|ensemble|together|love|:\s*nous\b|:\s*us\b)/gi

const KEYWORD_CHECK =
  /^(AIMS Cameroon|l[’']amour|amour|l[’']équation|the equation|notre histoire|our story|notre mariage|our wedding day|wedding day|nous nous sommes choisis|chose each other|amitié|friendship|confiance|trust|famille|family|la foi|foi|faith|le respect|respect|ensemble|together|love|:\s*nous|:\s*us)$/i

const highlightKeywords = (text: string, baseKey: string): React.ReactNode => {
  if (!text) return null
  const parts = text.split(KEYWORD_PATTERN)

  return parts.map((part, idx) => {
    if (!part) return null
    if (KEYWORD_CHECK.test(part)) {
      return (
        <span key={`${baseKey}-kw-${idx}`} className="story__keyword">
          {part}
        </span>
      )
    }
    return <React.Fragment key={`${baseKey}-tx-${idx}`}>{part}</React.Fragment>
  })
}

const formatStoryParagraph = (rawText: string, baseKey: string): React.ReactNode => {
  const lines = rawText.split('\n').filter((l) => l.trim().length > 0)

  return lines.map((line, lineIdx) => {
    let lead = ''
    let remainder = line

    const matchedLead = LEAD_PHRASES.find((p) => line.startsWith(p))
    if (matchedLead) {
      lead = matchedLead
      remainder = line.slice(matchedLead.length)
    } else {
      const commaPos = line.indexOf(',')
      if (commaPos > 0 && commaPos <= 28) {
        lead = line.slice(0, commaPos + 1)
        remainder = line.slice(commaPos + 1)
      } else {
        const words = line.split(' ')
        if (words.length > 2) {
          lead = words.slice(0, 2).join(' ')
          remainder = line.slice(lead.length)
        } else {
          lead = line
          remainder = ''
        }
      }
    }

    return (
      <span key={`${baseKey}-line-${lineIdx}`} className="story__paragraph-block">
        <span className="story__lead-phrase">{lead}</span>
        {highlightKeywords(remainder, `${baseKey}-${lineIdx}`)}
      </span>
    )
  })
}

const StorySection: FC = () => {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  const visibleChapters = STORY_CHAPTERS.slice(0, INITIAL_CHAPTER_COUNT)
  const hiddenChapters = STORY_CHAPTERS.slice(INITIAL_CHAPTER_COUNT)

  const renderChapter = (chapter: (typeof STORY_CHAPTERS)[number]): React.ReactNode => (
    <div key={chapter.id} className="story__chapter">
      {chapter.bodyKeys.map((key) => (
        <p key={key} className="story__paragraph">
          {formatStoryParagraph(t(key), key)}
        </p>
      ))}
    </div>
  )

  return (
    <section id="story" className="section section--story" aria-labelledby="story-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">01 / {t('story')}</p>
          <h2 id="story-title" className="section__title">
            {t('story')}
          </h2>
          <p className="section__lead">{formatStoryParagraph(t('storyIntro'), 'intro')}</p>
        </ScrollReveal>

        <div className="story__body">
          {visibleChapters.slice(1).map(renderChapter)}

          {!expanded && (
            <button type="button" className="story__read-more" onClick={() => setExpanded(true)} aria-expanded={false}>
              {t('storyReadMore')}
            </button>
          )}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                className="story__rest"
                initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {hiddenChapters.map(renderChapter)}
                <button
                  type="button"
                  className="story__read-more story__read-more--less"
                  onClick={() => setExpanded(false)}
                  aria-expanded={true}
                >
                  {t('storyReadLess')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default StorySection
