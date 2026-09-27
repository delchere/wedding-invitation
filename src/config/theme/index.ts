import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'

import typography from './typography'
import paletteBase from './palette'
import shadows from './shadows'

// default
const createTheme = (): Theme => {
  const palette = { ...paletteBase }
  return createMuiTheme({
    palette,
    typography,
    shadows,
  })
}

const theme = createTheme()

export { paletteBase, typography, shadows }
export default theme
