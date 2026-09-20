import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'
import { useLocale } from '@/context/locale-context'

const SiteFooter: FC = () => {
  const { t } = useLocale()
  const { bride, groom } = weddingConfig.people
  const year = new Date(weddingConfig.date.date).getFullYear()

  return (
    <footer className="site-footer">
      <p className="site-footer__names">
        {bride.firstName} & {groom.firstName}
      </p>
      <p className="site-footer__date">{t('heroDate')}</p>
      <p className="site-footer__copy">{t('footerCopy').replace('{year}', String(year))}</p>
    </footer>
  )
}

export default SiteFooter
