"use client"

import { useState } from "react"
import { runAIGenerationAction } from "../actions"
import { AITaskType } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bot, Sparkles } from "lucide-react"

export function AIPlayground() {
  const [taskType, setTaskType] = useState<AITaskType>('DROPSHIPPING_DESCRIPTION')
  const [context, setContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setResult(null)
    
    // Simple mock parser for UI purposes
    const contextData = { data: context, title: context, specs: context, productOrService: context, audience: "General", offer: context, angle: "Discount", property: context, price: "$1M", features: context, recipientName: "John", recipientCompany: "Acme", goal: context }
    
    const res = await runAIGenerationAction(taskType, contextData)
    if (res.success) {
      setResult(res.data)
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-500" />
            Generation Playground
          </CardTitle>
          <CardDescription>Select a task template and provide context to generate structured AI outputs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Template</label>
            <Select value={taskType} onValueChange={(v) => setTaskType(v as AITaskType)}>
              <SelectTrigger className="dark:bg-zinc-950">
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-950">
                <SelectItem value="DROPSHIPPING_DESCRIPTION">Dropshipping Description</SelectItem>
                <SelectItem value="TIKTOK_HOOK">TikTok Hooks</SelectItem>
                <SelectItem value="FACEBOOK_AD">Facebook Ad Copy</SelectItem>
                <SelectItem value="REAL_ESTATE_DESCRIPTION">Luxury Real Estate Listing</SelectItem>
                <SelectItem value="OUTREACH_MESSAGE">B2B Outreach Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Context / Input</label>
            <Textarea 
              placeholder="E.g. A magnetic levitating moon lamp..." 
              className="min-h-[150px] dark:bg-zinc-950"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerate} disabled={loading || !context} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {loading ? "Generating..." : <><Sparkles className="w-4 h-4 mr-2" /> Generate Output</>}
          </Button>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
        <CardHeader>
          <CardTitle>Structured Output</CardTitle>
          <CardDescription>The JSON-validated result will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 bg-zinc-50 dark:bg-zinc-950 m-6 mt-0 rounded-md p-4 overflow-auto border border-zinc-200 dark:border-zinc-800">
          {result ? (
            <pre className="text-sm text-zinc-800 dark:text-zinc-300 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              Waiting for generation...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
