"use client";

import { Property } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  DollarSign,
  ChevronRight,
  Home
} from "lucide-react";
import Link from "next/link";

export function PropertyGrid({ properties }: { properties: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="group overflow-hidden bg-card/40 border-primary/5 hover:border-primary/20 transition-all">
          <div className="aspect-video w-full bg-muted relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              <Badge className="bg-primary/90 text-primary-foreground border-none">
                {property.type}
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-white/10 text-white">
                {property.status}
              </Badge>
            </div>
            {/* Media Upload Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
              <Home className="h-12 w-12" />
            </div>
          </div>
          
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold truncate">{property.title}</CardTitle>
              <span className="text-lg font-bold text-primary">${Number(property.price).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{property.address}</span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/5">
              <div className="flex items-center gap-1.5 text-sm">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{property.beds || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{property.baths || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Maximize className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{property.sqft || 0} <span className="text-[10px] font-normal">sqft</span></span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
              <Link href={`/real-estate/${property.id}`}>
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
