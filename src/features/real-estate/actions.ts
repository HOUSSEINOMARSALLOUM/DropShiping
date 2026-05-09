"use server"

import { revalidatePath } from "next/cache"
import { PropertyService } from "./services/property-service"
import { PropertySchema } from "./types"

export async function createPropertyAction(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string || null,
    address: formData.get("address") as string,
    city: formData.get("city") as string || null,
    country: formData.get("country") as string || "Lebanon",
    price: parseFloat(formData.get("price") as string || "0"),
    status: formData.get("status") as any || "AVAILABLE",
    type: formData.get("type") as any,
    bedrooms: formData.get("bedrooms") ? parseInt(formData.get("bedrooms") as string) : null,
    bathrooms: formData.get("bathrooms") ? parseInt(formData.get("bathrooms") as string) : null,
    sqft: formData.get("sqft") ? parseFloat(formData.get("sqft") as string) : null,
    ownerId: formData.get("ownerId") as string || null,
  }

  const parsed = PropertySchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  try {
    const property = await PropertyService.createProperty(parsed.data)
    revalidatePath("/real-estate")
    return { success: true, propertyId: property.id }
  } catch (error: any) {
    return { error: error.message || "Failed to create property" }
  }
}

export async function deletePropertyAction(propertyId: string) {
  try {
    await PropertyService.deleteProperty(propertyId)
    revalidatePath("/real-estate")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete property" }
  }
}
