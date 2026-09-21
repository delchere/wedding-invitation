import React, { FC, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import { STORY_CHAPTERS } from './story/storyChapterConfig'

const INITIAL_CHAPTER_COUNT = 2

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
          {t(key)}
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
          <p className="section__lead">{t('storyIntro')}</p>
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
