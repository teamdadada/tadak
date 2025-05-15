interface ReviewImagePreviewProps {
  file: File
  onRemove: () => void
}

const ReviewImagePreview = ({ file, onRemove }: ReviewImagePreviewProps) => {
  const imageUrl = URL.createObjectURL(file)

  return (
    <div className="relative w-24 h-24">
      <img
        src={imageUrl}
        alt="리뷰 이미지 미리보기"
        className="object-cover w-full h-full border rounded"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-[-6px] right-[-6px] z-10 w-5 h-5 text-xs text-tadak-white bg-tadak-warning rounded-full"
      >
        ✕
      </button>
    </div>
  )
}

export default ReviewImagePreview
