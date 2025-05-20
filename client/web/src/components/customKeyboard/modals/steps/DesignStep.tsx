import { useState, useEffect, useRef } from 'react'
import StepIndicator from './StepIndicator'
import KeyboardPreview3D, { KeyboardPreview3DHandle } from './KeyboardPreview3D'
import ProductSummary from './ProductSummary'
import StepNavigation from './StepNavigation'
import StepBarebone from './StepBarebone'
import StepSwitch from './StepSwitch'
import StepKeycap from './StepKeycap'
import FinalProductList from './FinalProductList'
import FinalActions from './FinalActions'
import { KeyboardOptionsResponse } from '@/types/keyboard'
import { fetchSwitchProduct } from '@/services/keyboardService'
import { Product } from '@/types/product'

interface DesignStepProps {
  step: number
  setStep: (step: number) => void
  keyboardOptions: KeyboardOptionsResponse
  layout: '풀배열' | '텐키리스'
  setLayout: (layout: '풀배열' | '텐키리스') => void
  material: '금속' | '플라스틱'
  setMaterial: (material: '금속' | '플라스틱') => void
  outerColor: string
  setOuterColor: (color: string) => void
  basicColor: string
  setBasicColor: (color: string) => void
  pointColor: string
  setPointColor: (color: string) => void
  pointOption: 'none' | 'set' | 'custom'
  setPointOption: (option: 'none' | 'set' | 'custom') => void
  focusedKey: string | null
  setFocusedKey: (key: string | null) => void
  customKeyMap: Record<string, string>
  setCustomKeyMap: React.Dispatch<React.SetStateAction<Record<string, string>>>
  switchTypeName: string
  setSwitchTypeName: (name: string) => void
  bareboneProduct: Product | null
  setBareboneProduct: (product: Product | null) => void
  switchProduct: Product | null
  setSwitchProduct: (product: Product | null) => void
  keycapProduct: Product | null
  setKeycapProduct: (product: Product | null) => void
  onClose: () => void
  onRefresh: () => void
  onOpenCartConfirmModal: () => void
}

const DesignStep = ({
  step,
  setStep,
  keyboardOptions,
  layout,
  setLayout,
  material,
  setMaterial,
  outerColor,
  setOuterColor,
  basicColor,
  setBasicColor,
  pointColor,
  setPointColor,
  pointOption,
  setPointOption,
  focusedKey,
  setFocusedKey,
  customKeyMap,
  setCustomKeyMap,
  switchTypeName,
  setSwitchTypeName,
  bareboneProduct,
  setBareboneProduct,
  switchProduct,
  setSwitchProduct,
  keycapProduct,
  setKeycapProduct,
  onClose,
  onRefresh,
  onOpenCartConfirmModal,
}: DesignStepProps) => {
  const [switchTypeId, setSwitchTypeId] = useState<number | null>(null)
  const [keyboardName, setKeyboardName] = useState<string>('')

  const previewRef = useRef<KeyboardPreview3DHandle>(null)

  const switchOption = keyboardOptions.switch.type.find(opt => opt.name === switchTypeName)

  useEffect(() => {
    if (!switchTypeId && switchOption) {
      setSwitchTypeId(switchOption.id)
    }
  }, [switchTypeId, switchOption])

  const summaryStep = step === 1 ? 0 : step === 2 ? 1 : 2

  return (
    <>
      {step <= 3 ? (
        <StepIndicator step={step} />
      ) : (
        <h2 className="text-xl font-bold">완성 키보드</h2>
      )}

      <div className="flex mt-6 gap-4 h-[590px]">
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-center h-[400px]">
            <KeyboardPreview3D
              ref={previewRef}
              layout={layout}
              materialType={material}
              outerColor={outerColor}
              basicColor={basicColor}
              pointColor={pointColor}
              pointOption={pointOption}
              customKeyMap={customKeyMap}
              setCustomKeyMap={setCustomKeyMap}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
            />
          </div>
          <div className="mt-6 h-48 items-center justify-center">
            {step <= 3 ? (
              <ProductSummary
                step={summaryStep}
                layout={layout}
                material={material}
                outerColor={outerColor}
                type={switchTypeName}
                basicColor={basicColor}
                pointOption={pointOption}
                customKeyMap={customKeyMap}
                bareboneProduct={bareboneProduct}
                switchProduct={switchProduct}
                keycapProduct={keycapProduct}
              />
            ) : (
              <div className="flex flex-col items-start gap-4">
                {/* 이름 설정 input */}
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-base ml-1 font-semibold w-20">이름 설정 :</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="예: 내 커스텀 키보드 (최대 10자)"
                    value={keyboardName}
                    onChange={(e) => setKeyboardName(e.target.value)}
                    className="w-[280px] h-8 px-3 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                {/* 이전 버튼 */}
                <button
                  onClick={() => setStep(3)}
                  className="w-72 h-10 border border-gray-300 rounded text-tadak-dark-gray hover:bg-tadak-light-gray hover:border-tadak-light-gray mt-16"
                >
                  이전
                </button>
              </div>
            )}
            
          </div>
        </div>

        <div className="w-[600px] flex flex-col justify-start">
          <div className="flex-1 flex items-center justify-center text-2xl font-semibold">
            {step === 1 && (
              <StepBarebone
                layout={layout}
                setLayout={setLayout}
                material={material}
                setMaterial={setMaterial}
                outerColor={outerColor}
                setOuterColor={setOuterColor}
                layoutOptions={keyboardOptions.barebone.layout}
                materialOptions={keyboardOptions.barebone.material}
                onProductChange={setBareboneProduct}
              />
            )}
            {step === 2 && (
              <StepSwitch
                switchOptions={keyboardOptions.switch.type}
                selectedName={switchTypeName}
                onSelect={async (id, name) => {
                  setSwitchTypeId(id)
                  setSwitchTypeName(name)
                  try {
                    const res = await fetchSwitchProduct(id)
                    setSwitchProduct(res?.[0] ?? null)
                  } catch {
                    setSwitchProduct(null)
                  }
                }}
              />
            )}
            {step === 3 && (
              <StepKeycap
                basicColor={basicColor}
                setBasicColor={setBasicColor}
                pointColor={pointColor}
                setPointColor={setPointColor}
                pointOption={pointOption}
                setPointOption={setPointOption}
                focusedKey={focusedKey}
                setFocusedKey={setFocusedKey}
                customKeyMap={customKeyMap}
                setCustomKeyMap={setCustomKeyMap}
                onProductChange={setKeycapProduct}
              />
            )}
            {step === 4 && (
              <FinalProductList
                bareboneProduct={bareboneProduct}
                switchProduct={switchProduct}
                keycapProduct={keycapProduct}
                layout={layout}
                material={material}
                outerColor={outerColor}
                switchType={switchTypeName}
                basicColor={basicColor}
                pointOption={pointOption}
                customKeyMap={customKeyMap}
              />
            )}
          </div>
            {step <= 3 ? (
              <StepNavigation step={step} setStep={setStep} />
            ) : (
              <FinalActions
              keyboardName={keyboardName}
              layout={layout}
              material={material}
              switchTypeName={switchTypeName}
              keyboardOptions={keyboardOptions}
              outerColor={outerColor}
              basicColor={basicColor}
              pointColor={pointColor}
              pointOption={pointOption}
              customKeyMap={customKeyMap}
              selectedProductIds={[
                bareboneProduct?.productId!,
                switchProduct?.productId!,
                keycapProduct?.productId!,
              ]}
              totalPrice={
                (bareboneProduct?.price || 0) +
                (switchProduct?.price || 0) +
                (keycapProduct?.price || 0) +
                (pointOption === 'set'
                  ? 5500
                  : pointOption === 'custom'
                  ? Object.keys(customKeyMap).length * 500
                  : 0)
              }
              exportGLB={previewRef.current?.exportGLB}
              captureImage={previewRef.current?.captureImage}
              onClose={onClose}
              onRefresh={onRefresh}
              onOpenCartConfirmModal={onOpenCartConfirmModal}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default DesignStep