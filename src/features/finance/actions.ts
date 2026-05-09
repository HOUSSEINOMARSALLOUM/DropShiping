"use server"

import { revalidatePath } from "next/cache"
import { FinanceService } from "./services/finance-service"
import { TransactionSchema } from "./types"

export async function createTransactionAction(formData: FormData) {
  const amountStr = formData.get("amount") as string
  const data = {
    amount: amountStr ? parseFloat(amountStr) : 0,
    currency: formData.get("currency") as string || "USD",
    type: formData.get("type") as any,
    status: formData.get("status") as any || "COMPLETED",
    category: formData.get("category") as string,
    description: formData.get("description") as string || null,
    platformSource: formData.get("platformSource") as string || null,
    wishMoneyId: formData.get("wishMoneyId") as string || null,
  }

  const parsed = TransactionSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  try {
    const transaction = await FinanceService.createTransaction(parsed.data)
    revalidatePath("/finance")
    return { success: true, transactionId: transaction.id }
  } catch (error: any) {
    return { error: error.message || "Failed to log transaction" }
  }
}

export async function deleteTransactionAction(id: string) {
  try {
    await FinanceService.deleteTransaction(id)
    revalidatePath("/finance")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete transaction" }
  }
}
