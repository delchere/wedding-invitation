import React, { FC, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type EquationVisualProps = {
  progress: number
  finalWord: string
}

const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v))

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

const EquationVisual: FC<EquationVisualProps> = ({ progress, finalWord }) => {
  const prefersReducedMotion = useReducedMotion()
  const p = clamp(progress)

  const separation = lerp(1, 0, clamp((p - 0.05) / 0.68))
  const merge = clamp((p - 0.72) / 0.22)
  const botanical = clamp((p - 0.28) / 0.5)
  const gold = clamp((p - 0.4) / 0.45)
  const complexity = clamp(p / 0.75)

  const leftPath = useMemo(() => {
    const x1 = lerp(18, 42, 1 - separation * (1 - merge))
    const y2 = lerp(55, 48, merge)
    const cx = lerp(28, 50, merge)
    return `M ${x1} 88 C ${x1 - 4} ${72 - complexity * 8} ${cx - 12} ${y2 + 10} ${cx} ${y2} S ${50 - 6 * (1 - merge)} ${28 - merge * 6} 50 ${22 + merge * 4}`
  }, [separation, merge, complexity])

  const rightPath = useMemo(() => {
    const x1 = lerp(82, 58, 1 - separation * (1 - merge))
    const y2 = lerp(55, 48, merge)
    const cx = lerp(72, 50, merge)
    return `M ${x1} 88 C ${x1 + 4} ${72 - complexity * 8} ${cx + 12} ${y2 + 10} ${cx} ${y2} S ${50 + 6 * (1 - merge)} ${28 - merge * 6} 50 ${22 + merge * 4}`
  }, [separation, merge, complexity])

  const mergedPath = 'M 50 18 C 38 32, 36 48, 50 58 C 64 48, 62 32, 50 18 Z'

  const particles = useMemo(() => {
    const mergeVal = clamp((p - 0.72) / 0.22)
    return Array.from({ length: 20 }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1
      const t = (i / 20) * p
      const x = 50 + side * lerp(34, 0, t) * (1 - mergeVal * 0.95)
      const y = 22 + (i % 6) * 10 + t * 12
      return { x, y, o: 0.15 + gold * 0.55, r: 0.6 + (i % 3) * 0.35 }
    })
  }, [p, gold])

  return (
    <svg
      className="equation-visual"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="eqGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a66b" stopOpacity={0.35 + gold * 0.55} />
          <stop offset="100%" stopColor="#966f33" stopOpacity={0.25 + gold * 0.45} />
        </linearGradient>
        <linearGradient id="eqSage" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#718579" stopOpacity={0.2 + botanical * 0.5} />
          <stop offset="100%" stopColor="#5e6f64" stopOpacity={0.15 + botanical * 0.35} />
        </linearGradient>
        <radialGradient id="eqGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#c9a66b" stopOpacity={merge * 0.35} />
          <stop offset="100%" stopColor="#c9a66b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle grid / coordinates */}
      <g opacity={0.08 + complexity * 0.06} stroke="#718579" strokeWidth="0.15">
        {[20, 35, 50, 65, 80].map((y) => (
          <line key={`h-${y}`} x1="12" y1={y} x2="88" y2={y} />
        ))}
        {[25, 50, 75].map((x) => (
          <line key={`v-${x}`} x1={x} y1="14" x2={x} y2="92" />
        ))}
      </g>

      <text x="14" y="16" className="equation-visual__coord" opacity={0.25 + complexity * 0.2}>
        f(x,y)
      </text>
      <text x="72" y="16" className="equation-visual__coord" opacity={0.2 + complexity * 0.15}>
        t → ∞
      </text>

      {/* Botanical accents */}
      <g opacity={botanical * 0.75} stroke="url(#eqSage)" fill="none" strokeWidth="0.35">
        <path d="M 8 78 Q 14 68 10 58" />
        <path d="M 92 76 Q 86 66 90 56" />
        <ellipse cx="11" cy="55" rx="2.2" ry="1.1" transform="rotate(-30 11 55)" fill="#718579" fillOpacity="0.25" stroke="none" />
        <ellipse cx="89" cy="54" rx="2.2" ry="1.1" transform="rotate(30 89 54)" fill="#718579" fillOpacity="0.22" stroke="none" />
      </g>

      {/* Merge glow */}
      <circle cx="50" cy="42" r={18 + merge * 8} fill="url(#eqGlow)" />

      {/* Trajectories */}
      {merge < 0.85 && (
        <>
          <motion.path
            d={leftPath}
            fill="none"
            stroke="url(#eqGold)"
            strokeWidth={0.55 + gold * 0.35}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: prefersReducedMotion ? 1 : 0.4 + p * 0.6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <motion.path
            d={rightPath}
            fill="none"
            stroke="url(#eqGold)"
            strokeWidth={0.55 + gold * 0.35}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: prefersReducedMotion ? 1 : 0.4 + p * 0.6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </>
      )}

      {merge > 0.55 && (
        <motion.path
          d={mergedPath}
          fill="url(#eqGold)"
          fillOpacity={merge * 0.22}
          stroke="#c9a66b"
          strokeWidth={0.4 + merge * 0.3}
          initial={{ opacity: 0 }}
          animate={{ opacity: merge }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Luminous points */}
      {!prefersReducedMotion &&
        particles.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r={pt.r} fill="#c9a66b" opacity={pt.o * (1 - merge * 0.3)} />
        ))}

      {/* Two stars before merge */}
      {merge < 0.7 && (
        <>
          <circle cx={lerp(22, 46, merge)} cy={lerp(62, 50, merge)} r={1.4 + gold} fill="#c9a66b" opacity={0.7} />
          <circle cx={lerp(78, 54, merge)} cy={lerp(62, 50, merge)} r={1.4 + gold} fill="#718579" opacity={0.65} />
        </>
      )}

      {/* Fusion word */}
      {merge > 0.75 && (
        <motion.text
          x="50"
          y="46"
          textAnchor="middle"
          className="equation-visual__us"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: clamp((merge - 0.75) / 0.25), scale: 1 }}
        >
          {finalWord}
        </motion.text>
      )}
    </svg>
  )
}

export default EquationVisual
