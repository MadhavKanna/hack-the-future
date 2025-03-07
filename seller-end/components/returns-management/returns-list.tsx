"use client"

import { useState } from "react"
import { Package, User, Calendar, DollarSign, ArrowDownLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ConfidenceBadge } from "@/components/flagged-review/confidence-badge"
import { ReturnDetailsModal } from "./return-details-modal"

interface ReturnItem {
  id: string
  orderNumber: string
  userId: string
  userName: string
  dateSubmitted: string
  items: {
    name: string
    sku: string
    quantity: number
    price: number
    reason: string
    condition: string
    image?: string
  }[]
  totalValue: number
  status: "approved" | "rejected" | "pending" | "processing"
  aiConfidence: number
  aiReasoning: string
  dispositionPath: {
    path: "resell_new" | "resell_open_box" | "refurbish" | "recycle" | "salvage" | "donate" | "dispose"
    description: string
    environmentalImpact: {
      wastePrevented: number // in kg
      costSavings: number // in dollars
    }
  }
}

interface ReturnsListProps {
  returns: ReturnItem[]
}

export function ReturnsList({ returns }: ReturnsListProps) {
  const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleReturnClick = (returnItem: ReturnItem) => {
    setSelectedReturn(returnItem)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "processing":
        return <Badge variant="info">Processing</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getDispositionBadge = (path: string) => {
    switch (path) {
      case "resell_new":
        return <Badge className="bg-blue-100 text-blue-800">Resell as New</Badge>
      case "resell_open_box":
        return <Badge className="bg-cyan-100 text-cyan-800">Resell as Open Box</Badge>
      case "refurbish":
        return <Badge className="bg-green-100 text-green-800">Refurbish</Badge>
      case "recycle":
        return <Badge className="bg-emerald-100 text-emerald-800">Recycle</Badge>
      case "salvage":
        return <Badge className="bg-yellow-100 text-yellow-800">Salvage Parts</Badge>
      case "donate":
        return <Badge className="bg-purple-100 text-purple-800">Donate</Badge>
      case "dispose":
        return <Badge className="bg-red-100 text-red-800">Dispose</Badge>
      default:
        return <Badge>{path.replace(/_/g, " ")}</Badge>
    }
  }

  return (
    <>
      <div className="space-y-4">
        {returns.map((returnItem) => (
          <div
            key={returnItem.id}
            className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md"
            onClick={() => handleReturnClick(returnItem)}
          >
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <ArrowDownLeft className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Return #{returnItem.id}</h3>
                  <p className="text-sm text-gray-500">Order #{returnItem.orderNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(returnItem.status)}
                <ConfidenceBadge score={returnItem.aiConfidence} size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-5">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">User</p>
                  <p className="text-sm font-medium">{returnItem.userName}</p>
                  <p className="text-xs text-gray-500">ID: {returnItem.userId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Date Submitted</p>
                  <p className="text-sm font-medium">{returnItem.dateSubmitted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Total Value</p>
                  <p className="text-sm font-medium">${returnItem.totalValue.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Items</p>
                  <p className="text-sm font-medium">{returnItem.items.length}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Disposition Path</p>
                <div className="mt-1">{getDispositionBadge(returnItem.dispositionPath.path)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Return Details Modal */}
      {selectedReturn && <ReturnDetailsModal returnData={selectedReturn} isOpen={showDetails} onClose={closeDetails} />}
    </>
  )
}

