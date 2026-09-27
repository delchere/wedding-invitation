import React, { FC, useState } from 'react'
import { Box, Container, TextField, Typography } from '@mui/material'
import { StyledButton } from '../styled-button'
import { PASSWORD_KEY, getPassword } from '@/utils/password'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import weddingConfig from '@/config/wedding.config'

const Login: FC = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const router = useRouter()

  const handleChange = (value: string): void => {
    setPassword(value)
    setError(undefined)
  }

  const handleLogin = (): void => {
    if (password === getPassword()) {
      Cookies.set(PASSWORD_KEY, password, {
        expires: 7, // 7 days
      })
      router.reload()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <Container
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          color: 'primary.contrastText',
          pb: 2,
          fontSize: { md: 112, sm: 72, xs: 54 },
          fontFamily: '"Dancing Script", cursive;',
        }}
      >
        {weddingConfig.people.groom.firstName} & {weddingConfig.people.bride.firstName}
      </Typography>
      <Typography variant="h2" textAlign="center" sx={{ color: 'primary.contrastText', pb: 2 }}>
        Please Login Below
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '100%', sm: 500 },
        }}
      >
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <TextField
          type="password"
          placeholder="Password"
          hiddenLabel
          variant="outlined"
          value={password}
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        />
        <StyledButton variant="contained" color="primary" size="xlarge" onClick={handleLogin}>
          Login
        </StyledButton>
      </Box>
    </Container>
  )
}

export default Login
