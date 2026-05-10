import { Reminder } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Clock, Plus } from "lucide-react";
import { format } from "date-fns";

export function ContactReminders({ contactId, reminders }: { contactId: string; reminders: Reminder[] }) {
  return (
    <Card className="bg-card/40 border-primary/5">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reminders</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-4 text-xs text-muted-foreground italic">
            No pending reminders
          </div>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50 group">
              <Button variant="ghost" size="icon" className="h-5 w-5 mt-0.5 opacity-20 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="h-4 w-4" />
              </Button>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{reminder.title}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-500 uppercase">
                  <Clock className="h-3 w-3" />
                  Due {format(new Date(reminder.dueDate), "MMM dd")}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
