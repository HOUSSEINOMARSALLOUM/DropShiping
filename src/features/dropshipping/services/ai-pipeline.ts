import { db } from "@/lib/db"

export class AIPipelineService {
  static async enrichProduct(id: string) {
    // Simulate AI enrichment (e.g. OpenAI call)
    const product = await db.product.findUnique({ where: { id } })
    if (!product) throw new Error("Product not found")

    const generatedContent = {
      seoTitle: `Premium ${product.title}`,
      adCopy: `Discover the ultimate ${product.title}. Get yours today!`,
      improvedDescription: `This is an AI-generated premium description for ${product.title}.`
    }

    return await db.product.update({
      where: { id },
      data: {
        aiGeneratedContent: generatedContent,
        status: "ENRICHED"
      }
    })
  }
}
