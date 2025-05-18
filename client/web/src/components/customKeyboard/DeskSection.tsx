import { useRef, useState } from 'react'
import DeskCanvas from './DeskCanvas'
import ActionButtons from './ActionButtons'
import * as THREE from 'three'

const DeskSection = () => {
  const [isDirty, setIsDirty] = useState(false)
  const modelRef = useRef<THREE.Object3D>(null)

  const handleSave = () => {
    const model = modelRef.current
    if (model) {
      const { position, rotation, scale } = model
      console.log('💾 저장 시 키보드 정보')
      console.log('위치 (position):', position)
      console.log('회전 (rotation, degrees):', {
        x: THREE.MathUtils.radToDeg(rotation.x),
        y: THREE.MathUtils.radToDeg(rotation.y),
        z: THREE.MathUtils.radToDeg(rotation.z),
      })
      console.log('크기 (scale):', scale)
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <h2 className="text-lg font-semibold mb-3">나의 타닥 데스크</h2>

      <div className="relative border rounded-lg bg-white flex-1 h-[400px]">
        <DeskCanvas ref={modelRef} setIsDirty={setIsDirty} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <ActionButtons isDirty={isDirty} onSave={handleSave} />
      </div>
    </div>
  )
}

export default DeskSection