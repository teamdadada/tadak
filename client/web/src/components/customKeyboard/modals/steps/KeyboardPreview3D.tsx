// components/customKeyboard/modals/steps/KeyboardPreview3D.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'

interface KeyboardPreview3DProps {
  layout: '풀배열' | '텐키리스'
  materialType: '금속' | '플라스틱'
  outerColor: string
}

const KeyboardModel = ({ layout, materialType, outerColor }: KeyboardPreview3DProps) => {
  const path = layout === '텐키리스' ? '/glbs/tklKeyboard.glb' : '/glbs/keyboard.glb'
  const { scene } = useGLTF(path)

  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh && obj.name === 'Cube') {
        const mesh = obj as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial

        mat.color = new THREE.Color(outerColor)
        mat.metalness = materialType === '금속' ? 1 : 0.1
        mat.roughness = materialType === '금속' ? 0.3 : 0.8
        mat.needsUpdate = true
      }
    })
  }, [scene, materialType, outerColor])

  return <primitive object={scene} scale={13} position={[0, 0.1, 0]} rotation={[0.8, 0, 0]} />
}

const KeyboardPreview3D = (props: KeyboardPreview3DProps) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-md shadow overflow-hidden">
      <Suspense fallback={<div className="text-center p-8">로딩 중...</div>}>
        <Canvas camera={{ position: [0, 3, 5], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[-4, 2, 8]} intensity={2} />
          <KeyboardModel {...props} />
          <OrbitControls enablePan enableZoom enableRotate />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default KeyboardPreview3D