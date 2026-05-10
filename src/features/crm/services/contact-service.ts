import { db } from "@/lib/db";
import { ContactDTO, NoteDTO, ReminderDTO } from "../types";
import { ActivityType } from "@prisma/client";

export class ContactService {
  static async getAll() {
    return await db.contact.findMany({
      include: {
        company: true,
        _count: {
          select: { notes: true, reminders: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });
  }

  static async getById(id: string) {
    return await db.contact.findUnique({
      where: { id },
      include: {
        company: true,
        notes: { orderBy: { createdAt: "desc" } },
        reminders: { orderBy: { dueDate: "asc" } },
        activities: { orderBy: { createdAt: "desc" }, take: 10 }
      }
    });
  }

  static async create(data: ContactDTO) {
    const contact = await db.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        isVip: data.isVip,
        status: data.status,
        companyId: data.companyId,
      }
    });

    await db.activity.create({
      data: {
        type: ActivityType.NOTE_ADDED,
        description: `Contact created: ${contact.firstName} ${contact.lastName}`,
        contactId: contact.id,
      }
    });

    return contact;
  }

  static async addNote(data: NoteDTO) {
    const note = await db.note.create({
      data: {
        content: data.content,
        contactId: data.contactId,
      }
    });

    await db.activity.create({
      data: {
        type: ActivityType.NOTE_ADDED,
        description: "New note added to profile",
        contactId: data.contactId,
      }
    });

    return note;
  }

  static async addReminder(data: ReminderDTO) {
    return await db.reminder.create({
      data: {
        title: data.title,
        dueDate: data.dueDate,
        contactId: data.contactId,
      }
    });
  }
}
