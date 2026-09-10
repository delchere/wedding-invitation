import { generateColorVariations } from '@/utils/colour'
import { PaletteOptions } from '@mui/material'
import colourConfig from '../colour.config'

const primaryPalette = generateColorVariations(colourConfig.primary)
const secondaryPalette = generateColorVariations(colourConfig.secondary)

// https://coolors.co/cc9c00-85c190-44884e-1b361f-ce6950-723120-30140d
const paletteBase: Partial<PaletteOptions> = {

  // If you want more control over your colours uncomment this section
  /*
  
  primary: {
    light: '#85C190',
    main: '#44884E',
    dark: '#1B361F',
    contrastText: '#fbfbfb',
  },
  secondary: {
    light: '#AFB8E9',
    main: '#5163CF',
    dark: '#203173',
    contrastText: '#fbfbfb',
  },

  */


  // If you want more control over your colours comment these 2 lines out
  primary: primaryPalette,
  secondary: secondaryPalette
}





export default paletteBase
