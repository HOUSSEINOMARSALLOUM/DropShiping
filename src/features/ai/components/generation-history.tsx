import { AIOrchestrator } from "@/features/ai/services/orchestrator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export async function GenerationHistory() {
  const history = await AIOrchestrator.getHistory()

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
          <TableRow>
            <TableHead>Task Type</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Tokens (P/C/T)</TableHead>
            <TableHead>Latency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((log) => (
            <TableRow key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                {log.promptTemplate.replace(/_/g, ' ')}
              </TableCell>
              <TableCell className="text-zinc-500">{log.model}</TableCell>
              <TableCell className="text-zinc-500">
                {log.promptTokens} / {log.completionTokens} / <span className="font-medium">{log.totalTokens}</span>
              </TableCell>
              <TableCell className="text-zinc-500">{(log.latencyMs / 1000).toFixed(2)}s</TableCell>
              <TableCell>
                {log.status === 'SUCCESS' ? (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">Success</Badge>
                ) : (
                  <Badge variant="destructive">Failed</Badge>
                )}
              </TableCell>
              <TableCell className="text-right text-zinc-500">
                {log.createdAt.toLocaleDateString()} {log.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </TableCell>
            </TableRow>
          ))}
          {history.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-zinc-500 py-8">
                No generation history yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
