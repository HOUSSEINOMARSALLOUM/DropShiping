import { db } from "@/lib/db";
import { crypto } from "crypto";
import { Logger } from "@/lib/logger";

export class ApiTokenService {
  /**
   * Generates a new secure API token for external integrations.
   */
  static async createToken(name: string, scopes: string[]) {
    const rawToken = `nx_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    // In production, use a secure hash (e.g., scrypt or argon2)
    const hashedToken = rawToken; 

    const token = await db.apiToken.create({
      data: {
        name,
        token: hashedToken,
        scopes,
      }
    });

    Logger.info(`New API token created: ${name}`, "ApiTokenService", { tokenId: token.id });
    
    return {
      ...token,
      rawToken // Only return this once
    };
  }

  static async validateToken(rawToken: string, requiredScope?: string) {
    const token = await db.apiToken.findUnique({
      where: { token: rawToken }
    });

    if (!token) return null;
    if (requiredScope && !token.scopes.includes(requiredScope)) return null;
    
    // Update last used timestamp
    await db.apiToken.update({
      where: { id: token.id },
      data: { lastUsedAt: new Date() }
    });

    return token;
  }
}
