// app/api/yakoa/check/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createYakoaClient } from "@/lib/yakoa/client";
import type { CheckContentRequest } from "@/lib/yakoa/types";

const YAKOA_CONFIG = {
  apiKey: process.env.YAKOA_API_KEY || "",
};

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as CheckContentRequest;

    if (!payload || !payload.content) {
      return NextResponse.json(
        { error: "Missing content to scan" },
        { status: 400 }
      );
    }

    const yk = createYakoaClient(YAKOA_CONFIG.apiKey);

    const result = await yk.checkContent(payload);

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
