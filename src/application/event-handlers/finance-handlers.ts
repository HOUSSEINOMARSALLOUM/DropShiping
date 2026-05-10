import { EventBus } from "@/events/event-dispatcher";
import { FinanceService } from "@/application/services/finance-service";

export function registerFinanceHandlers() {
  EventBus.subscribe("REAL_ESTATE.DEAL_WON", async (event) => {
    // DEAL.WON triggers a commission transaction
    await FinanceService.recordTransaction({
      amount: event.data.commission,
      type: "INCOME",
      category: "COMMISSION",
      description: `Commission from deal: ${event.data.title}`,
      dealId: event.data.id,
      contactId: event.data.contactId,
    });
  });

  EventBus.subscribe("FINANCE.WITHDRAWAL_REQUESTED", async (event) => {
    // Record withdrawal request in ledger
    await FinanceService.recordTransaction({
      amount: event.data.amount,
      type: "EXPENSE",
      category: "WITHDRAWAL",
      description: `Withdrawal request: ${event.data.method}`,
      reference: event.data.id,
    });
  });
}
