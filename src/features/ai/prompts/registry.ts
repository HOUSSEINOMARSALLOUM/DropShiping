export const PromptRegistry = {
  EXECUTIVE_BRIEFING: (context: any) => `
    You are the Nexus OS Strategic Advisor. Analyze the current state of the business domains:
    
    CRM Data: ${JSON.stringify(context.crm)}
    Real Estate Pipeline: ${JSON.stringify(context.realEstate)}
    Finance Ledger: ${JSON.stringify(context.finance)}
    
    Provide an executive briefing in JSON format:
    {
      "summary": "Brief high-level overview",
      "criticalAlerts": ["List of urgent items requiring attention"],
      "recommendations": [
        { "title": "...", "description": "...", "domain": "...", "priority": "..." }
      ],
      "sentiment": "BULLISH" | "CAUTIOUS" | "BEARISH"
    }
  `,

  LEAD_SCORING: (contact: any, history: any) => `
    Evaluate the following lead for conversion probability and lifetime value:
    Contact: ${JSON.stringify(contact)}
    Recent Activity: ${JSON.stringify(history)}
    
    Provide a score (0-100) and strategic reasoning.
  `,

  PROPERTY_INTELLIGENCE: (property: any, market: any) => `
    Analyze the following asset against current market signals:
    Property: ${JSON.stringify(property)}
    Market Trends: ${JSON.stringify(market)}
    
    Identify investment potential and optimal pricing strategy.
  `
};
