// src/lib/import/csv-import.ts
import { parse } from 'papaparse';
import { studentService, projectService, seasonService } from '../db/services';
import { Student, Project } from '../db/models';

interface StudentCSV {
  name: string;
  profileUrl?: string;
}

interface ProjectCSV {
  student: string;
  url: string;
  title?: string;
  description?: string;
  githubUrl?: string;
  category?: string;
  grade?: string;
  isFeatured?: string; // "true" or "false"
}

export const CsvImporter = {
  // Import students from CSV
  async importStudents(csvContent: string, seasonId: number): Promise<{ success: boolean; message: string; count: number }> {
    try {
      const parsed = parse<StudentCSV>(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase(),
        transform: (value) => value.trim()
      });
      
      if (parsed.errors.length > 0) {
        return {
          success: false,
          message: `CSV parse errors: ${parsed.errors.map(e => e.message).join(', ')}`,
          count: 0
        };
      }
      
      if (parsed.data.length === 0) {
        return {
          success: false,
          message: 'No data found in CSV',
          count: 0
        };
      }
      
      // Check if season exists
      const season = await seasonService.getById(seasonId);
      if (!season) {
        return {
          success: false,
          message: `Season with ID ${seasonId} not found`,
          count: 0
        };
      }
      
      // Transform CSV data to Student objects
      const students: Omit<Student, 'id'>[] = parsed.data.map(row => ({
        name: row.name,
        seasonId,
        profileUrl: row.profileUrl
      }));
      
      // Bulk insert students
      await studentService.bulkCreate(students);
      
      return {
        success: true,
        message: `Successfully imported ${students.length} students`,
        count: students.length
      };
    } catch (error) {
      console.error('Error importing students:', error);
      return {
        success: false,
        message: `Error importing students: ${(error as Error).message}`,
        count: 0
      };
    }
  },
  
  // Import projects from CSV
  async importProjects(csvContent: string, seasonId: number): Promise<{ success: boolean; message: string; count: number }> {
    try {
      const parsed = parse<ProjectCSV>(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase(),
        transform: (value) => value.trim()
      });
      
      if (parsed.errors.length > 0) {
        return {
          success: false,
          message: `CSV parse errors: ${parsed.errors.map(e => e.message).join(', ')}`,
          count: 0
        };
      }
      
      if (parsed.data.length === 0) {
        return {
          success: false,
          message: 'No data found in CSV',
          count: 0
        };
      }
      
      // Check if season exists
      const season = await seasonService.getById(seasonId);
      if (!season) {
        return {
          success: false,
          message: `Season with ID ${seasonId} not found`,
          count: 0
        };
      }
      
      // Get all students for this season
      const students = await studentService.getAll(seasonId);
      const studentMap = new Map<string, number>();
      students.forEach(student => {
        studentMap.set(student.name.toLowerCase(), student.id);
      });
      
      // Transform CSV data to Project objects
      const projects: Omit<Project, 'id' | 'createdAt'>[] = [];
      const studentNotFound: string[] = [];
      
      for (const row of parsed.data) {
        const studentName = row.student.toLowerCase();
        const studentId = studentMap.get(studentName);
        
        if (!studentId) {
          studentNotFound.push(row.student);
          continue;
        }
        
        projects.push({
          studentId,
          seasonId,
          title: row.title || row.student.split(' ')[0] + "'s Project",
          description: row.description || '',
          url: row.url,
          githubUrl: row.githubUrl || '',
          category: row.category || 'General',
          isFeatured: row.isFeatured?.toLowerCase() === 'true', // Keep as boolean
          grade: row.grade || 'Not Graded'
        });
      }
      
      if (projects.length === 0) {
        return {
          success: false,
          message: `No matching students found for projects. Missing students: ${studentNotFound.join(', ')}`,
          count: 0
        };
      }
      
      // Bulk insert projects
      await projectService.bulkCreate(projects);
      
      let message = `Successfully imported ${projects.length} projects`;
      if (studentNotFound.length > 0) {
        message += `. Note: ${studentNotFound.length} projects skipped due to missing students: ${studentNotFound.join(', ')}`;
      }
      
      return {
        success: true,
        message,
        count: projects.length
      };
    } catch (error) {
      console.error('Error importing projects:', error);
      return {
        success: false,
        message: `Error importing projects: ${(error as Error).message}`,
        count: 0
      };
    }
  }
};