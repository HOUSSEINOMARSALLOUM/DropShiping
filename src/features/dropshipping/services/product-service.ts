import { db } from "@/lib/db"
import { Product, ProductUpdateInput } from "../types"

export class ProductService {
  static async getAllProducts() {
    return await db.product.findMany({
      orderBy: { createdAt: "desc" }
    })
  }

  static async getProductById(id: string) {
    return await db.product.findUnique({
      where: { id }
    })
  }

  static async importFromUrl(url: string) {
    // In a real scenario, this would call a scraping service
    // For now, we simulate an AliExpress product import
    return await db.product.create({
      data: {
        title: "Imported AliExpress Product",
        description: "Scraped description placeholder.",
        price: 29.99,
        cost: 10.50,
        stock: 100,
        sourceUrl: url,
        vendor: "AliExpress Vendor",
        status: "IMPORTED",
        images: ["https://placehold.co/600x400?text=Imported+Product"],
      }
    })
  }

  static async updateProduct(id: string, data: ProductUpdateInput) {
    return await db.product.update({
      where: { id },
      data
    })
  }

  static async deleteProduct(id: string) {
    return await db.product.delete({
      where: { id }
    })
  }
}
