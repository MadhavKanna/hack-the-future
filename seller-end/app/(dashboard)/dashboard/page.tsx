"use client"

import Link from "next/link"
import { useState } from "react"
import { Package, DollarSign, ArrowDownLeft, Coins, AlertCircle } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { BarChart } from "@/components/dashboard/bar-chart"
import { LineChart } from "@/components/dashboard/line-chart"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { ReturnItems } from "@/components/dashboard/return-items"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"

// Sample flagged items data
const flaggedItems = [
  {
    id: "FLAG-1001",
    item: "Red Shirt",
    purchaseId: "139242",
    date: "5-3-2025",
    cost: 15,
    reason: "Unusual return pattern",
    customer: "John Smith",
    customerHistory: "5 returns in last 30 days",
    aiConfidence: 75,
    aiReasoning:
      "Customer has returned 5 items in the last 30 days, which is significantly above average. The item appears to be in new condition, but the return frequency is concerning.",
    manualFlag: false,
    status: "Pending Review",
  },
  {
    id: "FLAG-1002",
    item: "Blue Shirt",
    purchaseId: "124882",
    date: "3-3-2025",
    cost: 30,
    reason: "Condition discrepancy",
    customer: "Emily Johnson",
    customerHistory: "2 returns in last 90 days",
    aiConfidence: 82,
    aiReasoning:
      "The item was returned as 'new' but inspection photos show signs of wear. There appears to be a discrepancy between the stated condition and actual condition.",
    manualFlag: false,
    status: "Pending Review",
  },
  {
    id: "FLAG-1003",
    item: "Pack of 2 Shirts (White)",
    purchaseId: "102941",
    date: "14-2-2025",
    cost: 22,
    reason: "Manually flagged for review",
    customer: "Michael Wilson",
    customerHistory: "VIP customer, 0 returns in last 180 days",
    aiConfidence: 95,
    aiReasoning:
      "The return appears legitimate. Item is in new condition with tags attached. Customer has excellent purchase history with no recent returns.",
    manualFlag: true,
    status: "Pending Review",
    manualFlagReason: "Customer requested special handling for store credit instead of refund",
  },
]

export default function DashboardPage() {
  const [selectedFlag, setSelectedFlag] = useState<(typeof flaggedItems)[0] | null>(null)
  const [showFlagDetails, setShowFlagDetails] = useState(false)

  const handleFlagClick = (flag: (typeof flaggedItems)[0]) => {
    setSelectedFlag(flag)
    setShowFlagDetails(true)
  }

  const closeFlagDetails = () => {
    setShowFlagDetails(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Overview</h1>

      {/* Overview Stats - Made larger and more prominent */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Sales (All Time)"
          value="832"
          icon={<Package className="h-7 w-7 text-primary" />}
          className="bg-blue-50 border-blue-200"
          valueClassName="text-2xl md:text-3xl"
        />
        <StatCard
          title="Revenue (All Time)"
          value="$183,245"
          icon={<DollarSign className="h-7 w-7 text-secondary" />}
          className="bg-purple-50 border-purple-200"
          valueClassName="text-2xl md:text-3xl"
        />
        <StatCard
          title="Returns (All Time)"
          value="96"
          icon={<ArrowDownLeft className="h-7 w-7 text-accent" />}
          className="bg-red-50 border-red-200"
          valueClassName="text-2xl md:text-3xl"
        />
        <StatCard
          title="Return Cost (All Time)"
          value="$17,835"
          icon={<Coins className="h-7 w-7 text-highlight" />}
          className="bg-pink-50 border-pink-200"
          valueClassName="text-2xl md:text-3xl"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Purchase Overview - Last Month */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">
            Purchase Overview <span className="text-xs text-gray-500 ml-2">(Last Month)</span>
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-blue-100 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">78</div>
                <div className="text-xs text-gray-500">Purchase</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-purple-100 p-2">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">$17,357</div>
                <div className="text-xs text-gray-500">Revenue</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-red-100 p-2">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">8</div>
                <div className="text-xs text-gray-500">Returns</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-pink-100 p-2">
                <ArrowDownLeft className="h-5 w-5 text-highlight" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">$1,743</div>
                <div className="text-xs text-gray-500">Return Cost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Summary */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">Return Summary</h3>
          <div className="flex justify-around">
            <ProgressRing percentage={12} color="#E11D48" label="Returned" />
            <ProgressRing percentage={85} color="#0088CC" label="Accepted" />
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* AI Insights */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">AI Insights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold">817</div>
              <div className="text-sm text-gray-500">Returns handled</div>
            </div>
            <div className="rounded-md bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold">$142,850</div>
              <div className="text-sm text-gray-500">Dollars saved</div>
            </div>
          </div>
        </div>

        {/* Volume of Returns */}
        <ChartCard title="Volume of Returns">
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [
                {
                  label: "Orders",
                  data: [125, 137, 148, 135, 142],
                  borderColor: "#0088CC", // Blue
                  backgroundColor: "rgba(0, 136, 204, 0.1)",
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: "Returns",
                  data: [12, 14, 16, 13, 14],
                  borderColor: "#E11D48", // Cherry red
                  backgroundColor: "rgba(225, 29, 72, 0.1)",
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
          />
        </ChartCard>
      </div>

      {/* Fourth Row */}
      <ChartCard
        title="Returns & Purchase ($)"
        action={<div className="rounded-md border px-3 py-1 text-sm">Weekly</div>}
      >
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [
              {
                label: "Returns",
                data: [1850, 2100, 1950, 1700, 2050, 1600, 2200, 1900, 1850, 1750],
                backgroundColor: "#E11D48", // Cherry red
              },
              {
                label: "Sales",
                data: [18500, 21000, 19500, 17000, 20500, 16000, 22000, 19000, 18500, 17500],
                backgroundColor: "#0088CC", // Blue
              },
            ],
          }}
        />
      </ChartCard>

      {/* Flagged for Review */}
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium">Flagged for Review</h3>
          <Link href="/flagged-for-review" className="text-sm text-primary hover:underline">
            See All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="px-4 py-3">Object</th>
                <th className="px-4 py-3">Purchase ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Flag Type</th>
              </tr>
            </thead>
            <tbody>
              {flaggedItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => handleFlagClick(item)}
                >
                  <td className="px-4 py-3">{item.item}</td>
                  <td className="px-4 py-3">{item.purchaseId}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">${item.cost}</td>
                  <td className="px-4 py-3">
                    {item.manualFlag ? (
                      <Badge className="bg-purple-100 text-purple-800">Manual</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">AI</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Returns */}
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium">Recent Returns</h3>
          <Link href="/returns-management" className="text-sm text-primary hover:underline">
            See All
          </Link>
        </div>
        <div className="p-4">
          <ReturnItems />
        </div>
      </div>

      {/* Flagged Item Details Modal */}
      {selectedFlag && (
        <Modal isOpen={showFlagDetails} onClose={closeFlagDetails} title={`Flagged Item: ${selectedFlag.item}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Flag ID:</span>
                <span className="ml-2 font-medium">{selectedFlag.id}</span>
              </div>
              <div>
                {selectedFlag.manualFlag ? (
                  <Badge className="bg-purple-100 text-purple-800">Manually Flagged</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">AI Flagged</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Purchase ID</p>
                <p className="font-medium">{selectedFlag.purchaseId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedFlag.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedFlag.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Item Cost</p>
                <p className="font-medium">${selectedFlag.cost.toFixed(2)}</p>
              </div>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="mb-2 font-medium">Flag Reason</h4>
              <p className="text-sm">{selectedFlag.reason}</p>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="mb-2 font-medium">Customer History</h4>
              <p className="text-sm">{selectedFlag.customerHistory}</p>
            </div>

            <div className="rounded-md bg-blue-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">AI Analysis</h4>
                <div className="flex items-center gap-2">
                  <AlertCircle
                    className={`h-4 w-4 ${selectedFlag.aiConfidence >= 80 ? "text-primary" : "text-accent"}`}
                  />
                  <span className="text-sm font-medium">Confidence: {selectedFlag.aiConfidence}%</span>
                </div>
              </div>
              <p className="text-sm">{selectedFlag.aiReasoning}</p>
            </div>

            {selectedFlag.manualFlag && selectedFlag.manualFlagReason && (
              <div className="rounded-md bg-purple-50 p-3">
                <h4 className="mb-2 font-medium">Manual Flag Reason</h4>
                <p className="text-sm">{selectedFlag.manualFlagReason}</p>
              </div>
            )}

            <div className="rounded-md bg-pink-50 p-3">
              <h4 className="mb-2 font-medium">Status</h4>
              <p className="text-sm">{selectedFlag.status}</p>
              <p className="mt-2 text-xs text-gray-500">This item requires human review before processing.</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

