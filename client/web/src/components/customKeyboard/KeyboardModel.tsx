import { forwardRef, useEffect, useRef } from 'react'
import { TransformControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type RotationMode = 'horizontal' | 'vertical' | null

interface KeyboardModelProps {
  isControlActive: boolean
  horizontalRotation: number
  verticalRotation: number
  rotationMode: RotationMode
  setIsDirty: (dirty: boolean) => void
}

const KeyboardModel = forwardRef<THREE.Object3D, KeyboardModelProps>(({
  isControlActive,
  horizontalRotation,
  verticalRotation,
  rotationMode,
  setIsDirty,
}, ref) => {
  const gltf = useGLTF('/glbs/keyboard_test.glb')
  const mesh = gltf.scene
  const modelRef = ref as React.RefObject<THREE.Object3D>
  const initialQuat = useRef<THREE.Quaternion | null>(null)

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, -1.5, 0)
      modelRef.current.scale.set(8, 8, 8)

      console.log('📦 초기 키보드 정보')
      console.log('위치 (position):', modelRef.current.position)
      console.log('회전 (rotation, degrees):', {
        x: THREE.MathUtils.radToDeg(modelRef.current.rotation.x),
        y: THREE.MathUtils.radToDeg(modelRef.current.rotation.y),
        z: THREE.MathUtils.radToDeg(modelRef.current.rotation.z),
      })
      console.log('크기 (scale):', modelRef.current.scale)
    }
  }, [])

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