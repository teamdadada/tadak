import { BareboneDetail } from '@/types/product'
import InfoItem from './InfoItem'

interface ProductInfoBareboneProps {
  data: BareboneDetail
}

const ProductInfoBarebone = ({ data }: ProductInfoBareboneProps) => {
  return (
    <section className="w-full px-4 space-y-1">
      <h1 className="mb-8 text-2xl font-semibold">{data.name}</h1>
      <ul className="space-y-2">
        <InfoItem title="제조사" value={data.manufacturer || '-'} />
        <InfoItem title="키 레이아웃" value={data.keyLayout || '-'} />
        <InfoItem
          title="특징"
          value={data.features ? data.features.join(', ') : '-'}
        />
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

export default ProductInfoBarebone
