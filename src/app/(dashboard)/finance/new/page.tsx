import { TransactionForm } from "@/features/finance/components/transaction-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewTransactionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/finance" 
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">New Transaction</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Record a new cash flow movement or transfer.</p>
        </div>
      </div>

      <div className="py-4">
        <TransactionForm />
      </div>
    </div>
  )
}
