"use server"

import { revalidatePath } from "next/cache"
import { ClientService } from "./services/client-service"
import { ClientSchema } from "./types"

export async function createClientAction(formData: FormData) {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string || null,
    whatsapp: formData.get("whatsapp") as string || null,
    wealthTier: formData.get("wealthTier") as any,
    company: formData.get("company") as string || null,
    jobTitle: formData.get("jobTitle") as string || null,
    dealStage: formData.get("dealStage") as any,
    realEstateInterest: (formData.get("realEstateInterest") as string)?.split(",").filter(Boolean) || [],
    tags: (formData.get("tags") as string)?.split(",").filter(Boolean) || []
  }

  const parsed = ClientSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  try {
    const client = await ClientService.createClient(parsed.data)
    revalidatePath("/crm")
    return { success: true, clientId: client.id }
  } catch (error: any) {
    return { error: error.message || "Failed to create client" }
  }
}

export async function deleteClientAction(clientId: string) {
  try {
    await ClientService.deleteClient(clientId)
    revalidatePath("/crm")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete client" }
  }
}
