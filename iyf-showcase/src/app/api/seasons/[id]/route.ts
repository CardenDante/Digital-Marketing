import { NextRequest, NextResponse } from 'next/server';
import { seasonService } from '@/lib/db/services';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid season ID' }, { status: 400 });
    }
    
    const season = await seasonService.getById(id);
    if (!season) {
      return NextResponse.json({ error: 'Season not found' }, { status: 404 });
    }
    
    return NextResponse.json(season);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid season ID' }, { status: 400 });
    }
    
    const data = await request.json();
    await seasonService.update(id, data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid season ID' }, { status: 400 });
    }
    
    await seasonService.delete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
