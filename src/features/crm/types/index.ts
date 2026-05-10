import { z } from "zod";
import { ContactStatus, ActivityType } from "@prisma/client";

export const ContactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  companyId: z.string().optional().nullable(),
  isVip: z.boolean().default(false),
  status: z.nativeEnum(ContactStatus).default(ContactStatus.LEAD),
});

export type ContactDTO = z.infer<typeof ContactSchema>;

export const NoteSchema = z.object({
  content: z.string().min(1, "Note content cannot be empty"),
  contactId: z.string(),
});

export type NoteDTO = z.infer<typeof NoteSchema>;

export const ReminderSchema = z.object({
  title: z.string().min(1, "Reminder title cannot be empty"),
  dueDate: z.date(),
  contactId: z.string(),
});

export type ReminderDTO = z.infer<typeof ReminderSchema>;
