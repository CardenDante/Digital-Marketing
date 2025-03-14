import { NextResponse } from 'next/server';
import { seasonService } from '@/lib/db/services';

export async function GET() {
  try {
    const activeSeason = await seasonService.getActive();
    if (!activeSeason) {
      return NextResponse.json({ error: 'No active season found' }, { status: 404 });
    }
    
    return NextResponse.json(activeSeason);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}