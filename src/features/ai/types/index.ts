export type AIProvider = "OpenAI" | "Anthropic" | "Google";

export interface AIResponse<T> {
  data: T;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCost: number;
  };
  model: string;
  provider: AIProvider;
}

export interface ExecutiveBriefing {
  summary: string;
  criticalAlerts: string[];
  recommendations: {
    title: string;
    description: string;
    domain: "CRM" | "REAL_ESTATE" | "FINANCE";
    priority: "HIGH" | "MEDIUM" | "LOW";
  }[];
  sentiment: "BULLISH" | "CAUTIOUS" | "BEARISH";
}

export interface DomainScore {
  id: string;
  score: number; // 0-100
  reasoning: string;
  recommendation: string;
}
