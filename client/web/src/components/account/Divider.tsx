type DividerProps = {
  text?: string
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className={`flex items-center my-6`}>
      <div className="flex-grow h-[1px] bg-gray-300"></div>
      <span className="px-4 text-sm text-gray-400 font-bold">{text}</span>
      <div className="flex-grow h-[1px] bg-gray-300"></div>
    </div>
  )
}

export default Divider
