// src/app/api/initialize/route.ts
import { NextResponse } from 'next/server';
import { initDb } from '@/lib/db/models';

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}