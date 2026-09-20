import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { useWebGLCapable } from '../hooks/useWebGLCapable'
import EnvelopeAnimated from './EnvelopeAnimated'

export type EnvelopeStage = 'idle' | 'opening' | 'open'

type EnvelopeSceneProps = {
  stage: EnvelopeStage
}

const EnvelopeCanvas = dynamic(() => import('../scene/EnvelopeCanvas'), {
  ssr: false,
  loading: () => <div className="env-scene env-scene--loading" aria-hidden="true" />,
})

const EnvelopeScene: FC<EnvelopeSceneProps> = ({ stage }) => {
  const webglStatus = useWebGLCapable()

  if (webglStatus === 'checking') {
    return <div className="env-scene env-scene--loading" aria-hidden="true" />
  }

  if (webglStatus === 'fallback') {
    return <EnvelopeAnimated stage={stage} />
  }

  return (
    <div className="env-scene env-scene--three">
      <EnvelopeCanvas stage={stage} />
    </div>
  )
}

export default EnvelopeScene
