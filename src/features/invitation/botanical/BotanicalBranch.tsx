import React, { FC } from 'react'

type BotanicalBranchProps = {
  className?: string
}

const BotanicalBranch: FC<BotanicalBranchProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 180 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="botanicalStem" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#718579" />
        <stop offset="100%" stopColor="#5e6f64" />
      </linearGradient>
      <linearGradient id="botanicalGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c9a66b" />
        <stop offset="100%" stopColor="#b8924f" />
      </linearGradient>
    </defs>

    <path
      d="M92 210 C 88 170, 84 130, 90 95 C 96 58, 108 32, 118 12"
      stroke="url(#botanicalStem)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />

    <g opacity="0.9">
      <ellipse cx="108" cy="48" rx="14" ry="7" transform="rotate(-35 108 48)" fill="#718579" opacity="0.55" />
      <ellipse cx="98" cy="72" rx="16" ry="8" transform="rotate(-55 98 72)" fill="#718579" opacity="0.5" />
      <ellipse cx="88" cy="98" rx="15" ry="7.5" transform="rotate(-42 88 98)" fill="#5e6f64" opacity="0.45" />
      <ellipse cx="82" cy="124" rx="14" ry="7" transform="rotate(-28 82 124)" fill="#718579" opacity="0.4" />
      <ellipse cx="78" cy="148" rx="13" ry="6.5" transform="rotate(-18 78 148)" fill="#5e6f64" opacity="0.35" />
    </g>

    <g stroke="url(#botanicalGold)" strokeWidth="0.6" fill="none" opacity="0.65">
      <path d="M118 12 C 128 8, 142 14, 148 26" />
      <path d="M110 28 C 122 22, 136 28, 142 40" />
      <path d="M102 52 C 114 46, 128 54, 132 66" />
    </g>

    <circle cx="148" cy="24" r="3" fill="#c9a66b" opacity="0.5" />
    <circle cx="134" cy="62" r="2.5" fill="#b8924f" opacity="0.45" />

    <g transform="translate(72, 88) rotate(-20)" opacity="0.7">
      <ellipse cx="0" cy="0" rx="10" ry="5" fill="#718579" opacity="0.35" />
      <path d="M -8 -2 Q 0 -8 8 -2" stroke="#718579" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
)

export default BotanicalBranch
