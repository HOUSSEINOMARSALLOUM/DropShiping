import { PropertyService } from "@/features/real-estate/services/property-service"
import { PropertyCard } from "@/features/real-estate/components/property-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Search, Filter, Home } from "lucide-react"

export default async function RealEstatePage() {
  const properties = await PropertyService.getAllProperties()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Luxury Real Estate</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage high-end property listings and track VIP viewings.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/real-estate/new">
              <Plus className="w-4 h-4 mr-2" />
              List Property
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search properties by title, city, or CRM owner..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-zinc-200"
        />
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4">
            <Home className="w-6 h-6 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium">No properties listed</h3>
          <p className="text-sm text-zinc-500 mb-4">Add your first luxury real estate listing to the portfolio.</p>
          <Button asChild>
            <Link href="/real-estate/new">Create Listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
