import React, { useEffect } from 'react'
import { GiftsClaim, GiftsHero } from '@/components/gifts'
import { NextPage } from 'next'
import { Gift } from '@/interfaces/gifts'
import { getGiftsFromAirtable } from '@/utils/airtable'
import { Box, CircularProgress } from '@mui/material'
import { GiftClaim as GiftClaimDisclaimer } from '@/components/home/faqItems'

type HomePageProps = {
  gifts: Gift[]
}

const Home: NextPage<HomePageProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [giftsData, setGiftsData] = React.useState<Gift[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      getGiftsFromAirtable()
        .then((gifts) => {
          setGiftsData(gifts)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    fetchData()
  }, [])

  return (
    <>
      <GiftsHero />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 10 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <GiftsClaim gifts={giftsData} />
      )}
      <Box sx={{ my: 3 }}>
        <GiftClaimDisclaimer />
      </Box>
    </>
  )
}

export default Home
