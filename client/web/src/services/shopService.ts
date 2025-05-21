import http from './http-common'
import { SHOP_END_POINT } from './endPoints'

// import bearboneMock from '@/mocks/shop/bareboneFilters.json'
// import switchMock from '@/mocks/shop/switchFilters.json'
// import keycapMock from '@/mocks/shop/keycapFilters.json'
// import bearboneList from '@/mocks/shop/bareboneProducts.json'
// import switchList from '@/mocks/shop/switchProducts.json'
// import keycapList from '@/mocks/shop/keycapProducts.json'
// import rawProductDetails from '@/mocks/shop/productDetails.json'
// import { ProductDetail } from '@/types/product'
import {
  BareboneFilter,
  ProductListResponse,
  // FilterByType,
  KeycapFilter,
  ProductType,
  SwitchFilter,
  SearchProductParams,
} from '@/types/shop'

export const getBearboneFilters = async (): Promise<BareboneFilter> => {
  const { data } = await http.get(SHOP_END_POINT.FILTER.BEARBONE)
  return data
  // return new Promise(
  //   (resolve) => setTimeout(() => resolve(bearboneMock), 300), // 0.3초 딜레이로 실제처럼
  // )
}

export const getSwitchFilters = async (): Promise<SwitchFilter> => {
  const { data } = await http.get(SHOP_END_POINT.FILTER.SWITCH)
  return data
  // return new Promise((resolve) => setTimeout(() => resolve(switchMock), 300))
}

export const getKeycapFilters = async (): Promise<KeycapFilter> => {
  const { data } = await http.get(SHOP_END_POINT.FILTER.KEYCAP)
  return data
  // return new Promise((resolve) => setTimeout(() => resolve(keycapMock), 300))
}

export const getProducts = async ({
  type,
  cursor = null,
  size = 10,
  sort = 'LATEST',
  ...filters
}: {
  type: ProductType
  cursor?: string | null
  size?: number
  sort?: 'LATEST' | 'POPULAR'
}): Promise<ProductListResponse> => {
  const { data } = await http.get(SHOP_END_POINT.PRODUCT.LIST, {
    params: { type, cursor, size, sort, ...filters },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // 배열의 각 요소를 같은 키로 반복하여 직렬화 (리핏 방식)
          value.forEach((v) => searchParams.append(key, v))
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value as string)
        }
      })

      return searchParams.toString()
    },
  })
  return {
    list: data.list, // 서버에서 list로 받아온 데이터를 그대로 사용
    hasNext: data.hasNext, // 서버의 hasNext 값을 그대로 사용
    lastCursor: data.lastCursor, // 서버의 lastCursor를 그대로 사용
  }
}

export const getSearchedProducts = async ({
  query,
  cursor = null,
  size = 10,
}: SearchProductParams): Promise<ProductListResponse> => {
  const { data } = await http.get(SHOP_END_POINT.PRODUCT.LIST, {
    params: { query, cursor, size },
  })

  return {
    list: data.list,
    hasNext: data.hasNext,
    lastCursor: data.lastCursor,
  }
}

export const getTopProducts = async ({
  cursor = null,
  size = 5,
}): Promise<ProductListResponse> => {
  const { data } = await http.get(SHOP_END_POINT.PRODUCT.TOP_LIST, {
    params: { cursor, size },
  })

  return {
    list: data.list,
    hasNext: data.hasNext,
    lastCursor: data.lastCursor,
  }
}

export const getProductDetail = async (
  type: ProductType,
  id: string | number,
) => {
  const endPoint = SHOP_END_POINT.PRODUCT.DETAIL(type)
  if (!endPoint) {
    throw new Error(`Invalid product type: ${type}`)
  }

  const { data } = await http.post(`${endPoint}?product_id=${id}`)
  return data
}
