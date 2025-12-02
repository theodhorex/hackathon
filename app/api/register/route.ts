// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { registerToStory } from '@/lib/story';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl, yakoaId, licenseType } = body;
    if (!imageUrl || !yakoaId) {
      return NextResponse.json({ error: 'imageUrl & yakoaId required' }, { status: 400 });
    }

    const result = await registerToStory({ imageUrl, yakoaId, licenseType });
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
