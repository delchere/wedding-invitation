import React, { FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import EnvelopeModel3D, { EnvelopeStage3D } from './EnvelopeModel3D'

type EnvelopeCanvasProps = {
  stage: EnvelopeStage3D
}

const SceneLights: FC = () => (
  <>
    <ambientLight intensity={0.55} color="#fff8ef" />
    <directionalLight position={[3, 5, 4]} intensity={0.95} color="#fff5e6" castShadow={false} />
    <directionalLight position={[-2, 2, 3]} intensity={0.35} color="#e8efe8" />
    <pointLight position={[0, 0, 3]} intensity={0.25} color="#c9a66b" />
  </>
)

const EnvelopeCanvas: FC<EnvelopeCanvasProps> = ({ stage }) => (
  <Canvas
    className="env-three-canvas"
    dpr={[1, 1.5]}
    camera={{ position: [0, 0.05, 3.8], fov: 38, near: 0.1, far: 20 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ background: 'transparent' }}
  >
    <SceneLights />
    <Suspense fallback={null}>
      <EnvelopeModel3D stage={stage} />
    </Suspense>
  </Canvas>
)

export default EnvelopeCanvas
