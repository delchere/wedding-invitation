import * as THREE from 'three'

export const paperMaterial = new THREE.MeshStandardMaterial({
  color: '#f5f0e7',
  roughness: 0.88,
  metalness: 0,
  side: THREE.DoubleSide,
})

export const paperInnerMaterial = new THREE.MeshStandardMaterial({
  color: '#ebe4d6',
  roughness: 0.92,
  metalness: 0,
  side: THREE.DoubleSide,
})

export const goldMaterial = new THREE.MeshStandardMaterial({
  color: '#c9a66b',
  roughness: 0.32,
  metalness: 0.82,
})

export const goldRingMaterial = new THREE.MeshStandardMaterial({
  color: '#d4b06a',
  roughness: 0.18,
  metalness: 1,
})

export const waxMaterial = new THREE.MeshPhysicalMaterial({
  color: '#b8924f',
  roughness: 0.55,
  metalness: 0.08,
  clearcoat: 0.35,
  clearcoatRoughness: 0.4,
})

export const cardMaterial = new THREE.MeshStandardMaterial({
  color: '#faf6ef',
  roughness: 0.75,
  metalness: 0,
})
