import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("Must be a valid Postgres connection string"),
  
  // Security
  AUTH_SECRET: z.string().min(32, "Auth secret must be at least 32 characters"),
  
  // Integration API Keys
  OPENAI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  
  // App Config
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Cost Controls
  MAX_MONTHLY_AI_TOKENS: z.coerce.number().default(1000000),
})

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  MAX_MONTHLY_AI_TOKENS: process.env.MAX_MONTHLY_AI_TOKENS,
})
