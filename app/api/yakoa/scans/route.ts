import { NextResponse } from "next/server";
import { listScans } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({ ok: true, data: listScans() });
}
