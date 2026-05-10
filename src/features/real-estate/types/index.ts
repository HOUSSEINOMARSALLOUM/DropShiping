import { z } from "zod";
import { PropertyType, PropertyStatus, ViewingStatus, DealStatus, CommissionStatus } from "@prisma/client";

export const PropertySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional().nullable(),
  price: z.number().positive(),
  address: z.string().min(5, "Full address required"),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus).default(PropertyStatus.AVAILABLE),
  beds: z.number().int().nonnegative().optional().nullable(),
  baths: z.number().int().nonnegative().optional().nullable(),
  sqft: z.number().int().nonnegative().optional().nullable(),
  images: z.array(z.string()).default([]),
});

export type PropertyDTO = z.infer<typeof PropertySchema>;

export const ViewingSchema = z.object({
  scheduledAt: z.date(),
  propertyId: z.string(),
  contactId: z.string(),
  status: z.nativeEnum(ViewingStatus).default(ViewingStatus.SCHEDULED),
});

export type ViewingDTO = z.infer<typeof ViewingSchema>;

export const DealSchema = z.object({
  value: z.number().positive(),
  status: z.nativeEnum(DealStatus).default(DealStatus.PIPELINE),
  stage: z.string().default("Negotiation"),
  propertyId: z.string(),
  contactId: z.string(),
});

export type DealDTO = z.infer<typeof DealSchema>;
