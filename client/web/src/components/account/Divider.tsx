type DividerProps = {
  text?: string
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className={`flex items-center my-6`}>
      <div className="flex-grow h-[1px] bg-tadak-gray"></div>
      <span className="px-4 text-sm text-tadak-gray font-bold">{text}</span>
      <div className="flex-grow h-[1px] bg-tadak-gray"></div>
    </div>
  )
}

export default Divider
