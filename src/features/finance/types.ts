import { z } from "zod"

export type TransactionType = 'REVENUE' | 'EXPENSE' | 'WITHDRAWAL' | 'TRANSFER'
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

export interface Transaction {
  id: string
  amount: number
  currency: string
  type: TransactionType
  status: TransactionStatus
  category: string
  description: string | null
  
  platformSource: string | null
  wishMoneyId: string | null
  
  date: Date
  createdAt: Date
  updatedAt: Date
}

export const TransactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  type: z.enum(['REVENUE', 'EXPENSE', 'WITHDRAWAL', 'TRANSFER']),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']).default('COMPLETED'),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().nullable(),
  platformSource: z.string().optional().nullable(),
  wishMoneyId: z.string().optional().nullable(),
  date: z.date().optional()
})

export type TransactionInput = z.infer<typeof TransactionSchema>
