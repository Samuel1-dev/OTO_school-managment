import { School as SchoolTypeOrig, Student as StudentOrig, ParentUser as ParentUserOrig, Employee as EmployeeOrig, TeacherUser as TeacherUserOrig } from './mockData';

export interface Student extends StudentOrig {
  sexe?: string;
  npi?: string;
  birthDate?: string;
  birthPlace?: string;
  neighborhood?: string;
  parentName?: string;
  contacts?: string;
  parentEmail?: string;
  parentProfession?: string;
  tuitionStatus?: Record<string, 'soldé' | 'non-soldé'>; // trancheLabel -> status
}

export interface ParentUser extends Omit<ParentUserOrig, 'children'> {
  children: Student[];
}

export interface TeacherUser extends TeacherUserOrig {
  name?: string;
  firstName: string;
  lastName: string;
  subjects?: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: 'Enseignant' | 'Secrétaire' | 'Superviseur' | 'Admin';
  phone: string;
  email: string;
  supervisorType?: string;
  subjects?: string[];
}

export interface ClassItem {
  id: string;
  name: string; // e.g. "Terminale"
  tuitionFee: number; // general tuition amount
  tranches: {
    label: string; // e.g., "Tranche 1", "Tranche 2"
    amount: number;
    dueDate: string;
  }[];
  evaluationMethods: string[]; // e.g. ["Interrogation 1", "Interrogation 2", "Devoir 1", "Devoir 2"]
}

export interface RoomItem {
  id: string; // composed of className + option, e.g. "Terminale-C"
  name: string; // e.g. "Terminale-B1", "Terminale-C"
  className: string; // e.g. "Terminale"
  option: string; // e.g. "B1", "C"
  maxStudents?: number;
  academicYear: string;
  mainTeacherId: string; // employee ID
  teachers: {
    teacherId: string;
    teacherName: string;
    subject: string;
    coeff: number;
  }[];
}

export interface AbsenceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  hour: string; // e.g. "08h-10h" or "SVT"
  motif?: string; // empty string or unspecified means "sans motif"
}

export interface CustomMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  permissions: string[]; // List of custom page tabs they hold access to
}
