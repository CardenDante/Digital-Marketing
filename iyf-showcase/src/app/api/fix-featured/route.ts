import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/models';

export async function GET() {
  try {
    const db = await getDb();
    
    // First, reset all projects to non-featured
    await db.run('UPDATE projects SET isFeatured = 0');
    
    // Now set only the first 3 projects as featured
    const ids = [1, 2, 3]; // Only the first 3 IDs
    
    for (const id of ids) {
      await db.run('UPDATE projects SET isFeatured = 1 WHERE id = ?', [id]);
    }
    
    // Check if it worked
    const featuredProjects = await db.all('SELECT * FROM projects WHERE isFeatured = 1');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Featured projects updated - only first 3 projects are now featured', 
      count: featuredProjects.length,
      projects: featuredProjects
    });
  } catch (error) {
    console.error('Error fixing featured projects:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}