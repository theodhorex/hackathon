import { NextResponse } from "next/server";
import { YakoaClient } from "@/lib/yakoa/client";
import { addScan, updateScan } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, registration_tx, creator_id, metadata, media } = body;

    if (!id || !registration_tx || !creator_id || !metadata || !media) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    addScan({
      id,
      createdAt: Date.now(),
      payload: body,
      status: "submitted",
    });

    const client = new YakoaClient();
    const result = await client.registerToken(body);

    updateScan(id, {
      lastYakoaResponse: result,
      status: result.status < 300 ? "ok" : "error",
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
