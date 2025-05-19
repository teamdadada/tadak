import { Button } from '../ui/button'

interface PayLinkButtonProps {
  href: string
}

const PayLinkButton = ({ href }: PayLinkButtonProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button className="w-full px-10 py-5 shadow-none bg-tadak-black border-tadak-black text-tadak-white border rounded-none hover:bg-tadak-black/90 hover:border-tadak-black ">
        구매하러가기
      </Button>{' '}
    </a>
  )
}

export default PayLinkButton
