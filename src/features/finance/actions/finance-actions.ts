"use server";

import { revalidatePath } from "next/cache";
import { FinanceService } from "../services/finance-service";
import { TransactionSchema, WithdrawalSchema } from "../types";

export async function recordTransactionAction(data: any) {
  const validated = TransactionSchema.safeParse(data);
  if (!validated.success) return { error: "Invalid transaction data" };

  try {
    await FinanceService.recordTransaction(validated.data);
    revalidatePath("/finance");
    if (validated.data.contactId) revalidatePath(`/crm/${validated.data.contactId}`);
    return { success: true };
  } catch (e) {
    return { error: "Failed to record transaction" };
  }
}

export async function requestWithdrawalAction(data: any) {
  const validated = WithdrawalSchema.safeParse(data);
  if (!validated.success) return { error: "Invalid withdrawal request" };

  try {
    await FinanceService.requestWithdrawal(validated.data);
    revalidatePath("/finance/withdrawals");
    return { success: true };
  } catch (e) {
    return { error: "Failed to submit withdrawal request" };
  }
}
