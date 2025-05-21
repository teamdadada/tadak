const NoKeyboardPlaceholder = () => {
  return (
    <div className="w-72 h-28 flex flex-col justify-center items-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center px-4">
      <p className="text-lg font-semibold text-tadak-black mb-2">키보드가 아직 없어요!</p>
      <p className="text-sm text-tadak-dark-gray">
        키보드를 만들고 책상 위에 배치해보세요.
      </p>
    </div>
  )
}

export default NoKeyboardPlaceholder
