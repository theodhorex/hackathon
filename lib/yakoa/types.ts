// lib/yakoa/types.ts
// Type definitions for Yakoa API integration

export interface CheckContentRequest {
  contentUrl: string;
  contentType: "image" | "audio" | "video" | "text";
  title?: string;
  creatorId?: string;
}

export interface YakoaResult {
  isOriginal: boolean;
  isInfringing: boolean;
  isAuthorized: boolean;
  confidence: number;
  matchedBrand?: string;
  matchedOwner?: string;
  infringements: InfringementInfo[];
  recommendations: string[];
}

export interface InfringementInfo {
  type: string;
  brand?: string;
  similarity: number;
  source?: string;
}

export interface YakoaError {
  error: string;
  code?: string;
  details?: string;
}

// Status mapping for UI display
export type ContentStatus =
  | "ORIGINAL"           // Content is original, safe to register
  | "BRAND_IP_DETECTED"  // Brand IP found, cannot register
  | "ALREADY_REGISTERED" // Already registered by someone else
  | "PROCESSING"         // Currently being analyzed
  | "PROTECTED"          // Successfully registered on Story Protocol
  | "ERROR";             // Error during verification

export function mapYakoaResultToStatus(result: YakoaResult): ContentStatus {
  if (result.isInfringing) {
    return "BRAND_IP_DETECTED";
  }
  if (result.matchedOwner) {
    return "ALREADY_REGISTERED";
  }
  if (result.isOriginal) {
    return "ORIGINAL";
  }
  return "PROCESSING";
}

export function getStatusLabel(status: ContentStatus): string {
  switch (status) {
    case "ORIGINAL":
      return "Original";
    case "BRAND_IP_DETECTED":
      return "Brand IP Detected";
    case "ALREADY_REGISTERED":
      return "Already Registered";
    case "PROCESSING":
      return "Analyzing...";
    case "PROTECTED":
      return "Protected";
    case "ERROR":
      return "Error";
    default:
      return "Unknown";
  }
}
