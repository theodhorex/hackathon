// lib/yakoa.ts
import dotenv from 'dotenv';
dotenv.config();

const YAKOA_KEY = process.env.YAKOA_API_KEY;
const BASE = process.env.YAKOA_BASE_URL ?? 'https://api.yakoa.io/v1';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function analyzeImage(imageUrl: string) {
  const apiKey = process.env.YAKOA_API_KEY;
  if (!apiKey) throw new Error("Missing YAKOA_API_KEY");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-API-Key": apiKey,
  };

  const response = await fetch("https://api.yakoa.ai/v1/analyze", {
    method: "POST",
    headers,
    body: JSON.stringify({ imageUrl }),
  });

  if (!response.ok) {
    const e = await response.text();
    throw new Error(`Yakoa API error: ${e}`);
  }

  return response.json();
}

