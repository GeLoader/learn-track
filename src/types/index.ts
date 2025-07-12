export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  avatar?: string;
  studentId?: string;
  parentId?: string;
  teacherId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  grade: number;
  section: string;
  parentId?: string;
  avatar?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  category: 'quiz' | 'exam' | 'activity' | 'project';
  score: number;
  maxScore: number;
  date: Date;
  quarter: 1 | 2 | 3 | 4;
  teacher: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  teacherId: string;
}

export interface Alert {
  id: string;
  studentId: string;
  type: 'academic' | 'attendance' | 'behavioral';
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: Date;
  resolved: boolean;
}

export interface GradeCalculation {
  subject: string;
  quizzes: number;
  exams: number;
  activities: number;
  projects: number;
  rawGrade: number;
  transmutedGrade: number;
  letterGrade: string;
}