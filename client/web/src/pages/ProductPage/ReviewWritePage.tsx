import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import ReviewImagePreview from '@/components/review/ReviewImagePreview'
import StarRating from '@/components/review/StarRating'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { uploadImageToMinio } from '@/services/minioService'
import { postReview } from '@/services/reviewService'
import { ProductDetailBase } from '@/types/product'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface ErrorResponse {
  code: string
  message: string
}

const ReviewWritePage = () => {
  const navigate = useNavigate()

  const [score, setScore] = useState(0)
  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[] | null>(
    null,
  )

  const stored = sessionStorage.getItem('reviewProduct')

  if (!stored) {
    toast.error('상품 정보가 없습니다.')
    navigate('/')
    return null
  }
  const product = JSON.parse(stored) as ProductDetailBase

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedFiles = Array.from(e.target.files)

    setImages((prevImages) => {
      const existingSet = new Set(
        prevImages.map((file) => `${file.name}-${file.size}`),
      )

      const newFiles = selectedFiles.filter(
        (file) => !existingSet.has(`${file.name}-${file.size}`),
      )

      return [...prevImages, ...newFiles]
    })

    // 선택 후 input 초기화 (같은 파일 다시 선택 가능하게)
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('리뷰 내용을 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)

      // 이미 업로드한 이미지가 있다면 재사용
      let imageUrlsOnly = uploadedImageUrls
      if (!imageUrlsOnly) {
        const uploaded = await Promise.all(
          images.map((file) => uploadImageToMinio('review', file)),
        )
        imageUrlsOnly = uploaded.map((item) => item.url)
        setUploadedImageUrls(imageUrlsOnly)
      }

      // 리뷰 등록
      await postReview(product.productId, {
        reviewScore: score,
        reviewContent: content,
        imageList: imageUrlsOnly,
      })

      toast.success('리뷰가 성공적으로 등록되었습니다!')
      navigate(-1)
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>

      const res = error.response

      if (res?.status === 401 && res.data?.code === 'B4015') {
        toast.error('로그인이 필요한 기능입니다.')
      } else if (res?.status === 409 && res.data?.code === 'R4090') {
        toast.error('이미 작성한 리뷰가 존재합니다.')
      } else if (res?.status === 500 && res.data?.code === 'S5000') {
        toast.error(res.data.message || '서버 오류가 발생했습니다.')
      } else {
        toast.error('리뷰 등록 중 예상치 못한 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-6xl gap-4 p-6 mx-auto">
      <h1 className="text-2xl font-semibold">리뷰 작성하기</h1>
      <ProductPreviewCard product={product} />
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-tadak-dark-gray">별점</span>
        <StarRating score={score} onChange={setScore} />
      </div>
      <div className="flex flex-wrap items-end gap-2">
        {images.map((file, idx) => (
          <ReviewImagePreview
            key={idx}
            file={file}
            onRemove={() => handleRemoveImage(idx)}
          />
        ))}
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer text-tadak-secondary border-tadak-secondary hover:bg-tadak-light-gray"
        >
          <span className="text-3xl">＋</span>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          className="hidden"
        />
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰를 입력해주세요"
        rows={5}
        className="flex mt-4"
        maxLength={255}
      />
      <div className="text-sm text-right text-tadak-gray">
        {content.length} / 255자
      </div>
      <Button
        size="default"
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 py-2 ml-auto text-xs transition"
      >
        {isLoading ? '등록 중...' : '리뷰 등록'}
      </Button>
    </div>
  )
}

export default ReviewWritePage
