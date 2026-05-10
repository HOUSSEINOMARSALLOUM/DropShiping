"use client";

import { Transaction, Contact, Deal, Property } from "@prisma/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Receipt, User, Home } from "lucide-react";

interface TransactionWithExtras extends Transaction {
  contact: Contact | null;
  deal: (Deal & { property: Property }) | null;
}

export function TransactionTable({ transactions }: { transactions: TransactionWithExtras[] }) {
  return (
    <div className="rounded-xl border border-primary/5 bg-card/40 overflow-hidden">
      <Table>
        <TableHeader className="bg-primary/5">
          <TableRow>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Entity</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Amount</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status/Ref</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id} className="hover:bg-primary/5 transition-colors border-primary/5">
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  {t.contact && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {t.contact.firstName} {t.contact.lastName}
                    </div>
                  )}
                  {t.deal && (
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Home className="h-3 w-3" />
                      {t.deal.property.title}
                    </div>
                  )}
                  {!t.contact && !t.deal && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground italic">
                      <Receipt className="h-3 w-3 text-muted-foreground" />
                      Operational
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-background/50 border-primary/10 text-[10px] font-bold uppercase">
                  {t.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                <span className={t.type === 'INCOME' ? 'text-emerald-500' : 'text-orange-500'}>
                  {t.type === 'INCOME' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground truncate max-w-[120px]">
                    {t.reference || "Internal"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">
                {format(new Date(t.createdAt), "MMM dd, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
