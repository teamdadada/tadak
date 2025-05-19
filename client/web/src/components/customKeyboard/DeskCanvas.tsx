import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import EditorToolbar from './EditorToolbar'
import KeyboardModel from './KeyboardModel'
import { ReactComponent as FullscreenIcon } from '@/assets/icons/fullscreen.svg'
import BasicDesk from '@/assets/images/basic.png'
import '@/assets/styles/Slider.css'

type RotationMode = 'horizontal' | 'vertical' | null

interface DeskCanvasProps {
  setIsDirty: (dirty: boolean) => void
}

// ✅ forwardRef로 외부에서 ref 접근 가능하도록 구성
const DeskCanvas = forwardRef<THREE.Object3D, DeskCanvasProps>(({ setIsDirty }, ref) => {
  const [isControlActive, setIsControlActive] = useState(false)
  const [horizontalRotation, setHorizontalRotation] = useState(0)
  const [verticalRotation, setVerticalRotation] = useState(0.6)
  const [rotationMode, setRotationMode] = useState<RotationMode>(null)

  const modelRef = useRef<THREE.Object3D>(null)

  // ✅ 부모에서 modelRef에 접근할 수 있도록 연결
  useImperativeHandle(ref, () => modelRef.current!)

  const handleSetRotationMode = (mode: RotationMode) => {
    if (modelRef.current) {
      const euler = new THREE.Euler().setFromQuaternion(modelRef.current.quaternion, 'YXZ')
      setHorizontalRotation(euler.y)
      setVerticalRotation(euler.x)
    }

    setIsControlActive(false)
    setRotationMode(prev => (prev === mode ? null : mode))
  }

  const handleHorizontalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontalRotation(parseFloat(e.target.value))
  }

  const handleVerticalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerticalRotation(parseFloat(e.target.value))
  }

  return (
    <div className="relative w-full h-[400px]">
      <div className="absolute inset-0 z-0">
        <img src={BasicDesk} alt="Desk Background" className="w-full h-full object-contain" />
      </div>

      <Canvas className="absolute inset-0 z-10">
        <ambientLight intensity={2} />
        <directionalLight position={[2, 5, 2]} intensity={0.8} />
        <Environment preset="city" />
        <KeyboardModel
          ref={modelRef}
          isControlActive={isControlActive}
          horizontalRotation={horizontalRotation}
          verticalRotation={verticalRotation}
          rotationMode={rotationMode}
          setIsDirty={setIsDirty}
        />
        <OrbitControls enableRotate={false} />
      </Canvas>

      <div className="absolute bottom-3 left-3 flex gap-2 z-20">
        <EditorToolbar
          toggleTransform={() => {
            setIsControlActive(prev => {
              const next = !prev
              if (!prev) setIsDirty(true)
              return next
            })
            setRotationMode(null)
          }}
          setRotationMode={handleSetRotationMode}
          isControlActive={isControlActive}
          rotationMode={rotationMode}
        />
      </div>

      {rotationMode === 'horizontal' && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 bg-tadak-white border border-tadak-secondary rounded-xl px-4 py-2 flex items-center gap-2 w-[320px]">
          <span className="text-sm text-tadak-secondary">-90°</span>
          <input
            type="range"
            min={-Math.PI / 2}
            max={Math.PI / 2}
            step={0.01}
            value={horizontalRotation}
            onChange={handleHorizontalChange}
            className="w-full accent-tadak-light-secondary custom-slider"
          />
          <span className="text-sm text-tadak-secondary">90°</span>
        </div>
      )}

      {rotationMode === 'vertical' && (
        <div className="absolute bottom-12 right-2.5 z-20 bg-tadak-white border border-tadak-secondary rounded-xl px-2 py-4 flex flex-col items-center h-[280px] w-[38px]">
          <span className="text-sm text-tadak-secondary mb-52">90°</span>
          <input
            type="range"
            min={-Math.PI / 2}
            max={Math.PI / 2}
            step={0.01}
            value={verticalRotation}
            onChange={handleVerticalChange}
            className="vertical-slider accent-tadak-light-secondary"
          />
          <span className="text-sm text-tadak-secondary">-90°</span>
        </div>
      )}

      <button
        className="absolute top-3 right-3 border p-2 rounded-md hover:bg-gray-100 z-20 bg-white bg-opacity-70 backdrop-blur"
        aria-label="전체화면"
      >
        <FullscreenIcon className="w-4 h-4" />
      </button>
    </div>
  )
})

export default DeskCanvas