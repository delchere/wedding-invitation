import React, { FC } from 'react'

const stroke = '#718579'

export const ChurchIllustration: FC = () => (
  <svg className="wedding-day__illustration" viewBox="0 0 200 160" fill="none" aria-hidden="true">
    <path d="M100 8 L108 28 H92 Z" stroke={stroke} strokeWidth="1.2" fill="none" />
    <path d="M100 8 V18" stroke={stroke} strokeWidth="1" />
    <rect x="72" y="28" width="56" height="88" stroke={stroke} strokeWidth="1.2" fill="none" />
    <path d="M68 28 H132" stroke={stroke} strokeWidth="1.2" />
    <path d="M60 116 H140" stroke={stroke} strokeWidth="1.2" />
    <path d="M78 48 H122 V72 H78 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
    <path d="M88 48 V72 M100 48 V72 M112 48 V72" stroke={stroke} strokeWidth="0.6" />
    <path d="M88 88 H112 V116 H88 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
    <path d="M94 116 V128 M106 116 V128" stroke={stroke} strokeWidth="0.8" />
    <ellipse cx="48" cy="130" rx="14" ry="22" stroke={stroke} strokeWidth="0.8" fill="none" />
    <ellipse cx="152" cy="128" rx="16" ry="24" stroke={stroke} strokeWidth="0.8" fill="none" />
    <path d="M36 148 Q48 120 60 148" stroke={stroke} strokeWidth="0.7" fill="none" />
    <path d="M140 150 Q152 122 164 150" stroke={stroke} strokeWidth="0.7" fill="none" />
    <path d="M20 152 H180" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
  </svg>
)

export const ReceptionIllustration: FC = () => (
  <svg className="wedding-day__illustration" viewBox="0 0 200 160" fill="none" aria-hidden="true">
    <path d="M40 118 H160" stroke={stroke} strokeWidth="1.2" />
    <path d="M52 118 V68 H148 V118" stroke={stroke} strokeWidth="1.2" fill="none" />
    <path d="M48 68 H152" stroke={stroke} strokeWidth="1.2" />
    <path d="M64 68 V48 H136 V68" stroke={stroke} strokeWidth="1" fill="none" />
    <path d="M76 48 H124 V32 H76 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
    <path d="M88 84 H112 V118 H88 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
    <path d="M68 84 H80 V100 H68 Z M120 84 H132 V100 H120 Z" stroke={stroke} strokeWidth="0.7" fill="none" />
    <path d="M100 32 V22" stroke={stroke} strokeWidth="0.8" />
    <circle cx="100" cy="18" r="3" stroke={stroke} strokeWidth="0.8" fill="none" />
    <ellipse cx="28" cy="128" rx="12" ry="18" stroke={stroke} strokeWidth="0.7" fill="none" />
    <ellipse cx="172" cy="126" rx="14" ry="20" stroke={stroke} strokeWidth="0.7" fill="none" />
    <path d="M16 150 H184" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
  </svg>
)
