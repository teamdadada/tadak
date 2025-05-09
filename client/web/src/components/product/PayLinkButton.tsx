import { Button } from '../ui/button'

interface PayLinkButtonProps {
  href: string
}

const PayLinkButton = ({ href }: PayLinkButtonProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        variant="default"
        size="lg"
        className="bg-tadak-primary text-tadak-white"
      >
        구매하러가기
      </Button>{' '}
    </a>
  )
}

export default PayLinkButton
