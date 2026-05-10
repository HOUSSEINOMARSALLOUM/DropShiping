import { Activity } from "@prisma/client";
import { Clock, Phone, Mail, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  CALL: Phone,
  EMAIL: Mail,
  MEETING: Clock,
  NOTE_ADDED: FileText,
  TASK_COMPLETED: Zap,
};

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground opacity-50">
        <Clock className="h-8 w-8 mb-2" />
        <p className="text-sm">No activity recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/5">
      {activities.map((activity, idx) => {
        const Icon = iconMap[activity.type] || Clock;
        return (
          <div key={activity.id} className="flex gap-4 relative pl-10">
            <div className="absolute left-0 h-8 w-8 rounded-full bg-card border border-primary/10 flex items-center justify-center z-10 shadow-sm">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-tight">{activity.description}</p>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
