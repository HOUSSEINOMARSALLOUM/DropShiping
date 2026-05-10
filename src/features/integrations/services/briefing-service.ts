import { db } from "@/lib/db";
import { AIService } from "@/features/ai/services/ai-service";
import { AnalyticsService } from "@/features/analytics/services/analytics-service";
import { Logger } from "@/lib/logger";

export class BriefingService {
  /**
   * Orchestrates the daily intelligence briefing using AI and domain analytics.
   */
  static async generateDailyBriefing() {
    Logger.info("Starting Daily Intelligence Briefing generation", "BriefingService");

    try {
      // 1. Collect context from all domains
      const context = await AnalyticsService.getExecutiveIntelligence();
      
      // 2. Leverage AI for high-level reasoning
      const briefing = await AIService.generateExecutiveBriefing(context);

      // 3. Save to system memory for persistence
      await AIService.saveMemory(
        `BRIEFING_${new Date().toISOString().split('T')[0]}`,
        briefing.data,
        "OPERATIONS"
      );

      Logger.info("Daily Briefing generated successfully", "BriefingService");
      return briefing.data;
    } catch (e) {
      Logger.error("Failed to generate daily briefing", "BriefingService", { error: e });
      throw e;
    }
  }
}
