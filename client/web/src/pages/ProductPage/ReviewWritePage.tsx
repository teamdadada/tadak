import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import ReviewImagePreview from '@/components/review/ReviewImagePreview'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { uploadImageToMinio } from '@/services/minioService'
import { postReview } from '@/services/reviewService'
import { ProductDetailBase } from '@/types/product'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ReviewWritePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product as ProductDetailBase

  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
      // 이미지 업로드
      const uploadedUrls = await Promise.all(
        images.map((file) => uploadImageToMinio('review', file)),
      )

      // 리뷰 등록
      await postReview(product.productId, {
        reviewContent: content,
        imageList: uploadedUrls,
      })

      toast.success('리뷰가 성공적으로 등록되었습니다!')
      navigate(-1)
    } catch (err) {
      console.error(err)
      toast.error('리뷰 등록 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-6xl gap-4 p-6 mx-auto">
      <h1 className="text-2xl font-semibold">리뷰 작성하기</h1>
      <ProductPreviewCard product={product} />
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
          className="px-4 py-2 text-xs transition border rounded w-fit h-fit text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-tadak-white"
        >
          이미지 추가
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
