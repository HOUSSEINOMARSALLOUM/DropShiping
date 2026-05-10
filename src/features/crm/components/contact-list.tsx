"use client";

import { Contact, Company } from "@prisma/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Star, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

interface ContactWithCompany extends Contact {
  company: Company | null;
  _count?: {
    notes: number;
    reminders: number;
  };
}

export function ContactList({ contacts }: { contacts: ContactWithCompany[] }) {
  return (
    <div className="grid gap-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="bg-card/40 border-primary/5 hover:border-primary/20 transition-all group overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
              {/* Profile/Avatar & Identity */}
              <div className="flex items-center gap-4 min-w-[240px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg leading-tight">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    {contact.isVip && (
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {contact.position} {contact.company && `at ${contact.company.name}`}
                  </p>
                </div>
              </div>

              {/* Status & Contact Info */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Status</span>
                  <Badge variant="secondary" className="w-fit bg-primary/5 text-primary border-primary/10">
                    {contact.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Contact</span>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate max-w-[150px]">{contact.email}</span>
                  </div>
                </div>
                <div className="hidden md:flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Activity</span>
                  <p className="text-sm text-muted-foreground italic">
                    {contact._count?.notes} notes • {contact._count?.reminders} pending
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/crm/${contact.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          
          {/* Progress Bar (Visual Polish) */}
          <div className="h-1 w-full bg-primary/5">
            <div 
              className="h-full bg-primary/20 transition-all duration-500" 
              style={{ width: contact.status === 'CUSTOMER' ? '100%' : '30%' }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
