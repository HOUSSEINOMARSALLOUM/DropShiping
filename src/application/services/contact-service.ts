import { db } from "@/infrastructure/db/db";
import { EventDispatcher } from "@/events/event-dispatcher";
import { Logger } from "@/infrastructure/logger/logger";

export class ContactService {
  static async create(data: any, userId?: string) {
    const contact = await db.contact.create({ data });
    
    Logger.info("Contact created", "ContactService", { contactId: contact.id });

    // Emit event instead of direct cross-domain side effects
    await EventDispatcher.dispatch("CRM.LEAD_CREATED", contact, "ContactService", userId);
    
    return contact;
  }

  static async update(id: string, data: any, userId?: string) {
    const contact = await db.contact.update({
      where: { id },
      data,
    });

    await EventDispatcher.dispatch("CRM.CONTACT_UPDATED", contact, "ContactService", userId);
    
    return contact;
  }
}
