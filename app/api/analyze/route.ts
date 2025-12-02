// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/yakoa';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl } = body;
    if (!imageUrl) return NextResponse.json({ error: 'imageUrl required' }, { status: 400 });

    const result = await analyzeImage(imageUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error('analyze error:', error);

    // SAFEST TYPE GUARD FOR TS
    const message =
      error instanceof Error
        ? error.message
        : 'Internal server error';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
