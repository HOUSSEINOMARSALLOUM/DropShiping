import { z } from "zod"

export type PropertyStatus = 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | 'RENTED' | 'OFF_MARKET'
export type PropertyType = 'VILLA' | 'APARTMENT' | 'PENTHOUSE' | 'COMMERCIAL' | 'TOWNHOUSE' | 'LAND'

export interface Property {
  id: string
  title: string
  description: string | null
  address: string
  city: string | null
  country: string
  price: number
  
  status: PropertyStatus
  type: PropertyType
  
  bedrooms: number | null
  bathrooms: number | null
  sqft: number | null
  images: string[]
  
  ownerId: string | null
  
  createdAt: Date
  updatedAt: Date
  
  owner?: any // Client from CRM
  viewings?: any[] // PropertyViewing
}

export const PropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  address: z.string().min(1, "Address is required"),
  city: z.string().optional().nullable(),
  country: z.string().default("Lebanon"),
  price: z.number().positive("Price must be positive"),
  status: z.enum(['AVAILABLE', 'UNDER_OFFER', 'SOLD', 'RENTED', 'OFF_MARKET']).default('AVAILABLE'),
  type: z.enum(['VILLA', 'APARTMENT', 'PENTHOUSE', 'COMMERCIAL', 'TOWNHOUSE', 'LAND']),
  bedrooms: z.number().optional().nullable(),
  bathrooms: z.number().optional().nullable(),
  sqft: z.number().optional().nullable(),
  ownerId: z.string().optional().nullable()
})

export type PropertyInput = z.infer<typeof PropertySchema>
