import { Suspense } from "react"
import { GenerationHistory } from "@/features/ai/components/generation-history"
import { AIPlayground } from "@/features/ai/components/ai-playground"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIOperatingSystemPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">AI Orchestration</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage and execute structured AI workflows across your business modules.</p>
      </div>

      <Tabs defaultValue="playground" className="space-y-6">
        <TabsList className="bg-zinc-100 dark:bg-zinc-900">
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="history">Generation Log</TabsTrigger>
          <TabsTrigger value="registry" disabled>Prompt Registry (Coming Soon)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playground" className="m-0">
          <AIPlayground />
        </TabsContent>
        
        <TabsContent value="history" className="m-0">
          <Suspense fallback={<div className="h-64 flex items-center justify-center border rounded-md">Loading history...</div>}>
            <GenerationHistory />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
