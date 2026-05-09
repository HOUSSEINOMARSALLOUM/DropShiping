"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientAction } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ClientForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    
    const result = await createClientAction(formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success) {
      router.push("/crm")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
        <CardTitle>Add VIP Client</CardTitle>
        <CardDescription>
          Enter details for the new high-net-worth individual.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input id="firstName" name="firstName" required className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <Input id="lastName" name="lastName" required className="dark:bg-zinc-950" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" name="email" type="email" required className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</label>
              <Input id="whatsapp" name="whatsapp" placeholder="+1234567890" className="dark:bg-zinc-950" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Company</label>
              <Input id="company" name="company" className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium">Job Title</label>
              <Input id="jobTitle" name="jobTitle" className="dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <label htmlFor="wealthTier" className="text-sm font-medium">Wealth Tier</label>
              <Select name="wealthTier" defaultValue="HIGH_NET_WORTH">
                <SelectTrigger className="dark:bg-zinc-950">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="HIGH_NET_WORTH">High Net Worth (HNW)</SelectItem>
                  <SelectItem value="ULTRA_HIGH_NET_WORTH">Ultra High Net Worth (UHNW)</SelectItem>
                  <SelectItem value="BILLIONAIRE">Billionaire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="dealStage" className="text-sm font-medium">Initial Deal Stage</label>
              <Select name="dealStage" defaultValue="PROSPECT">
                <SelectTrigger className="dark:bg-zinc-950">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="PROSPECT">Prospect</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
            <Input id="tags" name="tags" placeholder="VIP, Real Estate, Investor" className="dark:bg-zinc-950" />
          </div>

          {error && <p className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-950/50 p-3 rounded-md">{error}</p>}
          
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
              {loading ? "Saving..." : "Save VIP Client"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
