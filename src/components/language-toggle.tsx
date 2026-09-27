import React, { FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useLocale, Locale } from '@/context/locale-context'

const LanguageToggle: FC = () => {
  const { locale, setLocale } = useLocale()

  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: Locale | null): void => {
    if (value) setLocale(value)
  }

  return (
    <ToggleButtonGroup value={locale} exclusive onChange={handleChange} size="small" aria-label="Language">
      <ToggleButton value="fr" aria-label="Français">FR</ToggleButton>
      <ToggleButton value="en" aria-label="English">EN</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default LanguageToggle
