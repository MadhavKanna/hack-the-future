"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface ConfidenceSliderProps {
  defaultValue?: number
  onChange?: (value: number) => void
}

export function ConfidenceSlider({ defaultValue = 75, onChange }: ConfidenceSliderProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: number[]) => {
    setValue(newValue[0])
    onChange?.(newValue[0])
  }

  const getConfidenceLabel = (value: number) => {
    if (value < 30) return "Low"
    if (value < 70) return "Medium"
    return "High"
  }

  const getConfidenceColor = (value: number) => {
    if (value < 30) return "text-red-500"
    if (value < 70) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Confidence Threshold</span>
        <span className={`text-sm font-medium ${getConfidenceColor(value)}`}>
          {getConfidenceLabel(value)} ({value}%)
        </span>
      </div>
      <Slider defaultValue={[value]} max={100} step={1} onValueChange={handleChange} />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  )
}

