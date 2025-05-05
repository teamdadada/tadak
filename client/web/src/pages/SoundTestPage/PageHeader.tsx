interface PageHeaderProps {
  title: string
  description: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2 py-8">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  )
}

export default PageHeader
