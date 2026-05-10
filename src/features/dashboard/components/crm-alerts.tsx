"use client";

import { Contact } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CRMAlerts({ contacts }: { contacts: any[] }) {
  return (
    <Card className="h-full bg-card/40 border-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Users className="h-4 w-4 text-sky-500" />
          CRM Velocity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contacts.slice(0, 4).map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold flex items-center gap-1">
                  {contact.firstName} {contact.lastName}
                  {contact.isVip && <Star className="h-2 w-2 fill-yellow-500 text-yellow-500" />}
                </span>
                <span className="text-[10px] text-muted-foreground">{contact.status}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" asChild>
              <Link href={`/crm/${contact.id}`}>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="text-center py-6 text-[10px] text-muted-foreground italic uppercase">No urgent follow-ups</div>
        )}
      </CardContent>
    </Card>
  );
}
