import { ProductImportForm } from "@/features/dropshipping/components/product-import-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ImportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dropshipping" 
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Import New Product</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Source a new winning product for your store.</p>
        </div>
      </div>

      <div className="py-8">
        <ProductImportForm />
      </div>
    </div>
  )
}
