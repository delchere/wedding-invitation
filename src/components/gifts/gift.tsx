import React, { FC } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Gift } from '@/interfaces/gifts'
import theme from '@/config/theme'

type SingleGiftsProps = {
  gift: Gift
}

const SingleGift: FC<SingleGiftsProps> = ({ gift }: SingleGiftsProps) => {
  return (
    <>
      <Card
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CardActionArea
          data-fillout-id={`${process.env.NEXT_PUBLIC_FILLOUT_GIFT_ID}?id=${gift.id}`}
          data-fillout-embed-type="popup"
          data-fillout-inherit-parameters
          data-id={gift.id}
        >
          <CardMedia component="img" height="200" image={gift.picture} alt={gift.name} />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" color="secondary.contrastText">
              {gift.name}
            </Typography>
            <Typography variant="h5" color="secondary.contrastText">
              ${gift.cost}
            </Typography>
            <Typography variant="body2" color="secondary.contrastText">
              {gift.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default SingleGift
