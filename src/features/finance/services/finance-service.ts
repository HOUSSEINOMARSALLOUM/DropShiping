import { db } from "@/lib/db";
import { TransactionDTO, WithdrawalDTO } from "../types";
import { TransactionType, ActivityType } from "@prisma/client";

export class FinanceService {
  // Ledger & Transactions
  static async getTransactions() {
    return await db.transaction.findMany({
      include: {
        contact: true,
        deal: { include: { property: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async recordTransaction(data: TransactionDTO) {
    const transaction = await db.transaction.create({
      data: {
        amount: data.amount as any,
        type: data.type,
        category: data.category,
        description: data.description,
        reference: data.reference,
        contactId: data.contactId,
        dealId: data.dealId,
      }
    });

    if (data.contactId) {
      await db.activity.create({
        data: {
          type: ActivityType.TRANSACTION_RECORDED,
          description: `Financial transaction recorded: ${data.type} of $${data.amount} (${data.category})`,
          contactId: data.contactId,
        }
      });
    }

    return transaction;
  }

  // Withdrawals
  static async getWithdrawals() {
    return await db.withdrawal.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static async requestWithdrawal(data: WithdrawalDTO) {
    return await db.withdrawal.create({
      data: {
        amount: data.amount as any,
        method: data.method,
        reference: data.reference,
        status: data.status,
      }
    });
  }

  // Analytics & Forecasting
  static async getFinancialSummary() {
    const transactions = await db.transaction.findMany();
    
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + Number(t.amount), 0);
      
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + Number(t.amount), 0);

    return {
      totalRevenue: income,
      totalExpenses: expenses,
      netProfit: income - expenses,
      transactionCount: transactions.length
    };
  }

  static async getRevenueByContact(contactId: string) {
    const transactions = await db.transaction.findMany({
      where: { contactId, type: TransactionType.INCOME }
    });
    return transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  }
}
