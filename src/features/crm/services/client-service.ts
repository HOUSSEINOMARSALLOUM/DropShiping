import { db } from "@/lib/db"
import { ClientInput } from "../types"

export class ClientService {
  static async getAllClients() {
    return await db.client.findMany({
      include: {
        notes: true,
        reminders: true,
      },
      orderBy: { createdAt: "desc" }
    })
  }

  static async getClientById(id: string) {
    return await db.client.findUnique({
      where: { id },
      include: {
        notes: true,
        meetings: true,
        reminders: true
      }
    })
  }

  static async createClient(data: ClientInput) {
    return await db.client.create({
      data: {
        ...data,
        realEstateInterest: data.realEstateInterest || [],
        tags: data.tags || [],
      }
    })
  }

  static async updateClient(id: string, data: ClientInput) {
    return await db.client.update({
      where: { id },
      data: {
        ...data,
        realEstateInterest: data.realEstateInterest || [],
        tags: data.tags || [],
      }
    })
  }

  static async deleteClient(id: string) {
    return await db.client.delete({
      where: { id }
    })
  }
}
