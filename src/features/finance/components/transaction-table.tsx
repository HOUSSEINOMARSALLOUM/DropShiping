"use client"

import { Transaction } from "../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { deleteTransactionAction } from "../actions"
import { Trash2 } from "lucide-react"

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'REVENUE': return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Revenue</Badge>
      case 'EXPENSE': return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0">Expense</Badge>
      case 'WITHDRAWAL': return <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-0">Withdrawal</Badge>
      case 'TRANSFER': return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">Transfer</Badge>
      default: return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'COMPLETED': return <Badge variant="outline" className="border-emerald-500 text-emerald-500">Completed</Badge>
      case 'PENDING': return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>
      case 'FAILED': return <Badge variant="outline" className="border-red-500 text-red-500">Failed</Badge>
      default: return null
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source / ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <TableCell className="text-zinc-500 dark:text-zinc-400">
                {t.date.toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                {t.description || "N/A"}
              </TableCell>
              <TableCell className="text-zinc-500 dark:text-zinc-400">{t.category}</TableCell>
              <TableCell className="text-zinc-500 dark:text-zinc-400 text-xs">
                {t.platformSource && <div>Source: {t.platformSource}</div>}
                {t.wishMoneyId && <div>Wish ID: {t.wishMoneyId}</div>}
              </TableCell>
              <TableCell>{getTypeBadge(t.type)}</TableCell>
              <TableCell>{getStatusBadge(t.status)}</TableCell>
              <TableCell className={`text-right font-medium ${t.type === 'REVENUE' ? 'text-emerald-600' : t.type === 'EXPENSE' ? 'text-red-600' : 'text-zinc-900 dark:text-zinc-50'}`}>
                {t.type === 'EXPENSE' || t.type === 'WITHDRAWAL' ? '-' : '+'}{formatCurrency(t.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 h-8 w-8"
                  onClick={() => deleteTransactionAction(t.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-zinc-500 py-8">
                No transactions recorded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
