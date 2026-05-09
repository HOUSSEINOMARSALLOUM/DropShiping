import { AITaskType } from "../types"

export const PromptRegistry: Record<AITaskType, (context: any) => string> = {
  DROPSHIPPING_DESCRIPTION: (ctx: { title: string, specs: string }) => `
    You are an expert copywriter for high-converting dropshipping stores.
    Product: ${ctx.title}
    Details: ${ctx.specs}
    
    Generate an engaging SEO-optimized description that highlights benefits, builds trust, and drives urgency.
  `,
  
  TIKTOK_HOOK: (ctx: { productOrService: string, audience: string }) => `
    You are a viral TikTok creator. 
    Topic: ${ctx.productOrService}
    Audience: ${ctx.audience}

    Write 3 distinct, highly engaging, 3-second hooks designed to stop the scroll, along with a brief video concept.
  `,
  
  FACEBOOK_AD: (ctx: { offer: string, angle: string }) => `
    You are a master media buyer and direct response copywriter.
    Offer: ${ctx.offer}
    Angle: ${ctx.angle}

    Write a Facebook Ad that bypasses ad-blindness. Give me primary text, a punchy headline, link description, and the best CTA.
  `,
  
  REAL_ESTATE_DESCRIPTION: (ctx: { property: string, price: string, features: string }) => `
    You are a luxury real estate marketer handling multi-million dollar listings.
    Property: ${ctx.property}
    Price: ${ctx.price}
    Key Features: ${ctx.features}

    Write an elegant, descriptive, and captivating property listing that appeals to High Net Worth Individuals.
  `,
  
  OUTREACH_MESSAGE: (ctx: { recipientName: string, recipientCompany: string, goal: string }) => `
    You are an elite B2B sales executive.
    Recipient: ${ctx.recipientName} at ${ctx.recipientCompany}
    Goal: ${ctx.goal}

    Write a highly personalized, non-salesy, and concise outreach message via email or LinkedIn, plus a follow-up.
  `
}
