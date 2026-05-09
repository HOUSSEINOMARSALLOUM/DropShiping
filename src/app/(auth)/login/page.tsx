import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Admin Access
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Enter your credentials to access the operating system
      </p>
      
      <div className="mt-8">
        <form className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50" htmlFor="email">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              placeholder="admin@nexus-os.com"
              className="flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-zinc-50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50" htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Forgot password?
              </Link>
            </div>
            <input 
              id="password"
              type="password" 
              className="flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-zinc-50 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 transition-colors shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
      
      <p className="px-8 text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
