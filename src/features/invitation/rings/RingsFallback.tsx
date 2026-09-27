import React, { FC } from 'react'

type RingsFallbackProps = {
  className?: string
}

const RingsFallback: FC<RingsFallbackProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 160 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ringGoldA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8c882" />
        <stop offset="35%" stopColor="#c9a66b" />
        <stop offset="70%" stopColor="#b8924f" />
        <stop offset="100%" stopColor="#8a6838" />
      </linearGradient>
      <linearGradient id="ringGoldB" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#dcc07a" />
        <stop offset="40%" stopColor="#c9a66b" />
        <stop offset="100%" stopColor="#966f33" />
      </linearGradient>
      <filter id="ringGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#966f33" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#ringGlow)">
      {/* Back ring */}
      <ellipse
        cx="88"
        cy="52"
        rx="38"
        ry="34"
        fill="none"
        stroke="url(#ringGoldB)"
        strokeWidth="7"
        transform="rotate(-18 88 52)"
        opacity="0.85"
      />
      <ellipse
        cx="88"
        cy="52"
        rx="38"
        ry="34"
        fill="none"
        stroke="#f5e6c0"
        strokeWidth="1.2"
        transform="rotate(-18 88 52)"
        opacity="0.35"
      />

      {/* Front ring */}
      <ellipse
        cx="72"
        cy="48"
        rx="38"
        ry="34"
        fill="none"
        stroke="url(#ringGoldA)"
        strokeWidth="7"
        transform="rotate(14 72 48)"
      />
      <ellipse
        cx="72"
        cy="48"
        rx="38"
        ry="34"
        fill="none"
        stroke="#fff8e8"
        strokeWidth="1"
        transform="rotate(14 72 48)"
        opacity="0.45"
      />

      {/* Highlight dots — diamond sparkle */}
      <circle cx="98" cy="38" r="1.8" fill="#fff8e8" opacity="0.7" />
      <circle cx="58" cy="62" r="1.4" fill="#fff8e8" opacity="0.5" />
    </g>
  </svg>
)

export default RingsFallback
