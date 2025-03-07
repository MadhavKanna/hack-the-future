"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface ThresholdSelectorProps {
  title: string
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  unit?: string
  onChange?: (value: number) => void
}

export function ThresholdSelector({
  title,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  unit = "%",
  onChange,
}: ThresholdSelectorProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0])
    onChange?.(newValue[0])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-sm font-medium">
          {value}
          {unit}
        </span>
      </div>
      <Slider defaultValue={[value]} min={min} max={max} step={step} onValueChange={handleChange} />
      <div className="flex justify-between text-xs text-gray-400">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  )
}

