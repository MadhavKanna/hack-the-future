"use client"

import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingBag, User, CreditCard, MapPin, FileText, Printer, Download } from "lucide-react"

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

interface PurchaseDetailsModalProps {
  purchase: Purchase
  isOpen: boolean
  onClose: () => void
}

export function PurchaseDetailsModal({ purchase, isOpen, onClose }: PurchaseDetailsModalProps) {
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
    <Modal isOpen={isOpen} onClose={onClose} title={`Order #${purchase.id}`} className="max-w-3xl">
      <div className="space-y-6">
        {/* Header Information */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{purchase.id}</h3>
                {getStatusBadge(purchase.status)}
              </div>
              <p className="text-sm text-gray-500">Placed on {purchase.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Payment Method</p>
              {getPaymentMethodBadge(purchase.paymentMethod)}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium">Customer Information</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{purchase.userName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium">{purchase.userId}</p>
            </div>
          </div>
        </div>

        {/* Tabs for Items, Addresses, and Receipt */}
        <Tabs defaultValue="items">
          <TabsList className="w-full">
            <TabsTrigger value="items" className="flex-1">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Items
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex-1">
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="receipt" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Receipt
            </TabsTrigger>
          </TabsList>

          {/* Items Tab */}
          <TabsContent value="items" className="mt-4">
            <div className="rounded-lg border">
              <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Order Items</div>
              <div className="divide-y">
                {purchase.items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t bg-gray-50 px-4 py-3 text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-bold">${purchase.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Shipping Address</h3>
                </div>
                <p className="whitespace-pre-line text-sm">{purchase.shippingAddress}</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Billing Address</h3>
                </div>
                <p className="whitespace-pre-line text-sm">{purchase.billingAddress}</p>
              </div>
            </div>
          </TabsContent>

          {/* Receipt Tab */}
          <TabsContent value="receipt" className="mt-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Receipt</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {purchase.receiptUrl ? (
                <div className="aspect-[8.5/11] w-full rounded-md border bg-white p-4">
                  <iframe
                    src={purchase.receiptUrl}
                    className="h-full w-full"
                    title={`Receipt for order ${purchase.id}`}
                  />
                </div>
              ) : (
                <div className="rounded-lg border bg-gray-50 p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">Receipt Preview</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This is a placeholder for the receipt. In a real application, this would display the actual receipt.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  )
}

