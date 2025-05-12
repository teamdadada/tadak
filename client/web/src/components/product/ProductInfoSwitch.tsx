import { SwitchDetail } from '@/types/product'
import InfoItem from './InfoItem'

interface ProductInfoSwitchProps {
  data: SwitchDetail
}
const ProductInfo = ({ data }: ProductInfoSwitchProps) => {
  return (
    <section className="w-full px-4 space-y-1">
      <h1 className="mb-8 text-2xl font-semibold">{data.name}</h1>
      <ul className="space-y-2">
        {/* <li className="flex items-center justify-between">
          <InfoItem title="스위치 방식" value={data.switchType || '-'} />
          <Button
            variant="outline"
            size="sm"
            className="px-2 py-1 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white"
          >
            타건샵에서 체험하기
          </Button>
        </li> */}
        <InfoItem
          title="키압"
          value={data.keyForce ? `${data.keyForce}` : '-'}
        />
        <InfoItem title="개수" value={data.quantity ? data.quantity : '-'} />
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

export default ProductInfo
