// app/api/yakoa/check/route.ts
// API Route for Yakoa Content Verification

import { NextRequest, NextResponse } from "next/server";
import { YakoaClient } from "@/lib/yakoa/client";
import type { CheckContentRequest, YakoaResult } from "@/lib/yakoa/types";

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as CheckContentRequest;

    // Validate request
    if (!payload || !payload.contentUrl) {
      return NextResponse.json(
        { error: "Missing contentUrl in request" },
        { status: 400 }
      );
    }

    if (!payload.contentType) {
      return NextResponse.json(
        { error: "Missing contentType in request" },
        { status: 400 }
      );
    }

    // Initialize Yakoa client
    const yakoaClient = new YakoaClient();

    // Perform content verification
    const result = await yakoaClient.verifyContent({
      contentUrl: payload.contentUrl,
      contentType: payload.contentType,
      title: payload.title,
      creatorId: payload.creatorId,
    });

    // Map result to API response
    const response: { success: boolean; result: YakoaResult } = {
      success: true,
      result: {
        isOriginal: result.isOriginal,
        isInfringing: result.isInfringing,
        isAuthorized: result.isAuthorized,
        confidence: result.confidence,
        matchedBrand: result.matchedBrand,
        matchedOwner: result.matchedOwner,
        infringements: result.infringements,
        recommendations: result.recommendations,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err: unknown) {
    console.error("Yakoa check error:", err);
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  const yakoaClient = new YakoaClient();

  return NextResponse.json({
    service: "Yakoa Content Verification",
    status: "operational",
    configured: yakoaClient.isConfigured(),
    mode: yakoaClient.isConfigured() ? "live" : "simulation",
    timestamp: new Date().toISOString(),
  });
}
