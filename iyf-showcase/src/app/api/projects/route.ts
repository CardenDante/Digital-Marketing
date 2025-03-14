import { NextRequest, NextResponse } from 'next/server';
import { projectService } from '@/lib/db/services';

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const seasonId = searchParams.get('seasonId');
      const featured = searchParams.get('featured');
      const withStudentInfo = searchParams.get('withStudentInfo') === 'true';
      
      if (withStudentInfo) {
        // Enhanced project service method to get projects with student and season info
        const projects = await projectService.getWithStudentAndSeasonInfo(
          seasonId ? parseInt(seasonId) : undefined,
          featured === 'true' ? true : featured === 'false' ? false : undefined
        );
        return NextResponse.json(projects);
      } else {
        const projects = await projectService.getAll(
          seasonId ? parseInt(seasonId) : undefined,
          featured === 'true' ? true : featured === 'false' ? false : undefined
        );
        return NextResponse.json(projects);
      }
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.studentId || !data.seasonId || !data.url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const projectId = await projectService.create({
      studentId: data.studentId,
      seasonId: data.seasonId,
      title: data.title || '',
      description: data.description || '',
      url: data.url,
      githubUrl: data.githubUrl || '',
      category: data.category || 'General',
      isFeatured: data.isFeatured || false,
      grade: data.grade || 'Not Graded'
    });
    
    return NextResponse.json({ id: projectId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}