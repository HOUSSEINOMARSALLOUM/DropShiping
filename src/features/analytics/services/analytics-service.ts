import { db } from "@/lib/db";
import { DomainIntelligence, ChartDataPoint } from "../types";
import { TransactionType, DealStatus } from "@prisma/client";
import { startOfMonth, subMonths, format } from "date-fns";

export class AnalyticsService {
  static async getExecutiveIntelligence(): Promise<DomainIntelligence> {
    const [
      contacts,
      vips,
      properties,
      deals,
      transactions
    ] = await Promise.all([
      db.contact.count(),
      db.contact.count({ where: { isVip: true } }),
      db.property.findMany(),
      db.deal.findMany(),
      db.transaction.findMany()
    ]);

    // CRM Intelligence
    const crm = {
      totalContacts: contacts,
      vipCount: vips,
      conversionRate: deals.length > 0 ? (deals.filter(d => d.status === DealStatus.WON).length / deals.length) * 100 : 0,
      leadVelocity: 12.5, // Mock velocity for now
    };

    // Real Estate Intelligence
    const realEstate = {
      portfolioValue: properties.reduce((acc, p) => acc + Number(p.price), 0),
      activeDeals: deals.filter(d => d.status === DealStatus.PIPELINE).length,
      closedDeals: deals.filter(d => d.status === DealStatus.WON).length,
      averageDealSize: deals.length > 0 ? deals.reduce((acc, d) => acc + Number(d.value), 0) / deals.length : 0,
    };

    // Finance Intelligence & Cash Flow Chart
    const currentMonth = startOfMonth(new Date());
    const last6Months = Array.from({ length: 6 }).map((_, i) => subMonths(currentMonth, 5 - i));

    const cashFlow: ChartDataPoint[] = last6Months.map(month => {
      const monthTransactions = transactions.filter(t => 
        new Date(t.createdAt) >= month && 
        new Date(t.createdAt) < subMonths(month, -1)
      );
      
      return {
        name: format(month, "MMM"),
        value: monthTransactions
          .filter(t => t.type === TransactionType.INCOME)
          .reduce((acc, t) => acc + Number(t.amount), 0),
        secondary: monthTransactions
          .filter(t => t.type === TransactionType.EXPENSE)
          .reduce((acc, t) => acc + Number(t.amount), 0),
      };
    });

    const finance = {
      monthlyRevenue: cashFlow[5].value,
      monthlyExpenses: cashFlow[5].secondary || 0,
      profitMargin: cashFlow[5].value > 0 ? ((cashFlow[5].value - (cashFlow[5].secondary || 0)) / cashFlow[5].value) * 100 : 0,
      cashFlow,
    };

    return { crm, realEstate, finance };
  }
}
