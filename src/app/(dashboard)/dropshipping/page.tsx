import { ProductService } from "@/features/dropshipping/services/product-service"
import { ProductCard } from "@/features/dropshipping/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"

export default async function DropshippingPage() {
  const products = await ProductService.getAllProducts()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Products Manager</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage imports, AI enrichment, and Shopify publishing.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/dropshipping/import">
              <Plus className="w-4 h-4 mr-2" />
              Import Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-zinc-200"
        />
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4">
            <Plus className="w-6 h-6 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-sm text-zinc-500 mb-4">Import your first product from AliExpress.</p>
          <Button asChild>
            <Link href="/dropshipping/import">Import Product</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            // @ts-ignore Prisma types mismatch fix placeholder
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
    </div>
  )
}
