import { ShopifyHeader } from "@/components/shopify-header"
import { OrdersList } from "@/components/orders-list"

export default function ShopifyOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopifyHeader />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-medium mb-6 text-[#004C3F]">Recent orders</h1>
        <OrdersList />
      </main>
    </div>
  )
}

