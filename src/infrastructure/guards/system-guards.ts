import { Logger } from "@/infrastructure/logger/logger";

export class SystemGuards {
  private static activeDomain: string | null = null;

  /**
   * Enforce domain isolation at runtime.
   * Prevents cross-domain writes without going through the Event System.
   */
  static enterDomain(domain: string) {
    this.activeDomain = domain;
  }

  static exitDomain() {
    this.activeDomain = null;
  }

  static checkWriteAccess(targetDomain: string) {
    if (this.activeDomain && this.activeDomain !== targetDomain) {
      const error = `[Architectural Violation] ${this.activeDomain} attempted a direct write to ${targetDomain}. Mutations must flow through EventBus.`;
      Logger.error(error, "SystemGuards");
      throw new Error(error);
    }
  }

  /**
   * Prevent AI from mutating any business domain state.
   */
  static guardAIWrite() {
    if (this.activeDomain === "AI") {
      const error = "[Architectural Violation] AI attempted a mutation. AI layer must remain read-only intelligence.";
      Logger.error(error, "SystemGuards");
      throw new Error(error);
    }
  }
}
