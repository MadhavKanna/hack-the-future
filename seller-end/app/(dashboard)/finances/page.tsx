"use client"

import { DollarSign, TrendingUp, ArrowDownLeft, CreditCard, ShoppingCart, Percent } from "lucide-react"
import { MetricCard } from "@/components/finances/metric-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { BarChart } from "@/components/dashboard/bar-chart"
import { LineChart } from "@/components/dashboard/line-chart"
import { DonutChart } from "@/components/finances/donut-chart"
import { DataTable } from "@/components/finances/data-table"

export default function FinancesPage() {
  // Sample data for the financial metrics
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [12500, 14200, 15800, 16300, 17500, 18200, 19500, 20800, 22100, 24500, 26000, 28000],
        borderColor: "#0088CC", // Blue
        backgroundColor: "rgba(0, 136, 204, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const profitMarginData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Profit Margin (%)",
        data: [15, 16, 17, 16.5, 18, 19, 18.5, 20, 21, 22, 23, 24],
        borderColor: "#8B5CF6", // Purple
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const returnImpactData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Return Cost",
        data: [4200, 3800, 4500, 3900, 4100, 3700],
        backgroundColor: "#E11D48", // Cherry red
      },
      {
        label: "Restocking Revenue",
        data: [1800, 1600, 2100, 1700, 1900, 1500],
        backgroundColor: "#0088CC", // Blue
      },
    ],
  }

  const expenseBreakdownData = {
    labels: ["Product Cost", "Shipping", "Returns Processing", "Storage", "Marketing", "Other"],
    datasets: [
      {
        data: [45, 20, 15, 10, 7, 3],
        backgroundColor: [
          "#0088CC", // Blue
          "#8B5CF6", // Purple
          "#E11D48", // Cherry red
          "#EC4899", // Warm pink
          "#A855F7", // Light purple
          "#6366F1", // Indigo
        ],
        borderWidth: 1,
      },
    ],
  }

  const recentTransactions = [
    {
      id: "INV-001",
      date: "2025-03-05",
      customer: "Acme Corp",
      amount: 1250.0,
      type: "Sale",
      status: "Completed",
    },
    {
      id: "REF-002",
      date: "2025-03-04",
      customer: "John Smith",
      amount: 89.99,
      type: "Refund",
      status: "Processed",
    },
    {
      id: "INV-003",
      date: "2025-03-03",
      customer: "Tech Solutions Inc",
      amount: 3450.0,
      type: "Sale",
      status: "Completed",
    },
    {
      id: "REF-004",
      date: "2025-03-02",
      customer: "Jane Doe",
      amount: 124.5,
      type: "Refund",
      status: "Pending",
    },
    {
      id: "INV-005",
      date: "2025-03-01",
      customer: "Global Enterprises",
      amount: 5670.0,
      type: "Sale",
      status: "Completed",
    },
  ]

  const transactionColumns = [
    { key: "id", title: "ID" },
    { key: "date", title: "Date" },
    { key: "customer", title: "Customer" },
    {
      key: "amount",
      title: "Amount",
      render: (value: number) => `$${value.toFixed(2)}`,
      className: "font-medium",
    },
    {
      key: "type",
      title: "Type",
      render: (value: string) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            value === "Sale" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value: string) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            value === "Completed"
              ? "bg-blue-50 text-blue-600"
              : value === "Processed"
                ? "bg-purple-50 text-purple-600"
                : "bg-pink-50 text-pink-600"
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  const returnAnalysis = [
    {
      category: "Clothing",
      returnRate: 12.5,
      returnValue: 4250,
      impact: "High",
    },
    {
      category: "Electronics",
      returnRate: 8.2,
      returnValue: 7800,
      impact: "Medium",
    },
    {
      category: "Home Goods",
      returnRate: 5.7,
      returnValue: 2100,
      impact: "Low",
    },
    {
      category: "Accessories",
      returnRate: 9.3,
      returnValue: 1850,
      impact: "Medium",
    },
    {
      category: "Footwear",
      returnRate: 14.2,
      returnValue: 3600,
      impact: "High",
    },
  ]

  const returnAnalysisColumns = [
    { key: "category", title: "Category" },
    {
      key: "returnRate",
      title: "Return Rate",
      render: (value: number) => `${value}%`,
    },
    {
      key: "returnValue",
      title: "Return Value",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "impact",
      title: "Financial Impact",
      render: (value: string) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            value === "High"
              ? "bg-red-50 text-red-600"
              : value === "Medium"
                ? "bg-purple-50 text-purple-600"
                : "bg-blue-50 text-blue-600"
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Financial Overview</h1>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Revenue"
          value="$183,245"
          change={8.4}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Profit Margin"
          value="19.2%"
          change={2.1}
          icon={<Percent className="h-6 w-6 text-secondary" />}
        />
        <MetricCard
          title="Return Cost"
          value="$17,835"
          change={-3.5}
          icon={<ArrowDownLeft className="h-6 w-6 text-accent" />}
        />
        <MetricCard
          title="Average Order Value"
          value="$87.50"
          change={5.2}
          icon={<ShoppingCart className="h-6 w-6 text-highlight" />}
        />
        <MetricCard
          title="Processing Costs"
          value="$12,450"
          change={-1.8}
          icon={<CreditCard className="h-6 w-6 text-secondary" />}
        />
        <MetricCard
          title="Growth Rate"
          value="8.4%"
          change={3.2}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Revenue and Profit Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartCard title="Revenue Trend (2025)">
          <LineChart data={revenueData} />
        </ChartCard>
        <ChartCard title="Profit Margin (2025)">
          <LineChart data={profitMarginData} />
        </ChartCard>
      </div>

      {/* Return Impact and Expense Breakdown */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartCard title="Return Financial Impact">
          <BarChart data={returnImpactData} />
        </ChartCard>
        <ChartCard title="Expense Breakdown">
          <DonutChart data={expenseBreakdownData} />
        </ChartCard>
      </div>

      {/* Return Analysis by Category */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Return Analysis by Category</h2>
        <DataTable columns={returnAnalysisColumns} data={returnAnalysis} />
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Transactions</h2>
        <DataTable columns={transactionColumns} data={recentTransactions} />
      </div>

      {/* Financial Summary */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">Financial Summary</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Revenue Streams</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Product Sales</span>
                <span className="font-medium">$155,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Restocking Revenue</span>
                <span className="font-medium">$10,800</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Processing Fees</span>
                <span className="font-medium">$7,600</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Other Revenue</span>
                <span className="font-medium">$9,445</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="font-medium">Total Revenue</span>
                <span className="font-medium">$183,245</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Expenses</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Product Cost</span>
                <span className="font-medium">$85,300</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping & Logistics</span>
                <span className="font-medium">$18,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Returns Processing</span>
                <span className="font-medium">$17,835</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Other Expenses</span>
                <span className="font-medium">$10,110</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="font-medium">Total Expenses</span>
                <span className="font-medium">$131,645</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-md bg-gray-50 p-4">
          <span className="text-lg font-bold">Net Profit</span>
          <span className="text-lg font-bold text-primary">$51,600</span>
        </div>
      </div>
    </div>
  )
}

