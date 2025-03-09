"use client"

import { useState, useEffect } from "react"
import { ShopifyPageHeader } from "@/components/shopify-page-header"
import { ShopifyReturnItems } from "@/components/shopify-return-items"
import { ShopifyReturnSummary } from "@/components/shopify-return-summary"
import type { JudgmentResult } from "@/components/ai-judgment"

export default function ShopifyReturnsPage() {
  const [analysisResult, setAnalysisResult] = useState<JudgmentResult | null>(null)

  // Listen for the analysis complete event
  useEffect(() => {
    const handleAnalysisComplete = (event: CustomEvent<JudgmentResult>) => {
      console.log("Page received analysis event:", event.detail)
      setAnalysisResult(event.detail)
    }

    window.addEventListener("analysisComplete", handleAnalysisComplete as EventListener)

    return () => {
      window.removeEventListener("analysisComplete", handleAnalysisComplete as EventListener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopifyPageHeader title="Return items" showBackButton />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShopifyReturnItems shippingAddress="150 Elgin Street" analysisResult={analysisResult} />
          </div>
          <div className="lg:col-span-1">
            <ShopifyReturnSummary />
          </div>
        </div>
      </main>
    </div>
  )
}

