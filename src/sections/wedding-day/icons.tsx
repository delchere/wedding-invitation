import React, { FC } from 'react'

const stroke = '#718579'

export const RingsIcon: FC = () => (
  <svg className="wedding-day__timeline-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="12" cy="18" r="7" stroke={stroke} strokeWidth="1.2" fill="none" />
    <circle cx="20" cy="14" r="7" stroke={stroke} strokeWidth="1.2" fill="none" />
    <path d="M17 11 L15 15" stroke={stroke} strokeWidth="0.8" />
  </svg>
)

export const ChampagneIcon: FC = () => (
  <svg className="wedding-day__timeline-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M10 6 H22 L18 18 H14 Z" stroke={stroke} strokeWidth="1.1" fill="none" />
    <path d="M16 18 V24" stroke={stroke} strokeWidth="1" />
    <path d="M12 24 H20" stroke={stroke} strokeWidth="1" />
    <path d="M22 8 C26 10 28 14 26 18" stroke={stroke} strokeWidth="0.9" fill="none" />
    <path d="M10 8 C6 10 4 14 6 18" stroke={stroke} strokeWidth="0.9" fill="none" />
  </svg>
)
