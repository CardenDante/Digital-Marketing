import { NextRequest, NextResponse } from 'next/server';
import { CsvImporter } from '@/lib/import/csv-import';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const seasonId = formData.get('seasonId') as string;
    
    if (!file || !seasonId) {
      return NextResponse.json({ error: 'Missing file or seasonId' }, { status: 400 });
    }
    
    const csvContent = await file.text();
    const result = await CsvImporter.importProjects(csvContent, parseInt(seasonId));
    
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}