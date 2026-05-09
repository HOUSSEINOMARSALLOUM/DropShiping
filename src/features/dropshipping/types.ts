import { z } from "zod"

// Base Types from Prisma
export type ProductStatus = 'DRAFT' | 'IMPORTED' | 'ENRICHED' | 'PUBLISHED' | 'ARCHIVED'

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  cost: number
  stock: number
  
  sourceUrl: string | null
  vendor: string | null
  images: string[]
  aiGeneratedContent: any | null
  status: ProductStatus
  
  views: number
  sales: number
  conversionRate: number
  
  shopifyId: string | null
  shopifyUrl: string | null
  tags: string[]
  
  createdAt: Date
  updatedAt: Date
}

// Zod Validations
export const ImportProductSchema = z.object({
  sourceUrl: z.string().url("Must be a valid URL").includes("aliexpress.com", { message: "Must be an AliExpress URL" })
})

export type ImportProductInput = z.infer<typeof ImportProductSchema>

export const ProductUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().min(0),
  cost: z.number().min(0),
  stock: z.number().min(0),
  status: z.enum(['DRAFT', 'IMPORTED', 'ENRICHED', 'PUBLISHED', 'ARCHIVED']),
  vendor: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>
