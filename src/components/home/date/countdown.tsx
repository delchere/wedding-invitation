import React, { FC } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { Box, Typography } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { getWeddingDate } from '@/utils/date'

const CustomCountdown: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('sm'))

  const renderer = (props: CountdownRenderProps): React.ReactNode => {
    const { days, hours, minutes, seconds, completed } = props

    if (completed) {
      return <Typography variant="h1">Its the big day!</Typography>
    }
    return (
      <>
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <Typography
            variant={matchMobileView ? 'h3' : 'h1'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            {days}
          </Typography>
          <Typography
            variant={matchMobileView ? 'h3' : 'h1'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            {hours}
          </Typography>
          <Typography
            variant={matchMobileView ? 'h3' : 'h1'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            {minutes}
          </Typography>
          <Typography
            variant={matchMobileView ? 'h3' : 'h1'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            {seconds}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <Typography
            variant={matchMobileView ? 'h5' : 'h4'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            Days
          </Typography>
          <Typography
            variant={matchMobileView ? 'h5' : 'h4'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            Hours
          </Typography>
          <Typography
            variant={matchMobileView ? 'h5' : 'h4'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            Minutes
          </Typography>
          <Typography
            variant={matchMobileView ? 'h5' : 'h4'}
            align="center"
            color="primary.dark"
            sx={{ width: { xs: 75, sm: 90, md: 100 } }}
          >
            Seconds
          </Typography>
        </Box>
      </>
    )
  }

  return <Countdown date={getWeddingDate()} renderer={renderer} />
}

export default CustomCountdown
