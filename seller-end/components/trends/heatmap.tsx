"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface HeatmapProps {
  data: {
    day: number
    month: string
    value: number
  }[]
  maxValue?: number
  colorScale?: string[]
  className?: string
}

export function Heatmap({
  data,
  maxValue = 100,
  colorScale = ["#f7fafc", "#e6f7ff", "#bae7ff", "#91d5ff", "#69c0ff", "#40a9ff", "#1890ff", "#096dd9", "#0050b3"],
  className,
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const getColorIndex = (value: number) => {
    const normalizedValue = Math.min(value / maxValue, 1)
    return Math.floor(normalizedValue * (colorScale.length - 1))
  }

  const getCellData = (month: string, day: number) => {
    return data.find((d) => d.month === month && d.day === day)
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[800px]">
        <div className="mb-2 flex">
          <div className="w-12"></div>
          {months.map((month) => (
            <div key={month} className="w-16 text-center text-xs font-medium text-gray-500">
              {month}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {days.map((day) => (
            <div key={day} className="flex h-6">
              <div className="flex w-12 items-center justify-end pr-2 text-xs text-gray-500">{day}</div>
              {months.map((month) => {
                const cellData = getCellData(month, day)
                const value = cellData?.value || 0
                const colorIdx = getColorIndex(value)
                const cellId = `${month}-${day}`

                return (
                  <div
                    key={cellId}
                    className="relative w-16 border-r border-t last:border-r-0"
                    style={{ backgroundColor: colorScale[colorIdx] }}
                    onMouseEnter={() => setHoveredCell(cellData ? value : null)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {hoveredCell !== null && cellData?.value === hoveredCell && (
                      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full rounded bg-gray-800 px-2 py-1 text-xs text-white">
                        {value}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

