import React, { FC, useState, useEffect } from 'react'
import { Box } from '@mui/material'

type SplashScreenProps = {
  timeout?: number
  transition?: number
}

const SplashScreen: FC<SplashScreenProps> = ({ timeout, transition }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, timeout || 200)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        backgroundColor: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        transition: `opacity ${transition || 1.5}s ease`,
      }}
    />
  )
}

export default SplashScreen
