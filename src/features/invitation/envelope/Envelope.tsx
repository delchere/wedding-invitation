import React, { FC } from 'react'

type EnvelopeProps = {
  className?: string
}

const Envelope: FC<EnvelopeProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 400 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="envBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#faf6ef" />
        <stop offset="100%" stopColor="#ebe4d6" />
      </linearGradient>
      <linearGradient id="envFlap" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#f0eadf" />
        <stop offset="100%" stopColor="#f8f4ec" />
      </linearGradient>
      <linearGradient id="envGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c9a66b" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#c9a66b" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#c9a66b" stopOpacity="0.2" />
      </linearGradient>
      <filter id="envInnerShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#24332d" floodOpacity="0.06" />
      </filter>
    </defs>

    {/* Shadow base */}
    <ellipse cx="200" cy="268" rx="165" ry="8" fill="#24332d" opacity="0.06" />

    {/* Envelope body */}
    <rect x="32" y="88" width="336" height="168" rx="2" fill="url(#envBody)" filter="url(#envInnerShadow)" />

    {/* Inner V-fold lines (back of envelope) */}
    <path d="M 32 256 L 200 168 L 368 256" fill="#e5ddd0" opacity="0.6" />
    <path d="M 32 256 L 200 168 L 368 256" fill="none" stroke="#c9a66b" strokeWidth="0.6" opacity="0.25" />

    {/* Side creases */}
    <line x1="32" y1="88" x2="32" y2="256" stroke="#c9a66b" strokeWidth="0.5" opacity="0.35" />
    <line x1="368" y1="88" x2="368" y2="256" stroke="#c9a66b" strokeWidth="0.5" opacity="0.35" />

    {/* Gold border frame */}
    <rect x="32" y="88" width="336" height="168" rx="2" fill="none" stroke="url(#envGoldLine)" strokeWidth="1.2" />

    {/* Inner decorative line */}
    <rect x="42" y="98" width="316" height="148" rx="1" fill="none" stroke="#c9a66b" strokeWidth="0.4" opacity="0.35" />

    {/* Top flap (closed) */}
    <path d="M 32 88 L 200 28 L 368 88 Z" fill="url(#envFlap)" />
    <path d="M 32 88 L 200 28 L 368 88 Z" fill="none" stroke="#c9a66b" strokeWidth="0.8" opacity="0.5" />

    {/* Flap fold shadow */}
    <path d="M 32 88 L 200 168 L 368 88" fill="#24332d" opacity="0.04" />

    {/* Subtle corner filigree */}
    <path
      d="M 52 108 L 72 108 M 52 108 L 52 128"
      stroke="#c9a66b"
      strokeWidth="0.5"
      opacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M 348 108 L 328 108 M 348 108 L 348 128"
      stroke="#c9a66b"
      strokeWidth="0.5"
      opacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M 52 236 L 72 236 M 52 236 L 52 216"
      stroke="#c9a66b"
      strokeWidth="0.5"
      opacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M 348 236 L 328 236 M 348 236 L 348 216"
      stroke="#c9a66b"
      strokeWidth="0.5"
      opacity="0.4"
      strokeLinecap="round"
    />

  </svg>
)

export default Envelope
