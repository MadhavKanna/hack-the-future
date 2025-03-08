import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ShopifyPageHeaderProps {
  title: string
  showBackButton?: boolean
}

export function ShopifyPageHeader({ title, showBackButton = false }: ShopifyPageHeaderProps) {
  // Format current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="bg-[#008060] text-white border-b border-[#006e52]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <Link href="/shopify" className="mr-4 text-gray-100 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <h1 className="text-xl font-medium">{title}</h1>
          </div>
          <div className="text-sm text-gray-100">{currentDate}</div>
        </div>
      </div>
    </header>
  )
}

