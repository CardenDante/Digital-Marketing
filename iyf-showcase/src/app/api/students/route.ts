import { NextRequest, NextResponse } from 'next/server';
import { studentService } from '@/lib/db/services';

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const seasonId = searchParams.get('seasonId');
      const withSeasonInfo = searchParams.get('withSeasonInfo') === 'true';
      
      if (withSeasonInfo) {
        // Enhanced student service method to get students with season info
        const students = await studentService.getWithSeasonInfo(
          seasonId ? parseInt(seasonId) : undefined
        );
        return NextResponse.json(students);
      } else {
        const students = await studentService.getAll(
          seasonId ? parseInt(seasonId) : undefined
        );
        return NextResponse.json(students);
      }
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.name || !data.seasonId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const studentId = await studentService.create({
      name: data.name,
      seasonId: data.seasonId,
      profileUrl: data.profileUrl
    });
    
    return NextResponse.json({ id: studentId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
