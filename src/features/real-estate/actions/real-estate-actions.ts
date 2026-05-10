"use server";

import { revalidatePath } from "next/cache";
import { RealEstateService } from "../services/real-estate-service";
import { PropertySchema, ViewingSchema, DealSchema } from "../types";

export async function createPropertyAction(data: any) {
  const validated = PropertySchema.safeParse(data);
  if (!validated.success) return { error: "Invalid data" };

  try {
    await RealEstateService.createProperty(validated.data);
    revalidatePath("/real-estate");
    return { success: true };
  } catch (e) {
    return { error: "Database error" };
  }
}

export async function scheduleViewingAction(data: any) {
  const validated = ViewingSchema.safeParse(data);
  if (!validated.success) return { error: "Invalid viewing data" };

  try {
    await RealEstateService.scheduleViewing(validated.data);
    revalidatePath("/real-estate/viewings");
    revalidatePath(`/crm/${validated.data.contactId}`);
    return { success: true };
  } catch (e) {
    return { error: "Failed to schedule viewing" };
  }
}

export async function closeDealAction(dealId: string, commissionPercent: number) {
  try {
    await RealEstateService.closeDeal(dealId, commissionPercent);
    revalidatePath("/real-estate/pipeline");
    return { success: true };
  } catch (e) {
    return { error: "Failed to close deal" };
  }
}
