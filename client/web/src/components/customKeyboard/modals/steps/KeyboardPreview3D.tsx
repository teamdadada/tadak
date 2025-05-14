import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

const TKLKeyboardModel = () => {
  const { scene } = useGLTF('/glbs/tklKeyboard.glb')
  return <primitive object={scene} scale={13} position={[0, 0.1, 0]} rotation={[0.8, 0, 0]}/>
}

const KeyboardPreview3D = () => {
  return (
    <div className="w-full h-[400px] bg-white rounded-md shadow overflow-hidden">
      <Suspense fallback={<div className="text-center p-8">로딩 중...</div>}>
        <Canvas camera={{ position: [0, 3, 5], fov: 45 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[-4, 2, 8]} intensity={2} />
          <TKLKeyboardModel />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default KeyboardPreview3D