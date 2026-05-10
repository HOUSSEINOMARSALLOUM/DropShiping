import { db } from "@/infrastructure/db/db";
import { EventDispatcher } from "@/events/event-dispatcher";
import { AIProvider, AIResponse, ExecutiveBriefing } from "@/domain/ai/types";

export class AIService {
  /**
   * AI execution is read-only. Insights are emitted as events or returned as suggestions.
   */
  static async generateExecutiveBriefing(context: any, userId?: string): Promise<ExecutiveBriefing> {
    // 1. Core Logic (Simulated)
    const briefing: ExecutiveBriefing = {
      summary: "Strategic momentum detected in Real Estate sector.",
      criticalAlerts: ["VIP Follow-up Required"],
      recommendations: [],
      sentiment: "BULLISH"
    };

    // 2. Emit event for logging and potential downstream automation (non-mutative)
    await EventDispatcher.dispatch("AI.BRIEFING_GENERATED", briefing, "AIService", userId);

    return briefing;
  }

  /**
   * Lead scoring generates an INSIGHT, but does NOT modify the Lead status directly.
   * Modifying the Lead status must be a separate action taken by an Admin/Agent or Automation.
   */
  static async analyzeLead(contactId: string, userId?: string) {
    const contact = await db.contact.findUnique({ where: { id: contactId } });
    
    const result = {
      score: 85,
      reasoning: "High transaction velocity and frequent interactions.",
      suggestion: "Mark as VIP"
    };

    await EventDispatcher.dispatch("AI.REQUESTED", { contactId, result }, "AIService", userId);
    
    return result;
  }
}
