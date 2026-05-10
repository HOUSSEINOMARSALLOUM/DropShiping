import { db } from "@/infrastructure/db/db";
import { EventDispatcher } from "@/events/event-dispatcher";
import { DealStatus } from "@prisma/client";

export class RealEstateService {
  static async createProperty(data: any, userId?: string) {
    const property = await db.property.create({ data });
    await EventDispatcher.dispatch("REAL_ESTATE.PROPERTY_CREATED", property, "RealEstateService", userId);
    return property;
  }

  static async closeDeal(dealId: string, userId?: string) {
    const deal = await db.deal.update({
      where: { id: dealId },
      data: { status: DealStatus.WON },
      include: { property: true }
    });

    // Emitting DEAL_WON triggers side effects in Finance and Automation
    await EventDispatcher.dispatch("REAL_ESTATE.DEAL_WON", deal, "RealEstateService", userId);
    
    return deal;
  }

  static async scheduleViewing(data: any, userId?: string) {
    const viewing = await db.viewing.create({ data });
    await EventDispatcher.dispatch("REAL_ESTATE.VIEWING_SCHEDULED", viewing, "RealEstateService", userId);
    return viewing;
  }
}
