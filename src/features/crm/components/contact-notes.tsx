"use client";

import { Note } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { addNoteAction } from "../actions/contact-actions";
import { format } from "date-fns";
import { MessageSquarePlus } from "lucide-react";

export function ContactNotes({ contactId, notes }: { contactId: string; notes: Note[] }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);
    await addNoteAction(contactId, content);
    setContent("");
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Textarea
          placeholder="Type a new internal note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] bg-card/50 border-primary/5 focus:border-primary/20"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Save Note
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {notes.map((note) => (
          <div key={note.id} className="p-4 rounded-lg bg-primary/5 border border-primary/5 space-y-2">
            <p className="text-sm leading-relaxed">{note.content}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
              Added {format(new Date(note.createdAt), "MMM dd, yyyy • HH:mm")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
