import { db } from "@/infrastructure/db/db";
import { SystemGuards } from "@/infrastructure/guards/system-guards";
import { EventDispatcher } from "@/events/event-dispatcher";

export class FinanceService {
  /**
   * The Finance Domain is highly sensitive. 
   * It enforces strict isolation using SystemGuards.
   */
  static async recordTransaction(data: any, userId?: string, correlationId?: string) {
    SystemGuards.enterDomain("FINANCE");
    
    try {
      // 1. Validate mutation source
      SystemGuards.checkWriteAccess("FINANCE");

      const transaction = await db.transaction.create({ data });
      
      await EventDispatcher.dispatch(
        "FINANCE.TRANSACTION_CREATED", 
        transaction, 
        "FinanceService", 
        { userId, correlationId }
      );
      
      return transaction;
    } finally {
      SystemGuards.exitDomain();
    }
  }

  static async requestWithdrawal(data: any, userId?: string, correlationId?: string) {
    SystemGuards.enterDomain("FINANCE");
    
    try {
      const withdrawal = await db.withdrawal.create({ data });
      
      await EventDispatcher.dispatch(
        "FINANCE.WITHDRAWAL_REQUESTED", 
        withdrawal, 
        "FinanceService", 
        { userId, correlationId }
      );
      
      return withdrawal;
    } finally {
      SystemGuards.exitDomain();
    }
  }
}
