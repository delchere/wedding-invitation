import React, { FC, useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import weddingConfig from '@/config/wedding.config'
import {
  cardMaterial,
  goldMaterial,
  goldRingMaterial,
  paperInnerMaterial,
  paperMaterial,
  waxMaterial,
} from './materials'

export type EnvelopeStage3D = 'idle' | 'opening' | 'open'

type EnvelopeModel3DProps = {
  stage: EnvelopeStage3D
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

const EnvelopeModel3D: FC<EnvelopeModel3DProps> = ({ stage }) => {
  const rootRef = useRef<THREE.Group>(null)
  const flapRef = useRef<THREE.Group>(null)
  const sealRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  const brideInitial = weddingConfig.people.bride.firstName[0] || 'D'
  const groomInitial = weddingConfig.people.groom.firstName[0] || 'I'

  const goldTrimGeometry = useMemo(() => new THREE.BoxGeometry(2.52, 1.52, 0.002), [])

  useEffect(() => {
    if (stage === 'opening' || stage === 'open') {
      progressRef.current = Math.max(progressRef.current, 0.001)
    } else {
      progressRef.current = 0
    }
  }, [stage])

  useFrame((state, delta) => {
    const target = stage === 'idle' ? 0 : 1
    const speed = stage === 'opening' ? 0.85 : 2.5
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, delta * speed)
    const p = progressRef.current

    if (flapRef.current) {
      const closedAngle = Math.PI * 0.52
      const openAngle = -Math.PI * 0.08
      const flapT = easeOutCubic(Math.min(Math.max((p - 0.12) / 0.55, 0), 1))
      flapRef.current.rotation.x = THREE.MathUtils.lerp(closedAngle, openAngle, flapT)
    }

    if (sealRef.current) {
      const sealT = easeOutCubic(Math.min(p / 0.28, 1))
      const scale = 1 - sealT
      sealRef.current.scale.setScalar(Math.max(scale, 0))
      sealRef.current.position.y = sealT * 0.08
    }

    if (cardRef.current) {
      const cardT = easeOutCubic(Math.min(Math.max((p - 0.28) / 0.72, 0), 1))
      cardRef.current.position.y = THREE.MathUtils.lerp(-0.15, 0.55, cardT)
      cardRef.current.position.z = THREE.MathUtils.lerp(0.02, 0.45, cardT)
      cardRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.12, cardT)
    }

    if (ringRef.current) {
      const ringT = stage === 'idle' ? 1 : Math.max(1 - p * 1.4, 0)
      ringRef.current.visible = ringT > 0.05
      ringRef.current.position.y = -0.72 + (1 - ringT) * 0.15
    }

    if (rootRef.current && stage === 'idle') {
      rootRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04
      rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.02
    } else if (rootRef.current) {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, 0, delta * 2)
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, 0, delta * 2)
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.14} enabled={stage === 'idle'}>
      <group ref={rootRef}>
        {/* Back */}
        <mesh position={[0, 0, -0.03]} material={paperInnerMaterial}>
          <boxGeometry args={[2.5, 1.55, 0.025]} />
        </mesh>

        {/* Side pockets */}
        <mesh position={[-1.18, 0, 0.01]} rotation={[0, 0, 0.22]} material={paperInnerMaterial}>
          <boxGeometry args={[0.02, 1.4, 0.7]} />
        </mesh>
        <mesh position={[1.18, 0, 0.01]} rotation={[0, 0, -0.22]} material={paperInnerMaterial}>
          <boxGeometry args={[0.02, 1.4, 0.7]} />
        </mesh>
        <mesh position={[0, -0.55, 0.02]} rotation={[0.55, 0, 0]} material={paperInnerMaterial}>
          <boxGeometry args={[2.4, 0.02, 0.55]} />
        </mesh>

        {/* Card rising from inside */}
        <group ref={cardRef} position={[0, -0.15, 0.02]}>
          <mesh material={cardMaterial}>
            <boxGeometry args={[2.15, 1.35, 0.018]} />
          </mesh>
          <mesh position={[0, 0, 0.012]} material={goldMaterial} geometry={goldTrimGeometry} scale={[0.86, 0.86, 1]} />
          <Html
            transform
            occlude
            distanceFactor={1.35}
            position={[0, 0, 0.025]}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            center
          >
            <div className="env-three-card-hint">
              {brideInitial} × {groomInitial}
            </div>
          </Html>
        </group>

        {/* Front panel */}
        <mesh position={[0, 0, 0.045]} material={paperMaterial}>
          <boxGeometry args={[2.5, 1.55, 0.018]} />
        </mesh>
        <mesh position={[0, 0, 0.058]} material={goldMaterial} geometry={goldTrimGeometry} />

        {/* Top flap (hinged) */}
        <group ref={flapRef} position={[0, 0.775, 0.03]}>
          <mesh position={[0, 0.42, 0]} material={paperMaterial}>
            <boxGeometry args={[2.5, 0.88, 0.02]} />
          </mesh>
          <mesh position={[0, 0.42, 0.014]} material={goldMaterial}>
            <boxGeometry args={[2.48, 0.86, 0.002]} />
          </mesh>

          {/* Wax seal on flap */}
          <group ref={sealRef} position={[0, 0.18, 0.04]}>
            <mesh material={waxMaterial} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.24, 0.09, 32]} />
            </mesh>
            <mesh material={waxMaterial} position={[0, 0.04, 0]}>
              <sphereGeometry args={[0.2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            </mesh>
            <Html center distanceFactor={2.2} position={[0, 0.05, 0.06]} style={{ pointerEvents: 'none' }}>
              <span className="env-three-seal-text">
                {brideInitial}×{groomInitial}
              </span>
            </Html>
          </group>
        </group>

        {/* Wedding rings */}
        <group ref={ringRef} position={[0, -0.72, 0.22]} rotation={[0.35, 0.15, 0]}>
          <mesh material={goldRingMaterial} rotation={[Math.PI / 2, 0.4, 0]}>
            <torusGeometry args={[0.28, 0.035, 16, 48]} />
          </mesh>
          <mesh material={goldRingMaterial} rotation={[Math.PI / 2, -0.35, 0]} position={[0.08, 0.02, 0.04]}>
            <torusGeometry args={[0.28, 0.035, 16, 48]} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export default EnvelopeModel3D
