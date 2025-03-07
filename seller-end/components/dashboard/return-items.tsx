"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"

// Sample return data
const recentReturns = [
  {
    id: "RTN-1001",
    orderNumber: "ORD-5789",
    productName: "Nike Air Max Running Shoes",
    quantity: 1,
    price: 129.99,
    returnReason: "Wrong Size",
    condition: "New",
    customer: "John Smith",
    date: "Mar 5, 2025",
    status: "Pending",
    image: "/placeholder.svg?height=64&width=64",
    aiReasoning:
      "Customer ordered wrong size. Product is in new condition with original packaging. Recommend approval for resale as new.",
    dispositionPath: "Resell as New",
    aiConfidence: 95,
  },
  {
    id: "RTN-1002",
    orderNumber: "ORD-6023",
    productName: "Wireless Noise-Cancelling Headphones",
    quantity: 1,
    price: 199.99,
    returnReason: "Defective",
    condition: "Like New",
    customer: "Emily Johnson",
    date: "Mar 3, 2025",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
    aiReasoning:
      "Customer reports intermittent connection issues. Diagnostic test confirms hardware fault. Product appears undamaged externally.",
    dispositionPath: "Refurbish",
    aiConfidence: 88,
  },
  {
    id: "RTN-1003",
    orderNumber: "ORD-5901",
    productName: "Organic Cotton T-Shirt Pack (3)",
    quantity: 1,
    price: 49.99,
    returnReason: "Changed Mind",
    condition: "New",
    customer: "Michael Davis",
    date: "Mar 1, 2025",
    status: "Processed",
    image: "/placeholder.svg?height=64&width=64",
    aiReasoning:
      "Customer changed mind about color. Product is in new condition with tags attached. Return is within 30-day window.",
    dispositionPath: "Resell as New",
    aiConfidence: 97,
  },
]

export function ReturnItems() {
  const [selectedReturn, setSelectedReturn] = useState<(typeof recentReturns)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleReturnClick = (returnItem: (typeof recentReturns)[0]) => {
    setSelectedReturn(returnItem)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-purple-100 text-purple-800">Pending</Badge>
      case "processed":
        return <Badge className="bg-pink-100 text-pink-800">Processed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getConfidenceBadge = (confidence: number) => {
    let color = "text-red-600"
    if (confidence >= 90) color = "text-primary"
    else if (confidence >= 75) color = "text-secondary"
    else if (confidence >= 60) color = "text-accent"

    return <span className={`text-sm font-medium ${color}`}>{confidence}%</span>
  }

  return (
    <>
      <div className="space-y-4">
        {recentReturns.map((returnItem) => (
          <div
            key={returnItem.id}
            className="flex cursor-pointer items-center gap-4 rounded-md p-2 transition-colors hover:bg-gray-50"
            onClick={() => handleReturnClick(returnItem)}
          >
            <div className="h-16 w-16 rounded bg-gray-200 p-2">
              <img
                src={returnItem.image || "/placeholder.svg"}
                alt={returnItem.productName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{returnItem.productName}</h4>
              <p className="text-sm text-gray-500">
                Order #{returnItem.orderNumber} • {returnItem.date}
              </p>
            </div>
            {getStatusBadge(returnItem.status)}
          </div>
        ))}
      </div>

      {/* Return Details Modal */}
      {selectedReturn && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Return Details">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded bg-gray-200 p-2">
                <img
                  src={selectedReturn.image || "/placeholder.svg"}
                  alt={selectedReturn.productName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{selectedReturn.productName}</h3>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusBadge(selectedReturn.status)}
                  <span className="text-sm text-gray-500">Return #{selectedReturn.id}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{selectedReturn.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Submitted</p>
                <p className="font-medium">{selectedReturn.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedReturn.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${selectedReturn.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Return Reason</p>
                <p className="font-medium">{selectedReturn.returnReason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium">{selectedReturn.condition}</p>
              </div>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">AI Analysis</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Confidence:</span>
                  {getConfidenceBadge(selectedReturn.aiConfidence)}
                </div>
              </div>
              <p className="text-sm">{selectedReturn.aiReasoning}</p>
            </div>

            <div className="rounded-md bg-blue-50 p-3">
              <h4 className="mb-2 font-medium">Recommended Disposition</h4>
              <p className="text-sm">{selectedReturn.dispositionPath}</p>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="mb-2 font-medium">Return Processing</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-medium">{selectedReturn.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Refund Amount</span>
                  <span className="text-sm font-medium">${selectedReturn.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Processing Time</span>
                  <span className="text-sm font-medium">2-3 business days</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

