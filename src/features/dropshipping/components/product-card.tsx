"use client"

import Image from "next/image"
import { Product } from "../types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { enrichProductAction, publishToShopifyAction, deleteProductAction } from "../actions"
import { Sparkles, ShoppingBag, Trash2, ExternalLink } from "lucide-react"

export function ProductCard({ product }: { product: Product }) {
  
  const handleEnrich = async () => {
    await enrichProductAction(product.id)
  }

  const handlePublish = async () => {
    await publishToShopifyAction(product.id)
  }

  const handleDelete = async () => {
    await deleteProductAction(product.id)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DRAFT': return 'bg-zinc-500'
      case 'IMPORTED': return 'bg-blue-500'
      case 'ENRICHED': return 'bg-purple-500'
      case 'PUBLISHED': return 'bg-emerald-500'
      case 'ARCHIVED': return 'bg-red-500'
      default: return 'bg-zinc-500'
    }
  }

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800">
        {product.images?.[0] && (
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="object-cover w-full h-full"
          />
        )}
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(product.status)}>
            {product.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <h3 className="font-semibold text-lg line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Vendor: {product.vendor || 'Unknown'}
        </p>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-1">
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-zinc-500">Cost</p>
            <p className="font-medium">${product.cost.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Price</p>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">${product.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Margin</p>
            <p className="font-medium text-indigo-600 dark:text-indigo-400">
              {(((product.price - product.cost) / product.price) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        
        {/* Analytics preview if published */}
        {product.status === 'PUBLISHED' && (
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-500">
            <span>{product.views} Views</span>
            <span>{product.sales} Sales</span>
            <span>{product.conversionRate}% CR</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 bg-zinc-50 dark:bg-zinc-950/50 flex justify-between gap-2 border-t border-zinc-200 dark:border-zinc-800">
        {product.status === 'IMPORTED' && (
          <Button variant="outline" size="sm" className="w-full gap-1" onClick={handleEnrich}>
            <Sparkles className="w-4 h-4" /> AI Enrich
          </Button>
        )}
        
        {product.status === 'ENRICHED' && (
          <Button variant="default" size="sm" className="w-full gap-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handlePublish}>
            <ShoppingBag className="w-4 h-4" /> Publish
          </Button>
        )}

        {product.status === 'PUBLISHED' && product.shopifyUrl && (
          <Button variant="outline" size="sm" className="w-full gap-1" asChild>
            <a href={product.shopifyUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" /> View Store
            </a>
          </Button>
        )}

        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
