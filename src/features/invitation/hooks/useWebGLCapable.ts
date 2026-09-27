import { useEffect, useState } from 'react'

const canUseWebGL = (): boolean => {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false

  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory

  if (cores <= 2) return true
  if (memory !== undefined && memory <= 2) return true

  return false
}

export type WebGLStatus = 'checking' | 'ready' | 'fallback'

export const useWebGLCapable = (): WebGLStatus => {
  const [status, setStatus] = useState<WebGLStatus>('checking')

  useEffect(() => {
    setStatus(canUseWebGL() && !isLowEndDevice() ? 'ready' : 'fallback')
  }, [])

  return status
}
