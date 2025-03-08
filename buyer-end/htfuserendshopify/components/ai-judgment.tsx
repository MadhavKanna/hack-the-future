"use client"

import { useState } from "react"
import { useReturn } from "@/context/return-context"
import { Loader2 } from "lucide-react"

interface AIJudgmentProps {
  userScore: number
  onAnalysisComplete: (result: JudgmentResult) => void
}

export interface JudgmentResult {
  condition_grade: string
  damage_severity: string
  final_decision: "refund" | "credit" | "reject"
  user_score_adjustment: string
  new_user_score: number
  decision_reasoning: string
  resale_ad?: string
  comment_analysis: {
    sentiment: string
    fraud_risk: string
    red_flags: string[]
  }
  order_consistency: string
  order_discrepancies: string[]
  ai_confidence: string
  human_review_flag: boolean
  marketplace_data?: {
    facebook: {
      estimatedValue: string
      timeToSell: string
      fees: string
    }
    kijiji: {
      estimatedValue: string
      timeToSell: string
      fees: string
    }
    poshmark: {
      estimatedValue: string
      timeToSell: string
      fees: string
    }
    offerup: {
      estimatedValue: string
      timeToSell: string
      fees: string
    }
  }
}

export function AIJudgment({ userScore, onAnalysisComplete }: AIJudgmentProps) {
  const { selectedItems, comments } = useReturn()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<JudgmentResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Get the first selected item for analysis
  const item = selectedItems.length > 0 ? selectedItems[0] : null

  // Calculate days since purchase based on the order ID
  const calculateDaysSincePurchase = () => {
    if (!item) return 30 // Default value

    const currentDate = new Date()
    let orderDate

    // Set the order date based on the order ID
    switch (item.orderId) {
      case "1045-F1":
        orderDate = new Date("2025-01-08")
        break
      case "1046-F2":
        orderDate = new Date("2025-02-13")
        break
      case "1047-F3":
        orderDate = new Date("2025-03-04")
        break
      default:
        orderDate = new Date()
        orderDate.setDate(orderDate.getDate() - 30) // Default to 30 days ago
    }

    const timeDiff = currentDate.getTime() - orderDate.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  }

  const daysSincePurchase = calculateDaysSincePurchase()

  const analyzeReturn = async () => {
    if (!item) return

    // Check if comments are provided
    if (!comments || comments.trim().length === 0) {
      setError("Please provide comments about your return before analysis")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: item.image,
          userComment: comments,
          userScore,
          daysSincePurchase,
          orderDescription: item.description || item.name,
          harshMode: false,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze return")
      }

      const data = await response.json()
      console.log("API Response:", data)

      // Ensure the final_decision is one of the expected values
      if (!["refund", "credit", "reject"].includes(data.final_decision)) {
        data.final_decision = "reject" // Default to reject if invalid
      }

      setResult(data)
      onAnalysisComplete(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Get decision color
  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "refund":
        return "text-green-600"
      case "credit":
        return "text-[#f90]"
      case "reject":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // Get score adjustment color
  const getScoreAdjustmentColor = (adjustment: string) => {
    if (adjustment.startsWith("+")) return "text-green-600"
    if (adjustment.startsWith("-")) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">AI Return Analysis</h3>
        {!result && (
          <button
            onClick={analyzeReturn}
            disabled={loading || !item || !comments || comments.trim().length === 0}
            className="px-3 py-1 text-sm bg-[#f90] text-white rounded-md hover:bg-[#f0ad4e] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </span>
            ) : (
              "Analyze Return"
            )}
          </button>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

      {!result && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <p>Click "Analyze Return" to get AI judgment on your return request</p>
          <p className="text-xs mt-2">
            {!item && "Please select an item to return"}
            {item && (!comments || comments.trim().length === 0) && "Please add comments about your return"}
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-[#f90] mb-4" />
          <p className="text-gray-600">Analyzing your return request...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f3f3f3] p-3 rounded-md">
              <p className="text-xs text-gray-500 mb-1">Condition</p>
              <p className="font-medium">{result.condition_grade}</p>
            </div>
            <div className="bg-[#f3f3f3] p-3 rounded-md">
              <p className="text-xs text-gray-500 mb-1">Damage Severity</p>
              <p className="font-medium">{result.damage_severity}</p>
            </div>
          </div>

          <div className="bg-[#f3f3f3] p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Comment Analysis</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Sentiment</p>
                <p className="font-medium">{result.comment_analysis.sentiment}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fraud Risk</p>
                <p className="font-medium">{result.comment_analysis.fraud_risk}</p>
              </div>
            </div>
            {result.comment_analysis.red_flags.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Red Flags</p>
                <ul className="text-xs text-red-600 list-disc list-inside">
                  {result.comment_analysis.red_flags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-[#f3f3f3] p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Decision</p>
            <p className={`font-medium ${getDecisionColor(result.final_decision)}`}>
              {result.final_decision === "refund" && "Full Refund Approved"}
              {result.final_decision === "credit" && "Store Credit Approved"}
              {result.final_decision === "reject" && "Return Rejected"}
            </p>
            <p className="text-sm mt-1">{result.decision_reasoning}</p>
          </div>

          <div className="bg-[#f3f3f3] p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Score Impact</p>
            <div className="flex items-center">
              <p className={`font-medium ${getScoreAdjustmentColor(result.user_score_adjustment)}`}>
                {result.user_score_adjustment}
              </p>
              <span className="mx-2 text-gray-400">→</span>
              <p className="font-medium">New Score: {result.new_user_score}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


