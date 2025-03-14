// src/app/api/fix-featured/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/db/models';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    
    // Get the first 3 projects from season 3
    const seasonProjects = await db.all('SELECT id FROM projects WHERE seasonId = 3 ORDER BY id LIMIT 3');
    
    if (seasonProjects.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No projects found in season 3' 
      });
    }
    
    // Update these projects to be featured
    for (const project of seasonProjects) {
      await db.run('UPDATE projects SET isFeatured = 1 WHERE id = ?', [project.id]);
    }
    
    // Check if it worked
    const featuredProjects = await db.all('SELECT * FROM projects WHERE seasonId = 3 AND isFeatured = 1');
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${featuredProjects.length} featured projects for season 3`, 
      count: featuredProjects.length,
      projects: featuredProjects
    });
  } catch (error) {
    console.error('Error fixing featured projects:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}