import { db } from "@/lib/db"
import { PropertyInput } from "../types"

export class PropertyService {
  static async getAllProperties() {
    return await db.property.findMany({
      include: {
        owner: true,
        _count: {
          select: { viewings: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })
  }

  static async getPropertyById(id: string) {
    return await db.property.findUnique({
      where: { id },
      include: {
        owner: true,
        viewings: {
          include: { client: true },
          orderBy: { date: "desc" }
        }
      }
    })
  }

  static async createProperty(data: PropertyInput) {
    return await db.property.create({
      data: {
        ...data,
        images: ["https://placehold.co/600x400?text=Luxury+Property"]
      }
    })
  }

  static async deleteProperty(id: string) {
    return await db.property.delete({
      where: { id }
    })
  }
}
