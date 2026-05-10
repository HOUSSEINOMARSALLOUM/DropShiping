"use client"; // Note: This will be changed to 'use server' if I were writing a server file, but I'll make it a server action file.
// Wait, server actions need "use server".

"use server";

import { revalidatePath } from "next/cache";
import { ContactService } from "../services/contact-service";
import { ContactSchema, NoteSchema, ReminderSchema } from "../types";

export async function createContactAction(formData: any) {
  const validatedFields = ContactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    await ContactService.create(validatedFields.data);
    revalidatePath("/crm");
    return { success: true };
  } catch (e) {
    return { error: "Failed to create contact" };
  }
}

export async function addNoteAction(contactId: string, content: string) {
  const validatedFields = NoteSchema.safeParse({ contactId, content });

  if (!validatedFields.success) {
    return { error: "Invalid note" };
  }

  try {
    await ContactService.addNote(validatedFields.data);
    revalidatePath(`/crm/${contactId}`);
    return { success: true };
  } catch (e) {
    return { error: "Failed to add note" };
  }
}
