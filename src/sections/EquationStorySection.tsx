import React, { FC, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useLocale } from '@/context/locale-context'
import EquationVisual from './story/EquationVisual'
import { STORY_CHAPTERS } from './story/storyChapterConfig'

const INITIAL_CHAPTER_COUNT = 2

const EquationStorySection: FC = () => {
  const { t } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const hiddenStartRef = useRef<HTMLDivElement>(null)
  const [visualProgress, setVisualProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const visibleChapters = STORY_CHAPTERS.slice(0, INITIAL_CHAPTER_COUNT)
  const hiddenChapters = STORY_CHAPTERS.slice(INITIAL_CHAPTER_COUNT)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setVisualProgress(value)
  })

  const vizOpacity = useTransform(scrollYProgress, [0, 0.05], [0.55, 1])
  const captionOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1])

  const handleExpand = () => {
    setExpanded(true)
    if (prefersReducedMotion) return
    requestAnimationFrame(() => {
      hiddenStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCollapse = () => {
    setExpanded(false)
    sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section
      id="story"
      ref={sectionRef}
      className={`equation-story${expanded ? '' : ' equation-story--collapsed'}`}
      aria-labelledby="equation-story-title"
    >
      <div className="equation-story__layout">
        <div className="equation-story__viz-column">
          <div className="equation-story__viz-sticky">
            <motion.div className="equation-story__viz-inner" style={{ opacity: vizOpacity }}>
              <p className="equation-story__theme">{t('storyEquationTitle')}</p>
              <EquationVisual progress={visualProgress} finalWord={t('storyFinalWord')} />
              <motion.p className="equation-story__viz-caption" style={{ opacity: captionOpacity }}>
                {t('storyFinalWord')}
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="equation-story__narrative">
          <header className="equation-story__header">
            <p className="equation-story__eyebrow">01 / {t('story')}</p>
            <h2 id="equation-story-title" className="equation-story__title">
              {t('story')}
            </h2>
          </header>

          {visibleChapters.map((chapter) => (
            <StoryChapterBlock
              key={chapter.id}
              chapter={chapter}
              t={t}
              reducedMotion={prefersReducedMotion ?? false}
              instantReveal={!expanded}
            />
          ))}

          {!expanded && (
            <div className="equation-story__read-more-wrap">
              <button
                type="button"
                className="equation-story__read-more"
                onClick={handleExpand}
                aria-expanded={false}
                aria-controls="equation-story-rest"
              >
                <span className="equation-story__read-more-line" aria-hidden="true" />
                <span className="equation-story__read-more-label">{t('storyReadMore')}</span>
                <span className="equation-story__read-more-chevron" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="equation-story__read-more-line" aria-hidden="true" />
              </button>
            </div>
          )}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="equation-story-rest"
                ref={hiddenStartRef}
                className="equation-story__rest"
                initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {hiddenChapters.map((chapter) => (
                  <StoryChapterBlock
                    key={chapter.id}
                    chapter={chapter}
                    t={t}
                    reducedMotion={prefersReducedMotion ?? false}
                  />
                ))}

                <div className="equation-story__read-more-wrap equation-story__read-more-wrap--less">
                  <button
                    type="button"
                    className="equation-story__read-more equation-story__read-more--less"
                    onClick={handleCollapse}
                    aria-expanded={true}
                    aria-controls="equation-story-rest"
                  >
                    <span className="equation-story__read-more-line" aria-hidden="true" />
                    <span className="equation-story__read-more-label">{t('storyReadLess')}</span>
                    <span className="equation-story__read-more-chevron equation-story__read-more-chevron--up" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="equation-story__read-more-line" aria-hidden="true" />
                  </button>
                </div>

                <div className="equation-story__bridge">
                  <span className="equation-story__bridge-line" aria-hidden="true" />
                  <a href="#wedding" className="equation-story__bridge-link">
                    {t('storyBridgeLabel')}
                  </a>
                  <span className="equation-story__bridge-line" aria-hidden="true" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

type StoryChapterBlockProps = {
  chapter: (typeof STORY_CHAPTERS)[number]
  t: (key: string) => string
  reducedMotion: boolean
  instantReveal?: boolean
}

const CHAPTER_NUMBERS: Record<string, string> = {
  ch01: '01',
  ch02: '02',
  ch03: '03',
  ch04: '04',
  ch05: '05',
  ch06: '06',
}

const StoryChapterBlock: FC<StoryChapterBlockProps> = ({ chapter, t, reducedMotion, instantReveal }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 40%'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], instantReveal || reducedMotion ? [1, 1, 1] : [0.12, 1, 1])
  const y = useTransform(scrollYProgress, [0, 1], instantReveal || reducedMotion ? [0, 0] : [22, 0])

  const chapterNum = CHAPTER_NUMBERS[chapter.id]

  return (
    <motion.article
      ref={ref}
      className={`equation-story__chapter equation-story__chapter--${chapter.id}`}
      style={{ opacity, y }}
    >
      {chapter.titleKey && chapterNum && (
        <p className="equation-story__chapter-label">
          {t('storyChapterPrefix')} {chapterNum} — {t(chapter.titleKey)}
        </p>
      )}
      {chapter.bodyKeys.map((key) => (
        <p key={key} className="equation-story__paragraph">
          {t(key)}
        </p>
      ))}
    </motion.article>
  )
}

export default EquationStorySection
