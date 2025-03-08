import { Header } from "@/components/header"
import { OrdersList } from "@/components/orders-list"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Orders" />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-medium mb-6">Recent orders</h1>
        <OrdersList />
      </main>
    </div>
  )
}

