import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { formatDate, getWeddingDate } from '@/utils/date'
import weddingConfig from '@/config/wedding.config'
import CustomCountdown from './countdown'

const HomeCountdown: FC = () => {
  return (
    <Box id="home-countdown" sx={{ pt: { xs: 4, md: 8 }, backgroundColor: 'background.paper' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: { xs: 'sm', md: '855px' },
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Typography variant="h2" color="primary" align="center" sx={{ mb: 1, fontSize: { md: '32px' } }}>
            When is the wedding?
          </Typography>
          <Typography variant="h3" color="primary.dark" align="center" sx={{ mb: 1 }}>
            {formatDate(getWeddingDate())}
          </Typography>
          <Typography variant="body1" color="primary.dark" align="center" sx={{ mb: 2 }}>
            Messe à {weddingConfig.date.ceremonyTime} • Réception à {weddingConfig.date.receptionTime}
          </Typography>
          <CustomCountdown />
        </Box>
      </Box>
      <Divider sx={{ width: '50%', mx: 'auto', mt: 3 }} />
    </Box>
  )
}

export default HomeCountdown
