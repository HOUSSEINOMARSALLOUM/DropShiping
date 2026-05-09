import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter for middleware edge
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 100 // reqs
const WINDOW_MS = 60 * 1000 // 1 min

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const path = request.nextUrl.pathname

  // 1. Rate Limiting Logic
  const now = Date.now()
  const windowData = rateLimitMap.get(ip)

  if (!windowData || now - windowData.timestamp > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
  } else {
    if (windowData.count >= RATE_LIMIT) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
    windowData.count++
  }

  // 2. Security Headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 3. Admin Authentication Protection
  // Ensure that all internal dashboard routes are protected
  if (path !== '/login' && !path.startsWith('/api/') && !path.startsWith('/_next') && path !== '/') {
    // Check for auth token/cookie here using Auth.js or custom logic.
    // If missing, redirect to /login.
    // const token = request.cookies.get('auth-token')
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
