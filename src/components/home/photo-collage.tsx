import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { useLocale } from '@/context/locale-context'

type PhotoCollageProps = {
  bridePhoto?: string
  groomPhoto?: string
  couplePhoto?: string
}

const PhotoCollage: FC<PhotoCollageProps> = ({ bridePhoto, groomPhoto, couplePhoto }) => {
  const { t } = useLocale()
  const photoStyle = (source?: string): React.CSSProperties | undefined =>
    source ? { backgroundImage: `url(${source})`, backgroundPosition: 'center', backgroundSize: 'cover' } : undefined

  return (
    <Box className="photo-collage" aria-label={t('photoPlaceholder')}>
      <Box className="photo-collage__slot photo-collage__slot--large" style={photoStyle(couplePhoto)}>
        <Typography>{t('photoPlaceholder')}</Typography>
      </Box>
      <Box className="photo-collage__slot photo-collage__slot--small photo-collage__slot--sage" style={photoStyle(bridePhoto)}>
        <Typography>Delchère</Typography>
      </Box>
      <Box className="photo-collage__slot photo-collage__slot--small photo-collage__slot--gold" style={photoStyle(groomPhoto)}>
        <Typography>Ihechukwu</Typography>
      </Box>
    </Box>
  )
}

export default PhotoCollage
