import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import * as THREE from 'three'

import EditorToolbar from './EditorToolbar'
import KeyboardModel from './KeyboardModel'
import NoKeyboardPlaceholder from './NoKeyboardPlaceholder'

import { useDeskStore } from '@/store/deskStore'

import '@/assets/styles/Slider.css'

type RotationMode = 'horizontal' | 'vertical' | null
type TransformMode = 'translate' | 'scale'

export interface Transform {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

export interface DeskCanvasProps {
  setIsDirty: (dirty: boolean) => void
  model3dUrl: string | null
  imageUrl: string
}

export type DeskCanvasHandle = {
  object: THREE.Object3D
  resetControls: () => void
}

const DeskCanvas = forwardRef<DeskCanvasHandle, DeskCanvasProps>(
  ({ setIsDirty, model3dUrl: initialModel3dUrl, imageUrl }, ref) => {
    const [isControlActive, setIsControlActive] = useState(false)
    const [horizontalRotation, setHorizontalRotation] = useState(0)
    const [verticalRotation, setVerticalRotation] = useState(0.6)
    const [rotationMode, setRotationMode] = useState<RotationMode>(null)
    const [transformMode, setTransformMode] = useState<TransformMode>('translate')

    const modelRef = useRef<THREE.Object3D>(null)
    const {
      model3dUrl: dynamicModel3dUrl,
      defaultTransform,
    } = useDeskStore()

    const effectiveModel3dUrl = dynamicModel3dUrl || initialModel3dUrl

    useEffect(() => {
      if (defaultTransform && modelRef.current) {
        const { position, rotation, scale } = defaultTransform

        modelRef.current.position.set(position.x, position.y, position.z ?? 0)
        modelRef.current.rotation.set(rotation.x, rotation.y, rotation.z)
        modelRef.current.scale.set(scale.x, scale.y, scale.z)
      }
    }, [defaultTransform])

    useImperativeHandle(ref, () => ({
      object: modelRef.current!,
      resetControls: () => {
        setIsControlActive(false)
        setRotationMode(null)
        setTransformMode('translate')
      },
    }))

    const handleSetRotationMode = (mode: RotationMode) => {
      if (modelRef.current) {
        const euler = new THREE.Euler().setFromQuaternion(
          modelRef.current.quaternion,
          'YXZ'
        )
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
          <img
            src={imageUrl}
            alt="Desk Background"
            className="w-full h-full object-contain"
          />
        </div>

        <Canvas className="absolute inset-0 z-10">
          <ambientLight intensity={2} />
          <directionalLight position={[2, 5, 2]} intensity={0.8} />
          <Environment preset="city" />
          {effectiveModel3dUrl && defaultTransform && (
            <KeyboardModel
              ref={modelRef}
              isControlActive={isControlActive}
              horizontalRotation={horizontalRotation}
              verticalRotation={verticalRotation}
              rotationMode={rotationMode}
              setIsDirty={setIsDirty}
              model3dUrl={effectiveModel3dUrl}
              defaultTransform={defaultTransform}
              transformMode={transformMode}
            />
          )}
          <OrbitControls enableRotate={false} />
        </Canvas>

        {!effectiveModel3dUrl && (
          <div className="absolute inset-0 z-20 flex justify-center items-center pointer-events-none">
            <NoKeyboardPlaceholder />
          </div>
        )}

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
            setTransformMode={setTransformMode}
            isControlActive={isControlActive}
            rotationMode={rotationMode}
            transformMode={transformMode}
            
          />
        </div>

        {rotationMode === 'horizontal' && (
          <div className="absolute bottom-3 left-2/3 -translate-x-1/2 z-20 bg-tadak-white border border-tadak-secondary rounded-xl px-4 py-2 flex items-center gap-2 w-[320px]">
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

        {/* <button
          className="absolute top-3 right-3 border p-2 rounded-md hover:bg-gray-100 z-20 bg-white bg-opacity-70 backdrop-blur"
          aria-label="전체화면"
        >
          <FullscreenIcon className="w-4 h-4" />
        </button> */}
      </div>
    )
  }
)

export default DeskCanvas