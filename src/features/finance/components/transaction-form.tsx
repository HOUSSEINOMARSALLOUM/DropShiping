"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTransactionAction } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TransactionForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const [type, setType] = useState('REVENUE')

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    
    const result = await createTransactionAction(formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success) {
      router.push("/finance")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
        <CardTitle>Record Transaction</CardTitle>
        <CardDescription>Log a new revenue, expense, or Wish Money transfer manually.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select name="type" value={type} onValueChange={setType}>
                <SelectTrigger className="dark:bg-zinc-950">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="REVENUE">Revenue</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                  <SelectItem value="WITHDRAWAL">Withdrawal</SelectItem>
                  <SelectItem value="TRANSFER">Transfer (Wish Money)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input name="amount" type="number" step="0.01" min="0" required placeholder="0.00" className="dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input name="category" required placeholder="e.g. Software, Dropshipping Sales" className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select name="status" defaultValue="COMPLETED">
                <SelectTrigger className="dark:bg-zinc-950">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input name="description" placeholder="Optional notes" className="dark:bg-zinc-950" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500">Platform Source</label>
              <Input name="platformSource" placeholder="e.g. Shopify, Stripe, Upwork" className="dark:bg-zinc-950 bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500">Wish Money ID</label>
              <Input name="wishMoneyId" placeholder="Transfer Reference ID" className="dark:bg-zinc-950 bg-white" />
              <p className="text-xs text-zinc-500">For tracking Lebanon Wish Money transfers</p>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-950/50 p-3 rounded-md">{error}</p>}
          
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
              {loading ? "Saving..." : "Record"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
