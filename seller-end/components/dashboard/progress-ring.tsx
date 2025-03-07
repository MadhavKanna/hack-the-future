interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label: string
  labelPosition?: "inside" | "below"
}

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 8,
  color = "#00CC88",
  label,
  labelPosition = "inside",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (percentage * circumference) / 100

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="transition-all duration-300 ease-in-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            stroke={color}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              transformOrigin: "50% 50%",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>
        {labelPosition === "inside" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-bold">{percentage}%</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        )}
      </div>
      {labelPosition === "below" && (
        <div className="mt-2 text-center">
          <span className="text-sm font-medium">{label}</span>
        </div>
      )}
    </div>
  )
}

