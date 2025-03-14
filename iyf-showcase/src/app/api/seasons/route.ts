import { NextRequest, NextResponse } from 'next/server';
import { seasonService } from '@/lib/db/services';

export async function GET() {
  try {
    const seasons = await seasonService.getAll();
    return NextResponse.json(seasons);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.name || !data.startDate || !data.endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const seasonId = await seasonService.create({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: data.isActive || false,
      description: data.description || ''
    });
    
    return NextResponse.json({ id: seasonId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}