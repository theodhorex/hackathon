import { NextRequest, NextResponse } from "next/server";

const YAKOA_API_KEY = process.env.YAKOA_API_KEY!;
const YAKOA_BASE_URL = "https://docs-demo.ip-api-sandbox.yakoa.io";

/**
 * /api/scan
 * Expect: FormData upload: file
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // STEP 1 — upload media
    const uploadRes = await fetch(`${YAKOA_BASE_URL}/docs-demo/token`, {
      method: "POST",
      headers: {
        "X-API-KEY": YAKOA_API_KEY,
        "Content-Type": "application/octet-stream",
        Accept: "application/json",
      },
      body: buffer,
    });

    const uploadJson = await uploadRes.json();
    const token_id = uploadJson?.token?.id;
    const media_id = uploadJson?.media?.id;

    if (!token_id || !media_id) {
      return NextResponse.json(
        { error: "Upload failed", detail: uploadJson },
        { status: 500 }
      );
    }

    // STEP 2 — scan similarity
    const scanRes = await fetch(
      `${YAKOA_BASE_URL}/docs-demo/token/${token_id}/media/${media_id}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": YAKOA_API_KEY,
          Accept: "application/json",
        },
      }
    );
    const scanJson = await scanRes.json();

    return NextResponse.json({
      token_id,
      media_id,
      result: scanJson,
    });
  } catch (err) {
    console.error("SCAN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
