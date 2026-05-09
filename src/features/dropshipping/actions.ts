"use server"

import { revalidatePath } from "next/cache"
import { ProductService } from "./services/product-service"
import { AIPipelineService } from "./services/ai-pipeline"
import { ShopifyService } from "./services/shopify-service"
import { ImportProductSchema } from "./types"

export async function importProductAction(formData: FormData) {
  const url = formData.get("sourceUrl") as string
  
  const parsed = ImportProductSchema.safeParse({ sourceUrl: url })
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  try {
    const product = await ProductService.importFromUrl(parsed.data.sourceUrl)
    revalidatePath("/dropshipping")
    return { success: true, productId: product.id }
  } catch (error: any) {
    return { error: error.message || "Failed to import product" }
  }
}

export async function enrichProductAction(productId: string) {
  try {
    await AIPipelineService.enrichProduct(productId)
    revalidatePath("/dropshipping")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to enrich product" }
  }
}

export async function publishToShopifyAction(productId: string) {
  try {
    await ShopifyService.publishProduct(productId)
    revalidatePath("/dropshipping")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to publish to Shopify" }
  }
}

export async function deleteProductAction(productId: string) {
  try {
    await ProductService.deleteProduct(productId)
    revalidatePath("/dropshipping")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete product" }
  }
}
