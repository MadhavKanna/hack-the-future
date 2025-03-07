import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendIndicatorProps {
  value: number
  suffix?: string
  reversed?: boolean
  className?: string
}

export function TrendIndicator({ value, suffix = "%", reversed = false, className }: TrendIndicatorProps) {
  const isNeutral = value === 0
  const isPositive = reversed ? value < 0 : value > 0

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        isNeutral ? "bg-gray-100 text-gray-600" : isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600",
        className,
      )}
    >
      {isNeutral ? (
        <Minus className="h-3 w-3" />
      ) : isPositive ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
      {Math.abs(value)}
      {suffix}
    </div>
  )
}

