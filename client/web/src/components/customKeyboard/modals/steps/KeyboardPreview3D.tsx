// components/customKeyboard/modals/steps/KeyboardPreview3D.tsx
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Group } from 'three'

interface KeyboardPreview3DProps {
  layout: '풀배열' | '텐키리스'
  materialType: '금속' | '플라스틱'
  outerColor: string
  basicColor: string
  pointColor: string
  pointOption: 'none' | 'set' | 'custom'
  customKeyMap: Record<string, string>
  setCustomKeyMap: React.Dispatch<React.SetStateAction<Record<string, string>>>
  setFocusedKey: (key: string | null) => void
  focusedKey: string | null
}

const SET_KEYS = ['W', 'A', 'S', 'D', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Esc']

const KeyboardModel = ({
  layout,
  materialType,
  outerColor,
  basicColor,
  pointColor,
  pointOption,
  customKeyMap,
  setFocusedKey,
  focusedKey,
}: KeyboardPreview3DProps) => {
  const path = layout === '텐키리스' ? '/glbs/tklKeyboard.glb' : '/glbs/keyboard.glb'
  const { scene } = useGLTF(path)
  const groupRef = useRef<Group>(null)

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial

        if (obj.name === 'Cube') {
          mat.color = new THREE.Color(outerColor)
          mat.metalness = materialType === '금속' ? 1 : 0.1
          mat.roughness = materialType === '금속' ? 0.3 : 0.8
        } else {
          if (pointOption === 'set' && SET_KEYS.includes(obj.name)) {
            mat.color = new THREE.Color(pointColor)
            mat.opacity = 1
            mat.transparent = false
          } else if (pointOption === 'custom') {
            mat.color = new THREE.Color(customKeyMap[obj.name] || basicColor)
            if (focusedKey && obj.name !== focusedKey) {
              mat.opacity = 0.3
              mat.transparent = true
            } else {
              mat.opacity = 1
              mat.transparent = false
            }
          } else {
            mat.color = new THREE.Color(basicColor)
            mat.opacity = 1
            mat.transparent = false
          }

          mat.metalness = 0.1
          mat.roughness = 0.9
          mat.needsUpdate = true
        }
      }
    })
  }, [scene, materialType, outerColor, basicColor, pointColor, pointOption, customKeyMap, focusedKey])

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    const mesh = e.object as THREE.Mesh
    const name = mesh.name

    if (pointOption === 'custom' && name !== 'Cube') {
      e.stopPropagation()
      setFocusedKey(name)
    } else {
      setFocusedKey(null)
    }
  }

  return (
    <group
      ref={groupRef}
      scale={[13, 13, 13]}
      position={[0, 0.1, 0]}
      rotation={[0.8, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      <primitive object={scene} />
    </group>
  )
}

const KeyboardPreview3D = (props: KeyboardPreview3DProps) => {
  const { pointOption, setFocusedKey } = props

  return (
    <div className="w-full h-[400px] bg-white rounded-md shadow overflow-hidden" style={{ pointerEvents: 'auto' }}>
      <Suspense fallback={<div className="text-center p-8">로딩 중...</div>}>
        <Canvas
          camera={{ position: [0, 3, 5], fov: 45 }}
          onPointerMissed={() => {
            if (pointOption === 'custom') setFocusedKey(null)
          }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[-4, 2, 8]} intensity={2} />
          <KeyboardModel {...props} />
          <OrbitControls makeDefault enablePan enableZoom enableRotate />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default KeyboardPreview3D