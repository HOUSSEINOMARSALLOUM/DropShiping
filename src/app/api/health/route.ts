import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const start = performance.now()
    
    // Verify DB connectivity
    await db.$queryRaw`SELECT 1`
    
    const dbLatency = performance.now() - start

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      latency: `${dbLatency.toFixed(2)}ms`,
      uptime: process.uptime()
    }, { status: 200 })

  } catch (error: any) {
    console.error("Health check failed:", error)
    return NextResponse.json({
      status: "unhealthy",
      error: error.message
    }, { status: 503 })
  }
}
