import { NextResponse } from "next/server";
import { YakoaClient } from "@/lib/yakoa/client";
import { updateScan } from "@/lib/storage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const client = new YakoaClient();
  const result = await client.getToken(id);

  updateScan(id, {
    lastYakoaResponse: result,
  });

  return NextResponse.json(result);
}
