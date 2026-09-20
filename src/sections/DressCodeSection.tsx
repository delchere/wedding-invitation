import React, { FC } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useLocale } from '@/context/locale-context'

const SWATCHES = [
  { className: 'dress__swatch--ivory', labelKey: 'dressColorIvory' },
  { className: 'dress__swatch--gold', labelKey: 'dressColorGold' },
  { className: 'dress__swatch--sage', labelKey: 'dressColorSage' },
] as const

const DressCodeSection: FC = () => {
  const { t } = useLocale()

  return (
    <section id="dress-code" className="section section--dress" aria-labelledby="dress-title">
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">04 / {t('dress')}</p>
          <h2 id="dress-title" className="section__title">
            {t('dress')}
          </h2>
          <p className="section__lead">{t('dressCodeSubtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ul className="dress__swatches" aria-label={t('dressCodeSwatchesLabel')}>
            {SWATCHES.map(({ className, labelKey }) => (
              <li key={labelKey}>
                <span className={`dress__swatch ${className}`} title={t(labelKey)}>
                  {t(labelKey)}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="dress__text card">
            <p>{t('dressText')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default DressCodeSection
