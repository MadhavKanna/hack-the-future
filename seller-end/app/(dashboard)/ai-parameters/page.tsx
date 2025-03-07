"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ParameterCard } from "@/components/ai-parameters/parameter-card"
import { ConfidenceSlider } from "@/components/ai-parameters/confidence-slider"
import { ThresholdSelector } from "@/components/ai-parameters/threshold-selector"
import { PresetSelector } from "@/components/ai-parameters/preset-selector"

export default function AIParametersPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Parameters</h1>
        <div className="flex gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start bg-transparent p-0">
          <TabsTrigger
            value="general"
            className={`rounded-t-md border-b-2 ${activeTab === "general" ? "border-primary" : "border-transparent"}`}
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="returns"
            className={`rounded-t-md border-b-2 ${activeTab === "returns" ? "border-primary" : "border-transparent"}`}
          >
            Returns Processing
          </TabsTrigger>
          <TabsTrigger
            value="fraud"
            className={`rounded-t-md border-b-2 ${activeTab === "fraud" ? "border-primary" : "border-transparent"}`}
          >
            Fraud Detection
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className={`rounded-t-md border-b-2 ${activeTab === "advanced" ? "border-primary" : "border-transparent"}`}
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ParameterCard
              title="AI Processing Mode"
              description="Choose how the AI processes returns. Automatic mode processes returns without human intervention, while Assisted mode flags uncertain cases for review."
            >
              <PresetSelector
                presets={[
                  {
                    id: "automatic",
                    name: "Automatic",
                    description: "AI processes all returns without human intervention",
                  },
                  {
                    id: "assisted",
                    name: "Assisted",
                    description: "AI flags uncertain cases for human review",
                  },
                  {
                    id: "manual",
                    name: "Manual with AI Suggestions",
                    description: "All returns require human approval with AI recommendations",
                  },
                ]}
                defaultSelected="assisted"
              />
            </ParameterCard>

            <ParameterCard
              title="Model Selection"
              description="Select the AI model to use for processing returns. More advanced models provide better accuracy but may be slower."
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">AI Model</label>
                  <Select defaultValue="gemini-pro">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro (Recommended)</SelectItem>
                      <SelectItem value="gemini-flash">Gemini Flash (Faster)</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable AI Processing</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard
              title="Confidence Thresholds"
              description="Set the confidence level required for the AI to make decisions automatically."
            >
              <ConfidenceSlider defaultValue={75} />
            </ParameterCard>

            <ParameterCard
              title="Processing Speed"
              description="Balance between processing speed and accuracy. Higher accuracy may result in slower processing times."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Optimization</span>
                  <Select defaultValue="balanced">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select optimization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="speed">Speed Optimized</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="accuracy">Accuracy Optimized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector title="Processing Timeout" defaultValue={30} min={5} max={60} unit="s" />
              </div>
            </ParameterCard>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ParameterCard
              title="Return Reason Analysis"
              description="Configure how the AI analyzes and categorizes return reasons."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable Reason Analysis</span>
                  <Switch defaultChecked />
                </div>

                <ThresholdSelector title="Categorization Precision" defaultValue={85} />

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Reason Categories</label>
                  <Select defaultValue="detailed">
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (5 categories)</SelectItem>
                      <SelectItem value="standard">Standard (10 categories)</SelectItem>
                      <SelectItem value="detailed">Detailed (15+ categories)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ParameterCard>

            <ParameterCard
              title="Return Eligibility"
              description="Set parameters for determining return eligibility based on product condition and return window."
            >
              <div className="space-y-4">
                <ThresholdSelector title="Return Window" defaultValue={30} min={7} max={90} unit=" days" />

                <ThresholdSelector title="Condition Threshold" defaultValue={70} min={0} max={100} />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Allow Exceptions</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard
              title="Refund Processing"
              description="Configure how refunds are processed for approved returns."
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Default Refund Method</label>
                  <Select defaultValue="original">
                    <SelectTrigger>
                      <SelectValue placeholder="Select refund method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Original Payment Method</SelectItem>
                      <SelectItem value="store-credit">Store Credit</SelectItem>
                      <SelectItem value="exchange">Exchange Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector title="Processing Time" defaultValue={3} min={1} max={14} unit=" days" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Automatic Refunds</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard
              title="Return Shipping"
              description="Configure parameters for return shipping labels and costs."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Free Return Shipping</span>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Shipping Label Generation</label>
                  <Select defaultValue="automatic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select label generation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="customer">Customer Generated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector
                  title="Value Threshold for Free Shipping"
                  defaultValue={50}
                  min={0}
                  max={200}
                  unit="$"
                />
              </div>
            </ParameterCard>
          </div>
        </TabsContent>

        <TabsContent value="fraud" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ParameterCard
              title="Fraud Detection Sensitivity"
              description="Configure how aggressively the system flags potential fraudulent returns."
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Sensitivity Level</span>
                    <Select defaultValue="balanced">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select sensitivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Fewer flags, more false negatives)</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="high">High (More flags, more false positives)</SelectItem>
                        <SelectItem value="very-high">Very High (Strict enforcement)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ThresholdSelector title="Fraud Score Threshold" defaultValue={65} />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Auto-block Suspicious Users</span>
                  <Switch />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard
              title="Pattern Recognition"
              description="Configure how the system identifies patterns in return behavior that may indicate fraud."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable Pattern Recognition</span>
                  <Switch defaultChecked />
                </div>

                <ThresholdSelector
                  title="Return Frequency Threshold"
                  defaultValue={3}
                  min={1}
                  max={10}
                  unit=" returns/month"
                />

                <ThresholdSelector title="Value Pattern Threshold" defaultValue={80} />
              </div>
            </ParameterCard>

            <ParameterCard
              title="User Risk Scoring"
              description="Configure how user risk scores are calculated based on return history and behavior."
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable Risk Scoring</span>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Scoring Algorithm</label>
                  <Select defaultValue="advanced">
                    <SelectTrigger>
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (Return frequency only)</SelectItem>
                      <SelectItem value="standard">Standard (Frequency + Value)</SelectItem>
                      <SelectItem value="advanced">Advanced (Multiple factors)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector title="Risk Score Threshold" defaultValue={70} />
              </div>
            </ParameterCard>

            <ParameterCard
              title="Verification Requirements"
              description="Configure additional verification steps required for suspicious returns."
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Verification Level</label>
                  <Select defaultValue="adaptive">
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="enhanced">Enhanced</SelectItem>
                      <SelectItem value="adaptive">Adaptive (Risk-based)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Required for High-Value Returns</label>
                  <ThresholdSelector title="Value Threshold" defaultValue={200} min={50} max={1000} unit="$" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Require Photo Evidence</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </ParameterCard>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ParameterCard title="API Integration" description="Configure API settings for external integrations.">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable External API</span>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">API Rate Limit</label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select rate limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (100 requests/min)</SelectItem>
                      <SelectItem value="medium">Medium (500 requests/min)</SelectItem>
                      <SelectItem value="high">High (1000 requests/min)</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Webhook URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    placeholder="https://your-webhook-url.com"
                  />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard title="Data Retention" description="Configure how long return data is stored in the system.">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Return Data Retention</label>
                  <Select defaultValue="1-year">
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 Days</SelectItem>
                      <SelectItem value="90-days">90 Days</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="3-years">3 Years</SelectItem>
                      <SelectItem value="7-years">7 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Auto-archive Old Returns</span>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Anonymize Customer Data</span>
                  <Switch />
                </div>
              </div>
            </ParameterCard>

            <ParameterCard title="AI Training" description="Configure how the AI model is trained on your return data.">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable Continuous Learning</span>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Training Frequency</label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector
                  title="Minimum Training Data Size"
                  defaultValue={1000}
                  min={100}
                  max={10000}
                  unit=" returns"
                />
              </div>
            </ParameterCard>

            <ParameterCard title="System Performance" description="Configure system performance settings.">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Processing Priority</label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ThresholdSelector title="Concurrent Processes" defaultValue={5} min={1} max={20} unit="" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enable Performance Logging</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </ParameterCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

