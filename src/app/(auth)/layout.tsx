import { Suspense } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Dark luxury aesthetic */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-950 text-white p-12">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-2">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Nexus OS
          </h1>
        </div>
        <div>
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-zinc-300">
              "The single-admin operating system designed for ultimate control, automation, and scale."
            </p>
            <footer className="text-sm text-zinc-500">System Core v1.0</footer>
          </blockquote>
        </div>
      </div>

      {/* Right side - Form area */}
      <div className="flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto w-full max-w-[350px] space-y-6">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
