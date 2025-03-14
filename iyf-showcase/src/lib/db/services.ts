import { getDb, Season, Student, Project } from './models';

// Season services
export const seasonService = {
  async getAll(): Promise<Season[]> {
    const db = await getDb();
    return db.all<Season[]>('SELECT * FROM seasons ORDER BY id DESC');
  },
  
  async getById(id: number): Promise<Season | undefined> {
    const db = await getDb();
    return db.get<Season>('SELECT * FROM seasons WHERE id = ?', id);
  },
  
  async getActive(): Promise<Season | undefined> {
    const db = await getDb();
    return db.get<Season>('SELECT * FROM seasons WHERE isActive = 1');
  },
  
  async create(season: Omit<Season, 'id'>): Promise<number> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO seasons (name, startDate, endDate, isActive, description) VALUES (?, ?, ?, ?, ?)',
      [season.name, season.startDate, season.endDate, season.isActive ? 1 : 0, season.description]
    );
    return result.lastID!;
  },
  
  async update(id: number, season: Partial<Season>): Promise<void> {
    const db = await getDb();
    const current = await this.getById(id);
    if (!current) throw new Error(`Season with id ${id} not found`);
    
    const updates = [];
    const params = [];
    
    if (season.name !== undefined) {
      updates.push('name = ?');
      params.push(season.name);
    }
    
    if (season.startDate !== undefined) {
      updates.push('startDate = ?');
      params.push(season.startDate);
    }
    
    if (season.endDate !== undefined) {
      updates.push('endDate = ?');
      params.push(season.endDate);
    }
    
    if (season.isActive !== undefined) {
      updates.push('isActive = ?');
      params.push(season.isActive ? 1 : 0);
    }
    
    if (season.description !== undefined) {
      updates.push('description = ?');
      params.push(season.description);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await db.run(`UPDATE seasons SET ${updates.join(', ')} WHERE id = ?`, params);
      
      // If this season is being set as active, deactivate others
      if (season.isActive) {
        await db.run('UPDATE seasons SET isActive = 0 WHERE id != ?', id);
      }
    }
  },
  
  async delete(id: number): Promise<void> {
    const db = await getDb();
    await db.run('DELETE FROM seasons WHERE id = ?', id);
  }
};

// Student services
export const studentService = {
  async getAll(seasonId?: number): Promise<Student[]> {
    const db = await getDb();
    let query = 'SELECT * FROM students';
    const params = [];
    
    if (seasonId !== undefined) {
      query += ' WHERE seasonId = ?';
      params.push(seasonId);
    }
    
    query += ' ORDER BY name';
    return db.all<Student[]>(query, params);
  },
  
  async getById(id: number): Promise<Student | undefined> {
    const db = await getDb();
    return db.get<Student>('SELECT * FROM students WHERE id = ?', id);
  },
  
  async create(student: Omit<Student, 'id'>): Promise<number> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO students (name, seasonId, profileUrl) VALUES (?, ?, ?)',
      [student.name, student.seasonId, student.profileUrl]
    );
    return result.lastID!;
  },
  
  async bulkCreate(students: Omit<Student, 'id'>[]): Promise<void> {
    const db = await getDb();
    const stmt = await db.prepare('INSERT INTO students (name, seasonId, profileUrl) VALUES (?, ?, ?)');
    
    for (const student of students) {
      await stmt.run([student.name, student.seasonId, student.profileUrl]);
    }
    
    await stmt.finalize();
  },

  async getWithSeasonInfo(seasonId?: number): Promise<any[]> {
    const db = await getDb();
    let query = `
      SELECT 
        s.*,
        seas.name as season
      FROM students s
      JOIN seasons seas ON s.seasonId = seas.id
    `;
    
    const params = [];
    if (seasonId !== undefined) {
      query += ' WHERE s.seasonId = ?';
      params.push(seasonId);
    }
    
    query += ' ORDER BY s.name';
    return db.all(query, params);
  },  
  
  async update(id: number, student: Partial<Student>): Promise<void> {
    const db = await getDb();
    const current = await this.getById(id);
    if (!current) throw new Error(`Student with id ${id} not found`);
    
    const updates = [];
    const params = [];
    
    if (student.name !== undefined) {
      updates.push('name = ?');
      params.push(student.name);
    }
    
    if (student.seasonId !== undefined) {
      updates.push('seasonId = ?');
      params.push(student.seasonId);
    }
    
    if (student.profileUrl !== undefined) {
      updates.push('profileUrl = ?');
      params.push(student.profileUrl);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await db.run(`UPDATE students SET ${updates.join(', ')} WHERE id = ?`, params);
    }
  },
  
  async delete(id: number): Promise<void> {
    const db = await getDb();
    await db.run('DELETE FROM students WHERE id = ?', id);
  }
};



// Project services
export const projectService = {
  async getAll(seasonId?: number, featured?: boolean): Promise<Project[]> {
    const db = await getDb();
    let query = 'SELECT * FROM projects';
    const params = [];
    const conditions = [];
    
    if (seasonId !== undefined) {
      conditions.push('seasonId = ?');
      params.push(seasonId);
    }
    
    if (featured !== undefined) {
      conditions.push('isFeatured = ?');
      params.push(featured ? 1 : 0);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    return db.all<Project[]>(query, params);
  },
  
  async getById(id: number): Promise<Project | undefined> {
    const db = await getDb();
    return db.get<Project>('SELECT * FROM projects WHERE id = ?', id);
  },
  
  async getByStudentId(studentId: number): Promise<Project[]> {
    const db = await getDb();
    return db.all<Project[]>('SELECT * FROM projects WHERE studentId = ?', studentId);
  },
  async getWithStudentAndSeasonInfo(seasonId?: number, featured?: boolean): Promise<any[]> {
    const db = await getDb();
    let query = `
      SELECT 
        p.*, 
        s.name as student,
        seas.name as season
      FROM projects p
      JOIN students s ON p.studentId = s.id
      JOIN seasons seas ON p.seasonId = seas.id
    `;
    
    const params = [];
    const conditions = [];
    
    if (seasonId !== undefined) {
      conditions.push('p.seasonId = ?');
      params.push(seasonId);
    }
    
    if (featured !== undefined) {
      conditions.push('p.isFeatured = ?');
      params.push(featured ? 1 : 0);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    console.log('Featured projects query:', query, params);
    
    return db.all(query, params);
  },

  async create(project: Omit<Project, 'id' | 'createdAt'>): Promise<number> {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO projects (
        studentId, seasonId, title, description, url, 
        githubUrl, category, isFeatured, grade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.studentId, 
        project.seasonId, 
        project.title, 
        project.description, 
        project.url,
        project.githubUrl, 
        project.category, 
        project.isFeatured ? 1 : 0, 
        project.grade
      ]
    );
    return result.lastID!;
  },
  
  async bulkCreate(projects: Omit<Project, 'id' | 'createdAt'>[]): Promise<void> {
    const db = await getDb();
    const stmt = await db.prepare(
      `INSERT INTO projects (
        studentId, seasonId, title, description, url, 
        githubUrl, category, isFeatured, grade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    
    for (const project of projects) {
      await stmt.run([
        project.studentId,
        project.seasonId,
        project.title,
        project.description,
        project.url,
        project.githubUrl,
        project.category,
        project.isFeatured ? 1 : 0,
        project.grade
      ]);
    }
    
    await stmt.finalize();
  },
  
  async update(id: number, project: Partial<Project>): Promise<void> {
    const db = await getDb();
    const current = await this.getById(id);
    if (!current) throw new Error(`Project with id ${id} not found`);
    
    const updates = [];
    const params = [];
    
    if (project.studentId !== undefined) {
      updates.push('studentId = ?');
      params.push(project.studentId);
    }
    
    if (project.seasonId !== undefined) {
      updates.push('seasonId = ?');
      params.push(project.seasonId);
    }
    
    if (project.title !== undefined) {
      updates.push('title = ?');
      params.push(project.title);
    }
    
    if (project.description !== undefined) {
      updates.push('description = ?');
      params.push(project.description);
    }
    
    if (project.url !== undefined) {
      updates.push('url = ?');
      params.push(project.url);
    }
    
    if (project.githubUrl !== undefined) {
      updates.push('githubUrl = ?');
      params.push(project.githubUrl);
    }
    
    if (project.category !== undefined) {
      updates.push('category = ?');
      params.push(project.category);
    }
    
    if (project.isFeatured !== undefined) {
      updates.push('isFeatured = ?');
      params.push(project.isFeatured ? 1 : 0);
    }
    
    if (project.grade !== undefined) {
      updates.push('grade = ?');
      params.push(project.grade);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await db.run(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, params);
    }
  },
  
  async delete(id: number): Promise<void> {
    const db = await getDb();
    await db.run('DELETE FROM projects WHERE id = ?', id);
  },
  
  async getWithStudentInfo(seasonId?: number): Promise<any[]> {
    const db = await getDb();
    let query = `
      SELECT 
        p.*, 
        s.name as student,
        seas.name as season
      FROM projects p
      JOIN students s ON p.studentId = s.id
      JOIN seasons seas ON p.seasonId = seas.id
    `;
    
    const params = [];
    if (seasonId !== undefined) {
      query += ' WHERE p.seasonId = ?';
      params.push(seasonId);
    }
    
    return db.all(query, params);
  }
};