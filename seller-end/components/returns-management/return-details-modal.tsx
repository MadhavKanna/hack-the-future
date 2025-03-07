"use client"

import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { ConfidenceBadge } from "@/components/flagged-review/confidence-badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Package, User, DollarSign, Recycle, Leaf, AlertCircle } from "lucide-react"

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

interface ReturnDetailsModalProps {
  returnData: ReturnItem
  isOpen: boolean
  onClose: () => void
}

export function ReturnDetailsModal({ returnData, isOpen, onClose }: ReturnDetailsModalProps) {
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

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
      case "like new":
      case "bnib": // Brand New In Box
        return "text-green-600"
      case "good":
      case "used":
        return "text-yellow-600"
      case "damaged":
      case "poor":
      case "critically damaged":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Return #${returnData.id}`} className="max-w-3xl">
      <div className="space-y-6">
        {/* Header Information */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{returnData.orderNumber}</h3>
                {getStatusBadge(returnData.status)}
              </div>
              <p className="text-sm text-gray-500">Submitted on {returnData.dateSubmitted}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">AI Confidence</p>
              <ConfidenceBadge score={returnData.aiConfidence} />
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium">Customer Information</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{returnData.userName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium">{returnData.userId}</p>
            </div>
          </div>
        </div>

        {/* Tabs for Items, AI Analysis, and Environmental Impact */}
        <Tabs defaultValue="items">
          <TabsList className="w-full">
            <TabsTrigger value="items" className="flex-1">
              <Package className="mr-2 h-4 w-4" />
              Items
            </TabsTrigger>
            <TabsTrigger value="ai-analysis" className="flex-1">
              <AlertCircle className="mr-2 h-4 w-4" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="environmental" className="flex-1">
              <Leaf className="mr-2 h-4 w-4" />
              Environmental Impact
            </TabsTrigger>
          </TabsList>

          {/* Items Tab */}
          <TabsContent value="items" className="mt-4">
            <div className="rounded-lg border">
              <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Return Items</div>
              <div className="divide-y">
                {returnData.items.map((item, index) => (
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
                              <Package className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
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
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t bg-gray-50 px-4 py-3 text-right">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-lg font-bold">${returnData.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">AI Assessment</h3>
                  <ConfidenceBadge score={returnData.aiConfidence} />
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="text-sm">{returnData.aiReasoning}</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Recycle className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Recommended Disposition Path</h3>
                </div>
                <div className="mb-3">{getDispositionBadge(returnData.dispositionPath.path)}</div>
                <p className="text-sm">{returnData.dispositionPath.description}</p>
              </div>
            </div>
          </TabsContent>

          {/* Environmental Impact Tab */}
          <TabsContent value="environmental" className="mt-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Environmental Impact</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <Recycle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Waste Prevented</h4>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-700">
                    {returnData.dispositionPath.environmentalImpact.wastePrevented.toFixed(2)} kg
                  </p>
                  <p className="mt-1 text-sm text-green-600">
                    Material diverted from landfill through {returnData.dispositionPath.path.replace(/_/g, " ")}
                  </p>
                </div>

                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">Cost Savings</h4>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-blue-700">
                    ${returnData.dispositionPath.environmentalImpact.costSavings.toFixed(2)}
                  </p>
                  <p className="mt-1 text-sm text-blue-600">Value recovered through sustainable processing</p>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-gray-50 p-3">
                <p className="text-sm">
                  By processing this return through our AI-powered system, we've prevented waste and recovered value
                  that would otherwise be lost. This contributes to our overall sustainability goals and reduces
                  environmental impact.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  )
}

