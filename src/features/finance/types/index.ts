import { z } from "zod";
import { TransactionType, WithdrawalStatus } from "@prisma/client";

export const TransactionSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional().nullable(),
  reference: z.string().optional().nullable(),
  contactId: z.string().optional().nullable(),
  dealId: z.string().optional().nullable(),
});

export type TransactionDTO = z.infer<typeof TransactionSchema>;

export const WithdrawalSchema = z.object({
  amount: z.number().positive(),
  method: z.string().min(1, "Method is required"),
  reference: z.string().optional().nullable(),
  status: z.nativeEnum(WithdrawalStatus).default(WithdrawalStatus.PENDING),
});

export type WithdrawalDTO = z.infer<typeof WithdrawalSchema>;
