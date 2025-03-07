"use client"

import { useState } from "react"
import { PurchasesFilter } from "@/components/purchases-management/purchases-filter"
import { PurchasesList } from "@/components/purchases-management/purchases-list"
import { TimePeriodSelector } from "@/components/time-period-selector"
import { ShoppingBag, DollarSign, CreditCard, Users } from "lucide-react"

export default function PurchasesManagementPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    paymentMethod: "",
    dateRange: "",
  })
  const [timePeriod, setTimePeriod] = useState("last_30_days")

  // Sample purchases data
  const purchases = [
    {
      id: "ORD-5789",
      userId: "USR-1001",
      userName: "John Doe",
      date: "Mar 4, 2025",
      items: [
        {
          name: "Premium Wireless Headphones",
          sku: "WH-PRO-100",
          quantity: 1,
          price: 149.99,
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          name: "Phone Case",
          sku: "PC-SLIM-X",
          quantity: 2,
          price: 19.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 189.97,
      status: "completed",
      paymentMethod: "credit_card",
      shippingAddress: "123 Main St\nAnytown, CA 94321\nUnited States",
      billingAddress: "123 Main St\nAnytown, CA 94321\nUnited States",
    },
    {
      id: "ORD-6023",
      userId: "USR-1002",
      userName: "Jane Smith",
      date: "Mar 3, 2025",
      items: [
        {
          name: "Designer Handbag",
          sku: "BAG-LUX-RED",
          quantity: 1,
          price: 899.99,
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          name: "Sunglasses",
          sku: "SG-DESIGNER-BLK",
          quantity: 1,
          price: 199.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 1099.98,
      status: "completed",
      paymentMethod: "credit_card",
      shippingAddress: "456 Oak Ave\nSomewhere, NY 10001\nUnited States",
      billingAddress: "456 Oak Ave\nSomewhere, NY 10001\nUnited States",
    },
    {
      id: "ORD-5901",
      userId: "USR-1003",
      userName: "Robert Johnson",
      date: "Mar 2, 2025",
      items: [
        {
          name: "Bluetooth Speaker",
          sku: "SPK-BT-200",
          quantity: 1,
          price: 79.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 79.99,
      status: "completed",
      paymentMethod: "paypal",
      shippingAddress: "789 Pine St\nElsewhere, TX 75001\nUnited States",
      billingAddress: "789 Pine St\nElsewhere, TX 75001\nUnited States",
    },
    {
      id: "ORD-6105",
      userId: "USR-1006",
      userName: "Sarah Brown",
      date: "Mar 1, 2025",
      items: [
        {
          name: "Designer Handbag",
          sku: "BAG-LUX-RED",
          quantity: 1,
          price: 1299.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 1299.99,
      status: "shipped",
      paymentMethod: "credit_card",
      shippingAddress: "321 Maple Dr\nNowhere, FL 33101\nUnited States",
      billingAddress: "321 Maple Dr\nNowhere, FL 33101\nUnited States",
    },
    {
      id: "ORD-5877",
      userId: "USR-1005",
      userName: "Michael Wilson",
      date: "Feb 28, 2025",
      items: [
        {
          name: "Gaming Console",
          sku: "GAME-CON-X",
          quantity: 1,
          price: 499.99,
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          name: "Controller",
          sku: "CTRL-GAME-X",
          quantity: 2,
          price: 59.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 619.97,
      status: "processing",
      paymentMethod: "paypal",
      shippingAddress: "555 Cedar Ln\nSometown, WA 98001\nUnited States",
      billingAddress: "555 Cedar Ln\nSometown, WA 98001\nUnited States",
    },
    {
      id: "ORD-6201",
      userId: "USR-1007",
      userName: "David Miller",
      date: "Feb 25, 2025",
      items: [
        {
          name: "Laptop",
          sku: "LT-PRO-15",
          quantity: 1,
          price: 1299.99,
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          name: "Laptop Bag",
          sku: "BAG-LT-15",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 1349.98,
      status: "completed",
      paymentMethod: "bank_transfer",
      shippingAddress: "777 Birch St\nAnyville, IL 60601\nUnited States",
      billingAddress: "777 Birch St\nAnyville, IL 60601\nUnited States",
    },
    {
      id: "ORD-5432",
      userId: "USR-1004",
      userName: "Emily Davis",
      date: "Feb 22, 2025",
      items: [
        {
          name: "Yoga Mat",
          sku: "YG-MAT-PRO",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg?height=64&width=64",
        },
        {
          name: "Water Bottle",
          sku: "WB-SPORT-24",
          quantity: 1,
          price: 24.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 74.98,
      status: "completed",
      paymentMethod: "credit_card",
      shippingAddress: "888 Elm St\nSomecity, GA 30301\nUnited States",
      billingAddress: "888 Elm St\nSomecity, GA 30301\nUnited States",
    },
    {
      id: "ORD-6301",
      userId: "USR-1008",
      userName: "Lisa Taylor",
      date: "Feb 20, 2025",
      items: [
        {
          name: "Coffee Maker",
          sku: "CM-DELUXE",
          quantity: 1,
          price: 129.99,
          image: "/placeholder.svg?height=64&width=64",
        },
      ],
      totalAmount: 129.99,
      status: "cancelled",
      paymentMethod: "store_credit",
      shippingAddress: "999 Oak St\nOthertown, MI 48201\nUnited States",
      billingAddress: "999 Oak St\nOthertown, MI 48201\nUnited States",
    },
  ]

  // Filter purchases based on search and filters
  const filteredPurchases = purchases.filter((purchase) => {
    const searchLower = filters.search.toLowerCase()
    const matchesSearch =
      !filters.search ||
      purchase.id.toLowerCase().includes(searchLower) ||
      purchase.userName.toLowerCase().includes(searchLower) ||
      purchase.userId.toLowerCase().includes(searchLower) ||
      purchase.items.some((item) => item.name.toLowerCase().includes(searchLower))

    const matchesStatus = !filters.status || filters.status === "all" || purchase.status === filters.status

    const matchesPaymentMethod =
      !filters.paymentMethod || filters.paymentMethod === "all" || purchase.paymentMethod === filters.paymentMethod

    // Date filter - simplified for demo
    const matchesDate = !filters.dateRange || filters.dateRange === "all"

    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDate
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
        <h1 className="text-xl font-semibold">Purchases Management</h1>
        <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Total Orders</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">{purchases.length}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">
                ${purchases.reduce((total, p) => total + p.totalAmount, 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Unique Customers</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">{new Set(purchases.map((p) => p.userId)).size}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Avg. Order Value</p>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {getTimePeriodLabel()}
                </span>
              </div>
              <p className="text-2xl font-bold">
                ${(purchases.reduce((total, p) => total + p.totalAmount, 0) / purchases.length).toFixed(2)}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <PurchasesFilter onFilterChange={setFilters} />

      {/* Purchases List */}
      <div className="space-y-4">
        {filteredPurchases.length > 0 ? (
          <PurchasesList purchases={filteredPurchases} />
        ) : (
          <div className="rounded-lg border bg-white p-8 text-center">
            <h3 className="text-lg font-medium">No purchases found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination - simplified for demo */}
      {filteredPurchases.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredPurchases.length}</span> of{" "}
            <span className="font-medium">{purchases.length}</span> purchases
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

