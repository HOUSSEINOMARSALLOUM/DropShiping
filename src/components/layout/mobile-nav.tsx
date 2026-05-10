"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" className="mr-2">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
    </div>
  );
}
