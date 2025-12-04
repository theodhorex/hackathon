// lib/yakoa/types.ts

export interface CheckContentRequest {
  content: string;       // URL / text / file hash
  type: "url" | "text";  // tipe konten yang dicek
}

export interface YakoaResult {
  riskScore: number;
  category: string;
  flagged: boolean;
  details?: Record<string, unknown>;
}

export interface YakoaError {
  error: string;
}
