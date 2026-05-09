import { z } from "zod"

// AI Generation Task Types
export type AITaskType = 
  | 'DROPSHIPPING_DESCRIPTION'
  | 'TIKTOK_HOOK'
  | 'FACEBOOK_AD'
  | 'REAL_ESTATE_DESCRIPTION'
  | 'OUTREACH_MESSAGE'

// Zod schemas for structured outputs
export const DropshippingOutputSchema = z.object({
  seoTitle: z.string(),
  description: z.string(),
  bulletPoints: z.array(z.string()),
  targetAudience: z.string()
})

export const TikTokHookOutputSchema = z.object({
  hook1: z.string(),
  hook2: z.string(),
  hook3: z.string(),
  videoConcept: z.string()
})

export const FacebookAdOutputSchema = z.object({
  primaryText: z.string(),
  headline: z.string(),
  description: z.string(),
  callToAction: z.string()
})

export const RealEstateOutputSchema = z.object({
  title: z.string(),
  propertySummary: z.string(),
  luxuryFeatures: z.array(z.string()),
  neighborhoodHighlights: z.string()
})

export const OutreachMessageOutputSchema = z.object({
  subject: z.string().optional(),
  messageBody: z.string(),
  followUp: z.string()
})

// Unified Output Type
export type AIOutput = 
  | z.infer<typeof DropshippingOutputSchema>
  | z.infer<typeof TikTokHookOutputSchema>
  | z.infer<typeof FacebookAdOutputSchema>
  | z.infer<typeof RealEstateOutputSchema>
  | z.infer<typeof OutreachMessageOutputSchema>

export interface GenerationRequest {
  taskType: AITaskType
  contextData: any
  model?: string
}
