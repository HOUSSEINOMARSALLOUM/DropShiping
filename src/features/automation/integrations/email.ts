import { env } from "@/env"

export class EmailIntegration {
  static async sendEmail(to: string, subject: string, body: string) {
    console.log(`[Email] Sending to ${to} | Subject: ${subject}`)
    
    if (!to || !subject) throw new Error("Missing email parameters")
    
    if (!env.RESEND_API_KEY) {
      console.warn("[Email] No RESEND_API_KEY detected. Mocking email delivery for local/staging.")
      await new Promise(r => setTimeout(r, 800))
      return { success: true, messageId: `mock_${Date.now()}` }
    }

    try {
      // Real Resend Provider Integration
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "admin@business-os.com",
          to: [to],
          subject: subject,
          html: body
        })
      })

      if (!response.ok) {
        throw new Error(`Resend API Error: ${await response.text()}`)
      }

      const data = await response.json()
      return { success: true, messageId: data.id }
      
    } catch (error: any) {
      throw new Error(`Email delivery failed: ${error.message}`)
    }
  }
}
