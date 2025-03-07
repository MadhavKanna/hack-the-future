import google.generativeai as genai
from PIL import Image
import argparse
import os
import json

# Retrieve API key from environment variable
api_key = os.getenv("GOOGLE_API_KEY") # please contact Andrey for the API key
if not api_key:
    raise ValueError("API key not found. Please set the GOOGLE_API_KEY in the .env file.")

# Configuration
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

def analyze_return(image_path, user_comment, user_score, days_since_purchase, order_description, harsh_mode=False):
    """Analyze return request with multiple decision factors, including order description and user score adjustments"""
    try:
        img = Image.open(image_path)

        # Build multi-factor decision prompt
        prompt = f"""Analyze this return request considering ALL factors:

        1. ITEM CONDITION (from image):
        - Grade options: Brand New, Good, Acceptable, Poor
        - Describe specific flaws/features justifying the grade
        - Specify any damage detected and tag severity: no damage, minor defect, repairable defect, critical failure
        - If the item is Brand New and recently returned (within 30 days), strongly consider a full refund unless there are clear signs of misuse or fraud.

        2. ORDER DESCRIPTION: "{order_description}"
        - Verify returned item matches the order:
          * Check for consistency in item type, brand, and features
          * Flag discrepancies (e.g., wrong item, mismatched description)
        - If any of: damaged upon arrival, minor but believable description errors (such as shade similarity - pink and magenta), or size errors are mentioned, or otherwise honest mistakes that amount to the customer not wanting the item anymore, use your best judgment on whether or not to flag that as suspicious.  
        - However, major discrepancies, such as the item being more than 80% dissimilar, are still suspicious. 

        3. AI CONFIDENCE:
        - If uncertain about condition (e.g., blurry image, ambiguous damage), confidence <70%
        - Flag for human review if confidence below threshold

        4. USER COMMENT ANALYSIS: "{user_comment}"
        - Check for red flags:
          * Repetitive/keyword-stuffed language
          * Inconsistent damage descriptions
          * Fraud patterns ("item never arrived", "not as described" without specifics)
        - Assign fraud_risk: low/medium/high

        5. USER SCORE: {user_score}/100
        - Consider the user's trust score when making the final decision, but do not let it override clear evidence of the item's condition or fraud risk.

        6. RETURN TIMING: {days_since_purchase} days since purchase
        - If the item is Brand New and returned within 30 days, prioritize a full refund unless there are clear issues.
        - For older returns, consider store credit or rejection based on the item's condition and fraud risk.

        7. AI LENIENCY MODE: {'HARSH' if harsh_mode else 'STANDARD'}
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
        {{
            "condition_grade": "...",
            "condition_reasoning": "...",
            "damage_severity": "no damage/minor defect/repairable defect/critical failure",
            "order_consistency": "consistent/inconsistent",
            "order_discrepancies": ["list", "of", "mismatches"],
            "ai_confidence": "high/medium/low",
            "human_review_flag": true/false,
            "comment_analysis": {{
                "sentiment": "positive/neutral/negative",
                "fraud_risk": "low/medium/high",
                "red_flags": ["list", "of", "patterns"]
            }},
            "user_score_impact": "refund/credit/reject",
            "return_timing_impact": "refund/credit/reject",
            "final_decision": "refund/credit/reject",
            "item_disposition": "resell/refurbish/salvage/landfill",
            "user_score_adjustment": "+X/-X points",
            "new_user_score": "updated score",
            "decision_reasoning": "...",
            "resale_ad": "Generated ad text (if applicable)"
        }}"""

        response = model.generate_content([prompt, img])

        # Parse JSON response
        result = json.loads(response.text.strip("```json\n").strip("```"))

        # Ensure all required fields are present
        if "fraud_risk" not in result.get("comment_analysis", {}):
            result["comment_analysis"]["fraud_risk"] = "low"  # Default to low if missing

        # Calculate user score adjustment
        fraud_risk = result["comment_analysis"]["fraud_risk"]
        if result["final_decision"] == "refund" and fraud_risk == "low":
            result["user_score_adjustment"] = "+2 points"
            result["new_user_score"] = min(user_score + 2, 100)  # Cap at 100
        elif result["final_decision"] == "credit":
            result["user_score_adjustment"] = "+0 points"
            result["new_user_score"] = user_score
        elif result["final_decision"] == "reject":
            if fraud_risk == "high":
                result["user_score_adjustment"] = "-20 points"
                result["new_user_score"] = max(user_score - 20, 0)  # Floor at 0
            else:
                result["user_score_adjustment"] = "-5 points"
                result["new_user_score"] = max(user_score - 5, 0)

        # Generate resale ad if item is rejected for full refund
        if result["final_decision"] in ["credit", "reject"]:
            resale_ad = generate_resale_ad(result, order_description)
            result["resale_ad"] = resale_ad

        return result

    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response as JSON. Ensure the prompt is correctly structured."}
    except Exception as e:
        return {"error": str(e)}

def generate_resale_ad(result, order_description):
    """Generate a resale ad for rejected items"""
    condition = result.get("condition_grade", "Acceptable").lower()
    damage_severity = result.get("damage_severity", "no damage")
    price = 0

    # Set price based on condition and damage severity
    if condition == "brand new" and damage_severity == "no damage":
        price = 80  # 80% of original price
    elif condition == "good":
        if damage_severity == "no damage":
            price = 70
        elif damage_severity == "minor defect":
            price = 60
        elif damage_severity == "repairable defect":
            price = 50
    elif condition == "acceptable":
        if damage_severity == "no damage":
            price = 50
        elif damage_severity == "minor defect":
            price = 40
        elif damage_severity == "repairable defect":
            price = 30
    elif condition == "poor":
        if damage_severity == "repairable defect":
            price = 20
        elif damage_severity == "critical failure":
            price = 10

    # Generate ad text
    ad_text = f"""
    FOR SALE: {order_description}
    Condition: {condition.capitalize()}
    Damage Severity: {damage_severity.capitalize()}
    Price: ${price} (Negotiable)
    Description: This item is in {condition} condition with {damage_severity}. It is perfect for someone looking for a great deal!
    Expected Time to Sell: 1-2 weeks
    Contact for more details or to make an offer!
    """

    return ad_text.strip()

def main():
    parser = argparse.ArgumentParser(description="AI Return Processing System")
    parser.add_argument("image_path", help="Path to item image")
    parser.add_argument("--comment", required=True, help="User's return reason comment")
    parser.add_argument("--user_score", type=int, required=True, help="User trust score 0-100")
    parser.add_argument("--days", type=int, required=True, help="Days since purchase")
    parser.add_argument("--order_desc", required=True, help="Order description from purchase")
    parser.add_argument("--harsh", action="store_true", help="Enable strict evaluation mode")

    args = parser.parse_args()

    result = analyze_return(
        image_path=args.image_path,
        user_comment=args.comment,
        user_score=args.user_score,
        days_since_purchase=args.days,
        order_description=args.order_desc,
        harsh_mode=args.harsh
    )

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
