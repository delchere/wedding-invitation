import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { StyledButton } from '@/components/styled-button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import weddingConfig from '@/config/wedding.config'

const GiftsHero: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('sm'))
  const matchTabletView = useMediaQuery(breakpoints.down('md'))

  return (
    <Box id="hero" sx={{ backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', height: { xs: '430px', sm: '450px' }, overflow: 'hidden' }}>
        <Box sx={{ minHeight: { xs: 213, md: 355 } }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              opacity: 0.7,
              backgroundColor: 'secondary.dark',
            }}
          />
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            top: matchTabletView ? -200 : -320,
            height: '80%',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            sx={{
              color: 'primary.contrastText',
              pb: { xs: 3, sm: 5, md: 1 },
              fontSize: { md: 100, sm: 80, xs: 58 },
              fontFamily: '"Dancing Script", cursive;',
            }}
          >
            {weddingConfig.people.groom.firstName} & {weddingConfig.people.bride.firstName}
          </Typography>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              color: 'primary.contrastText',
              fontSize: { md: 28, sm: 26, xs: 22 },
            }}
          >
            Thank you for being a part of our special day.
          </Typography>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              color: 'primary.contrastText',
              pb: { xs: 0, sm: 2, md: 0 },
              fontSize: { md: 28, sm: 26, xs: 22 },
            }}
          >
            Click any of the gifts below to claim them.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 3, sm: 5, md: 5 } }}>
            <Link href="/" passHref>
              <a>
                <StyledButton color="dark" size={matchMobileView ? 'xlarge' : 'xlarge'}>
                  Go Back
                </StyledButton>
              </a>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default GiftsHero
