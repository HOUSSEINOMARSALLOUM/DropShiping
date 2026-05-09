import { db } from "@/lib/db"
import { QueueDashboard } from "@/features/automation/components/queue-dashboard"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default async function AutomationPage() {
  const tasks = await db.systemTask.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  const metrics = {
    pending: tasks.filter(t => t.status === 'PENDING').length,
    processing: tasks.filter(t => t.status === 'PROCESSING').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    failed: tasks.filter(t => t.status === 'FAILED').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Automation Queue</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Monitor background workers, API integrations, and task delivery.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* This is a UI mock trigger. In production, Vercel Crons triggers the API route automatically */}
          <form action="/api/worker/process" method="POST">
            <Button type="submit" variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400">
              <Play className="w-4 h-4 mr-2" />
              Force Process Queue
            </Button>
          </form>
        </div>
      </div>

      <QueueDashboard tasks={tasks as any} metrics={metrics} />
    </div>
  )
}
