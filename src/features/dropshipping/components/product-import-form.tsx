"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { importProductAction } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductImportForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    
    const result = await importProductAction(formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success) {
      router.push("/dropshipping")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto dark:bg-zinc-900">
      <CardHeader>
        <CardTitle>Import Product</CardTitle>
        <CardDescription>
          Paste an AliExpress URL to import product data, images, and pricing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sourceUrl" className="text-sm font-medium leading-none">
              AliExpress URL
            </label>
            <Input 
              id="sourceUrl" 
              name="sourceUrl"
              placeholder="https://www.aliexpress.com/item/123456.html" 
              className="dark:bg-zinc-950"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Importing..." : "Start Import Process"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
