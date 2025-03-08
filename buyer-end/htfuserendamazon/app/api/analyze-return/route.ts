import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize the Google Generative AI client
const apiKey = process.env.GOOGLE_API_KEY
if (!apiKey) {
  console.error("GOOGLE_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(apiKey || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, userComment, userScore, daysSincePurchase, orderDescription, harshMode = false } = body

    if (!imageUrl || !userComment || userScore === undefined || daysSincePurchase === undefined || !orderDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Fetch the image and convert to base64
    let imageData
    try {
      // If the image URL is already a data URL, use it directly
      if (imageUrl.startsWith("data:")) {
        imageData = imageUrl
      } else {
        // Otherwise, fetch the image
        const imageResponse = await fetch(imageUrl)
        const imageBuffer = await imageResponse.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString("base64")
        const mimeType = imageResponse.headers.get("content-type") || "image/jpeg"
        imageData = `data:${mimeType};base64,${base64Image}`
      }
    } catch (error) {
      console.error("Error fetching image:", error)
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    // Build the prompt similar to the Python version
    const prompt = `Analyze this return request considering ALL factors:

    1. ITEM CONDITION (from image):
    - Grade options: Brand New, Good, Acceptable, Poor
    - Describe specific flaws/features justifying the grade
    - Specify any damage detected and tag severity: no damage, minor defect, repairable defect, critical failure
    - If the item is Brand New and recently returned (within 30 days), strongly consider a full refund unless there are clear signs of misuse or fraud.

    2. ORDER DESCRIPTION: "${orderDescription}"
    - Verify returned item matches the order:
      * Check for consistency in item type, brand, and features
      * Flag discrepancies (e.g., wrong item, mismatched description)
    - If any of: damaged upon arrival, minor but believable description errors (such as shade similarity - pink and magenta), or size errors are mentioned, or otherwise honest mistakes that amount to the customer not wanting the item anymore, use your best judgment on whether or not to flag that as suspicious.  
    - However, major discrepancies, such as the item being more than 80% dissimilar, are still suspicious. 

    3. AI CONFIDENCE:
    - If uncertain about condition (e.g., blurry image, ambiguous damage), confidence <70%
    - Flag for human review if confidence below threshold

    4. USER COMMENT ANALYSIS: "${userComment}"
    - Check for red flags:
      * Repetitive/keyword-stuffed language
      * Inconsistent damage descriptions
      * Fraud patterns ("item never arrived", "not as described" without specifics)
    - Assign fraud_risk: low/medium/high

    5. USER SCORE: ${userScore}/100
    - Consider the user's trust score when making the final decision, but do not let it override clear evidence of the item's condition or fraud risk.

    6. RETURN TIMING: ${daysSincePurchase} days since purchase
    - If the item is Brand New and returned within 30 days, prioritize a full refund unless there are clear issues.
    - For older returns, consider store credit or rejection based on the item's condition and fraud risk.

    7. AI LENIENCY MODE: ${harshMode ? "HARSH" : "STANDARD"}
    - Harsh: Downgrade condition by one grade
    - Lenient: Consider borderline cases favorably

    8. USER SCORE ADJUSTMENT:
    - If return is valid and not fraudulent: +2 points
    - If store credit is issued: +0 points
    - If return is rejected: -5 points
    - If return is fraudulent: -20 points

    9. RESALE AD (if rejected for full refund):
    - Generate a resale ad for platforms like Facebook Marketplace or Kijiji
    - Include believable pricing, a description of the item, condition description, and expected time to sell

    OUTPUT AS JSON. INCLUDE ALL FIELDS EVEN IF EMPTY:
    {
        "condition_grade": "...",
        "condition_reasoning": "...",
        "damage_severity": "no damage/minor defect/repairable defect/critical failure",
        "order_consistency": "consistent/inconsistent",
        "order_discrepancies": ["list", "of", "mismatches"],
        "ai_confidence": "high/medium/low",
        "human_review_flag": true/false,
        "comment_analysis": {
            "sentiment": "positive/neutral/negative",
            "fraud_risk": "low/medium/high",
            "red_flags": ["list", "of", "patterns"]
        },
        "user_score_impact": "refund/credit/reject",
        "return_timing_impact": "refund/credit/reject",
        "final_decision": "refund/credit/reject",
        "item_disposition": "resell/refurbish/salvage/landfill",
        "user_score_adjustment": "+X/-X points",
        "new_user_score": "updated score",
        "decision_reasoning": "...",
        "resale_ad": "Generated ad text (if applicable)"
    }`

    // Call the Gemini API
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: imageData.split(",")[1] } }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    })

    const response = result.response
    const text = response.text()

    // Extract JSON from the response
    let jsonResponse
    try {
      // Try to parse the response as JSON directly
      jsonResponse = JSON.parse(text)
    } catch (e) {
      // If direct parsing fails, try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          jsonResponse = JSON.parse(jsonMatch[1])
        } catch (e2) {
          console.error("Failed to parse JSON from code block:", e2)
          return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 })
        }
      } else {
        console.error("Failed to extract JSON from response")
        return NextResponse.json({ error: "Failed to extract JSON from AI response" }, { status: 500 })
      }
    }

    // Ensure all required fields are present
    if (!jsonResponse.comment_analysis?.fraud_risk) {
      if (!jsonResponse.comment_analysis) {
        jsonResponse.comment_analysis = {}
      }
      jsonResponse.comment_analysis.fraud_risk = "low" // Default to low if missing
    }

    // Calculate user score adjustment if not already done by the model
    if (!jsonResponse.user_score_adjustment || !jsonResponse.new_user_score) {
      const fraudRisk = jsonResponse.comment_analysis.fraud_risk

      if (jsonResponse.final_decision === "refund" && fraudRisk === "low") {
        jsonResponse.user_score_adjustment = "+2 points"
        jsonResponse.new_user_score = Math.min(userScore + 2, 100) // Cap at 100
      } else if (jsonResponse.final_decision === "credit") {
        jsonResponse.user_score_adjustment = "+0 points"
        jsonResponse.new_user_score = userScore
      } else if (jsonResponse.final_decision === "reject") {
        if (fraudRisk === "high") {
          jsonResponse.user_score_adjustment = "-20 points"
          jsonResponse.new_user_score = Math.max(userScore - 20, 0) // Floor at 0
        } else {
          jsonResponse.user_score_adjustment = "-5 points"
          jsonResponse.new_user_score = Math.max(userScore - 5, 0)
        }
      }
    }

    // Generate resale ad if item is rejected for full refund and not already provided
    if (
      (jsonResponse.final_decision === "credit" || jsonResponse.final_decision === "reject") &&
      !jsonResponse.resale_ad
    ) {
      jsonResponse.resale_ad = generateResaleAd(jsonResponse, orderDescription)
    }

    // Generate marketplace data if not already provided
    if (!jsonResponse.marketplace_data) {
      jsonResponse.marketplace_data = generateMarketplaceData(jsonResponse, orderDescription)
    }

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Error processing return analysis:", error)
    return NextResponse.json({ error: "Failed to process return analysis" }, { status: 500 })
  }
}

function generateResaleAd(result: any, orderDescription: string): string {
  const condition = (result.condition_grade || "Acceptable").toLowerCase()
  const damageSeverity = result.damage_severity || "no damage"
  let price = 0

  // Set price based on condition and damage severity
  if (condition === "brand new" && damageSeverity === "no damage") {
    price = 80 // 80% of original price
  } else if (condition === "good") {
    if (damageSeverity === "no damage") {
      price = 70
    } else if (damageSeverity === "minor defect") {
      price = 60
    } else if (damageSeverity === "repairable defect") {
      price = 50
    }
  } else if (condition === "acceptable") {
    if (damageSeverity === "no damage") {
      price = 50
    } else if (damageSeverity === "minor defect") {
      price = 40
    } else if (damageSeverity === "repairable defect") {
      price = 30
    }
  } else if (condition === "poor") {
    if (damageSeverity === "repairable defect") {
      price = 20
    } else if (damageSeverity === "critical failure") {
      price = 10
    }
  }

  // Generate ad text
  return `
  FOR SALE: ${orderDescription}
  Condition: ${condition.charAt(0).toUpperCase() + condition.slice(1)}
  Damage Severity: ${damageSeverity.charAt(0).toUpperCase() + damageSeverity.slice(1)}
  Price: $${price} (Negotiable)
  Description: This item is in ${condition} condition with ${damageSeverity}. It is perfect for someone looking for a great deal!
  Expected Time to Sell: 1-2 weeks
  Contact for more details or to make an offer!
  `.trim()
}

function generateMarketplaceData(result: any, orderDescription: string): any {
  const condition = (result.condition_grade || "Acceptable").toLowerCase()
  const basePrice = getBasePrice(condition, result.damage_severity || "no damage")

  // Generate marketplace-specific data with variations
  return {
    facebook: {
      estimatedValue: `$${Math.floor(basePrice * (1 + Math.random() * 0.1)).toFixed(2)}`,
      timeToSell: "2-3 days",
      fees: "No fees",
    },
    kijiji: {
      estimatedValue: `$${Math.floor(basePrice * (0.95 + Math.random() * 0.1)).toFixed(2)}`,
      timeToSell: "4-7 days",
      fees: "Optional promotion fees",
    },
    poshmark: {
      estimatedValue: `$${Math.floor(basePrice * (0.9 + Math.random() * 0.1)).toFixed(2)}`,
      timeToSell: "5-10 days",
      fees: "20% of sale price",
    },
    offerup: {
      estimatedValue: `$${Math.floor(basePrice * (0.85 + Math.random() * 0.1)).toFixed(2)}`,
      timeToSell: "3-5 days",
      fees: "7.9% of sale price",
    },
  }
}

function getBasePrice(condition: string, damageSeverity: string): number {
  // Assume a base price of $100 for calculation
  const baseValue = 100

  // Calculate price based on condition and damage severity
  if (condition === "brand new" && damageSeverity === "no damage") {
    return baseValue * 0.8
  } else if (condition === "good") {
    if (damageSeverity === "no damage") {
      return baseValue * 0.7
    } else if (damageSeverity === "minor defect") {
      return baseValue * 0.6
    } else if (damageSeverity === "repairable defect") {
      return baseValue * 0.5
    }
  } else if (condition === "acceptable") {
    if (damageSeverity === "no damage") {
      return baseValue * 0.5
    } else if (damageSeverity === "minor defect") {
      return baseValue * 0.4
    } else if (damageSeverity === "repairable defect") {
      return baseValue * 0.3
    }
  } else if (condition === "poor") {
    if (damageSeverity === "repairable defect") {
      return baseValue * 0.2
    } else if (damageSeverity === "critical failure") {
      return baseValue * 0.1
    }
  }

  // Default fallback
  return baseValue * 0.3
}


