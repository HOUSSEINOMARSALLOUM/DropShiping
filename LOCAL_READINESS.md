# Nexus OS - Local Readiness & Safety Guide

This guide ensures you can safely run and test the Business OS in a local environment without triggering accidental production side-effects.

## 1. Environment Configuration
Copy the `.env` contents to a `.env.local` file (if not already done). Ensure the following safety flags are set:

```bash
DEPLOYMENT_SAFE_MODE="true"
SYSTEM_ENVIRONMENT="local"
```

*   **`DEPLOYMENT_SAFE_MODE="true"`**: Prevents real calls to OpenAI, Resend, and Twilio. It also blocks webhook processing.
*   **`SYSTEM_ENVIRONMENT="local"`**: Informs the application it is running in a single-user local context.

## 2. Database Initialization
Run the following commands to sync your schema and seed the local demo data:

```bash
# Push schema to local/preview DB
npx prisma db push

# Seed demo contacts, properties, and transactions
npx prisma db seed
```

## 3. Launching the Platform
Start the development server:

```bash
npm run dev
```

The system will automatically validate your environment variables on startup. If any required keys (like `DATABASE_URL` or `AUTH_SECRET`) are missing, the system will fail-fast with a clear error message.

## 4. Testing Webhooks
To test webhooks locally without disabling safe-mode, you must explicitly set `DEPLOYMENT_SAFE_MODE="false"` in your `.env.local`. Use this with caution.

## 5. Deployment Gating
Before deploying to production, ensure that:
1. `SYSTEM_ENVIRONMENT` is set to `"production"` in your Vercel/Cloud dashboard.
2. `DEPLOYMENT_SAFE_MODE` is set to `"false"`.
3. All production API keys are properly configured in the hosting environment's secrets.
