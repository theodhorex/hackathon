// app/api/yakoa/check/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { CheckContentRequest } from "@/lib/yakoa/types";

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as CheckContentRequest;

    if (!payload || !payload.content) {
      return NextResponse.json(
        { error: "Missing content to scan" },
        { status: 400 }
      );
    }

    // Placeholder implementation - can be extended to use YakoaClient when needed
    const result = { checked: true, content: payload.content };

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
