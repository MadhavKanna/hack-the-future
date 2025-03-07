"use client"

import { useState } from "react"
import { FilterBar } from "@/components/flagged-review/filter-bar"
import { StatsCards } from "@/components/flagged-review/stats-cards"
import { ReturnCard } from "@/components/flagged-review/return-card"

// Sample return data
const sampleReturns = [
  {
    id: "RTN-1001",
    orderNumber: "ORD-5789",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      purchaseHistory: 12,
    },
    dateSubmitted: "Mar 4, 2025",
    items: [
      {
        id: "ITEM-1",
        productName: "Premium Wireless Headphones",
        sku: "WH-PRO-100",
        quantity: 1,
        price: 149.99,
        reason: "Defective",
        condition: "Like New",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
    totalValue: 149.99,
    status: "pending",
    aiConfidence: 45,
    aiReasoning:
      "The customer claims the headphones are defective, but the product appears to be in like-new condition with no visible damage. The customer has a good purchase history, but this is their third return this month.",
    flagReason: "Multiple returns in short period, product condition inconsistent with return reason",
  },
  {
    id: "RTN-1002",
    orderNumber: "ORD-6023",
    customer: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      purchaseHistory: 3,
    },
    dateSubmitted: "Mar 3, 2025",
    items: [
      {
        id: "ITEM-2",
        productName: "Smart Watch Series 5",
        sku: "SW-S5-BLK",
        quantity: 1,
        price: 299.99,
        reason: "Wrong Item",
        condition: "New",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
    totalValue: 299.99,
    status: "pending",
    aiConfidence: 35,
    aiReasoning:
      "Customer claims they received the wrong item, but order details show the correct item was shipped. The product is still in new condition with original packaging intact. Customer is relatively new with only 3 previous purchases.",
    flagReason: "Order details conflict with customer claim, new customer account",
  },
  {
    id: "RTN-1003",
    orderNumber: "ORD-5901",
    customer: {
      name: "Michael Davis",
      email: "michael.davis@example.com",
      purchaseHistory: 27,
    },
    dateSubmitted: "Mar 2, 2025",
    items: [
      {
        id: "ITEM-3",
        productName: "Ultra HD 4K Monitor",
        sku: "MON-4K-27",
        quantity: 1,
        price: 349.99,
        reason: "Changed Mind",
        condition: "Used",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
    totalValue: 349.99,
    status: "approved",
    aiConfidence: 60,
    aiReasoning:
      "Customer is returning the monitor because they changed their mind. The product shows signs of use but is within the 30-day return window. Customer has a long purchase history with few returns.",
    flagReason: "Product condition shows signs of use, but customer is high-value with good history",
  },
  {
    id: "RTN-1004",
    orderNumber: "ORD-6105",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      purchaseHistory: 8,
    },
    dateSubmitted: "Mar 1, 2025",
    items: [
      {
        id: "ITEM-4",
        productName: "Designer Handbag",
        sku: "BAG-LUX-RED",
        quantity: 1,
        price: 1299.99,
        reason: "Not as Described",
        condition: "New",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
    totalValue: 1299.99,
    status: "more_info",
    aiConfidence: 40,
    aiReasoning:
      "Customer claims the handbag color is different from what was shown online. Product images show a bright red, but customer claims it's more burgundy. High-value item with original tags still attached.",
    flagReason: "High-value item, subjective claim about color discrepancy",
  },
  {
    id: "RTN-1005",
    orderNumber: "ORD-5877",
    customer: {
      name: "Robert Brown",
      email: "robert.brown@example.com",
      purchaseHistory: 5,
    },
    dateSubmitted: "Feb 28, 2025",
    items: [
      {
        id: "ITEM-5a",
        productName: "Wireless Gaming Mouse",
        sku: "MOUSE-G1",
        quantity: 1,
        price: 79.99,
        reason: "Defective",
        condition: "Damaged",
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        id: "ITEM-5b",
        productName: "Mechanical Gaming Keyboard",
        sku: "KEY-MEC-RGB",
        quantity: 1,
        price: 129.99,
        reason: "Defective",
        condition: "Damaged",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
    totalValue: 209.98,
    status: "rejected",
    aiConfidence: 85,
    aiReasoning:
      "Customer claims both items were defective on arrival, but shipping photos show the package was severely damaged during transit. This appears to be a shipping issue rather than product defects.",
    flagReason: "Multiple items damaged, likely shipping issue rather than product defect",
  },
] as const

export default function FlaggedForReviewPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    confidence: "",
    dateRange: "",
  })

  const [returns, setReturns] = useState(sampleReturns)

  // Calculate stats
  const stats = {
    pending: returns.filter((r) => r.status === "pending").length,
    approved: returns.filter((r) => r.status === "approved").length,
    rejected: returns.filter((r) => r.status === "rejected").length,
    moreInfo: returns.filter((r) => r.status === "more_info").length,
  }

  // Filter returns based on search and filters
  const filteredReturns = returns.filter((returnItem) => {
    // Search filter
    const searchLower = filters.search.toLowerCase()
    const matchesSearch =
      !filters.search ||
      returnItem.id.toLowerCase().includes(searchLower) ||
      returnItem.orderNumber.toLowerCase().includes(searchLower) ||
      returnItem.customer.name.toLowerCase().includes(searchLower) ||
      returnItem.items.some((item) => item.productName.toLowerCase().includes(searchLower))

    // Status filter
    const matchesStatus = !filters.status || filters.status === "all" || returnItem.status === filters.status

    // Confidence filter
    let matchesConfidence = true
    if (filters.confidence) {
      if (filters.confidence === "low" && returnItem.aiConfidence >= 50) {
        matchesConfidence = false
      } else if (filters.confidence === "medium" && (returnItem.aiConfidence < 50 || returnItem.aiConfidence >= 80)) {
        matchesConfidence = false
      } else if (filters.confidence === "high" && returnItem.aiConfidence < 80) {
        matchesConfidence = false
      }
    }

    // Date filter - simplified for demo
    const matchesDate = !filters.dateRange || filters.dateRange === "all"

    return matchesSearch && matchesStatus && matchesConfidence && matchesDate
  })

  // Handle return actions
  const handleReturnAction = (id: string, action: "approve" | "reject" | "request_info") => {
    setReturns((prevReturns) =>
      prevReturns.map((returnItem) => {
        if (returnItem.id === id) {
          return {
            ...returnItem,
            status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "more_info",
          }
        }
        return returnItem
      }),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Flagged for Review</h1>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filter Bar */}
      <FilterBar onFilterChange={setFilters} />

      {/* Returns List */}
      <div className="space-y-4">
        {filteredReturns.length > 0 ? (
          filteredReturns.map((returnItem) => (
            <ReturnCard key={returnItem.id} returnData={returnItem} onAction={handleReturnAction} />
          ))
        ) : (
          <div className="rounded-lg border bg-white p-8 text-center">
            <h3 className="text-lg font-medium">No returns found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination - simplified for demo */}
      {filteredReturns.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredReturns.length}</span> of{" "}
            <span className="font-medium">{returns.length}</span> returns
          </div>
          <div className="flex gap-1">
            <button className="rounded-md border bg-white px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="rounded-md border bg-primary px-3 py-1 text-sm font-medium text-white">1</button>
            <button className="rounded-md border bg-white px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

