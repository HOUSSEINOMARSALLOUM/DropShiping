"use client"

import { Property } from "../types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { deletePropertyAction } from "../actions"
import { MapPin, Bed, Bath, Square, Trash2, Eye } from "lucide-react"

export function PropertyCard({ property }: { property: any }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'AVAILABLE': return <Badge className="bg-emerald-500">Available</Badge>
      case 'UNDER_OFFER': return <Badge className="bg-amber-500">Under Offer</Badge>
      case 'SOLD': return <Badge className="bg-indigo-500">Sold</Badge>
      case 'RENTED': return <Badge className="bg-blue-500">Rented</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <div className="relative h-56 w-full bg-zinc-100 dark:bg-zinc-800">
        {property.images?.[0] && (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="object-cover w-full h-full"
          />
        )}
        <div className="absolute top-2 right-2">
          {getStatusBadge(property.status)}
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur text-xs">
            {property.type}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <h3 className="font-semibold text-lg line-clamp-1" title={property.title}>
          {property.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.address}, {property.city || property.country}
        </p>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-1">
        <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {formatCurrency(property.price)}
        </div>
        
        <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400 text-sm">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" /> {property.bedrooms}
            </div>
          )}
          {property.bathrooms !== null && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" /> {property.bathrooms}
            </div>
          )}
          {property.sqft !== null && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" /> {property.sqft} sqft
            </div>
          )}
        </div>

        {/* CRM Owner Integration view */}
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 flex justify-between items-center">
          <div>
            {property.owner ? `Owner: ${property.owner.firstName} ${property.owner.lastName}` : 'No assigned owner'}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {property._count?.viewings || 0}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-zinc-50 dark:bg-zinc-950/50 flex justify-between gap-2 border-t border-zinc-200 dark:border-zinc-800">
        <Button variant="outline" size="sm" className="w-full">
          Manage Viewings
        </Button>

        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950" onClick={() => deletePropertyAction(property.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
