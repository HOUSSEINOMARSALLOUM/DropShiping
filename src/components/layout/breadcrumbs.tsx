"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <div className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <span className="capitalize">{paths[0]}</span>
      {paths.length > 1 && (
        <>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="capitalize text-foreground font-medium">
            {paths[paths.length - 1].replace(/-/g, " ")}
          </span>
        </>
      )}
    </div>
  );
}
