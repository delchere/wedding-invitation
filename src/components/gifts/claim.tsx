import React, { FC, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { Gift, GiftStatus } from '@/interfaces/gifts'
import SingleGift from './gift'

type GiftsHeroProps = {
  gifts: Gift[]
}

const GiftsClaim: FC<GiftsHeroProps> = ({ gifts }: GiftsHeroProps) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Box id="hero" sx={{ backgroundColor: 'background.paper', py: 5 }}>
      <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        {gifts
          .filter((gift) => gift.status !== GiftStatus.Claimed)
          .map((gift, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <SingleGift key={gift.name} gift={gift} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default GiftsClaim
