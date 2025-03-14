// src/lib/db/models.ts
import { Database } from 'sqlite3';
import { open, Database as SQLiteDatabase } from 'sqlite';
import path from 'path';
import fs from 'fs'; // Add this import

// Define types for our database tables
export interface Season {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
}

export interface Student {
  id: number;
  name: string;
  seasonId: number;
  initials?: string;
  profileUrl?: string;
}

export interface Project {
  id: number;
  studentId: number;
  seasonId: number;
  title: string;
  description?: string;
  url: string;
  githubUrl?: string;
  category?: string;
  isFeatured: boolean;
  grade: string;
  createdAt: string;
}

// Database connection function
export async function getDb(): Promise<SQLiteDatabase> {
  const dataDir = path.resolve(process.cwd(), 'data');
  
  // Create the data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const dbPath = path.join(dataDir, 'iyf-showcase.db');
  
  return open({
    filename: dbPath,
    driver: Database
  });
}

// Initialize the database
export async function initDb(): Promise<void> {
  const db = await getDb();
  
  // Create seasons table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      isActive INTEGER DEFAULT 0,
      description TEXT
    )
  `);
  
  // Create students table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      seasonId INTEGER NOT NULL,
      profileUrl TEXT,
      FOREIGN KEY (seasonId) REFERENCES seasons(id)
    )
  `);
  
  // Create projects table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentId INTEGER NOT NULL,
      seasonId INTEGER NOT NULL,
      title TEXT,
      description TEXT,
      url TEXT NOT NULL,
      githubUrl TEXT,
      category TEXT,
      isFeatured INTEGER DEFAULT 0,
      grade TEXT DEFAULT 'Not Graded',
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (studentId) REFERENCES students(id),
      FOREIGN KEY (seasonId) REFERENCES seasons(id)
    )
  `);
  
  await db.close();
}