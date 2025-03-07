"use client"

import { useState } from "react"
import { Calendar, Filter, Leaf, Recycle, DollarSign } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartCard } from "@/components/dashboard/chart-card"
import { TrendCard } from "@/components/trends/trend-card"
import { LineChart } from "@/components/dashboard/line-chart"
import { ComparisonChart } from "@/components/trends/comparison-chart"
import { ForecastChart } from "@/components/trends/forecast-chart"
import { Heatmap } from "@/components/trends/heatmap"
import { DonutChart } from "@/components/finances/donut-chart"

export default function TrendsPage() {
  const [timeRange, setTimeRange] = useState("6m")

  // Sample data for the trend charts
  const returnTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Return Rate",
        data: [8.2, 7.8, 9.1, 8.5, 7.9, 7.2],
        borderColor: "#E11D48", // Cherry red
        backgroundColor: "rgba(225, 29, 72, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const salesVsReturnsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [42000, 45000, 48000, 46000, 52000, 58000],
        borderColor: "#0088CC", // Blue
        backgroundColor: "rgba(0, 136, 204, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Returns",
        data: [3444, 3510, 4368, 3910, 4108, 4176],
        borderColor: "#E11D48", // Cherry red
        backgroundColor: "rgba(225, 29, 72, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const categoryComparisonData = {
    labels: ["Clothing", "Electronics", "Home Goods", "Accessories", "Footwear"],
    datasets: [
      {
        label: "Current Period",
        data: [12.5, 8.2, 5.7, 9.3, 14.2],
        backgroundColor: "#0088CC", // Blue
      },
      {
        label: "Previous Period",
        data: [14.2, 7.8, 6.1, 8.9, 15.5],
        backgroundColor: "#8B5CF6", // Purple
      },
    ],
  }

  const forecastData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Actual",
        data: [8.2, 7.8, 9.1, 8.5, 7.9, 7.2],
        borderColor: "#0088CC", // Blue
        backgroundColor: "rgba(0, 136, 204, 0.1)",
        tension: 0.4,
      },
      {
        label: "Forecast",
        data: [null, null, null, null, null, null, 7.0, 6.8, 6.5],
        borderColor: "#8B5CF6", // Purple
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  }

  // Sample data for the donut chart
  const dispositionData = {
    // labels: ["Resold as New", "Resold as Open Box", "Refurbished", "Recycled", "Donated", "Landfill"],
    datasets: [
      {
        data: [35, 25, 20, 10, 5, 5],
        backgroundColor: [
          "#0088CC", // Blue
          "#6366F1", // Indigo
          "#8B5CF6", // Purple
          "#A855F7", // Light purple
          "#EC4899", // Warm pink
          "#E11D48", // Cherry red
        ],
        borderWidth: 1,
      },
    ],
  }

  // Sample data for the heatmap
  const generateHeatmapData = () => {
    const data = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    for (const month of months) {
      for (let day = 1; day <= 31; day++) {
        // Skip invalid dates
        if ((month === "Feb" && day > 28) || (["Apr", "Jun", "Sep", "Nov"].includes(month) && day > 30)) {
          continue
        }

        // Generate random value with some patterns
        let value = Math.floor(Math.random() * 100)

        // Add seasonal patterns
        if (month === "Dec" && day > 20) value += 30
        if (month === "Jan" && day < 10) value += 25
        if (month === "Nov" && day > 25) value += 20

        data.push({
          month,
          day,
          value,
        })
      }
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">Trends Analysis</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Trend Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TrendCard title="Average Return Rate" value="8.1%" trend={-0.7} reversed={true} />
        <TrendCard title="Return Processing Time" value="2.3 days" trend={-0.5} reversed={true} />
        <TrendCard title="Customer Satisfaction" value="4.7/5" trend={0.3} />
        <TrendCard title="Return Cost Ratio" value="9.1%" trend={-0.4} reversed={true} />
      </div>

      {/* Environmental Impact Metrics */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Environmental Impact</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TrendCard
            title="Landfill Waste Prevented"
            value="1,245 kg"
            trend={12.3}
            icon={<Leaf className="h-5 w-5 text-primary" />}
          />
          <TrendCard
            title="Cost Savings from Reuse"
            value="$18,750"
            trend={8.7}
            icon={<DollarSign className="h-5 w-5 text-secondary" />}
          />
          <TrendCard
            title="AI-Saved Items"
            value="78%"
            trend={5.2}
            icon={<Recycle className="h-5 w-5 text-accent" />}
            reversed={false}
          >
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-[78%] rounded-full bg-accent"></div>
            </div>
            <div className="mt-1 text-xs text-gray-500">Percentage of landfill-bound items saved by AI processing</div>
          </TrendCard>
        </div>
      </div>

      {/* Main Trend Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartCard title="Return Rate Trend">
          <LineChart data={returnTrendData} />
        </ChartCard>
        <ChartCard title="Sales vs Returns">
          <LineChart data={salesVsReturnsData} />
        </ChartCard>
      </div>

      {/* Category Comparison */}
      <ChartCard title="Return Rate by Category (Current vs Previous Period)">
        <ComparisonChart data={categoryComparisonData} />
      </ChartCard>

      {/* Forecast Chart */}
      <ChartCard
        title="Return Rate Forecast"
        action={<div className="rounded-md border px-3 py-1 text-sm">3-Month Forecast</div>}
      >
        <ForecastChart data={forecastData} />
      </ChartCard>

      {/* Return Disposition */}
      <div className="rounded-lg border bg-white shadow-sm mb-16">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="font-medium">Return Disposition</h3>
          <div className="rounded-md border px-3 py-1 text-sm">Last Quarter</div>
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-2/5 flex justify-center pb-8 md:pb-0">
              <div className="w-full max-w-md">
                <DonutChart data={dispositionData} />
              </div>
            </div>
            <div className="w-full md:w-3/5 px-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#0088CC]"></div>
                    <span className="text-sm font-medium">Resold as New</span>
                    <span className="ml-auto font-bold">35%</span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#6366F1]"></div>
                    <span className="text-sm font-medium">Open Box</span>
                    <span className="ml-auto font-bold">25%</span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#8B5CF6]"></div>
                    <span className="text-sm font-medium">Refurbished</span>
                    <span className="ml-auto font-bold">20%</span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#A855F7]"></div>
                    <span className="text-sm font-medium">Recycled</span>
                    <span className="ml-auto font-bold">10%</span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#EC4899]"></div>
                    <span className="text-sm font-medium">Donated</span>
                    <span className="ml-auto font-bold">5%</span>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-[#E11D48]"></div>
                    <span className="text-sm font-medium">Landfill</span>
                    <span className="ml-auto font-bold">5%</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-md bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  95% of returns are diverted from landfill through our sustainable returns processing system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Patterns - Add more space above this section */}
      <div className="rounded-lg border bg-white p-4 mt-8">
        <h3 className="mb-4 font-medium">Seasonal Return Patterns</h3>
        <p className="mb-4 text-sm text-gray-500">
          Heatmap showing return volume throughout the year. Darker colors indicate higher return volumes.
        </p>
        <Heatmap
          data={heatmapData}
          maxValue={130}
          colorScale={[
            "#f7fafc",
            "#e6f0ff",
            "#c3dafe",
            "#a3bffa",
            "#7f9cf5",
            "#667eea",
            "#5a67d8",
            "#4c51bf",
            "#434190",
          ]}
        />
      </div>

      {/* Trend Insights */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">Trend Insights</h2>
        <div className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-700">Decreasing Return Rate</h3>
            <p className="text-sm text-blue-600">
              Return rates have decreased by 0.7% compared to the previous period, indicating improved product quality
              or better customer expectations management.
            </p>
          </div>
          <div className="rounded-md bg-purple-50 p-4">
            <h3 className="mb-2 font-medium text-purple-700">Seasonal Pattern Detected</h3>
            <p className="text-sm text-purple-600">
              Returns consistently spike during post-holiday periods (January and late December). Consider adjusting
              inventory and staffing during these periods.
            </p>
          </div>
          <div className="rounded-md bg-pink-50 p-4">
            <h3 className="mb-2 font-medium text-pink-700">Category Alert: Footwear</h3>
            <p className="text-sm text-pink-600">
              Footwear continues to have the highest return rate at 14.2%, though it has improved from 15.5% in the
              previous period. Consider reviewing sizing guides and product descriptions.
            </p>
          </div>
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-700">Environmental Impact Improving</h3>
            <p className="text-sm text-blue-600">
              Our AI-powered returns processing has increased landfill diversion by 12.3% this quarter, saving 1,245 kg
              of waste and $18,750 in reuse value.
            </p>
          </div>
        </div>
      </div>

      {/* Trend Metrics Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Current</th>
              <th className="px-4 py-3">Previous</th>
              <th className="px-4 py-3">Change</th>
              <th className="px-4 py-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 font-medium">Return Rate</td>
              <td className="px-4 py-3">8.1%</td>
              <td className="px-4 py-3">8.8%</td>
              <td className="px-4 py-3 text-primary">-0.7%</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[70%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-medium">Processing Time</td>
              <td className="px-4 py-3">2.3 days</td>
              <td className="px-4 py-3">2.8 days</td>
              <td className="px-4 py-3 text-primary">-0.5 days</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[65%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-medium">Customer Satisfaction</td>
              <td className="px-4 py-3">4.7/5</td>
              <td className="px-4 py-3">4.4/5</td>
              <td className="px-4 py-3 text-primary">+0.3</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[85%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-medium">Return Cost Ratio</td>
              <td className="px-4 py-3">9.1%</td>
              <td className="px-4 py-3">9.5%</td>
              <td className="px-4 py-3 text-primary">-0.4%</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[60%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Restocking Efficiency</td>
              <td className="px-4 py-3">87%</td>
              <td className="px-4 py-3">82%</td>
              <td className="px-4 py-3 text-primary">+5%</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[75%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 font-medium">Landfill Diversion Rate</td>
              <td className="px-4 py-3">95%</td>
              <td className="px-4 py-3">88%</td>
              <td className="px-4 py-3 text-primary">+7%</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[80%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">AI-Saved Items</td>
              <td className="px-4 py-3">78%</td>
              <td className="px-4 py-3">73%</td>
              <td className="px-4 py-3 text-primary">+5%</td>
              <td className="px-4 py-3">
                <div className="h-1 w-24 rounded-full bg-gray-200">
                  <div className="h-1 w-[70%] rounded-full bg-primary"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

