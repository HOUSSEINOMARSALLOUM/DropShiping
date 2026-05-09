export type TaskStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
export type TaskType = 'EMAIL_SEND' | 'WHATSAPP_SEND' | 'AI_BACKGROUND_ENRICHMENT' | 'DATA_SYNC' | 'WEBHOOK_DELIVERY'

export interface TaskPayload {
  to?: string
  subject?: string
  body?: string
  templateId?: string
  data?: any
  recordId?: string
}

export interface SystemTask {
  id: string
  type: TaskType
  payload: any
  status: TaskStatus
  attempts: number
  maxAttempts: number
  error: string | null
  scheduledFor: Date
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
