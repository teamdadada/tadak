interface InfoItemProps {
  title: string
  value: string | number | string[]
}

const InfoItem = ({ title, value }: InfoItemProps) => {
  return (
    <li className="flex items-start space-x-8 text-sm text-tadak-black">
      <span className="font-medium min-w-[70px]">{title}</span>
      <span>{Array.isArray(value) ? value.join(', ') : value}</span>
    </li>
  )
}

export default InfoItem
