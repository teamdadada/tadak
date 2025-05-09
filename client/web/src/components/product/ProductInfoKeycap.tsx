import { KeycapDetail } from '@/types/product'
import InfoItem from './InfoItem'

interface ProductInfoKeycapProps {
  data: KeycapDetail
}

const ProductInfoKeycap = ({ data }: ProductInfoKeycapProps) => {
  return (
    <section className="w-full px-4 space-y-1">
      <h1 className="mb-8 text-2xl font-semibold">{data.name}</h1>
      <ul className="space-y-2">
        <InfoItem title="키캡 재질" value={data.keycapMaterial || '-'} />
        <InfoItem title="각인 위치" value={data.engravingPosition || '-'} />
        <InfoItem title="키 수량" value={data.keyCount || '-'} />
        <InfoItem
          title="가격"
          value={
            data.minPrice ? `${Number(data.minPrice).toLocaleString()}원` : '-'
          }
        />
      </ul>
    </section>
  )
}

export default ProductInfoKeycap
