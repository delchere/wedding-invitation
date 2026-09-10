import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { scroller } from 'react-scroll'

const CustomExpandMoreIcon: React.FC = () => (
  <ExpandMoreIcon
    onClick={() => {
      // Scroll to the next section
      scroller.scrollTo('faq', {
        duration: 800,
        smooth: 'easeInOutQuad',
        offset: 0,
      })
    }}
    sx={{
      position: 'absolute',
      zIndex: 100,
      cursor: 'pointer',
      height: 80,
      width: 80,
      margin: '0px 0 0 -40px',
      lineHeight: '60px',
      left: '50%',
      bottom: 10,
      color: '#FFF',
      textAlign: 'center',
      fontSize: 80,
      textDecoration: 'none',
      textShadow: '0px 0px 3px rgba(0, 0, 0, 0.4)',
      animation: 'fade_move_down 2s ease-in-out infinite',
      '@keyframes fade_move_down': {
        '0%': {
          transform: 'translate(0,-20px)',
          opacity: 0,
        },
        '50%': {
          opacity: 1,
        },
        '100%': {
          transform: 'translate(0,20px)',
          opacity: 0,
        },
      },
    }}
  />
)

export default CustomExpandMoreIcon
