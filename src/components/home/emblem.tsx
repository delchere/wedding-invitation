import React, { FC } from 'react'
import weddingConfig from '@/config/wedding.config'

interface ThesisEmblemProps {
  brideInitial?: string
  groomInitial?: string
}

export const ThesisEmblem: FC<ThesisEmblemProps> = ({
  brideInitial = weddingConfig.people.bride.firstName[0] || 'D',
  groomInitial = weddingConfig.people.groom.firstName[0] || 'I',
}) => {
  const xc = 130
  const yc = 96
  const rOuter = 58
  const rInner = 52

  return (
    <svg
      viewBox="0 0 260 210"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="thesis-emblem-svg"
      aria-label={`${brideInitial} and ${groomInitial} wedding emblem`}
      role="img"
    >
      <defs>
        <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b26e" />
          <stop offset="50%" stopColor="#b68f4e" />
          <stop offset="100%" stopColor="#966f33" />
        </linearGradient>
        <filter id="emblemGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* 1. Medallion Circle Background & Double Borders */}
      <circle cx={xc} cy={yc} r={rOuter} fill="rgba(247, 243, 235, 0.96)" filter="url(#emblemGlow)" />
      {/* Outer stitched/dashed circle */}
      <circle
        cx={xc}
        cy={yc}
        r={rOuter}
        fill="none"
        stroke="#756d53"
        strokeWidth="1.35"
        strokeDasharray="2.2 3.2"
        opacity="0.8"
      />
      {/* Inner concentric fine ring */}
      <circle
        cx={xc}
        cy={yc}
        r={rInner}
        fill="none"
        stroke="#756d53"
        strokeWidth="0.95"
        opacity="0.45"
      />

      {/* 2. Top Latin Cross */}
      <g transform={`translate(${xc}, ${yc - 32})`}>
        <path
          d="M -1.2 -10 L 1.2 -10 L 1.2 -3 L 5 -3 L 5 -0.6 L 1.2 -0.6 L 1.2 8 L -1.2 8 L -1.2 -0.6 L -5 -0.6 L -5 -3 L -1.2 -3 Z"
          fill="url(#emblemGoldGrad)"
          stroke="#966f33"
          strokeWidth="0.35"
        />
      </g>

      {/* 3. Delicate Sparkles around the Cross */}
      <g fill="#c29b53" opacity="0.85">
        <path d="M 0 -2.8 Q 0 0 2.8 0 Q 0 0 0 2.8 Q 0 0 -2.8 0 Q 0 0 0 -2.8 Z" transform={`translate(${xc - 14}, ${yc - 34})`} />
        <path d="M 0 -2.8 Q 0 0 2.8 0 Q 0 0 0 2.8 Q 0 0 -2.8 0 Q 0 0 0 -2.8 Z" transform={`translate(${xc + 14}, ${yc - 34})`} />
        <path d="M 0 -2 Q 0 0 2 0 Q 0 0 0 2 Q 0 0 -2 0 Q 0 0 0 -2 Z" transform={`translate(${xc - 20}, ${yc - 23})`} />
        <path d="M 0 -2 Q 0 0 2 0 Q 0 0 0 2 Q 0 0 -2 0 Q 0 0 0 -2 Z" transform={`translate(${xc + 20}, ${yc - 23})`} />
      </g>

      {/* 4. Monogram Initials */}
      <text
        x={xc}
        y={yc + 10}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="34"
        fontWeight="600"
        fill="#363229"
        letterSpacing="1"
      >
        <tspan dx="-2">{brideInitial}</tspan>
        <tspan dx="5" fontWeight="300" fontSize="30" fill="#7a7258" opacity="0.75">|</tspan>
        <tspan dx="6">{groomInitial}</tspan>
      </text>

      {/* 5. Inner Bottom Flourish (Center gold bud + two olive leaves) */}
      <g transform={`translate(${xc}, ${yc + 33})`}>
        {/* Golden center bud */}
        <path d="M 0 -5.5 C -1.5 -3.5 -2 -1 0 2.5 C 2 -1 1.5 -3.5 0 -5.5 Z" fill="url(#emblemGoldGrad)" />
        <circle cx="0" cy="-6.5" r="0.9" fill="#b68f4e" />
        {/* Left leaf */}
        <g transform="rotate(-55) scale(0.65)">
          <path d="M 0 0 C -2.5 -3 -3 -7 0 -11 C 3 -7 2.5 -3 0 0 Z" fill="#756f54" opacity="0.88" />
        </g>
        {/* Right leaf */}
        <g transform="rotate(55) scale(0.65)">
          <path d="M 0 0 C -2.5 -3 -3 -7 0 -11 C 3 -7 2.5 -3 0 0 Z" fill="#756f54" opacity="0.88" />
        </g>
      </g>

      {/* 6. Laurel Branches surrounding the circle */}
      <g id="thesis-laurel-wreath">
        {/* Left branch */}
        <g id="thesis-left-branch">
          {/* Stem starting from bottom right across center to wrap around left of circle */}
          <path
            d="M 140 184 C 135 177 132 173 130 171 C 103 169 77 150 63 123 C 54 105 55 84 63 67 C 68 57 74 49 82 42"
            fill="none"
            stroke="#666047"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Leaf pair 1 (angle 16°) */}
          <g transform="translate(110.4, 168.2)">
            <g transform="rotate(-204.0) scale(1.08)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-138.0) scale(0.91)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 2 (angle 28°) */}
          <g transform="translate(96.7, 162.7)">
            <g transform="rotate(-192.0) scale(1.04)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-126.0) scale(0.87)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 3 (angle 41°) */}
          <g transform="translate(83.4, 153.6)">
            <g transform="rotate(-179.0) scale(0.99)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-113.0) scale(0.83)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 4 (angle 55°) */}
          <g transform="translate(71.8, 140.7)">
            <g transform="rotate(-165.0) scale(0.95)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-99.0) scale(0.80)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 5 (angle 69°) */}
          <g transform="translate(63.7, 125.4)">
            <g transform="rotate(-151.0) scale(0.90)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-85.0) scale(0.76)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 6 (angle 83°) */}
          <g transform="translate(59.5, 108.6)">
            <g transform="rotate(-137.0) scale(0.86)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-71.0) scale(0.72)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 7 (angle 97°) */}
          <g transform="translate(59.5, 91.4)">
            <g transform="rotate(-123.0) scale(0.81)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-57.0) scale(0.68)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 8 (angle 111°) */}
          <g transform="translate(63.7, 74.6)">
            <g transform="rotate(-109.0) scale(0.77)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-43.0) scale(0.65)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Leaf pair 9 (angle 124°) */}
          <g transform="translate(71.2, 59.3)">
            <g transform="rotate(-96.0) scale(0.72)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
            <g transform="rotate(-30.0) scale(0.60)">
              <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
              <path d="M 0 -1 L 0 -11" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
            </g>
          </g>

          {/* Terminal tip leaf (angle 135°) */}
          <g transform="translate(79.8, 49.8) rotate(-45.0) scale(0.66)">
            <path d="M 0 0 C -2.8 -4 -3.8 -9.5 0 -15 C 3.8 -9.5 2.8 -4 0 0 Z" fill="#756f54" stroke="#524d38" strokeWidth="0.7" />
            <path d="M 0 -1 L 0 -10" stroke="#48432f" strokeWidth="0.5" opacity="0.45" />
          </g>
        </g>

        {/* Right branch – perfectly mirrored across vertical axis at x = xc (130) */}
        <use href="#thesis-left-branch" transform={`translate(${2 * xc}, 0) scale(-1, 1)`} />
      </g>
    </svg>
  )
}

export default ThesisEmblem
