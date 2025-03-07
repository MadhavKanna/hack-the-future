"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Preset {
  id: string
  name: string
  description: string
}

interface PresetSelectorProps {
  presets: Preset[]
  defaultSelected?: string
  onChange?: (presetId: string) => void
}

export function PresetSelector({ presets, defaultSelected, onChange }: PresetSelectorProps) {
  const [selected, setSelected] = useState(defaultSelected || presets[0]?.id)

  const handleSelect = (presetId: string) => {
    setSelected(presetId)
    onChange?.(presetId)
  }

  return (
    <div className="space-y-2">
      {presets.map((preset) => (
        <div
          key={preset.id}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors",
            selected === preset.id ? "border-primary bg-primary/5" : "hover:border-gray-300 hover:bg-gray-50",
          )}
          onClick={() => handleSelect(preset.id)}
        >
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full border",
              selected === preset.id ? "border-primary bg-primary text-white" : "border-gray-300",
            )}
          >
            {selected === preset.id && <Check className="h-3 w-3" />}
          </div>
          <div>
            <div className="font-medium">{preset.name}</div>
            <div className="text-sm text-gray-500">{preset.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

