import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'
import DressCodeMannequins from './dress-code/DressCodeMannequins'

const HeartIcon: FC = () => (
  <svg className="dress-code-heart" viewBox="0 0 24 22" aria-hidden="true">
    <path
      d="M12 21 C12 21 1 13.5 1 7 C1 3.5 4 1 7 1 C9.2 1 11 2.2 12 4 C13 2.2 14.8 1 17 1 C20 1 23 3.5 23 7 C23 13.5 12 21 12 21 Z"
      fill="currentColor"
    />
  </svg>
)

const SWATCHES = [
  { className: 'dress-code-swatch--ivory', labelKey: 'dressColorIvory' },
  { className: 'dress-code-swatch--gold', labelKey: 'dressColorGold' },
  { className: 'dress-code-swatch--sage', labelKey: 'dressColorSage' },
] as const

const DressCodeSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="dress-code" className="dress-code-section" aria-labelledby="dress-code-title">
      <div className="dress-code-section__inner">
        <ScrollReveal>
          <p className="dress-code-section__eyebrow">04 / {t('dress')}</p>

          <div className="dress-code-oval">
            <div className="dress-code-oval__border" aria-hidden="true" />

            <div className="dress-code-oval__content">
              <h2 id="dress-code-title" className="dress-code-oval__code">
                {t('dressCodeHeadline')}
              </h2>
              <HeartIcon />
              <p className="dress-code-oval__subtitle">{t('dressCodeSubtitle')}</p>

              <ul className="dress-code-swatches" aria-label={t('dressCodeSwatchesLabel')}>
                {SWATCHES.map(({ className, labelKey }) => (
                  <li key={labelKey}>
                    <span className={`dress-code-swatch ${className}`} title={t(labelKey)}>
                      <span className="dress-code-swatch__label">{t(labelKey)}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <DressCodeMannequins />
            </div>
          </div>

          <div className="dress-code-footer">
            <p className="dress-code-footer__line">{t('dressCodeCtaLine')}</p>
            <p className="dress-code-footer__script">{t('dressCodeCtaScript')}</p>
            <HeartIcon />
          </div>

          <div className="dress-code-details">
            <p className="dress-code-details__text">{t('dressText')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default DressCodeSection
