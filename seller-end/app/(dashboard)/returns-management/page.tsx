"use client"

import { useState } from "react"
import { ReturnsFilter } from "@/components/returns-management/returns-filter"
import { ReturnsList } from "@/components/returns-management/returns-list"
import { TimePeriodSelector } from "@/components/time-period-selector"
import { Package, Leaf, DollarSign } from "lucide-react"

export default function ReturnsManagementPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    disposition: "",
    dateRange: "",
  })
  const [timePeriod, setTimePeriod] = useState("last_30_days")

  // Sample returns data
  const returns = [
    {
      id: "RTN-1001",
      orderNumber: "ORD-5789",
      userId: "USR-1001",
      userName: "John Doe",
      dateSubmitted: "Mar 4, 2025",
      items: [
        {
          name: "Premium Wireless Headphones",
          sku: "WH-PRO-100",
          quantity: 1,
          price: 149.99,
          reason: "Defective",
          condition: "Like New",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 149.99,
      status: "approved",
      aiConfidence: 85,
      aiReasoning:
        "The customer claims the headphones are defective, but the product appears to be in like-new condition with no visible damage. However, our diagnostic test confirms an intermittent connection issue with the left earpiece that would not be apparent visually. The customer has a good purchase history with few returns, and the product is within warranty period. Recommend approval with refurbishment path.",
      dispositionPath: {
        path: "refurbish",
        description:
          "The item will be sent to our refurbishment center where the defective component will be replaced. After quality testing, it can be resold as refurbished at approximately 70% of the original price.",
        environmentalImpact: {
          wastePrevented: 0.35,
          costSavings: 104.99,
        },
      },
    },
    {
      id: "RTN-1002",
      orderNumber: "ORD-6023",
      userId: "USR-1002",
      userName: "Jane Smith",
      dateSubmitted: "Mar 3, 2025",
      items: [
        {
          name: "Smart Watch Series 5",
          sku: "SW-S5-BLK",
          quantity: 1,
          price: 299.99,
          reason: "Wrong Item",
          condition: "BNIB",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 299.99,
      status: "approved",
      aiConfidence: 95,
      aiReasoning:
        "Customer claims they received the wrong item, but our records show the correct item was shipped. However, the product is still in brand new in box (BNIB) condition with original packaging intact. The customer is a VIP with excellent purchase history. Since the item is in perfect condition, it can be immediately resold as new. Recommend approval with resell as new path.",
      dispositionPath: {
        path: "resell_new",
        description:
          "The item is in perfect condition with original packaging intact. It will be inspected, resealed, and returned to inventory for immediate resale at full price.",
        environmentalImpact: {
          wastePrevented: 0.45,
          costSavings: 299.99,
        },
      },
    },
    {
      id: "RTN-1003",
      orderNumber: "ORD-5901",
      userId: "USR-1003",
      userName: "Robert Johnson",
      dateSubmitted: "Mar 2, 2025",
      items: [
        {
          name: "Bluetooth Speaker",
          sku: "SPK-BT-200",
          quantity: 1,
          price: 79.99,
          reason: "Changed Mind",
          condition: "Used",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 79.99,
      status: "approved",
      aiConfidence: 75,
      aiReasoning:
        "Customer is returning the speaker because they changed their mind. The product shows signs of light use but is in good working condition. The return is within our 30-day return window. While the customer has a limited purchase history, the item can be resold as open box with minimal processing required.",
      dispositionPath: {
        path: "resell_open_box",
        description:
          "The item will be inspected, cleaned, and repackaged for sale as an open-box item at approximately 85% of the original price.",
        environmentalImpact: {
          wastePrevented: 0.28,
          costSavings: 67.99,
        },
      },
    },
    {
      id: "RTN-1004",
      orderNumber: "ORD-6105",
      userId: "USR-1006",
      userName: "Sarah Brown",
      dateSubmitted: "Mar 1, 2025",
      items: [
        {
          name: "Designer Handbag",
          sku: "BAG-LUX-RED",
          quantity: 1,
          price: 1299.99,
          reason: "Not as Described",
          condition: "Used",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 1299.99,
      status: "rejected",
      aiConfidence: 90,
      aiReasoning:
        "Customer claims the handbag color is different from what was shown online. However, our image analysis confirms the product matches our listing exactly. The bag shows significant signs of use including wear on the handles and a stain on the interior lining. Customer has a history of high-value returns with similar claims. The return window has also expired. This appears to be a case of wardrobing (using and returning).",
      dispositionPath: {
        path: "dispose",
        description:
          "Due to the condition and suspected fraudulent return attempt, this item cannot be resold or refurbished. It will be properly disposed of according to our waste management protocols.",
        environmentalImpact: {
          wastePrevented: 0,
          costSavings: 0,
        },
      },
    },
    {
      id: "RTN-1005",
      orderNumber: "ORD-5877",
      userId: "USR-1005",
      userName: "Michael Wilson",
      dateSubmitted: "Feb 28, 2025",
      items: [
        {
          name: "Gaming Console",
          sku: "GAME-CON-X",
          quantity: 1,
          price: 499.99,
          reason: "Defective",
          condition: "Damaged",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 499.99,
      status: "approved",
      aiConfidence: 88,
      aiReasoning:
        "Customer reports the gaming console is not powering on. Our diagnostic analysis confirms a faulty power supply unit. The console itself is in good condition, but the power supply needs replacement. This is a known issue with this model and is covered under warranty. The customer has a good purchase history and the item is within the warranty period.",
      dispositionPath: {
        path: "refurbish",
        description:
          "The console will be sent to our repair center where the power supply will be replaced. After testing, it can be resold as refurbished at approximately 80% of the original price.",
        environmentalImpact: {
          wastePrevented: 2.8,
          costSavings: 399.99,
        },
      },
    },
    {
      id: "RTN-1006",
      orderNumber: "ORD-6201",
      userId: "USR-1007",
      userName: "David Miller",
      dateSubmitted: "Feb 25, 2025",
      items: [
        {
          name: "Laptop",
          sku: "LT-PRO-15",
          quantity: 1,
          price: 1299.99,
          reason: "Defective",
          condition: "Critically Damaged",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 1299.99,
      status: "approved",
      aiConfidence: 92,
      aiReasoning:
        "Customer reports the laptop was damaged during shipping. Photos confirm severe physical damage to the chassis and screen. The packaging also shows signs of mishandling during transit. While the laptop cannot be repaired or resold, many components can be salvaged for parts. This appears to be a legitimate shipping damage claim.",
      dispositionPath: {
        path: "salvage",
        description:
          "The laptop will be disassembled and valuable components (SSD, RAM, display panel, etc.) will be salvaged for use in repairs or refurbishment of other devices.",
        environmentalImpact: {
          wastePrevented: 1.85,
          costSavings: 450.0,
        },
      },
    },
    {
      id: "RTN-1007",
      orderNumber: "ORD-5432",
      userId: "USR-1004",
      userName: "Emily Davis",
      dateSubmitted: "Feb 22, 2025",
      items: [
        {
          name: "Yoga Mat",
          sku: "YG-MAT-PRO",
          quantity: 1,
          price: 49.99,
          reason: "Changed Mind",
          condition: "New",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 49.99,
      status: "approved",
      aiConfidence: 98,
      aiReasoning:
        "Customer is returning the yoga mat because they changed their mind about the color. The product is in new condition with original packaging intact. The return is within our 30-day return window and the customer has a good purchase history with few returns.",
      dispositionPath: {
        path: "resell_new",
        description:
          "The item is in perfect condition and can be immediately returned to inventory for resale at full price.",
        environmentalImpact: {
          wastePrevented: 0.75,
          costSavings: 49.99,
        },
      },
    },
    {
      id: "RTN-1008",
      orderNumber: "ORD-6301",
      userId: "USR-1008",
      userName: "Lisa Taylor",
      dateSubmitted: "Feb 20, 2025",
      items: [
        {
          name: "Coffee Maker",
          sku: "CM-DELUXE",
          quantity: 1,
          price: 129.99,
          reason: "Defective",
          condition: "Damaged",
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalValue: 129.99,
      status: "approved",
      aiConfidence: 85,
      aiReasoning:
        "Customer reports the coffee maker is leaking water. Our analysis confirms a crack in the water reservoir that cannot be repaired. The appliance cannot be resold or refurbished, but the electronic components and metal parts can be recycled. The customer has a good purchase history and the item is within warranty.",
      dispositionPath: {
        path: "recycle",
        description:
          "The coffee maker will be disassembled and components will be sorted for appropriate recycling streams (electronics, metals, plastics).",
        environmentalImpact: {
          wastePrevented: 1.2,
          costSavings: 35.0,
        },
      },
    },
  ]

  // Filter returns based on search and filters
  const filteredReturns = returns.filter((returnItem) => {
    const searchLower = filters.search.toLowerCase()
    const matchesSearch =
      !filters.search ||
      returnItem.id.toLowerCase().includes(searchLower) ||
      returnItem.orderNumber.toLowerCase().includes(searchLower) ||
      returnItem.userName.toLowerCase().includes(searchLower) ||
      returnItem.userId.toLowerCase().includes(searchLower) ||
      returnItem.items.some((item) => item.name.toLowerCase().includes(searchLower))

    const matchesStatus = !filters.status || filters.status === "all" || returnItem.status === filters.status

    const matchesDisposition =
      !filters.disposition || filters.disposition === "all" || returnItem.dispositionPath.path === filters.disposition

    // Date filter - simplified for demo
    const matchesDate = !filters.dateRange || filters.dateRange === "all"

    return matchesSearch && matchesStatus && matchesDisposition && matchesDate
  })

  const getTimePeriodLabel = () => {
    switch (timePeriod) {
      case "today":
        return "Today"
      case "yesterday":
        return "Yesterday"
      case "last_7_days":
        return "Last 7 Days"
      case "last_30_days":
        return "Last 30 Days"
      case "last_90_days":
        return "Last 90 Days"
      case "this_year":
        return "This Year"
      case "all_time":
        return "All Time"
      default:
        return "Last 30 Days"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">Returns Management</h1>
        <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Total Returns</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">{returns.length}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Approved</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">{returns.filter((r) => r.status === "approved").length}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <Package className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Waste Prevented</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">
                {returns
                  .reduce((total, r) => total + r.dispositionPath.environmentalImpact.wastePrevented, 0)
                  .toFixed(2)}{" "}
                kg
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Cost Savings</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">
                ${returns.reduce((total, r) => total + r.dispositionPath.environmentalImpact.costSavings, 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <ReturnsFilter onFilterChange={setFilters} />

      {/* Returns List */}
      <div className="space-y-4">
        {filteredReturns.length > 0 ? (
          <ReturnsList returns={filteredReturns} />
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

