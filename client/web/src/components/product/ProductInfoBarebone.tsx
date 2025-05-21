import { BareboneDetail } from '@/types/product'
import InfoItem from './InfoItem'

interface ProductInfoBareboneProps {
  data: BareboneDetail
}

const ProductInfoBarebone = ({ data }: ProductInfoBareboneProps) => {
  return (
    <section className="w-full px-4 space-y-1">
      <h1 className="mb-2 text-2xl font-semibold break-all">{data.name}</h1>
      <h2 className="text-right font-bold text-tadak-warning text-3xl">
        {data.minPrice ? `${Number(data.minPrice).toLocaleString()}원` : '-'}
      </h2>

      <ul className="mt-8 space-y-2">
        <InfoItem title="제조사" value={data.manufacturer || '-'} />
        <InfoItem title="키 레이아웃" value={data.layout || '-'} />
        <InfoItem
          title="특징"
          value={data.features ? data.features.join(', ') : '-'}
        />
      </ul>
    </section>
  )
}

export default ProductInfoBarebone
