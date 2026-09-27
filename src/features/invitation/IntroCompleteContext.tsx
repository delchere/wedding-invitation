import React, { createContext, FC, ReactNode, useContext } from 'react'

const IntroCompleteContext = createContext(false)

export const IntroCompleteProvider: FC<{ complete: boolean; children: ReactNode }> = ({
  complete,
  children,
}) => <IntroCompleteContext.Provider value={complete}>{children}</IntroCompleteContext.Provider>

export const useIntroComplete = (): boolean => useContext(IntroCompleteContext)
