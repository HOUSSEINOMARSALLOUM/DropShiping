"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPropertyAction } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertyForm({ clients }: { clients: any[] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    
    const result = await createPropertyAction(formData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success) {
      router.push("/real-estate")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
        <CardTitle>List New Property</CardTitle>
        <CardDescription>
          Add a luxury listing and optionally tie it to an existing CRM VIP Client.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium">Listing Title</label>
              <Input id="title" name="title" required placeholder="Luxury Penthouse in Downtown" className="dark:bg-zinc-950" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">Price (USD)</label>
              <Input id="price" name="price" type="number" required placeholder="1500000" className="dark:bg-zinc-950" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Property Type</label>
              <Select name="type" defaultValue="APARTMENT">
                <SelectTrigger className="dark:bg-zinc-950">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="VILLA">Villa</SelectItem>
                  <SelectItem value="APARTMENT">Apartment</SelectItem>
                  <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                  <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                  <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                  <SelectItem value="LAND">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Input id="address" name="address" required className="dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">City</label>
              <Input id="city" name="city" placeholder="Beirut" className="dark:bg-zinc-950" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">Country</label>
              <Input id="country" name="country" defaultValue="Lebanon" className="dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</label>
              <Input id="bedrooms" name="bedrooms" type="number" className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label htmlFor="bathrooms" className="text-sm font-medium">Bathrooms</label>
              <Input id="bathrooms" name="bathrooms" type="number" className="dark:bg-zinc-950" />
            </div>
            <div className="space-y-2">
              <label htmlFor="sqft" className="text-sm font-medium">Square Feet</label>
              <Input id="sqft" name="sqft" type="number" className="dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <label htmlFor="ownerId" className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Assign CRM Owner</label>
              <Select name="ownerId">
                <SelectTrigger className="dark:bg-zinc-950 border-indigo-200 dark:border-indigo-900">
                  <SelectValue placeholder="Select VIP Client (Optional)" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  <SelectItem value="">None (Agency Owned)</SelectItem>
                  {clients.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea id="description" name="description" className="dark:bg-zinc-950 min-h-[100px]" />
          </div>

          {error && <p className="text-sm text-red-500 font-medium bg-red-50 dark:bg-red-950/50 p-3 rounded-md">{error}</p>}
          
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
              {loading ? "Saving..." : "Create Listing"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
