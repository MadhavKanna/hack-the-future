import { type NextRequest, NextResponse } from "next/server"

// Mock implementation of the Python function
async function analyzeReturn(
  imageUrl: string,
  userComment: string,
  userScore: number,
  daysSincePurchase: number,
  orderDescription: string,
  harshMode = false,
) {
  // In a real implementation, this would call the Python script
  // For now, we'll simulate a response

  // Wait for 1.5 seconds to simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate a mock response based on the inputs
  const conditions = ["Brand New", "Good", "Acceptable", "Poor"]
  const damageSeverities = ["no damage", "minor defect", "repairable defect", "critical failure"]
  const decisions = ["refund", "credit", "reject"]
  const sentiments = ["positive", "neutral", "negative"]
  const fraudRisks = ["low", "medium", "high"]

  // Simple logic to determine outcome based on inputs
  const conditionIndex = Math.min(Math.floor(daysSincePurchase / 30), 3)
  const condition = conditions[conditionIndex]

  const damageIndex = Math.min(Math.floor((100 - userScore) / 25), 3)
  const damageSeverity = damageSeverities[damageIndex]

  // Decision logic
  let decisionIndex = 0
  if (daysSincePurchase > 60 || userScore < 50) {
    decisionIndex = 2 // reject
  } else if (daysSincePurchase > 30 || userScore < 75) {
    decisionIndex = 1 // credit
  }
  const decision = decisions[decisionIndex]

  // User score adjustment
  let scoreAdjustment = "+0 points"
  let newUserScore = userScore

  if (decision === "refund") {
    scoreAdjustment = "+2 points"
    newUserScore = Math.min(userScore + 2, 100)
  } else if (decision === "credit") {
    scoreAdjustment = "+0 points"
  } else if (decision === "reject") {
    if (userComment.toLowerCase().includes("damaged") && daysSincePurchase > 30) {
      scoreAdjustment = "-20 points"
      newUserScore = Math.max(userScore - 20, 0)
    } else {
      scoreAdjustment = "-5 points"
      newUserScore = Math.max(userScore - 5, 0)
    }
  }

  // Comment analysis
  const commentLower = userComment.toLowerCase()
  const sentimentIndex =
    commentLower.includes("love") || commentLower.includes("great")
      ? 0
      : commentLower.includes("hate") || commentLower.includes("terrible")
        ? 2
        : 1
  const sentiment = sentiments[sentimentIndex]

  const fraudRiskIndex = userScore > 70 ? 0 : userScore > 40 ? 1 : 2
  const fraudRisk = fraudRisks[fraudRiskIndex]

  // Initialize red flags array
  const redFlags: string[] = []
  if (commentLower.includes("broken") && !orderDescription.toLowerCase().includes("broken")) {
    redFlags.push("Inconsistent damage description")
  }
  if (daysSincePurchase > 60 && commentLower.includes("just received")) {
    redFlags.push("Timeline inconsistency")
  }
  if (commentLower.length < 10) {
    redFlags.push("Insufficient details provided")
  }

  // Generate a mock resale ad
  const resaleAd =
    decision !== "refund"
      ? `FOR SALE: ${orderDescription}
Condition: ${condition}
Damage Severity: ${damageSeverity}
Price: $${Math.floor(80 - conditionIndex * 20)}
Description: This item is in ${condition.toLowerCase()} condition with ${damageSeverity}. Perfect for someone looking for a great deal!
Expected Time to Sell: 1-2 weeks`
      : ""

  // Generate marketplace data
  const marketplaceData = {
    facebook: {
      estimatedValue: `$${Math.floor(80 - conditionIndex * 15 + Math.random() * 5)}`,
      timeToSell: `${Math.floor(2 + Math.random() * 3)} days`,
      fees: "No fees",
    },
    kijiji: {
      estimatedValue: `$${Math.floor(75 - conditionIndex * 15 + Math.random() * 5)}`,
      timeToSell: `${Math.floor(3 + Math.random() * 4)} days`,
      fees: "Optional promotion fees",
    },
    poshmark: {
      estimatedValue: `$${Math.floor(70 - conditionIndex * 15 + Math.random() * 5)}`,
      timeToSell: `${Math.floor(5 + Math.random() * 5)} days`,
      fees: "20% of sale price",
    },
    offerup: {
      estimatedValue: `$${Math.floor(65 - conditionIndex * 15 + Math.random() * 5)}`,
      timeToSell: `${Math.floor(3 + Math.random() * 3)} days`,
      fees: "7.9% of sale price",
    },
  }

  return {
    condition_grade: condition,
    condition_reasoning: `Item appears to be in ${condition.toLowerCase()} condition based on visual inspection.`,
    damage_severity: damageSeverity,
    order_consistency: "consistent",
    order_discrepancies: [],
    ai_confidence: userScore > 70 ? "high" : "medium",
    human_review_flag: userScore < 50,
    comment_analysis: {
      sentiment,
      fraud_risk: fraudRisk,
      red_flags: redFlags,
    },
    user_score_impact: decision,
    return_timing_impact: daysSincePurchase < 30 ? "refund" : daysSincePurchase < 60 ? "credit" : "reject",
    final_decision: decision,
    item_disposition: decision === "refund" ? "resell" : decision === "credit" ? "refurbish" : "salvage",
    user_score_adjustment: scoreAdjustment,
    new_user_score: newUserScore,
    decision_reasoning: `Based on the ${condition.toLowerCase()} condition, ${damageSeverity}, and return timing of ${daysSincePurchase} days since purchase.`,
    resale_ad: resaleAd,
    marketplace_data: marketplaceData,
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { imageUrl, userComment, userScore, daysSincePurchase, orderDescription, harshMode } = data

    const result = await analyzeReturn(imageUrl, userComment, userScore, daysSincePurchase, orderDescription, harshMode)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error analyzing return:", error)
    return NextResponse.json({ error: "Failed to analyze return" }, { status: 500 })
  }
}

