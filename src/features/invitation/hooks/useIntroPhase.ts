import { useCallback, useState } from 'react'

export type IntroPhase = 'idle' | 'opening' | 'card' | 'complete'

export type UseIntroPhaseReturn = {
  phase: IntroPhase
  openInvitation: () => void
  showCard: () => void
  completeIntro: () => void
}

export const useIntroPhase = (initialPhase: IntroPhase = 'idle'): UseIntroPhaseReturn => {
  const [phase, setPhase] = useState<IntroPhase>(initialPhase)

  const openInvitation = useCallback((): void => {
    setPhase((current) => (current === 'idle' ? 'opening' : current))
  }, [])

  const showCard = useCallback((): void => {
    setPhase((current) => (current === 'opening' ? 'card' : current))
  }, [])

  const completeIntro = useCallback((): void => {
    setPhase('complete')
  }, [])

  return { phase, openInvitation, showCard, completeIntro }
}
