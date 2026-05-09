"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SystemTask } from "../types"
import { Activity, CheckCircle2, Clock, XCircle } from "lucide-react"

export function QueueDashboard({ tasks, metrics }: { tasks: SystemTask[], metrics: any }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>
      case 'PENDING': return <Badge variant="outline" className="text-zinc-500">Pending</Badge>
      case 'PROCESSING': return <Badge className="bg-blue-500 hover:bg-blue-600 animate-pulse">Processing</Badge>
      case 'FAILED': return <Badge variant="destructive">Failed</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="dark:bg-zinc-950 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center"><Clock className="w-4 h-4 mr-2" /> Pending</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{metrics.pending}</div></CardContent>
        </Card>
        <Card className="dark:bg-zinc-950 shadow-sm border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500 flex items-center"><Activity className="w-4 h-4 mr-2" /> Processing</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-500">{metrics.processing}</div></CardContent>
        </Card>
        <Card className="dark:bg-zinc-950 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-500 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Completed</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">{metrics.completed}</div></CardContent>
        </Card>
        <Card className="dark:bg-zinc-950 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-500 flex items-center"><XCircle className="w-4 h-4 mr-2" /> Failed</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">{metrics.failed}</div></CardContent>
        </Card>
      </div>

      <Card className="dark:bg-zinc-950 shadow-sm border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Recent Task Executions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
                <TableRow>
                  <TableHead>Task Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Scheduled / Completed</TableHead>
                  <TableHead>Error Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    <TableCell className="font-medium text-xs">
                      {task.type}
                    </TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-zinc-500">
                      {task.attempts} / {task.maxAttempts}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500">
                      {task.completedAt ? new Date(task.completedAt).toLocaleString() : new Date(task.scheduledFor).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-red-500 max-w-[200px] truncate">
                      {task.error || "-"}
                    </TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                      Queue is completely empty.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
