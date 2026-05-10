import { db } from "@/lib/db";
import { PropertyDTO, ViewingDTO, DealDTO } from "../types";
import { ActivityType, PropertyStatus, DealStatus } from "@prisma/client";

export class RealEstateService {
  // Properties
  static async getProperties() {
    return await db.property.findMany({
      include: {
        _count: { select: { viewings: true, deals: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async getPropertyById(id: string) {
    return await db.property.findUnique({
      where: { id },
      include: {
        viewings: { include: { contact: true }, orderBy: { scheduledAt: "desc" } },
        deals: { include: { contact: true, commission: true }, orderBy: { createdAt: "desc" } }
      }
    });
  }

  static async createProperty(data: PropertyDTO) {
    return await db.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price as any,
        address: data.address,
        type: data.type,
        status: data.status,
        beds: data.beds,
        baths: data.baths,
        sqft: data.sqft,
        images: data.images,
      }
    });
  }

  // Viewings
  static async scheduleViewing(data: ViewingDTO) {
    const viewing = await db.viewing.create({
      data: {
        scheduledAt: data.scheduledAt,
        propertyId: data.propertyId,
        contactId: data.contactId,
        status: data.status,
      },
      include: { property: true }
    });

    // Integrated Activity Timeline Hook
    await db.activity.create({
      data: {
        type: ActivityType.VIEWING_SCHEDULED,
        description: `Scheduled viewing for ${viewing.property.title}`,
        contactId: data.contactId,
      }
    });

    return viewing;
  }

  // Deals & Pipeline
  static async createDeal(data: DealDTO) {
    const deal = await db.deal.create({
      data: {
        value: data.value as any,
        status: data.status,
        stage: data.stage,
        propertyId: data.propertyId,
        contactId: data.contactId,
      },
      include: { property: true }
    });

    await db.activity.create({
      data: {
        type: ActivityType.DEAL_CREATED,
        description: `New deal initiated for ${deal.property.title} ($${data.value})`,
        contactId: data.contactId,
      }
    });

    return deal;
  }

  static async getPipeline() {
    return await db.deal.findMany({
      include: {
        property: true,
        contact: true,
        commission: true,
      },
      orderBy: { updatedAt: "desc" }
    });
  }

  static async closeDeal(dealId: string, commissionPercent: number) {
    const deal = await db.deal.update({
      where: { id: dealId },
      data: { 
        status: DealStatus.WON,
        stage: "Closed"
      },
      include: { property: true }
    });

    const commissionAmount = Number(deal.value) * (commissionPercent / 100);

    await db.commission.create({
      data: {
        amount: commissionAmount as any,
        percentage: commissionPercent as any,
        dealId: deal.id,
      }
    });

    await db.activity.create({
      data: {
        type: ActivityType.DEAL_CLOSED,
        description: `Deal closed for ${deal.property.title}. Commission generated.`,
        contactId: deal.contactId,
      }
    });

    return deal;
  }
}
