"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Package, ArrowDownLeft, Mail, Phone, MapPin, CreditCard } from "lucide-react"

interface Purchase {
  id: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: string
}

interface Return {
  id: string
  orderId: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
    reason: string
    condition: string
  }[]
  total: number
  status: string
}

interface UserDetailsProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    avatar?: string
    phone?: string
    joinDate?: string
    lastActive?: string
    address?: string
    socialCredit: number
    purchases: Purchase[]
    returns: Return[]
  }
  isOpen: boolean
  onClose: () => void
}

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsProps) {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false)
  const [showReturnDetails, setShowReturnDetails] = useState(false)

  const getSocialCreditColor = (score: number) => {
    if (score >= 800) return "text-green-600"
    if (score >= 600) return "text-blue-600"
    if (score >= 400) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return <Badge variant="success">{status}</Badge>
      case "processing":
      case "shipped":
        return <Badge variant="info">{status}</Badge>
      case "pending":
        return <Badge variant="warning">{status}</Badge>
      case "cancelled":
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handlePurchaseClick = (purchase: Purchase) => {
    setSelectedPurchase(purchase)
    setShowPurchaseDetails(true)
  }

  const handleReturnClick = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setShowReturnDetails(true)
  }

  const closePurchaseDetails = () => {
    setShowPurchaseDetails(false)
  }

  const closeReturnDetails = () => {
    setShowReturnDetails(false)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={`User Profile: ${user.name}`} className="max-w-3xl">
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                {user.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline">ID: {user.id}</Badge>
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge variant={user.status.toLowerCase() === "active" ? "success" : "warning"}>{user.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{user.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Credit Score */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Social Credit Score</h3>
              </div>
              <div className={`text-xl font-bold ${getSocialCreditColor(user.socialCredit)}`}>{user.socialCredit}</div>
            </div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${
                    user.socialCredit >= 800
                      ? "bg-green-500"
                      : user.socialCredit >= 600
                        ? "bg-blue-500"
                        : user.socialCredit >= 400
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(100, (user.socialCredit / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {user.socialCredit >= 800
                ? "Excellent customer, eligible for premium benefits"
                : user.socialCredit >= 600
                  ? "Good standing, standard benefits apply"
                  : user.socialCredit >= 400
                    ? "Fair standing, some restrictions may apply"
                    : "Poor standing, restrictions apply"}
            </div>
          </div>

          {/* Tabs for Purchases and Returns */}
          <Tabs defaultValue="purchases">
            <TabsList className="w-full">
              <TabsTrigger value="purchases" className="flex-1">
                <Package className="mr-2 h-4 w-4" />
                Purchases ({user.purchases.length})
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex-1">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Returns ({user.returns.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="mt-4">
              <div className="rounded-lg border">
                <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Recent Purchases</div>
                <div className="divide-y">
                  {user.purchases.length > 0 ? (
                    user.purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                        onClick={() => handlePurchaseClick(purchase)}
                      >
                        <div>
                          <div className="font-medium">Order #{purchase.id}</div>
                          <div className="text-sm text-gray-500">{purchase.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-medium">${purchase.total.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">{purchase.items.length} items</div>
                          </div>
                          {getStatusBadge(purchase.status)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No purchase history available</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="returns" className="mt-4">
              <div className="rounded-lg border">
                <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Recent Returns</div>
                <div className="divide-y">
                  {user.returns.length > 0 ? (
                    user.returns.map((returnItem) => (
                      <div
                        key={returnItem.id}
                        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                        onClick={() => handleReturnClick(returnItem)}
                      >
                        <div>
                          <div className="font-medium">Return #{returnItem.id}</div>
                          <div className="text-sm text-gray-500">
                            Order #{returnItem.orderId} • {returnItem.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-medium">${returnItem.total.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">{returnItem.items.length} items</div>
                          </div>
                          {getStatusBadge(returnItem.status)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No return history available</div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Modal>

      {/* Purchase Details Modal */}
      {selectedPurchase && (
        <Modal isOpen={showPurchaseDetails} onClose={closePurchaseDetails} title={`Order #${selectedPurchase.id}`}>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Date: {selectedPurchase.date}</div>
              <div>{getStatusBadge(selectedPurchase.status)}</div>
            </div>

            <div className="rounded-lg border">
              <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Items</div>
              <div className="divide-y">
                {selectedPurchase.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t bg-gray-50 px-4 py-3 text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-bold">${selectedPurchase.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Return Details Modal */}
      {selectedReturn && (
        <Modal isOpen={showReturnDetails} onClose={closeReturnDetails} title={`Return #${selectedReturn.id}`}>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500">Date: {selectedReturn.date}</div>
                <div className="text-sm text-gray-500">Order: #{selectedReturn.orderId}</div>
              </div>
              <div>{getStatusBadge(selectedReturn.status)}</div>
            </div>

            <div className="rounded-lg border">
              <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Returned Items</div>
              <div className="divide-y">
                {selectedReturn.items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.name}</div>
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div>Qty: {item.quantity}</div>
                      <div>Reason: {item.reason}</div>
                      <div>Condition: {item.condition}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t bg-gray-50 px-4 py-3 text-right">
                <div className="text-sm text-gray-500">Total Refund</div>
                <div className="text-lg font-bold">${selectedReturn.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

