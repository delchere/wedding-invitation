import React, { FC, useCallback, useState } from 'react'
import LanguageToggle from '@/components/language-toggle'
import { useLocale } from '@/context/locale-context'

const NAV_ITEMS = [
  { id: 'home', labelKey: 'navHome' },
  { id: 'story', labelKey: 'navStory' },
  { id: 'countdown', labelKey: 'navCountdown' },
  { id: 'program', labelKey: 'navProgram' },
  { id: 'dress-code', labelKey: 'navDress' },
  { id: 'reserve', labelKey: 'navReserve' },
] as const

const SiteNav: FC = () => {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  const closeMenu = useCallback(() => setOpen(false), [])

  const handleNavClick = (): void => {
    closeMenu()
  }

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a href="#home" className="site-nav__brand" onClick={handleNavClick}>
          D × I
        </a>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          aria-label={open ? t('navClose') : t('navOpen')}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav-menu" className={`site-nav__menu${open ? ' site-nav__menu--open' : ''}`} aria-label={t('menu')}>
          <ul className="site-nav__list">
            {NAV_ITEMS.map(({ id, labelKey }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={handleNavClick}>
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  )
}

export default SiteNav
