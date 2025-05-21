import { KeycapDetail } from '@/types/product'
import InfoItem from './InfoItem'

interface ProductInfoKeycapProps {
  data: KeycapDetail
}

const ProductInfoKeycap = ({ data }: ProductInfoKeycapProps) => {
  return (
    <section className="w-full px-4 space-y-1">
      <h1 className="mb-2 text-2xl font-semibold break-all">{data.name}</h1>
      <h2 className="text-right font-bold text-tadak-warning text-3xl">
        {data.minPrice ? `${Number(data.minPrice).toLocaleString()}원` : '-'}
      </h2>
      <ul className="mt-8 space-y-2">
        <InfoItem title="키캡 재질" value={data.keycapMaterial || '-'} />
        {/* <InfoItem title="각인 위치" value={data.engravingPosition || '-'} /> */}
        <InfoItem title="키 수량" value={data.keyCount || '-'} />
      </ul>
    </section>
  )
}

export default ProductInfoKeycap
