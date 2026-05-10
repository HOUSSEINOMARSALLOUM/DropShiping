import { DomainEvent, EventPayload } from "./event-types";
import { EventBus } from "./event-bus";
import { SystemGuards } from "@/infrastructure/guards/system-guards";

export class EventDispatcher {
  /**
   * Universal Dispatcher with automatic traceability and architectural validation.
   */
  static async dispatch(
    type: DomainEvent, 
    data: any, 
    source: string, 
    context?: { userId?: string; correlationId?: string }
  ) {
    // 1. Enforce AI read-only rule if dispatcher is called from AI context
    if (source === "AIService") {
      SystemGuards.guardAIWrite();
    }

    const event: EventPayload = {
      id: Math.random().toString(36).substring(7),
      correlationId: context?.correlationId || Math.random().toString(36).substring(7),
      type,
      data,
      userId: context?.userId,
      timestamp: new Date(),
      source,
      version: "1.0",
    };
    
    await EventBus.publish(event);
  }
}
