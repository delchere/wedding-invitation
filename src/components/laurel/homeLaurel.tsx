import React from 'react'
import { Box, Icon, useMediaQuery, useTheme } from '@mui/material'

const HomeLaurel: React.FC = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const { breakpoints } = useTheme()
  const matchCustomMobileView = useMediaQuery('@media (max-width:450px)')
  const matchTabletView = useMediaQuery(breakpoints.down('md'))
  const matchDesktopView = useMediaQuery(breakpoints.down('lg'))

  const calcSize = (): string => {
    return '230px'
  }

  const calcLeft = (): string => {
    if (matchTabletView) {
      return '49vw'
    }
    if (matchDesktopView) {
      return '25vw'
    }
    return '300px'
  }

  const calcTop = (): string => {
    if (matchDesktopView) {
      return '240px'
    }
    return '240px'
  }

  return (
    <Box
      sx={{
        display: matchCustomMobileView ? 'none' : 'auto',
        position: 'relative',
        width: 0,
        height: 0,
      }}
    >
      <Icon
        sx={{
          zIndex: 99,
          position: 'absolute',
          top: calcTop(),
          left: calcLeft(),
          textAlign: 'center',
          width: calcSize(),
          height: calcSize(),
          transform: 'rotate(5deg)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="golden laurel" src={`${basePath}/images/laurel/laurel-svgrepo-com.svg`} width={calcSize()} height={calcSize()} />
      </Icon>
    </Box>
  )
}

export default HomeLaurel
