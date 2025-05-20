import { forwardRef, useEffect, useRef, useState } from 'react'
import { TransformControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type RotationMode = 'horizontal' | 'vertical' | null

interface Transform {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

interface KeyboardModelProps {
  isControlActive: boolean
  horizontalRotation: number
  verticalRotation: number
  rotationMode: RotationMode
  setIsDirty: (dirty: boolean) => void
  model3dUrl: string
  defaultTransform: Transform
}

const KeyboardModel = forwardRef<THREE.Object3D, KeyboardModelProps>(({
  isControlActive,
  horizontalRotation,
  verticalRotation,
  rotationMode,
  setIsDirty,
  model3dUrl,
  defaultTransform,
}, ref) => {
  const { scene } = useGLTF(model3dUrl)
  const mesh = scene
  const modelRef = ref as React.RefObject<THREE.Object3D>
  const initialQuat = useRef<THREE.Quaternion | null>(null)

  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    if (modelRef.current && !modelReady) {
      // 초기 transform 설정
      const { position, rotation, scale } = defaultTransform

      modelRef.current.position.set(position.x, position.y, position.z)
      modelRef.current.rotation.set(rotation.x, rotation.y, rotation.z)
      modelRef.current.scale.set(scale.x, scale.y, scale.z)

      console.log('📦 초기 키보드 배치 정보')
      console.log('position:', modelRef.current.position)
      console.log('rotation (deg):', {
        x: THREE.MathUtils.radToDeg(rotation.x),
        y: THREE.MathUtils.radToDeg(rotation.y),
        z: THREE.MathUtils.radToDeg(rotation.z),
      })
      console.log('scale:', modelRef.current.scale)

      setModelReady(true)
    }
  }, [modelReady, defaultTransform])

  useEffect(() => {
    if (modelRef.current && rotationMode) {
      const h = horizontalRotation
      const v = verticalRotation
      const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), h)
      const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), v)

      const finalQuat = new THREE.Quaternion()
      if (rotationMode === 'horizontal') {
        finalQuat.multiplyQuaternions(qX, qY)
      } else {
        finalQuat.multiplyQuaternions(qY, qX)
      }

      modelRef.current.quaternion.copy(finalQuat)

      if (!initialQuat.current) {
        initialQuat.current = finalQuat.clone()
      } else if (!finalQuat.equals(initialQuat.current)) {
        setIsDirty(true)
      }
    }
  }, [horizontalRotation, verticalRotation, rotationMode])

  return isControlActive && modelRef.current ? (
    <TransformControls
      object={modelRef.current}
      mode="translate"
      showX
      showY
      onMouseUp={() => setIsDirty(true)}
    >
      <primitive object={mesh} ref={modelRef} />
    </TransformControls>
  ) : (
    <primitive object={mesh} ref={modelRef} />
  )
})

export default KeyboardModel