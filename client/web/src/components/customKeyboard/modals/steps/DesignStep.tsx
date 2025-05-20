import { useState, useEffect } from 'react'
import StepIndicator from './StepIndicator'
import KeyboardPreview3D from './KeyboardPreview3D'
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
}

const DesignStep = ({ step, setStep, keyboardOptions }: DesignStepProps) => {
  const [layout, setLayout] = useState<'풀배열' | '텐키리스'>('풀배열')
  const [material, setMaterial] = useState<'금속' | '플라스틱'>('금속')
  const [outerColor, setOuterColor] = useState('#ffffff')
  const [basicColor, setBasicColor] = useState('#ffffff')

  const [pointColor, setPointColor] = useState('#FFFFFF')
  const [pointOption, setPointOption] = useState<'none' | 'set' | 'custom'>('none')
  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const [customKeyMap, setCustomKeyMap] = useState<Record<string, string>>({})

  const [bareboneProduct, setBareboneProduct] = useState<Product | null>(null)
  const [switchProduct, setSwitchProduct] = useState<Product | null>(null)
  const [keycapProduct, setKeycapProduct] = useState<Product | null>(null)

  const [switchTypeId, setSwitchTypeId] = useState<number | null>(null)
  const [switchTypeName, setSwitchTypeName] = useState<string>('청축')

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
              <FinalActions />
            )}
        </div>
      </div>
    </>
  )
}

export default DesignStep