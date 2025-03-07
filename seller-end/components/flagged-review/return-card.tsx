"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Package,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfidenceBadge } from "./confidence-badge"

interface ReturnItem {
  id: string
  productName: string
  sku: string
  quantity: number
  price: number
  reason: string
  condition: string
  image?: string
}

interface ReturnData {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    purchaseHistory: number
  }
  dateSubmitted: string
  items: ReturnItem[]
  totalValue: number
  status: "pending" | "approved" | "rejected" | "more_info"
  aiConfidence: number
  aiReasoning: string
  flagReason: string
}

interface ReturnCardProps {
  returnData: ReturnData
  onAction: (id: string, action: "approve" | "reject" | "request_info") => void
}

export function ReturnCard({ returnData, onAction }: ReturnCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "more_info":
        return <Badge variant="warning">More Info Needed</Badge>
      default:
        return <Badge variant="info">Pending Review</Badge>
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
      case "like new":
        return "text-green-600"
      case "good":
      case "used":
        return "text-yellow-600"
      case "damaged":
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Return #{returnData.id}</h3>
            <p className="text-sm text-gray-500">Order #{returnData.orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(returnData.status)}
          <button onClick={() => setExpanded(!expanded)} className="rounded-full p-1 hover:bg-gray-100">
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Card Summary (always visible) */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-medium">{returnData.customer.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Date Submitted</p>
            <p className="text-sm font-medium">{returnData.dateSubmitted}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Total Value</p>
            <p className="text-sm font-medium">${returnData.totalValue.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">AI Confidence</p>
            <ConfidenceBadge score={returnData.aiConfidence} size="sm" />
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t">
          {/* Return Items */}
          <div className="p-4">
            <h4 className="mb-3 font-medium">Return Items</h4>
            <div className="space-y-3">
              {returnData.items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-md border p-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h5 className="font-medium">{item.productName}</h5>
                        <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Reason:</span> {item.reason}
                      </div>
                      <div>
                        <span className="text-gray-500">Condition:</span>{" "}
                        <span className={getConditionColor(item.condition)}>{item.condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium">AI Analysis</h4>
              <ConfidenceBadge score={returnData.aiConfidence} />
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="text-sm">{returnData.aiReasoning}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-orange-600">Flagged because: {returnData.flagReason}</p>
            </div>
          </div>

          {/* Customer History */}
          <div className="border-t p-4">
            <h4 className="mb-3 font-medium">Customer Information</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm font-medium">{returnData.customer.email}</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm text-gray-500">Previous Purchases</p>
                <p className="text-sm font-medium">{returnData.customer.purchaseHistory}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 border-t p-4">
            <Button
              variant="outline"
              onClick={() => onAction(returnData.id, "request_info")}
              disabled={returnData.status !== "pending"}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Request Info
            </Button>
            <Button
              variant="outline"
              className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={() => onAction(returnData.id, "reject")}
              disabled={returnData.status !== "pending"}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => onAction(returnData.id, "approve")}
              disabled={returnData.status !== "pending"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

