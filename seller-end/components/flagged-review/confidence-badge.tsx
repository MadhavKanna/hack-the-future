import { cn } from "@/lib/utils"

interface ConfidenceBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function ConfidenceBadge({ score, size = "md", showText = true, className }: ConfidenceBadgeProps) {
  // Determine color based on confidence score
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  // Determine size classes
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "text-xs px-1.5 py-0.5"
      case "lg":
        return "text-sm px-3 py-1"
      default:
        return "text-xs px-2 py-0.5"
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        getColor(score),
        getSizeClasses(size),
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full",
          size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
        )}
      >
        <svg viewBox="0 0 36 36" className="h-full w-full">
          <path
            className="fill-current opacity-20"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="fill-current"
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span
          className={cn(
            "absolute font-semibold",
            size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]",
          )}
        >
          {score}
        </span>
      </div>
      {showText && <span>{score >= 80 ? "High" : score >= 50 ? "Medium" : "Low"}</span>}
    </div>
  )
}

