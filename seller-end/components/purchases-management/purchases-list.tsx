"use client"

import { useState } from "react"
import { ShoppingBag, User, Calendar, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PurchaseDetailsModal } from "./purchase-details-modal"

interface PurchaseItem {
  name: string
  sku: string
  quantity: number
  price: number
  image?: string
}

interface Purchase {
  id: string
  userId: string
  userName: string
  date: string
  items: PurchaseItem[]
  totalAmount: number
  status: "completed" | "processing" | "shipped" | "cancelled"
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "store_credit"
  shippingAddress: string
  billingAddress: string
  receiptUrl?: string
}

interface PurchasesListProps {
  purchases: Purchase[]
}

export function PurchasesList({ purchases }: PurchasesListProps) {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handlePurchaseClick = (purchase: Purchase) => {
    setSelectedPurchase(purchase)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "processing":
        return <Badge variant="info">Processing</Badge>
      case "shipped":
        return <Badge variant="warning">Shipped</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case "credit_card":
        return <Badge className="bg-blue-100 text-blue-800">Credit Card</Badge>
      case "paypal":
        return <Badge className="bg-indigo-100 text-indigo-800">PayPal</Badge>
      case "bank_transfer":
        return <Badge className="bg-green-100 text-green-800">Bank Transfer</Badge>
      case "store_credit":
        return <Badge className="bg-purple-100 text-purple-800">Store Credit</Badge>
      default:
        return <Badge>{method.replace(/_/g, " ")}</Badge>
    }
  }

  return (
    <>
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md"
            onClick={() => handlePurchaseClick(purchase)}
          >
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Order #{purchase.id}</h3>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">{getStatusBadge(purchase.status)}</div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-5">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium">{purchase.userName}</p>
                  <p className="text-xs text-gray-500">ID: {purchase.userId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium">{purchase.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-sm font-medium">${purchase.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Items</p>
                  <p className="text-sm font-medium">{purchase.items.length}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <div className="mt-1">{getPaymentMethodBadge(purchase.paymentMethod)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Details Modal */}
      {selectedPurchase && (
        <PurchaseDetailsModal purchase={selectedPurchase} isOpen={showDetails} onClose={closeDetails} />
      )}
    </>
  )
}

