import { z } from "zod"

export type DealStage = 'PROSPECT' | 'QUALIFIED' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'
export type WealthTier = 'HIGH_NET_WORTH' | 'ULTRA_HIGH_NET_WORTH' | 'BILLIONAIRE'

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  whatsapp: string | null
  
  wealthTier: WealthTier
  company: string | null
  jobTitle: string | null
  
  dealStage: DealStage
  realEstateInterest: string[]
  tags: string[]
  
  createdAt: Date
  updatedAt: Date
  
  notes?: ClientNote[]
  meetings?: Meeting[]
  reminders?: Reminder[]
}

export interface ClientNote {
  id: string
  content: string
  clientId: string
  createdAt: Date
  updatedAt: Date
}

export interface Meeting {
  id: string
  title: string
  date: Date
  location: string | null
  summary: string | null
  clientId: string
  createdAt: Date
  updatedAt: Date
}

export interface Reminder {
  id: string
  title: string
  dueDate: Date
  isCompleted: boolean
  clientId: string
  createdAt: Date
  updatedAt: Date
}

export const ClientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  wealthTier: z.enum(['HIGH_NET_WORTH', 'ULTRA_HIGH_NET_WORTH', 'BILLIONAIRE']),
  company: z.string().optional().nullable(),
  jobTitle: z.string().optional().nullable(),
  dealStage: z.enum(['PROSPECT', 'QUALIFIED', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  realEstateInterest: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
})

export type ClientInput = z.infer<typeof ClientSchema>
