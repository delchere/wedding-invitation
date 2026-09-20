import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'

type WaxSealProps = {
  className?: string
}

const WaxSeal: FC<WaxSealProps> = ({ className }) => {
  const brideInitial = weddingConfig.people.bride.firstName[0] || 'D'
  const groomInitial = weddingConfig.people.groom.firstName[0] || 'I'

  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="waxGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d4b06a" />
          <stop offset="45%" stopColor="#c9a66b" />
          <stop offset="100%" stopColor="#8a6838" />
        </radialGradient>
        <filter id="waxShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5a4020" floodOpacity="0.35" />
        </filter>
      </defs>

      <circle cx="40" cy="40" r="34" fill="url(#waxGrad)" filter="url(#waxShadow)" />

      <circle cx="40" cy="40" r="34" fill="none" stroke="#966f33" strokeWidth="0.6" opacity="0.4" />

      <path
        d="M 40 8 C 52 10, 62 18, 68 30 C 72 38, 72 48, 68 56 C 62 68, 52 72, 40 74 C 28 72, 18 66, 12 54 C 8 46, 8 36, 12 26 C 18 14, 28 8, 40 8 Z"
        fill="none"
        stroke="#b8924f"
        strokeWidth="0.5"
        opacity="0.25"
      />

      <text
        x="40"
        y="46"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="#3d2e18"
        letterSpacing="1"
      >
        {brideInitial}
        <tspan dx="2" fontSize="14" fill="#5a4020" opacity="0.8">
          ×
        </tspan>
        <tspan dx="2">{groomInitial}</tspan>
      </text>
    </svg>
  )
}

export default WaxSeal
