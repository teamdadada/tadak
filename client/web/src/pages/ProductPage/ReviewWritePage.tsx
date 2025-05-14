import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import ReviewImagePreview from '@/components/review/ReviewImagePreview'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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

    setIsLoading(true)

    setTimeout(() => {
      console.log('리뷰내용: ', content)
      console.log('이미지 개수: ', images.length)
      toast.success('리뷰가 성공적으로 등록되었습니다!')
      setIsLoading(false)
      navigate(-1)
    }, 500)
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
          className="px-4 py-2 text-xs transition border rounded w-fit h-fit text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white"
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
      />
      <Button
        size="default"
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 py-2 ml-auto mr-4 text-xs transition"
      >
        {isLoading ? '등록 중...' : '리뷰 등록'}
      </Button>
    </div>
  )
}

export default ReviewWritePage
