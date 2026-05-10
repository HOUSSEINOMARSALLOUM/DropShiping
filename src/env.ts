import { z } from "zod";

const envSchema = z.object({
  // CORE
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  
  // AUTH
  AUTH_SECRET: z.string().min(1),
  
  // AI
  OPENAI_API_KEY: z.string().optional(),
  
  // INTEGRATIONS
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // SAFETY & GATING
  DEPLOYMENT_SAFE_MODE: z.enum(["true", "false"]).default("true"),
  SYSTEM_ENVIRONMENT: z.enum(["local", "staging", "production"]).default("local"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Invalid environment variables:", _env.error.format());
  }
  throw new Error("Invalid environment variables");
}

export const env = _env.data;

/**
 * Deployment Gating Utility
 * Blocks external API calls and sensitive side-effects in safe-mode.
 */
export const isDeploymentSafe = () => {
  return env.DEPLOYMENT_SAFE_MODE === "true" && env.SYSTEM_ENVIRONMENT !== "production";
};

export const canProcessWebhooks = () => {
  return env.SYSTEM_ENVIRONMENT === "production" || env.DEPLOYMENT_SAFE_MODE === "false";
};
