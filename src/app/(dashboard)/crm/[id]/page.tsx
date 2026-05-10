import { ContactService } from "@/features/crm/services/contact-service";
import { notFound } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronLeft,
  Edit2,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import { ActivityTimeline } from "@/features/crm/components/activity-timeline";
import { ContactNotes } from "@/features/crm/components/contact-notes";
import { ContactReminders } from "@/features/crm/components/contact-reminders";

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const contact = await ContactService.getById(params.id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/crm">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{contact.firstName} {contact.lastName}</h1>
            {contact.isVip && (
              <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                <Star className="mr-1 h-3 w-3 fill-yellow-500" />
                VIP Client
              </Badge>
            )}
          </div>
          <Button size="sm" variant="outline">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card/40 border-primary/5">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-3xl font-bold text-primary mb-4">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>
              <CardTitle>{contact.firstName} {contact.lastName}</CardTitle>
              <p className="text-sm text-muted-foreground">{contact.position} at {contact.company?.name || "Independent"}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <span>{contact.phone || "No phone added"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <span>Dubai, UAE</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Lead Score</span>
                  <span className="text-xs font-bold text-primary">84%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <ContactReminders contactId={contact.id} reminders={contact.reminders} />
        </div>

        {/* Notes & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/40 border-primary/5 md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Relationship Notes</CardTitle>
                <Badge variant="outline">{contact.notes.length} Total</Badge>
              </CardHeader>
              <CardContent>
                <ContactNotes contactId={contact.id} notes={contact.notes} />
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-primary/5 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityTimeline activities={contact.activities} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
