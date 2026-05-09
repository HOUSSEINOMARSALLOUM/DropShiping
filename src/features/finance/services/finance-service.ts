import { db } from "@/lib/db"
import { TransactionInput } from "../types"

export class FinanceService {
  static async getAllTransactions() {
    return await db.transaction.findMany({
      orderBy: { date: "desc" }
    })
  }

  static async getDashboardMetrics() {
    const transactions = await db.transaction.findMany()
    
    let totalRevenue = 0
    let totalExpenses = 0
    let totalWithdrawals = 0

    transactions.forEach(t => {
      if (t.type === 'REVENUE' && t.status === 'COMPLETED') totalRevenue += t.amount
      if (t.type === 'EXPENSE' && t.status === 'COMPLETED') totalExpenses += t.amount
      if (t.type === 'WITHDRAWAL' && t.status === 'COMPLETED') totalWithdrawals += t.amount
    })

    const netProfit = totalRevenue - totalExpenses

    // Mock Chart Data for Revenue vs Expense
    const chartData = [
      { name: "Jan", revenue: 4000, expenses: 2400 },
      { name: "Feb", revenue: 3000, expenses: 1398 },
      { name: "Mar", revenue: 2000, expenses: 9800 },
      { name: "Apr", revenue: 2780, expenses: 3908 },
      { name: "May", revenue: 1890, expenses: 4800 },
      { name: "Jun", revenue: 2390, expenses: 3800 },
      { name: "Jul", revenue: 3490, expenses: 4300 },
    ]

    return {
      totalRevenue,
      totalExpenses,
      totalWithdrawals,
      netProfit,
      chartData
    }
  }

  static async createTransaction(data: TransactionInput) {
    return await db.transaction.create({
      data: {
        ...data,
        date: data.date || new Date()
      }
    })
  }

  static async deleteTransaction(id: string) {
    return await db.transaction.delete({
      where: { id }
    })
  }
}
