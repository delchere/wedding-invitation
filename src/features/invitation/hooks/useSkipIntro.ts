import { useState } from 'react'

const readShouldSkipIntro = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export type UseSkipIntroReturn = {
  shouldSkipIntro: boolean
}

export const useSkipIntro = (): UseSkipIntroReturn => {
  const [shouldSkipIntro] = useState(readShouldSkipIntro)
  return { shouldSkipIntro }
}
