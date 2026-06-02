import React, { useState } from 'react';
import { 
  School, 
  Users, 
  TrendingUp, 
  BookOpen, 
  DollarSign, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Plus, 
  UserPlus, 
  Trash2, 
  CheckCircle, 
  Lock, 
  LogOut, 
  Mail, 
  Phone, 
  Download, 
  Upload, 
  BookMarked, 
  Send,
  AlertTriangle,
  FileCheck,
  Building,
  Bookmark,
  Bell,
  Clock,
  Search,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { 
  School as SchoolType, 
  AdminUser, 
  Announcement, 
  CourseMaterial 
} from '../mockData';
import { ClassItem, RoomItem, AbsenceRecord, CustomMember, Student, Employee, ParentUser, TeacherUser } from '../types';

interface DashboardsProps {
  currentRole: 'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom';
  activeSchool: SchoolType;
  schools: SchoolType[];
  registeredParents: ParentUser[];
  registeredTeachers: TeacherUser[];
  registeredStaff: Employee[];
  registeredMaterials: CourseMaterial[];
  registeredAnnouncements: Announcement[];
  onLogout: () => void;
  onUpdateSchools: (updated: SchoolType[]) => void;
  onUpdateParents: (updated: ParentUser[]) => void;
  onUpdateTeachers: (updated: TeacherUser[]) => void;
  onUpdateStaff: (updated: Employee[]) => void;
  onUpdateMaterials: (updated: CourseMaterial[]) => void;
  onUpdateAnnouncements: (updated: Announcement[]) => void;
}

export default function Dashboards({
  currentRole,
  activeSchool,
  schools,
  registeredParents,
  registeredTeachers,
  registeredStaff,
  registeredMaterials,
  registeredAnnouncements,
  onLogout,
  onUpdateSchools,
  onUpdateParents,
  onUpdateTeachers,
  onUpdateStaff,
  onUpdateMaterials,
  onUpdateAnnouncements
}: DashboardsProps) {

  const [activeTab, setActiveTab] = useState('overview');

  // Supervisor selections & sub-specializations
  const [selectedSupervisorType, setSelectedSupervisorType] = useState<'Censeur' | 'Surveillant' | null>(null);

  // Dynamic States for School Management requirements
  const [classesList, setClassesList] = useState<ClassItem[]>([
    {
      id: 'c-1',
      name: 'Terminale',
      tuitionFee: 450000,
      tranches: [
        { label: 'Tranche 1', amount: 200000, dueDate: '2026-09-30' },
        { label: 'Tranche 2', amount: 150000, dueDate: '2026-12-31' },
        { label: 'Tranche 3', amount: 100000, dueDate: '2027-03-31' }
      ],
      evaluationMethods: ['Interrogation 1', 'Interrogation 2', 'Devoir 1', 'Devoir 2']
    },
    {
      id: 'c-2',
      name: '3ème',
      tuitionFee: 350000,
      tranches: [
        { label: 'Tranche 1', amount: 150000, dueDate: '2026-09-30' },
        { label: 'Tranche 2', amount: 100000, dueDate: '2026-12-31' },
        { label: 'Tranche 3', amount: 100000, dueDate: '2027-03-31' }
      ],
      evaluationMethods: ['Interrogation 1', 'Devoir 1']
    }
  ]);

  const [roomsList, setRoomsList] = useState<RoomItem[]>([
    {
      id: 'room-1',
      name: 'Terminale-B1',
      className: 'Terminale',
      option: 'B1',
      maxStudents: 35,
      academicYear: '2026-2027',
      mainTeacherId: 'emp-2',
      teachers: [
        { teacherId: 'emp-2', teacherName: 'Mme. Sarah Gbagbo', subject: 'Mathématiques', coeff: 4 },
        { teacherId: 't-2', teacherName: 'M. Koffi Amessan', subject: 'Français', coeff: 3 }
      ]
    },
    {
      id: 'room-2',
      name: 'Terminale-C',
      className: 'Terminale',
      option: 'C',
      maxStudents: 30,
      academicYear: '2026-2027',
      mainTeacherId: 'emp-2',
      teachers: [
        { teacherId: 'emp-2', teacherName: 'Mme. Sarah Gbagbo', subject: 'Mathématiques', coeff: 5 }
      ]
    }
  ]);

  const [absencesList, setAbsencesList] = useState<AbsenceRecord[]>([
    { id: 'abs-1', studentId: 'std-1', studentName: 'Koffi Kouassi', className: '3ème A', date: '2026-05-18', hour: '10h-12h', motif: 'Certificat médical' },
    { id: 'abs-2', studentId: 'std-2', studentName: 'Amina Kouassi', className: '6ème C', date: '2026-05-19', hour: '08h-10h', motif: '' } // sans motif
  ]);

  const [customMembers, setCustomMembers] = useState<CustomMember[]>([
    { id: 'mem-1', name: 'M. Yao Koffi', role: 'Conseiller d\'Éducation', email: 'yao.koffi@oto.ci', phone: '+225 08 77 66 55', permissions: ['comms'] }
  ]);

  // Selected item detail states
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // States for Absence Registration form
  const [absStudentLastName, setAbsStudentLastName] = useState('');
  const [absStudentFirstName, setAbsStudentFirstName] = useState('');
  const [absStudentClass, setAbsStudentClass] = useState('3ème A');
  const [absDate, setAbsDate] = useState('2026-05-22');
  const [absHour, setAbsHour] = useState('08h-10h');
  const [absReason, setAbsReason] = useState('');

  // States for Class Creation form
  const [newClassName, setNewClassName] = useState('');
  const [newClassFee, setNewClassFee] = useState('');
  const [tranche1Amount, setTranche1Amount] = useState('');
  const [tranche1Date, setTranche1Date] = useState('2026-09-30');
  const [tranche2Amount, setTranche2Amount] = useState('');
  const [tranche2Date, setTranche2Date] = useState('2026-12-31');
  const [tranche3Amount, setTranche3Amount] = useState('');
  const [tranche3Date, setTranche3Date] = useState('2027-03-31');

  // States for Room Creation form
  const [salleParentClass, setSalleParentClass] = useState('Terminale');
  const [salleOption, setSalleOption] = useState('');
  const [salleMax, setSalleMax] = useState('35');
  const [salleYear, setSalleYear] = useState('2026-2027');
  const [salleMainTeacher, setSalleMainTeacher] = useState('');
  
  // Temp assign builder states
  const [tempTeachersList, setTempTeachersList] = useState<{ teacherId: string; teacherName: string; subject: string; coeff: number }[]>([]);
  const [tempTeacherId, setTempTeacherId] = useState('');
  const [tempTeacherSubject, setTempTeacherSubject] = useState('Mathématiques');
  const [tempTeacherCoeff, setTempTeacherCoeff] = useState('4');

  // Timetable Selected Room
  const [scheduleSelectedRoomId, setScheduleSelectedRoomId] = useState('room-1');

  // Auto-filtering check helper: "si la fonctionnalité est dans un autre membre on la lui retirera automatiquement du dashboard standard"
  const isFeatureWithdrawn = (tabId: string) => {
    return customMembers.some(member => member.permissions.includes(tabId));
  };

  // Helper checking if custom other admin user has permitted tab access
  const isCustomUserPermitted = (tabId: string) => {
    if (currentRole !== 'custom') return true;
    // For custom role, we search inside current log in profile. Under simulated system,
    // custom members login with Yao Koffi profile to allow instant demo
    const activeProfile = customMembers[0];
    return activeProfile ? activeProfile.permissions.includes(tabId) : false;
  };

  // Admin states
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Enseignant', phone: '', email: '' });
  const [supervisorTypeInput, setSupervisorTypeInput] = useState<'Censeur' | 'Surveillant'>('Censeur');
  const [teacherSubjectsInput, setTeacherSubjectsInput] = useState<string>('');
  const [customRoleName, setCustomRoleName] = useState<string>('');
  const [customSelectedTabs, setCustomSelectedTabs] = useState<string[]>([]);
  const [adminProfile, setAdminProfile] = useState({
    firstName: 'Jean',
    lastName: 'Kouamé',
    email: 'contact@excellence.ci',
    phone: '+225 01 23 45 67 89',
    password: '••••••••'
  });

  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', target: 'all' as any });
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gender: 'Masculin',
    npi: '',
    birthDate: '',
    birthPlace: '',
    neighborhood: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentProfession: '',
    class: '3ème A'
  });
  const [newMaterial, setNewMaterial] = useState({ title: '', subject: 'Mathématiques', className: '3ème A', fileType: 'pdf' as 'pdf' | 'image', imageUrl: '', fileUrl: '', fileName: '' });
  const [materialsSearch, setMaterialsSearch] = useState('');
  const [materialsSubjectFilter, setMaterialsSubjectFilter] = useState('All');
  const [materialsClassFilter, setMaterialsClassFilter] = useState('All');
  
  // Accounting mock records
  const [transactions, setTransactions] = useState([
    { id: 't-1', label: 'Versement Scolarité d\'un élève', amount: 150000, type: 'in' as const, date: '2026-05-20' },
    { id: 't-2', label: 'Achat de craies & rames papier', amount: -25000, type: 'out' as const, date: '2026-05-18' },
    { id: 't-3', label: 'Sponsorisation Événement Sportif', amount: -100000, type: 'out' as const, date: '2026-05-15' },
    { id: 't-4', label: 'Versement Scolarité Koffi Kouassi', amount: 200000, type: 'in' as const, date: '2026-05-14' }
  ]);
  const [newTransaction, setNewTransaction] = useState({ label: '', amount: '', type: 'in' });

  // Instructor specific states
  const [selectedStudent, setSelectedStudent] = useState<string>('std-1');
  const [newGrade, setNewGrade] = useState({ subject: 'Mathématiques', score: '' });

  // States for Teacher Grade Entry workflow
  const [gradeEntryRoomId, setGradeEntryRoomId] = useState<string>('room-1');
  const [isAddingEvaluation, setIsAddingEvaluation] = useState(false);
  const [evalLabel, setEvalLabel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathématiques');
  const [studentGrades, setStudentGrades] = useState<Record<string, string>>({});

  // NEW: Search bar state for administrators
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberTypeFilter, setMemberTypeFilter] = useState<'all' | 'student' | 'parent' | 'teacher' | 'staff'>('all');

  // NEW: Enrollment sub tab choice (student vs staff)
  const [enrollmentSubTab, setEnrollmentSubTab] = useState<'student' | 'staff'>('student');

  // NEW: Step-by-Step grade entry control for teacher dashboard
  const [gradeEntryStep, setGradeEntryStep] = useState<'idle' | 'select-label' | 'select-subject' | 'enter-grades'>('idle');
  const [teachMultipleSubjects, setTeachMultipleSubjects] = useState<boolean>(true);

  // Active state for selected class for tranches configuration under accounting tab
  const [configTrancheClassId, setConfigTrancheClassId] = useState<string>('c-1');
  const [enlargedExamMaterial, setEnlargedExamMaterial] = useState<CourseMaterial | null>(null);

  // Parent specific states
  const [parentMessages, setParentMessages] = useState<any[]>([
    { id: 'm-1', sender: 'Administration', content: 'Le bulletin du second semestre est disponible.', date: '2026-05-20' }
  ]);
  const [typedParentMsg, setTypedParentMsg] = useState('');
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // 1. ADD PERSONNEL (ADMIN)
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.phone) return;

    if (newStaff.role === 'Autre') {
      if (!customRoleName) {
        alert("Veuillez spécifier le nom du rôle pour cet autre collaborateur.");
        return;
      }
      if (customSelectedTabs.length === 0) {
        alert("Veuillez cocher au moins une fonctionnalité d'accès.");
        return;
      }
      const addedCustom: CustomMember = {
        id: 'mem-' + Date.now(),
        name: newStaff.name,
        role: customRoleName,
        email: newStaff.email,
        phone: newStaff.phone,
        permissions: customSelectedTabs
      };
      setCustomMembers([...customMembers, addedCustom]);
      setNewStaff({ name: '', role: 'Enseignant', phone: '', email: '' });
      setCustomRoleName('');
      setCustomSelectedTabs([]);
      alert(`Autre collaborateur personnalisé "${addedCustom.name}" créé avec succès avec le rôle "${addedCustom.role}" ! Ses accès ont été assignés.`);
      return;
    }

    const added: Employee = {
      id: 'emp-' + Date.now(),
      name: newStaff.name,
      role: newStaff.role as any,
      phone: newStaff.phone,
      email: newStaff.email,
      // Add supervisor specifics
      supervisorType: newStaff.role === 'Superviseur' ? supervisorTypeInput : undefined,
      subjects: newStaff.role === 'Enseignant' ? teacherSubjectsInput.split(',').map(s => s.trim()).filter(Boolean) : undefined
    };
    onUpdateStaff([...registeredStaff, added]);
    setNewStaff({ name: '', role: 'Enseignant', phone: '', email: '' });
    setTeacherSubjectsInput('');
    alert(`Collaborateur "${added.name}" enregistré avec succès comme : ${added.role === 'Superviseur' ? `${added.role} (${supervisorTypeInput})` : added.role} !`);
  };

  // 2. ADD ANNOUNCEMENT (ADMIN, SECRETARY, SUPERVISOR)
  const handlePublishAnnounce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const added: Announcement = {
      id: 'ann-' + Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      target: newAnnouncement.target,
      date: new Date().toISOString().split('T')[0],
      author: currentRole === 'admin' ? 'Administrateur Principal' : currentRole === 'secretary' ? 'Secrétaire OTO' : 'Superviseur de l\'Établissement'
    };
    onUpdateAnnouncements([added, ...registeredAnnouncements]);
    setNewAnnouncement({ title: '', content: '', target: 'all' });
    alert("Votre annonce a été publiée live et transmise aux bénéficiaires !");
  };

  // 3. ENROLL STUDENT AND MATRICULATE (ADMIN, SECRETARY)
  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.parentEmail) {
      alert("Veuillez remplir au moins le nom, le prénom de l'élève et l'adresse email du tuteur.");
      return;
    }

    // Find if parent already exists or create parent on-the-fly to simulate connection
    const targetParent = registeredParents.find(p => p.email.toLowerCase() === newStudent.parentEmail.toLowerCase());
    
    // Create new student with full details
    const freshStudent: Student = {
      id: 'std-' + Date.now(),
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      class: newStudent.class,
      sexe: newStudent.gender,
      npi: newStudent.npi,
      birthDate: newStudent.birthDate,
      birthPlace: newStudent.birthPlace,
      neighborhood: newStudent.neighborhood,
      parentName: newStudent.parentName,
      contacts: newStudent.parentPhone,
      parentEmail: newStudent.parentEmail,
      parentProfession: newStudent.parentProfession,
      notes: [
        { subject: 'Mathématiques', score: 14, date: '2026-05-18' },
        { subject: 'Français', score: 12, date: '2026-05-19' }
      ],
      absences: 0,
      unjustifiedAbsences: 0,
      tuitionStatus: {}
    };

    // Pour chaque classe, on récupère les tranches d'échéance et on les initialise à 'non-soldé'
    const matchedClass = classesList.find(c => c.name === newStudent.class);
    if (matchedClass) {
      const statuses: Record<string, 'soldé' | 'non-soldé'> = {};
      matchedClass.tranches.forEach(tranche => {
        statuses[tranche.label] = 'non-soldé';
      });
      freshStudent.tuitionStatus = statuses;
    }

    if (targetParent) {
      // Append child
      const updatedParents = registeredParents.map(parent => {
        if (parent.id === targetParent.id) {
          return {
            ...parent,
            children: [...parent.children, freshStudent],
            schoolIds: parent.schoolIds.includes(activeSchool.id) ? parent.schoolIds : [...parent.schoolIds, activeSchool.id]
          };
        }
        return parent;
      });
      onUpdateParents(updatedParents);
    } else {
      // Create new parent from detailed inputs
      const parts = (newStudent.parentName || 'Tuteur').split(' ');
      const pFirst = parts.slice(0, -1).join(' ') || 'Tuteur';
      const pLast = parts[parts.length - 1] || newStudent.lastName;

      const newParent: ParentUser = {
        id: 'parent-' + Date.now(),
        firstName: pFirst,
        lastName: pLast,
        email: newStudent.parentEmail,
        phone: newStudent.parentPhone || '+225 01 02 03 04',
        profession: newStudent.parentProfession || 'Non spécifiée',
        schoolIds: [activeSchool.id],
        children: [freshStudent]
      };
      onUpdateParents([...registeredParents, newParent]);
    }

    alert(`Élève "${freshStudent.firstName} ${freshStudent.lastName}" inscrit avec succès ! Un accès parent a été créé pour "${newStudent.parentName || 'le tuteur'}" (Email : ${newStudent.parentEmail}).`);
    
    // Reset inputs
    setNewStudent({
      firstName: '',
      lastName: '',
      gender: 'Masculin',
      npi: '',
      birthDate: '',
      birthPlace: '',
      neighborhood: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      parentProfession: '',
      class: '3ème A'
    });
  };

  // 4. ADD TRANSACTION (ADMIN)
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransaction.label || !newTransaction.amount) return;
    const value = parseFloat(newTransaction.amount) * (newTransaction.type === 'out' ? -1 : 1);
    const added = {
      id: 'trans-' + Date.now(),
      label: newTransaction.label,
      amount: value,
      type: newTransaction.type,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([added, ...transactions]);
    setNewTransaction({ label: '', amount: '', type: 'in' });
  };

  // 5. UPLOAD COURSE MATERIAL / EXAM (TEACHER ONLY)
  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== 'teacher') {
      alert("Seul un enseignant peut publier une épreuve en bibliothèque !");
      return;
    }
    if (!newMaterial.title) {
      alert("Veuillez saisir un titre d'épreuve.");
      return;
    }
    
    if (newMaterial.fileType === 'pdf') {
      if (!newMaterial.fileUrl && !newMaterial.fileName) {
        alert("Veuillez joindre le fichier PDF de l'épreuve.");
        return;
      }
    } else {
      if (!newMaterial.imageUrl) {
        alert("Veuillez sélectionner ou importer une photo du sujet d'épreuve.");
        return;
      }
    }

    const added: CourseMaterial = {
      id: 'mat-' + Date.now(),
      title: newMaterial.title,
      subject: newMaterial.subject,
      className: newMaterial.className,
      fileType: newMaterial.fileType,
      fileSize: newMaterial.fileType === 'pdf' ? '1.4 MB' : '950 KB',
      dateAdded: new Date().toISOString().split('T')[0],
      imageUrl: newMaterial.fileType === 'image' ? newMaterial.imageUrl : undefined,
      fileUrl: newMaterial.fileType === 'pdf' ? (newMaterial.fileUrl || '#') : undefined
    };
    onUpdateMaterials([added, ...registeredMaterials]);
    setNewMaterial({ title: '', subject: 'Mathématiques', className: '3ème A', fileType: 'pdf', imageUrl: '', fileUrl: '', fileName: '' });
    alert("Épreuve d'examen publiée avec succès dans la bibliothèque !");
  };

  // 6. RECORD GRADE (TEACHER)
  const handleRecordGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrade.score) return;
    const scoreVal = parseFloat(newGrade.score);
    if (scoreVal < 0 || scoreVal > 20) {
      alert("La note doit être comprise entre 0 et 20.");
      return;
    }

    // Traverse parent list to update child score in standard React mock DB
    const updatedParents = registeredParents.map(parent => {
      const updatedChildren = parent.children.map(child => {
        if (child.id === selectedStudent) {
          return {
            ...child,
            notes: [
              ...child.notes,
              { subject: newGrade.subject, score: scoreVal, date: new Date().toISOString().split('T')[0] }
            ]
          };
        }
        return child;
      });
      return { ...parent, children: updatedChildren };
    });

    onUpdateParents(updatedParents);
    setNewGrade({ subject: 'Mathématiques', score: '' });
    alert("Note enregistrée avec succès !");
  };

  // 7. RECORD HOUR ABSENCE (SUPERVISOR, TEACHER)
  const handleAddAbsence = (studentId: string) => {
    const updatedParents = registeredParents.map(parent => {
      const updatedChildren = parent.children.map(child => {
        if (child.id === studentId) {
          return {
            ...child,
            absences: child.absences + 1,
            unjustifiedAbsences: child.unjustifiedAbsences + 1
          };
        }
        return child;
      });
      return { ...parent, children: updatedChildren };
    });
    onUpdateParents(updatedParents);
    alert("Absence enregistrée pour l'élève. Le tuteur a été notifié par SMS/Push.");
  };

  // 8. SEND MESSAGE FROM PARENT (PARENT)
  const handleSendParentMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedParentMsg) return;
    const added = {
      id: 'msg-' + Date.now(),
      sender: 'Vous',
      content: typedParentMsg,
      date: 'Aujourd\'hui, ' + new Date().toLocaleTimeString().slice(0, 5)
    };
    setParentMessages([...parentMessages, added]);
    setTypedParentMsg('');
  };

  // Gather all students currently affiliated with the active school to display in grids
  const activeStudents: { student: Student; parent: ParentUser }[] = [];
  registeredParents.forEach(p => {
    if (p.schoolIds.includes(activeSchool.id)) {
      p.children.forEach(c => {
        activeStudents.push({ student: c, parent: p });
      });
    }
  });

  // Calculate generic dashboard figures
  const totalRevenue = transactions.filter(t => t.type === 'in').reduce((sum, current) => sum + current.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'out').reduce((sum, current) => sum + current.amount, 0));
  const netProfit = totalRevenue - totalExpenses;
  const getRoleLabel = () => {
    switch(currentRole) {
      case 'admin': return 'Administrateur Principal';
      case 'teacher': return 'Professeur Référent';
      case 'secretary': return 'Secrétariat Général';
      case 'supervisor': 
        return `Superviseur : ${selectedSupervisorType || 'Censeur'}`;
      case 'parent': return 'Parent d\'Élève';
      case 'custom': return 'Autre Membre (Accès sur-mesure)';
      default: return 'Utilisateur OTO';
    }
  };

  // Define tabs per role dynamically as requested
  interface TabItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }

  let tabsToRender: TabItem[] = [];

  if (currentRole === 'admin') {
    tabsToRender = [
      { id: 'overview', label: 'Vue Générale', icon: TrendingUp },
      { id: 'personnel', label: 'Gestion Personnel', icon: Users },
      { id: 'enrollment', label: 'Enregistrement Staff', icon: UserPlus },
      { id: 'materials', label: 'Bibliothèque d\'Épreuves', icon: BookMarked },
      { id: 'comms', label: 'Annonces & Comm', icon: Bell },
      { id: 'profil', label: 'Mon Profil Admin', icon: FileCheck }
    ];
  } else if (currentRole === 'supervisor') {
    tabsToRender = [
      { id: 'overview', label: 'Vue Générale École', icon: TrendingUp },
      { id: 'absences', label: 'Gestion Absences', icon: Clock },
      { id: 'salles', label: 'Gestion Salles (Pièces)', icon: Building },
      { id: 'classes', label: 'Gestion Classes', icon: Bookmark },
      { id: 'schedule', label: 'Emploi du Temps', icon: Calendar },
      { id: 'materials', label: 'Bibliothèque d\'Épreuves', icon: BookMarked },
      { id: 'comms', label: 'Annonces & Comm', icon: Bell }
    ];
  } else if (currentRole === 'secretary') {
    tabsToRender = [
      { id: 'overview', label: 'Vue Générale École', icon: TrendingUp },
      { id: 'enrollment', label: 'Inscription Élève', icon: UserPlus },
      { id: 'accounting', label: 'Comptabilité Scolaire', icon: DollarSign },
      { id: 'scolarite', label: 'Suivi Scolarité', icon: FileText },
      { id: 'materials', label: 'Bibliothèque d\'Épreuves', icon: BookMarked },
      { id: 'comms', label: 'Annonces & Comm', icon: Bell }
    ];
  } else if (currentRole === 'teacher') {
    tabsToRender = [
      { id: 'overview', label: 'Vue Générale École', icon: TrendingUp },
      { id: 'grades-entry', label: 'Saisie des Notes', icon: Bookmark },
      { id: 'schedule', label: 'Mon Emploi du Temps', icon: Calendar },
      { id: 'absences', label: 'Gestion Absences', icon: Clock },
      { id: 'materials', label: 'Bibliothèque d\'Épreuves', icon: BookMarked },
      { id: 'comms', label: 'Annonces de l\'École', icon: Bell }
    ];
  } else if (currentRole === 'parent') {
    tabsToRender = [
      { id: 'overview', label: 'Suivi de mes Enfants', icon: TrendingUp },
      { id: 'comms', label: 'Messages de l\'École', icon: Bell }
    ];
  } else if (currentRole === 'custom') {
    const defaultCustomOptions = [
      { id: 'personnel', label: 'Gestion Personnel', icon: Users },
      { id: 'enrollment', label: 'Inscription Élève', icon: UserPlus },
      { id: 'accounting', label: 'Comptabilité Scolaire', icon: DollarSign },
      { id: 'scolarite', label: 'Suivi Scolarité', icon: FileText },
      { id: 'absences', label: 'Gestion Absences', icon: Clock },
      { id: 'salles', label: 'Gestion Salles (Pièces)', icon: Building },
      { id: 'classes', label: 'Gestion Classes', icon: Bookmark },
      { id: 'schedule', label: 'Emploi du Temps', icon: Calendar },
      { id: 'grades-entry', label: 'Saisie des Notes', icon: Bookmark },
      { id: 'materials', label: 'Bibliothèque d\'Épreuves', icon: BookMarked },
      { id: 'comms', label: 'Annonces & Comm', icon: Bell }
    ];
    tabsToRender = [
      { id: 'overview', label: 'Vue Générale Custom', icon: TrendingUp },
      ...(defaultCustomOptions.filter(t => isCustomUserPermitted(t.id)))
    ];
  }

  // Withdraw standard tabs if assigned to custom other admin members:
  // "si la fonctionnalité ajouter est dans un des 3 autres membre on la lui retirera automatiquement."
  if (currentRole === 'secretary' || currentRole === 'supervisor' || currentRole === 'teacher') {
    tabsToRender = tabsToRender.filter(t => {
      if (t.id === 'overview' || t.id === 'comms' || t.id === 'materials') return true;
      return !isFeatureWithdrawn(t.id);
    });
  }

  // Dynamic automatic bounding safe selection
  React.useEffect(() => {
    if (!tabsToRender.some(t => t.id === activeTab)) {
      setActiveTab('overview');
    }
    if (currentRole === 'parent' && !selectedChildId && activeStudents.length > 0) {
      setSelectedChildId(activeStudents[0].student.id);
    }
  }, [currentRole, activeTab, customMembers, selectedChildId, activeStudents]);

  if (currentRole === 'supervisor' && !selectedSupervisorType) {
    return (
      <div id="dashboards-root" className="min-h-screen bg-[#090d1f] text-slate-100 flex flex-col font-sans">
        <header id="dashboards-header" className="bg-[#101935] border-b border-slate-800 px-4 py-4 sm:px-6 lg:px-8 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/15">
                <School className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">{activeSchool?.name}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              Se Déconnecter
            </button>
          </div>
        </header>

        <div className="flex-1 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-full">
            <Users className="w-12 h-12 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Espace Superviseur de l'Académie</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Bienvenue sur OTO School Management. Veuillez spécifier votre domaine d'activité pour configurer votre tableau de bord interactif :
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
            <button 
              onClick={() => {
                setSelectedSupervisorType('Censeur');
                setActiveTab('overview');
              }}
              className="bg-[#111933] border-2 border-slate-800 hover:border-blue-500 rounded-2xl p-6 text-left space-y-3 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="bg-blue-500/10 p-2.5 rounded-lg w-fit text-blue-400">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Superviseur : Censeur</p>
                <p className="text-2xs text-slate-400 mt-1">
                  En charge de la validation académique, de la gestion des classes, des coefficients d'évaluations et de la bibliothèque d'épreuves scolaires.
                </p>
              </div>
            </button>

            <button 
              onClick={() => {
                setSelectedSupervisorType('Surveillant');
                setActiveTab('overview');
              }}
              className="bg-[#111933] border-2 border-slate-800 hover:border-blue-500 rounded-2xl p-6 text-left space-y-3 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="bg-yellow-500/10 p-2.5 rounded-lg w-fit text-yellow-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Superviseur : Surveillant Général</p>
                <p className="text-2xs text-slate-400 mt-1">
                  Responsable de la vie scolaire, du contrôle quotidien d'assiduité, de la saisie d'absences injustifiées des élèves et de la gestion des salles d'étude.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboards-root" className="min-h-screen bg-[#090d1f] text-slate-100 flex flex-col font-sans">
      
      {/* Upper Navigation Bar */}
      <header id="dashboards-header" className="bg-[#101935] border-b border-slate-800 px-4 py-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/15">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{activeSchool?.name}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">ACTIF</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">{activeSchool?.city} • {activeSchool?.poBox}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* User role profile indicator */}
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-white">{getRoleLabel()}</p>
              <p className="text-[10px] text-blue-400 tracking-wide uppercase font-mono">Compte Connecté</p>
            </div>

            <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>

            <button 
              onClick={onLogout}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-red-500/10 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Se Déconnecter</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Grid View */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav Panels depending on Roles */}
        <aside className="w-full md:w-64 flex flex-col gap-2">
          
          {/* Menu Title */}
          <span className="text-2xs font-extrabold text-slate-500 tracking-wider uppercase px-3 pb-2 block">Menu Principal</span>
          
          {tabsToRender.map((t) => {
            const IconComp = t.icon;
            return (
              <button 
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full text-left py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all cursor-pointer ${
                  activeTab === t.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <IconComp className="w-4 h-4 text-inherit" />
                <span>{t.label}</span>
              </button>
            );
          })}

          {/* Extra generic user card info */}
          <div className="mt-8 p-4 rounded-xl bg-[#111827] border border-slate-800 text-center space-y-1.5">
            <p className="text-[10px] uppercase font-mono text-slate-500 font-extrabold font-bold">Espace Dédié</p>
            <span className="text-2xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold inline-block">
              {currentRole.toUpperCase()} PANEL
            </span>
          </div>

        </aside>

        {/* Dynamic Inner Panels Workspace */}
        <main className="flex-1 bg-[#121931] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-inner overflow-hidden">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Tableau Général de Suivi</h3>
                  {currentRole === 'supervisor' && (
                    <p className="text-xs text-blue-400 mt-1">
                      Mode actif : <strong className="text-white">{selectedSupervisorType}</strong>
                    </p>
                  )}
                  {currentRole === 'custom' && (
                    <p className="text-xs text-emerald-400 mt-1">
                      Profil connecté: <strong className="text-white">M. Yao Koffi (Conseiller d'Éducation)</strong>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {currentRole === 'supervisor' && (
                    <button
                      onClick={() => setSelectedSupervisorType(null)}
                      className="bg-blue-600/10 hover:bg-shadow text-blue-400 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                    >
                      Bascule Rôle (Censeur ⇄ Surveillant)
                    </button>
                  )}
                  <span className="text-xs text-slate-400 font-mono">Date locale: 21 mai 2026</span>
                </div>
              </div>

              {/* Stats Bar */}
              {currentRole !== 'parent' ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 text-center space-y-1 shadow-sm">
                    <p className="text-3xs text-slate-400 uppercase font-black tracking-wider">Nombre de Classes</p>
                    <p className="text-3xl font-black text-blue-400">{classesList.length}</p>
                  </div>
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 text-center space-y-1 shadow-sm">
                    <p className="text-3xs text-slate-400 uppercase font-black tracking-wider">Nombre de Salles</p>
                    <p className="text-3xl font-black text-emerald-400">{roomsList.length}</p>
                  </div>
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 text-center space-y-1 shadow-sm">
                    <p className="text-3xs text-slate-400 uppercase font-black tracking-wider">Nombre d'Élèves</p>
                    <p className="text-3xl font-black text-rose-400">{activeStudents.length}</p>
                  </div>
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 text-center space-y-1 shadow-sm">
                    <p className="text-3xs text-slate-400 uppercase font-black tracking-wider">Membres de l'Établissement</p>
                    <p className="text-3xl font-black text-violet-400">
                      {registeredStaff.length + registeredTeachers.length + customMembers.length}
                    </p>
                  </div>
                </div>
              ) : (
                /* Parent custom stats */
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-[#1c263f] border border-slate-800 rounded-2xl p-6 text-center space-y-2">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto" />
                    <div>
                      <p className="text-2xs text-slate-400 uppercase font-semibold">Moyenne Générale</p>
                      <p className="text-2xl font-black text-white">15.5 / 20</p>
                    </div>
                  </div>
                  <div className="bg-[#1c263f] border border-slate-800 rounded-2xl p-6 text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto" />
                    <div>
                      <p className="text-2xs text-slate-400 uppercase font-semibold">Absences Enregistrées</p>
                      <p className="text-2xl font-black text-white">4 Heures</p>
                    </div>
                  </div>
                  <div className="bg-[#1c263f] border border-slate-800 rounded-2xl p-6 text-center space-y-2">
                    <FileCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div>
                      <p className="text-2xs text-slate-400 uppercase font-semibold text-center">Trimestre en cours</p>
                      <p className="text-2xl font-black text-white">2ème Trimestre</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Primary content card inside overview */}
              {currentRole === 'parent' ? (
                /* PARENT DETAILED CHILD SUIVI & CONTROLE PARENTAL INTERACTIVE */
                <div className="space-y-8">
                  {/* Separate containers for children */}
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3 block">Mes enfants inscrits dans cet établissement (Cliquez pour afficher les détails)</h4>
                    <div className="grid sm:grid-cols-2 gap-4 font-sans">
                      {activeStudents.map((pair) => {
                        const isSelected = selectedChildId === pair.student.id;
                        return (
                          <button
                            key={pair.student.id}
                            type="button"
                            onClick={() => setSelectedChildId(pair.student.id)}
                            className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#182245] border-blue-500 shadow-lg shadow-blue-500/10'
                                : 'bg-[#111830] border-slate-800/80 hover:border-slate-700 hover:bg-[#151f40]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl text-xs font-bold ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                  {pair.student.firstName[0]}{pair.student.lastName[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white">{pair.student.firstName} {pair.student.lastName}</p>
                                  <p className="text-2xs text-slate-400">Classe d'Affectation : <span className="font-semibold text-blue-400">{pair.student.class}</span></p>
                                </div>
                              </div>
                              <span className="text-2xs bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/20">
                                {pair.student.notes.length > 0
                                  ? `${(pair.student.notes.reduce((sum, n) => sum + n.score, 0) / pair.student.notes.length).toFixed(2)}/20`
                                  : 'N/A'
                                }
                              </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800 text-3xs text-slate-400 flex justify-between">
                              <span>Absences: <strong className="text-red-400">{pair.student.absences}h</strong></span>
                              <span>Paiement: <strong className="text-emerald-400 font-bold font-mono">À Jour</strong></span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(() => {
                    const pair = activeStudents.find(p => p.student.id === selectedChildId) || activeStudents[0];
                    if (!pair) return <p className="text-xs text-slate-500">Aucun enfant trouvé.</p>;

                    const linkedClass = classesList.find(c => 
                      pair.student.class.toLowerCase().includes(c.name.toLowerCase())
                    ) || classesList[0];

                    return (
                      <div className="space-y-6 animate-fade-in shadow-inner">
                        {/* Selected banner statement */}
                        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-200">
                            Fiche de suivi en direct : <strong className="text-white text-sm">{pair.student.firstName} {pair.student.lastName}</strong>
                          </p>
                          <span className="text-2xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">matricule OTO-{pair.student.id}</span>
                        </div>

                        {/* Bulletin details */}
                        <div className="bg-[#18203d] border border-slate-800 rounded-xl p-6">
                          <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                            <Bookmark className="w-4.5 h-4.5 text-blue-400" />
                            <span>Relevé Exclusif de Notes ({pair.student.firstName})</span>
                          </h4>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                              <thead>
                                <tr className="border-b border-slate-700 bg-[#121931]">
                                  <th className="py-2.5 px-3">Matière</th>
                                  <th className="py-2.5 px-3">Note Obtenue</th>
                                  <th className="py-2.5 px-3">Type d'Évaluation</th>
                                  <th className="py-2.5 px-3">Date de publication</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800">
                                {pair.student.notes && pair.student.notes.length > 0 ? (
                                  pair.student.notes.map((n, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/30">
                                      <td className="py-3 px-3 font-semibold text-white">{n.subject}</td>
                                      <td className="py-3 px-3 font-mono font-bold text-sm">
                                        <span className={n.score >= 12 ? 'text-green-400' : 'text-yellow-400'}>
                                          {n.score} / 20
                                        </span>
                                      </td>
                                      <td className="py-3 px-3">
                                        <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                                          {n.date ? 'Devoir Surveillé' : 'Interrogation'}
                                        </span>
                                      </td>
                                      <td className="py-3 px-3 text-slate-500">{n.date || '20 mai 2026'}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4} className="py-6 text-center text-slate-500">Aucune évaluation enregistrée pour le moment.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Bottom columns: Absences and Scolarite */}
                        <div className="grid md:grid-cols-2 gap-6">
                          
                          {/* Absences control */}
                          <div className="bg-[#18203d] border border-slate-800 rounded-xl p-5 space-y-4">
                            <h4 className="font-bold text-white text-sm flex items-center gap-2">
                              <Clock className="w-4.5 h-4.5 text-yellow-400" />
                              <span>Contrôle d'Assiduité Parental</span>
                            </h4>
                            
                            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
                              <div>
                                <p className="text-2xs text-slate-400 uppercase font-bold font-mono">Total Absences</p>
                                <p className="text-2xl font-black text-red-400 mt-1">{pair.student.absences} Heures</p>
                              </div>
                              <div className="text-right">
                                <p className="text-3xs text-yellow-500 font-semibold uppercase">{pair.student.unjustifiedAbsences}h non justifiées</p>
                                <p className="text-3xs text-slate-500 mt-1">Donnée arrêtée au 21 mai 2026</p>
                              </div>
                            </div>

                            {/* Inform delay form button */}
                            <div className="p-4 border border-dashed border-slate-800 rounded-xl text-center space-y-2">
                              <p className="text-2xs text-slate-300">Votre enfant a un retard médical ou un rdv dentaire à justifier ?</p>
                              <button 
                                onClick={() => alert(`Envoi de la justification de retard pour ${pair.student.firstName} à la vie scolaire en cours...`)}
                                className="bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 px-4 py-2 rounded-lg text-2xs font-semibold cursor-pointer transition w-full"
                              >
                                Signaler & Justifier une Absence à Venir
                              </button>
                            </div>
                          </div>

                          {/* Scolarité installments and fees display */}
                          <div className="bg-[#18203d] border border-slate-800 rounded-xl p-5 space-y-4">
                            <h4 className="font-bold text-white text-sm flex items-center gap-2">
                              <DollarSign className="w-4.5 h-4.5 text-emerald-400" />
                              <span>Suivi Financier & Échéances</span>
                            </h4>

                            <div className="space-y-2.5">
                              {linkedClass.tranches.map((t, tid) => (
                                <div key={tid} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                                  <div>
                                    <p className="text-xs font-bold text-white">{t.label}</p>
                                    <p className="text-3xs text-slate-500 mt-0.5">Date limite : {t.dueDate}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-bold text-emerald-400 font-mono">{t.amount.toLocaleString()} FCFA</p>
                                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-semibold inline-block mt-1">
                                      Payé / Validé
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* STAFF DETAILED GENERAL OVERVIEW */
                <div className="space-y-6">
                  <div className="bg-[#18203d] border border-slate-800 rounded-xl p-5">
                    <h4 className="font-bold text-white text-sm mb-4">Dossiers d'Inscriptions Actifs ({activeSchool?.name})</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead>
                          <tr className="border-b border-slate-800 bg-[#131c36]">
                            <th className="py-2.5 px-3">Nom</th>
                            <th className="py-2.5 px-3">Prénom</th>
                            <th className="py-2.5 px-3">Classe d'Affectation</th>
                            <th className="py-2.5 px-3">Tuteur Légal d'Élève</th>
                            <th className="py-2.5 px-3">Absences</th>
                            {currentRole === 'supervisor' && <th className="py-2.5 px-3">Sanctions</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {activeStudents && activeStudents.length > 0 ? (
                            activeStudents.map((pair) => (
                              <tr key={pair.student.id} className="hover:bg-slate-800/30">
                                <td className="py-3 px-3 font-semibold text-white uppercase">{pair.student.lastName}</td>
                                <td className="py-3 px-3 text-slate-300">{pair.student.firstName}</td>
                                <td className="py-3 px-3 font-mono text-blue-400 font-bold">{pair.student.class}</td>
                                <td className="py-3 px-3 text-slate-400">{pair.parent.firstName} {pair.parent.lastName}</td>
                                <td className="py-3 px-3 text-red-400 font-mono font-black">{pair.student.absences} h</td>
                                {currentRole === 'supervisor' && (
                                  <td className="py-3 px-3">
                                    <button 
                                      onClick={() => handleAddAbsence(pair.student.id)}
                                      className="bg-yellow-500/10 hover:bg-yellow-500 text-yellow-400 hover:text-white border border-yellow-500/20 px-2 py-1 rounded text-2xs cursor-pointer transition"
                                    >
                                      + Réprimande
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-6 text-center text-slate-500">Aucun étudiant n'a encore été inscrit par l'administration ou la secrétaire.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: STAFF MANAGEMENT (ADMIN ONLY) */}
          {activeTab === 'personnel' && currentRole === 'admin' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Annuaire & Recherche de l'Etablissement</h3>
                  <p className="text-xs text-slate-400 mt-1">Recherchez instantanément tous les membres de la communauté scolaire de {activeSchool?.name}</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  Total : <strong>{activeStudents.length + registeredParents.length + registeredTeachers.length + registeredStaff.length + customMembers.length} membres</strong>
                </span>
              </div>

              {/* Advanced search bar container */}
              <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Search className="w-5 h-5 text-slate-450" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Rechercher par nom, tuteur, email, contact téléphonique, classe ou matière..." 
                    value={memberSearchQuery}
                    onChange={e => setMemberSearchQuery(e.target.value)}
                    className="w-full bg-[#161e33] border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm font-semibold shadow-inner"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/50">
                  <span className="text-3xs text-slate-450 uppercase font-bold tracking-wider mr-2">Filtrer par :</span>
                  {[
                    { id: 'all', label: `Tout l'effectif (${activeStudents.length + registeredParents.length + registeredTeachers.length + registeredStaff.length + customMembers.length})` },
                    { id: 'student', label: `Élèves (${activeStudents.length})` },
                    { id: 'parent', label: `Parents / Tuteurs (${registeredParents.length})` },
                    { id: 'teacher', label: `Professeurs (${registeredTeachers.length})` },
                    { id: 'staff', label: `Administrations & Staff (${registeredStaff.length + customMembers.length})` }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setMemberTypeFilter(p.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-2xs font-extrabold tracking-wide transition-all ${
                        memberTypeFilter === p.id 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Table card */}
              <div className="bg-[#1b2542] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400">Roster général des enregistrements</span>
                  {memberSearchQuery && (
                    <button 
                      onClick={() => setMemberSearchQuery('')}
                      className="text-3xs font-extrabold text-blue-400 hover:text-white-40"
                    >
                      Effacer la recherche
                    </button>
                  )}
                </div>

                {(() => {
                  // Compile lists
                  const searchRoster: { id: string; name: string; roleLabel: string; roleType: string; email: string; phone: string; details: string; status: string }[] = [];

                  // 1. Students
                  activeStudents.forEach(({ student, parent }) => {
                    searchRoster.push({
                      id: student.id,
                      name: `${student.firstName} ${student.lastName}`,
                      roleLabel: 'Élève',
                      roleType: 'student',
                      email: parent.email,
                      phone: parent.phone,
                      details: `Classe d'affectation : ${student.class} • Tuteur : ${parent.firstName} ${parent.lastName}`,
                      status: 'Scolarisé'
                    });
                  });

                  // 2. Parents
                  registeredParents.forEach(p => {
                    searchRoster.push({
                      id: p.id,
                      name: `${p.firstName} ${p.lastName}`,
                      roleLabel: 'Parent',
                      roleType: 'parent',
                      email: p.email,
                      phone: p.phone,
                      details: `Profession : ${p.profession} • Enfants : ${p.children.map(c => c.firstName).join(', ')}`,
                      status: 'Tuteur en ligne'
                    });
                  });

                  // 3. Teachers
                  registeredTeachers.forEach(t => {
                    searchRoster.push({
                      id: t.id,
                      name: `${t.firstName} ${t.lastName}`,
                      roleLabel: 'Professeur',
                      roleType: 'teacher',
                      email: t.email,
                      phone: '+225 01 02 03 04',
                      details: `Enseigne : ${t.subject}`,
                      status: 'Corps enseignant'
                    });
                  });

                  // 4. Staff
                  registeredStaff.forEach(s => {
                    searchRoster.push({
                      id: s.id,
                      name: s.name,
                      roleLabel: s.role === 'Admin' ? 'Administrateur' : s.role,
                      roleType: 'staff',
                      email: s.email,
                      phone: s.phone,
                      details: s.role === 'Enseignant' && s.subjects ? `Matières : ${s.subjects.join(', ')}` : `Secrétariat / Superviseur OTO`,
                      status: 'Actif'
                    });
                  });

                  // 5. Custom
                  customMembers.forEach(m => {
                    searchRoster.push({
                      id: m.id,
                      name: m.name,
                      roleLabel: m.role,
                      roleType: 'staff',
                      email: m.email,
                      phone: m.phone,
                      details: `Habilitations : ${m.permissions.join(', ')}`,
                      status: 'Habilités sur-mesure'
                    });
                  });

                  // Filtering logic
                  const filteredResult = searchRoster.filter(m => {
                    // Filter type
                    if (memberTypeFilter === 'student' && m.roleType !== 'student') return false;
                    if (memberTypeFilter === 'parent' && m.roleType !== 'parent') return false;
                    if (memberTypeFilter === 'teacher' && m.roleType !== 'teacher') return false;
                    if (memberTypeFilter === 'staff' && m.roleType !== 'staff' && m.roleType !== 'teacher') {
                      // Verify staff roles specifically
                      if (m.roleLabel.toLowerCase().includes('prof') && memberTypeFilter === 'staff') return false;
                      if (!m.roleLabel.toLowerCase().includes('secre') && !m.roleLabel.toLowerCase().includes('superv') && !m.roleLabel.toLowerCase().includes('admin') && !m.roleLabel.toLowerCase().includes('autre')) return false;
                    }

                    // Filter search query
                    if (!memberSearchQuery) return true;
                    const q = memberSearchQuery.toLowerCase().trim();
                    return (
                      m.name.toLowerCase().includes(q) ||
                      m.roleLabel.toLowerCase().includes(q) ||
                      m.email.toLowerCase().includes(q) ||
                      m.phone.toLowerCase().includes(q) ||
                      m.details.toLowerCase().includes(q)
                    );
                  });

                  if (filteredResult.length === 0) {
                    return (
                      <div className="text-center py-12 bg-slate-900/40">
                        <Users className="w-10 h-10 text-slate-655 mx-auto opacity-35" />
                        <p className="text-slate-400 text-xs font-bold mt-3">Aucun membre ne correspond à vos critères de recherche.</p>
                        <p className="text-3xs text-slate-500 mt-1">Essayez en changeant de filtre ou en rectifiant l'orthographe.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans text-slate-300">
                        <thead>
                          <tr className="border-b border-slate-800 bg-[#141b2f] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3 px-4">Membre</th>
                            <th className="py-3 px-4">Rôle / Fonction</th>
                            <th className="py-3 px-4">Coordonnées de Contact</th>
                            <th className="py-3 px-4">Statut & Détails d'affectation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium whitespace-nowrap">
                          {filteredResult.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-800/20 transition-all">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-white tracking-tight">{m.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono">ID: {m.id}</div>
                              </td>
                              <td className="py-3.5 px-4 text-xs font-semibold">
                                <span className={`px-2.5 py-1 rounded inline-block text-[10px] uppercase font-bold border ${
                                  m.roleLabel.toLowerCase().includes('élève') 
                                    ? 'bg-blue-650/10 text-blue-400 border-blue-500/10'
                                    : m.roleLabel.toLowerCase().includes('parent')
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/10'
                                    : m.roleLabel.toLowerCase().includes('prof')
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10'
                                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/10'
                                }`}>
                                  {m.roleLabel}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 space-y-1">
                                <div className="text-slate-200 font-mono font-bold text-2xs">{m.email}</div>
                                <div className="text-slate-400 text-3xs font-mono">{m.phone}</div>
                              </td>
                              <td className="py-3.5 px-4 space-y-1.5 whitespace-normal">
                                <div className="text-slate-300 font-bold text-2xs leading-snug">{m.details}</div>
                                <div className="text-[10px] text-emerald-400 font-bold font-mono">✓ {m.status}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 3: ACCOUNTING (ADMIN & SECRETARY ACCESSIBLE) */}
          {activeTab === 'accounting' && (currentRole === 'admin' || currentRole === 'secretary' || currentRole === 'custom') && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Gestion de la Comptabilité Scolaire</h3>
                <p className="text-xs text-slate-400 mt-1">Supervisez les recettes de scolarité, les charges de l'établissement et paramétrez les tranches financières</p>
              </div>

              {/* Installments / Tranches Configuration Block */}
              <div className="bg-[#1b2542] border border-[#2563eb]/20 shadow-blue-500/5 shadow-md rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                      <span>Configuration des Échéances & Montants des Tranches</span>
                    </h4>
                    <p className="text-2xs text-slate-400 mt-0.5">Sélectionnez une classe pour définir les dates d'échéances et de règlements des tranches financières</p>
                  </div>

                  <div>
                    <label className="text-3xs text-slate-400 block font-bold uppercase font-mono mb-1">Classe à Configurer</label>
                    <select
                      value={configTrancheClassId}
                      onChange={e => setConfigTrancheClassId(e.target.value)}
                      className="bg-[#242f53] border border-slate-700 font-bold px-3 py-1.5 text-xs rounded-lg text-slate-100 outline-none"
                    >
                      {classesList.map(c => (
                        <option key={c.id} value={c.id}>{c.name} (Scolarité Totale: {c.tuitionFee.toLocaleString()} F CFA)</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tranches Editor Form Grid */}
                {(() => {
                  const targetClass = classesList.find(c => c.id === configTrancheClassId);
                  if (!targetClass) return <p className="text-slate-500 text-xs py-2">Sélectionnez une classe existante.</p>;
                  return (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const updated = [
                          {
                            label: 'Tranche 1',
                            amount: parseFloat(formData.get('t1_amount') as string) || 0,
                            dueDate: formData.get('t1_date') as string
                          },
                          {
                            label: 'Tranche 2',
                            amount: parseFloat(formData.get('t2_amount') as string) || 0,
                            dueDate: formData.get('t2_date') as string
                          },
                          {
                            label: 'Tranche 3',
                            amount: parseFloat(formData.get('t3_amount') as string) || 0,
                            dueDate: formData.get('t3_date') as string
                          }
                        ];
                        
                        // Action de mise à jour
                        const updatedClasses = classesList.map(cls => {
                          if (cls.id === targetClass.id) {
                            const totalFee = updated.reduce((sum, cur) => sum + cur.amount, 0);
                            return {
                              ...cls,
                              tuitionFee: totalFee,
                              tranches: updated
                            };
                          }
                          return cls;
                        });
                        setClassesList(updatedClasses);
                        alert(`Tranches d'échéances de la classe "${targetClass.name}" mises à jour avec succès ! Somme totale : ${updated.reduce((sum, cur) => sum + cur.amount, 0).toLocaleString()} F CFA.`);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* TRANCHE 1 */}
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-yellow-400">⚡ Première Tranche</span>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Montant (F CFA)</label>
                            <input 
                              type="number"
                              required
                              name="t1_amount"
                              defaultValue={targetClass.tranches[0]?.amount || 150000}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Échéance de Règlement</label>
                            <input 
                              type="date"
                              required
                              name="t1_date"
                              defaultValue={targetClass.tranches[0]?.dueDate || '2026-09-30'}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                        </div>

                        {/* TRANCHE 2 */}
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-sky-400">⚡ Deuxième Tranche</span>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Montant (F CFA)</label>
                            <input 
                              type="number"
                              required
                              name="t2_amount"
                              defaultValue={targetClass.tranches[1]?.amount || 100000}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Échéance de Règlement</label>
                            <input 
                              type="date"
                              required
                              name="t2_date"
                              defaultValue={targetClass.tranches[1]?.dueDate || '2026-12-31'}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                        </div>

                        {/* TRANCHE 3 */}
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl space-y-3">
                          <span className="text-xs font-bold text-teal-400">⚡ Troisième Tranche</span>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Montant (F CFA)</label>
                            <input 
                              type="number"
                              required
                              name="t3_amount"
                              defaultValue={targetClass.tranches[2]?.amount || 100000}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-3xs text-slate-400 block font-mono">Échéance de Règlement</label>
                            <input 
                              type="date"
                              required
                              name="t3_date"
                              defaultValue={targetClass.tranches[2]?.dueDate || '2027-03-31'}
                              className="w-full bg-[#242f53] border border-slate-700/80 px-2.5 py-1.5 text-xs rounded text-slate-200 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow shadow-blue-500/10"
                      >
                        <CheckCircle className="w-4.5 h-4.5" />
                        <span>Enregistrer les nouvelles configurations de Tranches de la classe "{targetClass.name}"</span>
                      </button>
                    </form>
                  );
                })()}
              </div>

              {/* Accounting input form */}
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-1 space-y-4">
                  <h4 className="font-bold text-white text-sm">Enregistrer un Flux</h4>
                  <form onSubmit={handleAddTransaction} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400">Libellé</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Scolarité Trimestre 2"
                        value={newTransaction.label}
                        onChange={e => setNewTransaction({...newTransaction, label: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400">Montant (F CFA)</label>
                      <input 
                        type="number" 
                        required
                        placeholder="e.g. 150000"
                        value={newTransaction.amount}
                        onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400">Type de Transaction</label>
                      <select 
                        value={newTransaction.type}
                        onChange={e => setNewTransaction({...newTransaction, type: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none"
                      >
                        <option value="in">Recette (Entrée d'argent)</option>
                        <option value="out">Dépense (Sortie d'argent)</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter l'écriture</span>
                    </button>
                  </form>
                </div>

                {/* Ledger list */}
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-2">
                  <h4 className="font-bold text-white text-sm mb-4">Grand Livre des Opérations Récentes</h4>
                  <div className="overflow-x-auto font-sans">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-700 bg-[#121931]">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Libellé</th>
                          <th className="py-2.5 px-3">Catégorie</th>
                          <th className="py-2.5 px-3 text-right">Montant</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/85">
                        {transactions.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-800/30">
                            <td className="py-3 px-3 text-slate-500">{t.date}</td>
                            <td className="py-3 px-3 font-semibold text-white">{t.label}</td>
                            <td className="py-3 px-3 text-slate-400">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${t.type==='in' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {t.type==='in'?'Recette':'Dépense'}
                              </span>
                            </td>
                            <td className={`py-3 px-3 font-mono font-bold text-right text-sm ${t.type==='in'?'text-emerald-400':'text-red-400'}`}>
                              {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} FCFA
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: SCOLARITE - SUIVI FINANCIER PAR ELEVE (ADMIN, SECRETARY, CUSTOM ACCESSIBLE) */}
          {activeTab === 'scolarite' && (currentRole === 'admin' || currentRole === 'secretary' || currentRole === 'custom') && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Suivi Financier & Scolarités</h3>
                <p className="text-xs text-slate-400 mt-1">Consultez l'état d'encaissement des tranches financières de chaque élève et relancez les parents débiteurs</p>
              </div>

              {/* Stats overview of school fee collections */}
              {(() => {
                let totalStudentsCount = activeStudents.length;
                let fullyPaidCount = 0;
                let partiallyPaidCount = 0;
                let zeroPaidCount = 0;

                activeStudents.forEach(pair => {
                  const studentClass = pair.student.class;
                  const matchedClass = classesList.find(c => c.name === studentClass) || classesList[0];
                  const tranches = matchedClass ? matchedClass.tranches : [];
                  const statusObj = pair.student.tuitionStatus || {};
                  
                  let soldes = 0;
                  tranches.forEach(tr => {
                    if (statusObj[tr.label] === 'soldé') soldes++;
                  });

                  if (soldes === tranches.length && tranches.length > 0) {
                    fullyPaidCount++;
                  } else if (soldes > 0) {
                    partiallyPaidCount++;
                  } else {
                    zeroPaidCount++;
                  }
                });

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-[#1b2542] border border-slate-800 p-4 rounded-xl text-center">
                      <p className="text-3xs text-slate-400 uppercase font-black">Élèves Totaux</p>
                      <p className="text-xl font-bold text-slate-200 mt-1">{totalStudentsCount}</p>
                    </div>
                    <div className="bg-[#1b2542] border border-slate-800 p-4 rounded-xl text-center border-l-4 border-emerald-500">
                      <p className="text-3xs text-emerald-400 uppercase font-black">Entièrement Soldés</p>
                      <p className="text-xl font-bold text-emerald-300 mt-1">{fullyPaidCount}</p>
                    </div>
                    <div className="bg-[#1b2542] border border-slate-800 p-4 rounded-xl text-center border-l-4 border-blue-500">
                      <p className="text-3xs text-blue-400 uppercase font-black">Règlements Partiels</p>
                      <p className="text-xl font-bold text-blue-300 mt-1">{partiallyPaidCount}</p>
                    </div>
                    <div className="bg-[#1b2542] border border-slate-800 p-4 rounded-xl text-center border-l-4 border-rose-500">
                      <p className="text-3xs text-rose-400 uppercase font-black">Aucun Versement / Non Soldés</p>
                      <p className="text-xl font-bold text-rose-300 mt-1">{zeroPaidCount}</p>
                    </div>
                  </div>
                );
              })()}

              <div className="bg-[#1b2542] border border-slate-800 rounded-2xl overflow-hidden p-6">
                <h4 className="font-extrabold text-white text-sm mb-4">Liste Générale de suivi des Règlements</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 uppercase font-bold tracking-wider text-[10px] border-b border-slate-800">
                        <th className="py-3 px-4">Élève ID & Nom</th>
                        <th className="py-3 px-4">Classe</th>
                        <th className="py-3 px-4 text-center">Tranche 1</th>
                        <th className="py-3 px-4 text-center">Tranche 2</th>
                        <th className="py-3 px-4 text-center">Tranche 3</th>
                        <th className="py-3 px-4 text-right">Relance Tuteur</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {activeStudents.map((pair) => {
                        const s = pair.student;
                        const p = pair.parent;
                        
                        // Déduire les tranches associées à la classe de cet élève
                        const matchedClass = classesList.find(c => c.name === s.class) || classesList[0];
                        const tranches = matchedClass ? matchedClass.tranches : [];
                        const statusObj = s.tuitionStatus || {};

                        // Indicateur si au moins une tranche n'est pas soldée
                        let hasDebts = false;
                        tranches.forEach(tr => {
                          if (statusObj[tr.label] !== 'soldé') {
                            hasDebts = true;
                          }
                        });

                        return (
                          <tr key={s.id} className="hover:bg-slate-800/20 py-2">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white text-xs">{s.lastName} {s.firstName}</div>
                              <div className="text-3xs text-slate-500 font-mono mt-0.5">Parent: {p.firstName} {p.lastName} • Tel: {p.phone}</div>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-400">
                              <span className="bg-blue-900/10 text-blue-400 px-2 py-0.5 rounded border border-blue-900/30 text-[10px]">{s.class}</span>
                            </td>
                            
                            {/* Rendu des 3 tranches */}
                            {[0, 1, 2].map(idx => {
                              const tr = tranches[idx];
                              if (!tr) {
                                return (
                                  <td key={idx} className="py-3.5 px-4 text-center text-slate-600 font-mono text-3xs">
                                    -
                                  </td>
                                );
                              }

                              const currentStatus = statusObj[tr.label] || 'non-soldé';

                              return (
                                <td key={idx} className="py-3.5 px-4 text-center">
                                  <button
                                    onClick={() => {
                                      // Toggle tuition status
                                      const updatedParents = registeredParents.map(parent => {
                                        if (parent.email.toLowerCase() === p.email.toLowerCase()) {
                                          const updatedChildren = parent.children.map(child => {
                                            if (child.id === s.id) {
                                              const nextStatus = currentStatus === 'soldé' ? 'non-soldé' : 'soldé';
                                              
                                              // Auto-insert a transaction if marked as soldé
                                              if (nextStatus === 'soldé') {
                                                const newTrans = {
                                                  id: 'trans-' + Date.now(),
                                                  label: `Encaissement Scolarité ${s.firstName} ${s.lastName} - ${tr.label}`,
                                                  amount: tr.amount,
                                                  type: 'in' as const,
                                                  date: new Date().toISOString().split('T')[0]
                                                };
                                                setTransactions(prev => [newTrans, ...prev]);
                                              }

                                              return {
                                                ...child,
                                                tuitionStatus: {
                                                  ...statusObj,
                                                  [tr.label]: nextStatus
                                                }
                                              };
                                            }
                                            return child;
                                          });
                                          return { ...parent, children: updatedChildren };
                                        }
                                        return parent;
                                      });
                                      onUpdateParents(updatedParents);
                                      // Message informatif discret
                                      if (currentStatus === 'non-soldé') {
                                        alert(`Paiement de la ${tr.label} (${tr.amount.toLocaleString()} FCFA) encaissé pour l'élève ${s.firstName} ${s.lastName} ! Une écriture de recette a été générée au grand livre comptable.`);
                                      }
                                    }}
                                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-tight cursor-pointer transition ${
                                      currentStatus === 'soldé' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20' 
                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                                    }`}
                                    title="Cliquez pour permuter le statut du versement"
                                  >
                                    <span className="block font-mono uppercase text-[9px] mb-0.5">{currentStatus === 'soldé' ? '✅ Soldé' : '❌ Non Soldé'}</span>
                                    <span className="block text-[8px] opacity-75">{tr.amount.toLocaleString()} F • Éch: {tr.dueDate}</span>
                                  </button>
                                </td>
                              );
                            })}

                            {/* Action Relancer de contacter parent */}
                            <td className="py-3.5 px-4 text-right">
                              {hasDebts ? (
                                <button
                                  onClick={() => {
                                    alert(`🔔 RELANCE SCOLARITÉ ENVOYÉE !\n\nParent : ${p.firstName} ${p.lastName}\nTéléphone : ${p.phone}\nE-Mail : ${p.email}\n\nMessage de relance envoyé :\n"Cher parent, nous constatons que certaines tranches de scolarité de votre enfant ${s.firstName} ${s.lastName} (${s.class}) restent en attente de régularisation. Merci de procéder au versement dès que possible. Cordialement, le Secrétariat OTO School."`);
                                  }}
                                  className="bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/35 text-yellow-500 hover:text-yellow-400 px-3 py-1.5 rounded-lg font-bold text-2xs transition cursor-pointer flex items-center justify-center gap-1.5 ml-auto"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Contacter le parent</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded inline-block">
                                  ✓ Compte en règle
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'enrollment' && (currentRole === 'admin' || currentRole === 'secretary') && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">
                  {currentRole === 'secretary' ? "Inscription des Élèves" : "Enregistrement du Personnel & Staff"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {currentRole === 'secretary' 
                    ? "Dossier d'inscription physique, classes, et création automatique des accès parents" 
                    : "Créez des accès sécurisés pour les enseignants, secrétaires, superviseurs et administrateurs de l'école"}
                </p>
              </div>

              {/* RENDER SEGMENT 1: STUDENT ENROLLMENT (SECRETARY ONLY) */}
              {currentRole === 'secretary' && (
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-6">
                  <h4 className="font-bold text-white text-sm mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <UserPlus className="w-5 h-5 text-blue-400" />
                    <span>Nouveau Dossier d'Inscription Physique</span>
                  </h4>
                  
                  <form onSubmit={handleEnrollStudent} className="space-y-6">
                  {/* SECTION 1: INFOS ELEVE */}
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">1. Informations de l'Élève</h5>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-2xs text-slate-350 font-semibold">Prénom de l'Élève *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Koffi"
                          value={newStudent.firstName}
                          onChange={e => setNewStudent({...newStudent, firstName: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Nom de l'Élève *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Kouassi"
                          value={newStudent.lastName}
                          onChange={e => setNewStudent({...newStudent, lastName: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Sexe *</label>
                        <select
                          value={newStudent.gender}
                          onChange={e => setNewStudent({...newStudent, gender: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none focus:border-blue-500"
                        >
                          <option value="Masculin">Masculin</option>
                          <option value="Féminin">Féminin</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">NPI (Numéro Personnel d'Identification) *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: NPI-2026-991A"
                          value={newStudent.npi}
                          onChange={e => setNewStudent({...newStudent, npi: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Date de Naissance *</label>
                        <input 
                          type="date" 
                          required
                          value={newStudent.birthDate}
                          onChange={e => setNewStudent({...newStudent, birthDate: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Lieu de Naissance *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Abidjan Cocody"
                          value={newStudent.birthPlace}
                          onChange={e => setNewStudent({...newStudent, birthPlace: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                        <label className="text-2xs text-slate-355 font-semibold">Quartier de Résidence *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Riviera Palmeraie, Rue de la Paix"
                          value={newStudent.neighborhood}
                          onChange={e => setNewStudent({...newStudent, neighborhood: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: INFOS PARENT / TUTEUR */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Informations du Parent / Tuteur Légal</h5>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Nom et prénom du Parent/Tuteur *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Kouassi Michel"
                          value={newStudent.parentName}
                          onChange={e => setNewStudent({...newStudent, parentName: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Contacts Téléphoniques *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: +225 07 44 55 66 11"
                          value={newStudent.parentPhone}
                          onChange={e => setNewStudent({...newStudent, parentPhone: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Email de Contact (Accès Portail) *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="Ex: michel.kouassi@gmail.com"
                          value={newStudent.parentEmail}
                          onChange={e => setNewStudent({...newStudent, parentEmail: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-2xs text-slate-355 font-semibold">Profession *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Ingénieur Télécom"
                          value={newStudent.parentProfession}
                          onChange={e => setNewStudent({...newStudent, parentProfession: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: INSCRIPTION ACADEMIQUE */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">3. Affectation Académique</h5>
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-355 font-semibold">Classe d'Affectation *</label>
                      <select
                        value={newStudent.class}
                        onChange={e => setNewStudent({...newStudent, class: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none focus:border-blue-500"
                      >
                        {classesList.map(item => (
                          <option key={item.id} value={item.name}>{item.name} (Scolarité : {item.tuitionFee.toLocaleString()} F CFA)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 mt-6"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Inscrire l'élève physique & valider le dossier parent</span>
                  </button>
                </form>
              </div>
              )}

              {/* RENDER SEGMENT 2: STAFF ENROLLMENT (ADMIN ONLY) */}
              {currentRole === 'admin' && (
                <div id="staff-enrollment-form-container" className="bg-[#1b2542] border border-slate-800 rounded-2xl p-6 animate-fade-in w-full">
                  <h4 className="font-bold text-white text-sm mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <UserPlus className="w-5 h-5 text-blue-400" />
                    <span>Enregistrer un Nouveau Collaborateur (Administration / Enseignant)</span>
                  </h4>

                  <form onSubmit={handleAddStaff} className="grid sm:grid-cols-4 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Nom Complet"
                      value={newStaff.name}
                      onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                      className="bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 sm:col-span-1"
                    />
                    <select
                      value={newStaff.role}
                      onChange={e => {
                        const val = e.target.value;
                        setNewStaff({...newStaff, role: val});
                      }}
                      className="bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none focus:border-blue-500 sm:col-span-1"
                    >
                      <option value="Enseignant">Enseignant / Professeur</option>
                      <option value="Secrétaire">Secrétaire</option>
                      <option value="Superviseur">Superviseur de Scolarité</option>
                      <option value="Autre">Autre Membre (Accès sur-Mesure)</option>
                    </select>
                    <input 
                      type="tel" 
                      required
                      placeholder="Téléphone"
                      value={newStaff.phone}
                      onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                      className="bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 sm:col-span-1"
                    />
                    <input 
                      type="email" 
                      required
                      placeholder="Adresse Email"
                      value={newStaff.email}
                      onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                      className="bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 sm:col-span-1"
                    />

                    {/* Superviseur Role Specific view */}
                    {newStaff.role === 'Superviseur' && (
                      <div className="col-span-full bg-[#141b30] p-4 rounded-xl border border-slate-800 space-y-2">
                        <label className="text-2xs text-blue-400 font-bold uppercase tracking-wider block">Spécifier le Type de Superviseur :</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <label className="flex items-center gap-2.5 text-xs cursor-pointer text-slate-300">
                            <input 
                              type="radio" 
                              name="supervisorType" 
                              checked={supervisorTypeInput === 'Censeur'} 
                              onChange={() => setSupervisorTypeInput('Censeur')} 
                              className="w-4 h-4 accent-blue-500"
                            />
                            <span>Censeur (Validation des classes, tranches, évaluations)</span>
                          </label>
                          <label className="flex items-center gap-2.5 text-xs cursor-pointer text-slate-300">
                            <input 
                              type="radio" 
                              name="supervisorType" 
                              checked={supervisorTypeInput === 'Surveillant'} 
                              onChange={() => setSupervisorTypeInput('Surveillant')} 
                              className="w-4 h-4 accent-blue-500"
                            />
                            <span>Surveillant Général (Vie scolaire, gestion des absences & tuteurs)</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Professeur Role Specific view */}
                    {newStaff.role === 'Enseignant' && (
                      <div className="col-span-full bg-[#141b30] p-4 rounded-xl border border-slate-800 space-y-1.5 font-sans">
                        <label className="text-2xs text-blue-400 font-bold uppercase block">Matières Enseignées par ce Professeur :</label>
                        <input 
                          type="text"
                          placeholder="Ex: Mathématiques, Physique-Chimie, Science (séparées par des virgules)"
                          value={teacherSubjectsInput}
                          onChange={e => setTeacherSubjectsInput(e.target.value)}
                          className="w-full bg-[#1b2542] border border-slate-750 px-3 py-2.5 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    {/* Autre Membre Role Specific dynamic permissions view */}
                    {newStaff.role === 'Autre' && (
                      <div className="col-span-full bg-[#141b30] p-4 rounded-xl border border-slate-800 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-2xs text-blue-400 font-bold uppercase block">Nom du Rôle Personnalisé :</label>
                          <input 
                            type="text"
                            required
                            placeholder="Ex: Conseiller d'Éducation, Infirmier Scolaire, Inspecteur"
                            value={customRoleName}
                            onChange={e => setCustomRoleName(e.target.value)}
                            className="w-full bg-[#1b2542] border border-slate-750 px-3 py-2.5 text-xs rounded-lg text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-2xs text-blue-400 font-bold uppercase block">Définir les accès aux fonctionnalités (Accès au Dashboard) :</label>
                          <p className="text-3xs text-slate-500 pb-1">Lorsqu'il se connectera, ces fonctionnalités lui seront exclusives s'il y a conflit de rôles.</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              { id: 'personnel', label: 'Gestion Personnel' },
                              { id: 'enrollment', label: 'Inscription Élève' },
                              { id: 'accounting', label: 'Comptabilité Scolaire' },
                              { id: 'scolarite', label: 'Suivi Scolarité Finances' },
                              { id: 'absences', label: 'Gestion Absences' },
                              { id: 'salles', label: 'Gestion Salles (Pièces)' },
                              { id: 'classes', label: 'Gestion Classes' },
                              { id: 'schedule', label: 'Emploi du temps' },
                              { id: 'grades-entry', label: 'Saisie des Notes' },
                              { id: 'materials', label: 'Bibliothèque d\'Épreuves' },
                              { id: 'comms', label: 'Annonces & Comm' },
                            ].map(t => {
                              const isPresent = customSelectedTabs.includes(t.id);
                              return (
                                <label key={t.id} className="flex items-center gap-2 bg-[#1b2542] hover:bg-slate-800 border border-slate-700/50 p-2 rounded-lg text-2xs cursor-pointer select-none transition">
                                  <input 
                                    type="checkbox"
                                    checked={isPresent}
                                    onChange={() => {
                                      if (isPresent) {
                                        setCustomSelectedTabs(customSelectedTabs.filter(x => x !== t.id));
                                      } else {
                                        setCustomSelectedTabs([...customSelectedTabs, t.id]);
                                      }
                                    }}
                                    className="w-4 h-4 accent-emerald-500"
                                  />
                                  <span className={isPresent ? "text-emerald-400 font-bold" : "text-slate-300"}>{t.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="col-span-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md mt-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Inscrire le collaborateur et configurer ses habilitations</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'grades-entry' && currentRole === 'teacher' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Saisie Centralisée des Évaluations</h3>
                  <p className="text-xs text-slate-400 mt-1">Saisissez les notes de vos classes de manière guidée et intuitive, étape par étape.</p>
                </div>
                {gradeEntryStep !== 'idle' && (
                  <button
                    type="button"
                    onClick={() => {
                      setGradeEntryStep('idle');
                      setStudentGrades({});
                      setEvalLabel('');
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 hover:text-white-85 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 self-start transition-all"
                  >
                    Annuler la saisie en cours
                  </button>
                )}
              </div>

              <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-6 space-y-6">
                {/* Step 0: Choose class room */}
                <div className="grid md:grid-cols-3 gap-4 items-center border-b border-slate-800/60 pb-5">
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block font-mono">Configuration Initiale</span>
                    <h4 className="text-sm font-extrabold text-white mt-0.5">Dans quelle salle de classe effectuez-vous l'évaluation ?</h4>
                  </div>
                  <div>
                    <select
                      value={gradeEntryRoomId}
                      disabled={gradeEntryStep !== 'idle'}
                      onChange={e => {
                        setGradeEntryRoomId(e.target.value);
                        setStudentGrades({});
                        setGradeEntryStep('idle');
                      }}
                      className="w-full bg-[#242f53] border border-slate-750 font-bold px-3 py-2.5 text-xs rounded-xl text-slate-100 outline-none focus:border-blue-500 disabled:opacity-50"
                    >
                      <option value="">-- Sélectionnez une Classe --</option>
                      {roomsList.map(r => (
                        <option key={r.id} value={r.id}>{r.name} (Élèves rattachés)</option>
                      ))}
                    </select>
                  </div>
                </div>

                {(() => {
                  const activeRoom = roomsList.find(r => r.id === gradeEntryRoomId);
                  if (!activeRoom) {
                    return (
                      <div className="text-center py-12 bg-slate-900/20 border border-dashed border-slate-805 rounded-2xl">
                        <Users className="w-8 h-8 text-slate-600 mx-auto opacity-50" />
                        <h5 className="text-slate-400 text-xs font-bold mt-3">Choix de la classe requis</h5>
                        <p className="text-3xs text-slate-500 mt-1">Sélectionnez d'abord une de vos classes dans le menu déroulant ci-dessus pour démarrer.</p>
                      </div>
                    );
                  }

                  // Find the class representation
                  const matchedClass = classesList.find(c => c.name === activeRoom.name);
                  const evaluationMethods = matchedClass?.evaluationMethods || ['Note de Participation', 'Interrogation de cours', 'Devoir Surveillé 1', 'Devoir Surveillé 2', 'Examen de Fin de Trimestre'];

                  // Room students
                  const roomStudents = activeStudents.filter(pair => pair.student.class === activeRoom.name);

                  // Teacher subjects
                  const connectedTeacherObj = registeredTeachers.find(t => {
                    const fname = t.firstName ? t.firstName.toLowerCase() : '';
                    const lname = t.lastName ? t.lastName.toLowerCase() : '';
                    const nameAttr = t.name ? t.name.toLowerCase() : '';
                    return fname.includes('sarah') || lname.includes('gbagbo') || fname.includes('prof') || nameAttr.includes('prof');
                  });
                  let teacherSubjects: string[] = ['Mathématiques'];
                  if (connectedTeacherObj) {
                    if (connectedTeacherObj.subjects && connectedTeacherObj.subjects.length > 0) {
                      teacherSubjects = connectedTeacherObj.subjects;
                    } else if ((connectedTeacherObj as any).subject) {
                      teacherSubjects = [(connectedTeacherObj as any).subject];
                    }
                  }

                  // 1. IDLE/START WIZARD VIEW
                  if (gradeEntryStep === 'idle') {
                    return (
                      <div className="text-center py-10 space-y-4 bg-slate-950/20 rounded-2xl p-6 border border-slate-800">
                        <div className="mx-auto bg-blue-500/10 h-12 w-12 rounded-full flex items-center justify-center border border-blue-500/20">
                          <PlusCircle className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="max-w-md mx-auto">
                          <h4 className="text-sm font-extrabold text-white">Prêt pour une nouvelle saisie ?</h4>
                          <p className="text-3xs text-slate-405 mt-1">Inscrivez une nouvelle note pour la classe <strong className="text-slate-300">{activeRoom.name}</strong> en suivant le guide de validation.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setGradeEntryStep('select-label');
                            setEvalLabel(evaluationMethods[0]);
                          }}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Saisir une nouvelle évaluation</span>
                        </button>
                      </div>
                    );
                  }

                  // 2. STEP 1: SELECT EVALUATION LABEL
                  if (gradeEntryStep === 'select-label') {
                    return (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3">
                          <span className="bg-yellow-500 text-[#0f172a] h-6 w-6 rounded-full font-mono font-black text-xs flex items-center justify-center">1</span>
                          <div>
                            <h5 className="text-sm font-extrabold text-white">Sélectionner la Méthode d'Évaluation</h5>
                            <p className="text-3xs text-slate-400">Quel est le libellé officiel associé à cette note ?</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {evaluationMethods.map((m, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setEvalLabel(m)}
                              className={`p-4 rounded-xl text-left border text-xs font-bold transition-all relative overflow-hidden ${
                                evalLabel === m 
                                  ? 'bg-blue-650/15 border-blue-500 text-white shadow-lg' 
                                  : 'bg-slate-900/40 border-slate-800 text-slate-350 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <span className="block font-mono tracking-wider uppercase text-[9px] text-slate-500 mb-1">Méthode {idx + 1}</span>
                              <span className="text-xs font-bold">{m}</span>
                              {evalLabel === m && (
                                <span className="absolute top-1.5 right-1.5 bg-blue-500 h-2 w-2 rounded-full" />
                              )}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setEvalLabel('Autre Évaluation')}
                            className={`p-4 rounded-xl text-left border text-xs font-bold transition-all relative ${
                              !evaluationMethods.includes(evalLabel) && evalLabel !== ''
                                ? 'bg-blue-650/15 border-blue-500 text-white shadow-lg' 
                                : 'bg-slate-900/40 border-slate-800 text-slate-350 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <span className="block font-mono tracking-wider uppercase text-[9px] text-slate-500 mb-1">Personnalisé</span>
                            <span className="text-xs font-bold">Libellé libre ou Devoir Spécial</span>
                          </button>
                        </div>

                        {!evaluationMethods.includes(evalLabel) && evalLabel !== '' && (
                          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5 animate-fade-in max-w-md">
                            <label className="text-3xs text-blue-400 uppercase font-bold tracking-wider">Spécifier le nom de l'évaluation :</label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Interro surprise de géométrie..."
                              value={evalLabel === 'Autre Évaluation' ? '' : evalLabel}
                              onChange={e => setEvalLabel(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-700 px-3 py-2 text-xs rounded-lg text-white"
                            />
                          </div>
                        )}

                        <div className="flex justify-end pt-4 border-t border-slate-800/40">
                          <button
                            type="button"
                            onClick={() => {
                              // Determine if teacher teaches multiple subjects
                              if (teacherSubjects.length > 1) {
                                setGradeEntryStep('select-subject');
                                setSelectedSubject(teacherSubjects[0]);
                              } else {
                                // Auto transition with single subject
                                setSelectedSubject(teacherSubjects[0] || 'Matière unique');
                                setGradeEntryStep('enter-grades');
                              }
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <span>Continuer</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // 3. STEP 2: SELECT SUBJECT (ONLY FOR TEACHERS DISPENSING > 1 MATH)
                  if (gradeEntryStep === 'select-subject') {
                    return (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-3">
                          <span className="bg-yellow-500 text-[#0f172a] h-6 w-6 rounded-full font-mono font-black text-xs flex items-center justify-center">2</span>
                          <div>
                            <h5 className="text-sm font-extrabold text-white">Sélectionner la Matière Enseignée</h5>
                            <p className="text-3xs text-slate-400">Puisque vous enseignez plusieurs matières scolaires dans l'établissement, précisez celle évaluée :</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {teacherSubjects.map((sub, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedSubject(sub)}
                              className={`p-4 rounded-xl text-left border text-xs font-bold transition-all relative ${
                                selectedSubject === sub 
                                  ? 'bg-blue-650/15 border-blue-500 text-white shadow-lg' 
                                  : 'bg-slate-900/40 border-slate-800 text-slate-350 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <span className="block font-mono tracking-wider uppercase text-[9px] text-slate-500 mb-0.5">Enseignement</span>
                              <span className="text-xs font-bold">{sub}</span>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between pt-4 border-t border-slate-800/40">
                          <button
                            type="button"
                            onClick={() => setGradeEntryStep('select-label')}
                            className="px-3.5 py-1.5 border border-slate-800 text-slate-400 font-bold text-xs rounded-lg hover:text-white transition-all cursor-pointer"
                          >
                            Retour
                          </button>
                          <button
                            type="button"
                            onClick={() => setGradeEntryStep('enter-grades')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <span>Passer à la saisie de notes</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // 4. STEP 3: RECORD GRADES FOR THE ENTIRE CLASS ROSTER
                  if (gradeEntryStep === 'enter-grades') {
                    return (
                      <div className="space-y-6 animate-fade-in">
                        <div className="bg-slate-900/60 p-4 rounded-xl flex items-center justify-between border border-slate-800">
                          <div className="flex items-center gap-3">
                            <span className="bg-emerald-500 text-white h-6 w-6 rounded-full font-mono font-black text-xs flex items-center justify-center">✓</span>
                            <div>
                              <p className="text-3xs text-slate-400 uppercase font-mono tracking-widest">Résumé de la configuration d'évaluation</p>
                              <h5 className="text-xs font-bold text-white mt-0.5">{evalLabel} • {selectedSubject}</h5>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (teacherSubjects.length > 1) {
                                setGradeEntryStep('select-subject');
                              } else {
                                setGradeEntryStep('select-label');
                              }
                            }}
                            className="text-3xs font-extrabold text-blue-400 hover:text-blue-300"
                          >
                            Modifier les paramètres d'épreuve
                          </button>
                        </div>

                        <div className="bg-[#121931] border border-slate-800 rounded-2xl overflow-hidden">
                          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h6 className="font-extrabold text-[#3b82f6] text-xs font-mono uppercase">Roster de la salle • {activeRoom.name}</h6>
                              <p className="text-3xs text-slate-500 mt-0.5">Saisissez une note comprise entre 0 et 20 pour chaque élève ci-dessous :</p>
                            </div>
                            <span className="bg-blue-950 font-mono text-[9px] font-bold text-blue-405 border border-blue-900/40 px-2.5 py-0.5 rounded uppercase">
                              {roomStudents.length} Élève(s) physiquement inscrit(s)
                            </span>
                          </div>

                          {roomStudents.length === 0 ? (
                            <p className="text-center py-10 text-slate-500 text-xs font-bold">Aucun élève trouvé dans la classe {activeRoom.name} pour le moment.</p>
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                
                                // Submit updates back to simulated backend storage
                                const updatedParents = registeredParents.map(parent => {
                                  const updatedChildren = parent.children.map(child => {
                                    const matchingScore = studentGrades[child.id];
                                    if (matchingScore !== undefined && matchingScore !== "") {
                                      const scoreNum = parseFloat(matchingScore);
                                      if (scoreNum >= 0 && scoreNum <= 20) {
                                        return {
                                          ...child,
                                          notes: [
                                            ...child.notes,
                                            {
                                              subject: selectedSubject,
                                              score: scoreNum,
                                              date: new Date().toISOString().split('T')[0],
                                              evaluationLabel: evalLabel
                                            }
                                          ]
                                        };
                                      }
                                    }
                                    return child;
                                  });
                                  return { ...parent, children: updatedChildren };
                                });

                                onUpdateParents(updatedParents);
                                alert(`Félicitations Professeur !\n\nLes notes de l'épreuve "${evalLabel}" de "${selectedSubject}" pour la classe ${activeRoom.name} ont été validées et sauvegardées avec succès.`);
                                setStudentGrades({});
                                setGradeEntryStep('idle');
                              }}
                              className="p-4 space-y-4"
                            >
                              <div className="divide-y divide-slate-850 max-h-[350px] overflow-y-auto pr-1">
                                {roomStudents.map((pair, idx) => {
                                  const child = pair.student;
                                  return (
                                    <div key={child.id} className="flex items-center justify-between py-3.5 px-3 hover:bg-slate-800/10 transition rounded gap-4">
                                      <div className="space-y-0.5">
                                        <div className="text-xs font-bold text-slate-100">{idx + 1}. {child.lastName} {child.firstName}</div>
                                        <div className="text-3xs text-slate-500 font-mono">NPI : {child.npi} • Tuteur : {pair.parent.firstName} {pair.parent.lastName}</div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="number"
                                          step="0.25"
                                          min="0"
                                          max="20"
                                          required
                                          placeholder="Note / 20"
                                          value={studentGrades[child.id] || ""}
                                          onChange={e => {
                                            setStudentGrades({
                                              ...studentGrades,
                                              [child.id]: e.target.value
                                            });
                                          }}
                                          className="w-24 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-center font-mono font-black text-xs text-white outline-none focus:border-emerald-500"
                                        />
                                        <span className="text-3xs text-slate-500 font-bold uppercase">/ 20</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex justify-between pt-4 border-t border-slate-800/40">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (teacherSubjects.length > 1) {
                                      setGradeEntryStep('select-subject');
                                    } else {
                                      setGradeEntryStep('select-label');
                                    }
                                  }}
                                  className="px-3.5 py-1.5 border border-slate-800 text-slate-400 font-bold text-xs rounded-lg hover:text-white transition-all cursor-pointer"
                                >
                                  Retour
                                </button>
                                <button
                                  type="submit"
                                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-555 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer transition-all hover:scale-[1.01]"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Valider et Enregistrer toutes les notes scolaires de la classe</span>
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          )}

          {/* TAB 6: MATERIALS & DIGITAL LIBRARY */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">🗂️ Bibliothèque d'Épreuves Numériques</h3>
                <p className="text-xs text-slate-400 mt-1">Partage et consultation des devoirs, compositions et sujets types d'examens (fichiers PDF originaux ou photos des sujets rédigés)</p>
              </div>

              {/* Teacher-only publishing block with PDF or Photo toggle */}
              {currentRole === 'teacher' && (
                <div className="bg-[#1b2542] border border-[#2563eb]/20 shadow-blue-500/5 shadow-md rounded-2xl p-6 space-y-5">
                  <div>
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                      <Upload className="w-5 h-5 text-blue-400" />
                      <span>Publier un nouveau sujet d'épreuve</span>
                    </h4>
                    <p className="text-3xs text-slate-400 mt-0.5">Veuillez renseigner le titre du devoir et joindre au choix un document PDF ou une photo nette du sujet.</p>
                  </div>

                  <form 
                    onSubmit={handleUploadMaterial}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      {/* Title */}
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 font-bold block">Titre du sujet d'examen *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Devoir de Mathématiques N°2"
                          value={newMaterial.title}
                          onChange={e => setNewMaterial({...newMaterial, title: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-white placeholder-slate-550 outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 font-bold block">Discipline / Matière *</label>
                        <select
                          value={newMaterial.subject}
                          onChange={e => setNewMaterial({...newMaterial, subject: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-200 outline-none focus:border-blue-500"
                        >
                          <option value="Mathématiques">Mathématiques</option>
                          <option value="Français">Français</option>
                          <option value="Physique-Chimie">Physique-Chimie</option>
                          <option value="SVT">SVT</option>
                          <option value="Anglais">Anglais</option>
                          <option value="Histoire-Géo">Histoire-Géo</option>
                        </select>
                      </div>

                      {/* Class name */}
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 font-bold block">Classe concernée *</label>
                        <select
                          value={newMaterial.className}
                          onChange={e => setNewMaterial({...newMaterial, className: e.target.value})}
                          className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-200 outline-none"
                        >
                          <option value="3ème A">3ème A (Troisième)</option>
                          <option value="6ème C">6ème C (Sixième)</option>
                          <option value="Terminale D">Terminale D (Terminal)</option>
                        </select>
                      </div>
                    </div>

                    {/* SELECT ATTACHMENT TYPE TOGGLE */}
                    <div className="space-y-2">
                      <label className="text-3xs text-slate-400 font-bold block">Sélectionnez le format d'envoi *</label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setNewMaterial(prev => ({ ...prev, fileType: 'pdf', imageUrl: '', fileUrl: '', fileName: '' }))}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                            newMaterial.fileType === 'pdf' 
                              ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' 
                              : 'bg-slate-900/60 text-slate-400 border-slate-800'
                          }`}
                        >
                          <span>📄 Fichier PDF (.pdf)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewMaterial(prev => ({ ...prev, fileType: 'image', imageUrl: '', fileUrl: '', fileName: '' }))}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                            newMaterial.fileType === 'image' 
                              ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' 
                              : 'bg-slate-900/60 text-slate-400 border-slate-800'
                          }`}
                        >
                          <span>📸 Photo / Image du sujet</span>
                        </button>
                      </div>
                    </div>

                    {/* DYNAMIC ATTACHMENT INPUT FIELDS */}
                    <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-xl space-y-4">
                      {newMaterial.fileType === 'pdf' ? (
                        <div className="space-y-3">
                          <span className="text-3xs font-black text-amber-400 uppercase tracking-widest block font-mono">⚡ Pièce jointe : Document PDF de l'épreuve</span>
                          <div className="grid sm:grid-cols-2 gap-4 items-center">
                            <div className="space-y-2 text-left">
                              <p className="text-[11px] text-slate-350">Sélectionnez le document PDF sur votre appareil :</p>
                              <input 
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setNewMaterial(prev => ({ 
                                      ...prev, 
                                      fileName: file.name,
                                      fileUrl: 'dummy-pdf-reader-attachment'
                                    }));
                                  }
                                }}
                                className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#242f53] file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                              />

                              <p className="text-[10px] text-slate-500">Ou chargez un exemple type de sujet d'examen :</p>
                              <button
                                type="button"
                                onClick={() => setNewMaterial(prev => ({ ...prev, fileName: 'Epreuve_Synthese_Officielle.pdf', fileUrl: 'verified-mock-pdf-url' }))}
                                className="text-3xs bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition font-bold"
                              >
                                📄 Utiliser epreuve_type.pdf
                              </button>
                            </div>

                            {/* View selected file state */}
                            <div className="flex flex-col items-center justify-center p-3 border border-dashed border-slate-755 rounded-lg min-h-[110px] bg-slate-950/40">
                              {newMaterial.fileName ? (
                                <div className="text-center space-y-1">
                                  <span className="text-3xl">📕</span>
                                  <p className="text-xs font-bold text-emerald-400 max-w-[200px] truncate">{newMaterial.fileName}</p>
                                  <p className="text-[9px] text-slate-500 font-mono">Prêt à publier au format PDF</p>
                                  <button
                                    type="button"
                                    onClick={() => setNewMaterial(prev => ({ ...prev, fileName: '', fileUrl: '' }))}
                                    className="text-[9px] text-rose-400 hover:text-rose-300 font-bold uppercase mt-1 block cursor-pointer"
                                  >
                                    ✕ Retirer
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center text-slate-550">
                                  <span className="text-xl">📭</span>
                                  <p className="text-[10px] font-bold">Aucun fichier PDF rattaché</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <span className="text-3xs font-black text-blue-400 uppercase tracking-widest block font-mono">⚡ Pièce jointe : Photo d'épreuve</span>
                          <div className="grid sm:grid-cols-2 gap-4 items-center">
                            <div className="space-y-2">
                              <p className="text-[11px] text-slate-350">Prendre ou sélectionner une photo depuis votre appareil :</p>
                              <input 
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setNewMaterial(prev => ({ ...prev, imageUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#242f53] file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                              />

                              <p className="text-[10px] text-slate-550">Ou utilisez un modèle d'épreuve rédigée d'un clic :</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {[
                                  { name: 'Sujet Mathématiques', url: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&q=80&w=400' },
                                  { name: 'Sujet Physiques', url: 'https://images.unsplash.com/photo-1636466483774-4d16e0b519ed?auto=format&fit=crop&q=80&w=400' },
                                  { name: 'Sujet SVT Sciences', url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=400' }
                                ].map((sample, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => setNewMaterial(prev => ({ ...prev, imageUrl: sample.url }))}
                                    className={`text-[9px] font-bold px-2 py-1 rounded transition border ${
                                      newMaterial.imageUrl === sample.url 
                                        ? 'bg-blue-600 text-white border-blue-500' 
                                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                                    }`}
                                  >
                                    {sample.name}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Rendering photo preview */}
                            <div className="flex flex-col items-center justify-center p-3 border border-dashed border-slate-755 rounded-lg min-h-[120px] bg-slate-950/40">
                              {newMaterial.imageUrl ? (
                                <div className="relative group w-full flex flex-col items-center">
                                  <img 
                                    src={newMaterial.imageUrl} 
                                    alt="Pré-sélection" 
                                    referrerPolicy="no-referrer"
                                    className="h-20 w-auto object-contain rounded border border-slate-700 shadow"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setNewMaterial(prev => ({ ...prev, imageUrl: '' }))}
                                    className="mt-1.5 text-3xs font-bold text-rose-400 hover:text-rose-300 uppercase cursor-pointer"
                                  >
                                    ✕ Retirer photo
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center text-slate-550 space-y-1">
                                  <span className="block text-xl">📸</span>
                                  <p className="text-[10px] font-bold">Aucune image rattachée</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={(newMaterial.fileType === 'pdf' && !newMaterial.fileName) || (newMaterial.fileType === 'image' && !newMaterial.imageUrl) || !newMaterial.title}
                      className={`w-full text-xs font-black py-4 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow ${
                        ((newMaterial.fileType === 'pdf' && newMaterial.fileName) || (newMaterial.fileType === 'image' && newMaterial.imageUrl)) && newMaterial.title
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/15'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publier officiellement l'épreuve d'examen</span>
                    </button>
                  </form>
                </div>
              )}

              {/* SEARCH & FILTRATION AND VIEW LIST FOR EVERYONE */}
              <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-6 space-y-6">
                
                {/* Search query state controllers */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-4">
                  <div>
                    <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                      <BookMarked className="w-5 h-5 text-yellow-400" />
                      <span>Catalogue & Consultation des Épreuves Scolaires ({registeredMaterials.length} devoirs enregistrés)</span>
                    </h4>
                    <p className="text-2xs text-slate-400 mt-0.5">Saisissez des keywords ou sélectionnez des disciplines pour rechercher des devoirs de classe</p>
                  </div>
                </div>

                {/* Filter forms */}
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-3xs text-slate-450 uppercase font-bold block font-mono">Rechercher par mot</label>
                    <input 
                      type="text"
                      placeholder="Ex: Devoir de Math..."
                      value={materialsSearch}
                      onChange={e => setMaterialsSearch(e.target.value)}
                      className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-1.5 text-xs rounded-lg text-white font-medium"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-3xs text-slate-450 uppercase font-bold block font-mono">Discipline / Matière</label>
                    <select
                      value={materialsSubjectFilter}
                      onChange={e => setMaterialsSubjectFilter(e.target.value)}
                      className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-1.5 text-xs rounded-lg text-slate-200 outline-none"
                    >
                      <option value="All">--- Toutes les Matières ---</option>
                      <option value="Mathématiques">Mathématiques</option>
                      <option value="Français">Français</option>
                      <option value="Physique-Chimie">Physique-Chimie</option>
                      <option value="SVT">SVT</option>
                      <option value="Anglais">Anglais</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs text-slate-450 uppercase font-bold block font-mono">Classe / Niveau Éducatif</label>
                    <select
                      value={materialsClassFilter}
                      onChange={e => setMaterialsClassFilter(e.target.value)}
                      className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-1.5 text-xs rounded-lg text-slate-200 outline-none"
                    >
                      <option value="All">--- Tous les Niveaux ---</option>
                      <option value="6ème C">6ème C</option>
                      <option value="3ème A">3ème A</option>
                      <option value="Terminale D">Terminale D</option>
                    </select>
                  </div>
                </div>

                {/* Grid layout of active elements filtered in list */}
                {(() => {
                  const filtered = registeredMaterials.filter(mat => {
                    const matchesSearch = mat.title.toLowerCase().includes(materialsSearch.toLowerCase()) || 
                                          mat.subject.toLowerCase().includes(materialsSearch.toLowerCase()) || 
                                          mat.className.toLowerCase().includes(materialsSearch.toLowerCase());
                    
                    const matchesSubject = materialsSubjectFilter === 'All' || mat.subject === materialsSubjectFilter;
                    const matchesClass = materialsClassFilter === 'All' || mat.className === materialsClassFilter;
                    
                    return matchesSearch && matchesSubject && matchesClass;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xl">🗂️</span>
                        <p className="text-slate-400 text-xs font-bold">Aucune épreuve de composition ne correspond à vos filtres de recherche.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filtered.map((mat) => {
                        const isPDF = mat.fileType === 'pdf';
                        const defaultImg = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400';
                        const examImg = mat.imageUrl || defaultImg;

                        return (
                          <div 
                            key={mat.id} 
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow duration-300 hover:shadow-blue-500/10 hover:-translate-y-0.5 transition flex flex-col justify-between text-left"
                          >
                            {/* Card Header block (File Image or PDF layout) */}
                            <div className="relative group h-32 w-full overflow-hidden bg-slate-950">
                              {isPDF ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950 border-b border-slate-800">
                                  <span className="text-3xl">📄</span>
                                  <span className="text-[10px] font-black tracking-wider text-rose-450 uppercase font-mono mt-1.5">DOCUMENT PDF</span>
                                  <span className="text-[9px] text-slate-400 truncate w-full text-center mt-1">{mat.title}</span>
                                </div>
                              ) : (
                                <img 
                                  src={examImg} 
                                  alt={mat.title} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                              )}
                              <div className="absolute inset-0 bg-slate-950/40 duration-300 group-hover:bg-slate-950/60 transition" />
                              
                              <button
                                onClick={() => setEnlargedExamMaterial(mat)}
                                className="absolute top-2.5 right-2.5 bg-slate-900/90 hover:bg-blue-600 text-white p-1.5 rounded-lg text-[10px] font-bold font-mono transition shadow select-none flex items-center justify-center gap-1 cursor-pointer"
                                title="Consulter l'épreuve à l'écran"
                              >
                                {isPDF ? '📄 Aperçu PDF' : '🔎 Zoomer'}
                              </button>

                              <span className="absolute bottom-2.5 left-2.5 bg-[#1e1b4b]/80 border border-indigo-500/30 text-indigo-300 text-[9px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                                {mat.subject}
                              </span>
                            </div>

                            {/* Info Block */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                              <div className="space-y-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-bold px-1.5 py-0.1 rounded font-mono uppercase">
                                    Niveau {mat.className}
                                  </span>
                                  <span className="text-3xs text-slate-500 font-bold font-mono uppercase">{isPDF ? 'PDF' : 'IMAGE'} • {mat.fileSize || '1.1 MB'}</span>
                                </div>
                                <h5 className="text-xs font-extrabold text-white line-clamp-2" title={mat.title}>
                                  {mat.title}
                                </h5>
                                <p className="text-3xs text-slate-500 font-mono">Mis en ligne le {mat.dateAdded}</p>
                              </div>

                              <div className="flex gap-2 text-3xs border-t border-slate-850 pt-2.5">
                                <button
                                  onClick={() => setEnlargedExamMaterial(mat)}
                                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold py-1.5 rounded transition font-mono flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  {isPDF ? '✨ Afficher PDF' : '✨ Aperçu Photo'}
                                </button>
                                <button
                                  onClick={() => alert(`Téléchargement de l'exemplaire "${mat.title}" (${mat.fileSize || '1.2 MB'}) en cours...`)}
                                  className="bg-blue-600/10 hover:bg-blue-600 text-blue-450 hover:text-white border border-blue-500/20 px-3 py-1.5 rounded font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                                  title="Télécharger l'épreuve complète"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

              </div>

              {/* DYNAMIC DOCUMENT & PHOTO PREVIEW LIGHTBOX PORTAL OVERLAY */}
              {enlargedExamMaterial && (
                <div 
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                  onClick={() => setEnlargedExamMaterial(null)}
                >
                  <div 
                    className="relative bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
                      <div className="text-left">
                        <span className="bg-blue-900/40 text-blue-300 border border-blue-700/30 text-[9px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider block w-max mb-1">
                          {enlargedExamMaterial.fileType === 'pdf' ? 'Lecteur PDF OTO' : 'Suivi Image Haute Fidélité'}
                        </span>
                        <h4 className="font-extrabold text-white text-xs">{enlargedExamMaterial.title}</h4>
                        <p className="text-3xs text-slate-500 font-mono">Discipline : {enlargedExamMaterial.subject} • Classe : {enlargedExamMaterial.className}</p>
                      </div>
                      <button 
                        onClick={() => setEnlargedExamMaterial(null)}
                        className="bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 font-mono font-bold text-xs p-1.5 rounded-lg border border-slate-750/80 transition cursor-pointer"
                      >
                        ✕ Fermer
                      </button>
                    </div>

                    {/* RENDER EMBEDDED PREVIEW AREA */}
                    <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[350px]">
                      {enlargedExamMaterial.fileType === 'pdf' ? (
                        <div className="w-full max-w-lg bg-white text-slate-900 rounded-xl p-6 shadow-2xl space-y-5 text-left border-4 border-slate-200 select-none">
                          <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                            <div>
                              <p className="text-[10px] font-black text-rose-600 font-mono tracking-widest uppercase">SYLLABUS & COMPOSITION NATIONALE</p>
                              <h4 className="text-sm font-extrabold text-slate-850">OTO School - Ministère d'Éducation de Côte d'Ivoire</h4>
                            </div>
                            <span className="text-3xl text-rose-500">📕</span>
                          </div>
                          
                          <div className="space-y-4 font-serif text-xs leading-relaxed pb-6 text-slate-800">
                            <p className="font-bold text-center underline uppercase tracking-wider text-slate-900">Épreuve de niveau : {enlargedExamMaterial.subject}</p>
                            <p className="text-3xs text-center font-sans font-bold text-slate-500">Classe cible : {enlargedExamMaterial.className} • Coefficient : 4 • Coefficient Spécifique</p>
                            
                            <div className="space-y-1.5 pt-2">
                              <p className="font-extrabold text-slate-900 text-[11px]">SECTION I - THÉOLOGIE ET APPLICATIONS (6 points)</p>
                              <p className="italic text-slate-650">1. Définir de manière concise le programme d'observation théorique lié au sujet {enlargedExamMaterial.subject}.</p>
                              <p className="italic text-slate-650">2. Résoudre les équations de synthèse et dresser l'arbre d'exécution rationnel.</p>
                            </div>
                            
                            <div className="space-y-1.5">
                              <p className="font-extrabold text-slate-900 text-[11px]">SECTION II - ÉTUDES ET DIRECTIVES DE CAS (14 points)</p>
                              <p className="italic text-slate-650">Développement de l'argumentaire théorique appliqué à {enlargedExamMaterial.className}. Formuler les hypothèses, les calculs intermédiaires et les schémas explicatifs.</p>
                            </div>
                          </div>

                          <div className="border-t pt-3 border-slate-100 flex items-center justify-between text-slate-400 text-[9px] font-mono font-bold">
                            <span>Sujet certifié OTO Library ({enlargedExamMaterial.fileSize || '1.4 MB'})</span>
                            <span>Page 1 / 1</span>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={enlargedExamMaterial.imageUrl || 'https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&q=80&w=400'} 
                          alt="Épreuve Photo" 
                          referrerPolicy="no-referrer"
                          className="max-h-[70vh] w-auto object-contain rounded border border-slate-800 shadow shadow-black/80 ring-4 ring-slate-900/40"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: COMMS / ANNOUNCEMENTS FOR EVERYONE */}
          {activeTab === 'comms' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">
                  {currentRole === 'parent' ? 'Messagerie et Bulletins' : 'Portail de Diffusion d\'Annonces'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Communiquez en direct avec la communauté OTO School de votre établissement</p>
              </div>

              {/* Publisher pane (Admin, Secretary, Supervisor) */}
              {(currentRole === 'admin' || currentRole === 'secretary' || currentRole === 'supervisor') && (
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5">
                  <h4 className="font-bold text-white text-sm mb-4">Publier un message / communiqué aux familles</h4>
                  <form onSubmit={handlePublishAnnounce} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        required
                        placeholder="Titre de l'annonce"
                        value={newAnnouncement.title}
                        onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                        className="bg-[#242f53] border border-[#374151] px-3.5 py-2 text-xs rounded-lg text-slate-100"
                      />
                      <select
                        value={newAnnouncement.target}
                        onChange={e => setNewAnnouncement({...newAnnouncement, target: e.target.value})}
                        className="bg-[#242f53] border border-[#374151] px-3.5 py-2 text-xs rounded-lg text-slate-100"
                      >
                        <option value="all">Tout le monde (Enseignants & Parents)</option>
                        <option value="teachers">Enseignants uniquement</option>
                        <option value="parents">Parents d'Élèves uniquement</option>
                      </select>
                    </div>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Corps du communiqué officiel..."
                      value={newAnnouncement.content}
                      onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      className="w-full bg-[#242f53] border border-[#374151] p-3 text-xs rounded-lg text-slate-100 resize-none"
                    ></textarea>
                    
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-6 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Diffuser l'information immédiate</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Display Communiques list */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Parents special Messaging with institution */}
                {currentRole === 'parent' && (
                  <div className="bg-[#1a2139] border border-slate-800 rounded-xl p-5 md:col-span-1 flex flex-col justify-between h-[400px]">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider">Échange d'Assistance</h4>
                      <p className="text-[10px] text-slate-500">Posez vos questions directes aux enseignants ou au secrétariat</p>
                      
                      <div className="space-y-3 h-56 overflow-y-auto pr-1 pt-2">
                        {parentMessages.map((pm) => (
                          <div key={pm.id} className={`p-2 rounded-lg text-2xs space-y-0.5 ${pm.sender === 'Vous' ? 'bg-blue-600/20 text-blue-200 border border-blue-500/10 ml-6 text-right' : 'bg-slate-900 text-slate-300 mr-6'}`}>
                            <p className="text-2xs font-extrabold text-white">{pm.sender}</p>
                            <p>{pm.content}</p>
                            <p className="text-[8px] text-slate-500">{pm.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSendParentMsg} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Votre message..."
                        value={typedParentMsg}
                        onChange={e => setTypedParentMsg(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-2xs text-slate-100"
                      />
                      <button type="submit" className="bg-blue-600 p-2 rounded-lg text-white">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}

                {/* Announcement list for user group */}
                <div className={`bg-[#1b2542] border border-slate-800 rounded-xl p-5 ${currentRole === 'parent' ? 'md:col-span-2' : 'col-span-full'}`}>
                  <h4 className="font-bold text-white text-sm mb-4">Annonces Générales Arbitrées</h4>
                  <div className="space-y-4">
                    {registeredAnnouncements
                      .filter(ann => ann.target === 'all' || (currentRole === 'parent' && ann.target === 'parents') || (currentRole === 'teacher' && ann.target === 'teachers') || (currentRole !== 'parent' && currentRole !== 'teacher'))
                      .map((ann) => (
                        <div key={ann.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded font-semibold">
                              Cible : {ann.target === 'all' ? 'Toutes les Familles' : ann.target === 'parents' ? 'Parents Éducatifs' : 'Enseignants'}
                            </span>
                            <span className="text-[10px] text-slate-500">{ann.date}</span>
                          </div>
                          <h5 className="font-bold text-white text-xs sm:text-sm">{ann.title}</h5>
                          <p className="text-slate-400 text-xs leading-relaxed">{ann.content}</p>
                          <p className="text-[10px] text-slate-500 italic pt-1 text-right">Auteur : {ann.author}</p>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: SUSPENSIONS / EXTRA */}
          {activeTab === 'students' && (currentRole === 'admin' || currentRole === 'secretary' || currentRole === 'supervisor' || currentRole === 'teacher') && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Administration scolaire de Retard & Discipline</h3>
                <p className="text-xs text-slate-400 mt-1">Saisie des retards scolaires ou absences des élèves pour notification immédiate des tuteurs</p>
              </div>

              <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5">
                <h4 className="font-bold text-white text-sm mb-4">Liste d'appel et d'assiduité du jour</h4>
                
                <div className="space-y-3">
                  {activeStudents.map(pair => (
                    <div key={pair.student.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-white">{pair.student.firstName} {pair.student.lastName}</p>
                        <p className="text-2xs text-slate-500">Classe : {pair.student.class} • Parent : {pair.parent.firstName} {pair.parent.lastName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-red-400 font-bold font-mono">{pair.student.absences} h d'absences</p>
                        </div>
                        <button 
                          onClick={() => handleAddAbsence(pair.student.id)}
                          className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 py-1.5 px-3 rounded-lg text-2xs font-semibold cursor-pointer transition"
                        >
                          +1 Heure d'Absence
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MON PROFIL (ADMIN ONLY) */}
          {activeTab === 'profil' && currentRole === 'admin' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Mon Profil d'Administrateur</h3>
                <p className="text-xs text-slate-400 mt-1">Gérez vos données personnelles d'administration OTO School</p>
              </div>

              <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-6">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Profil administratif de l'école mis à jour avec succès !");
                }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-bold uppercase block">Prénom</label>
                      <input 
                        type="text" 
                        required
                        value={adminProfile.firstName}
                        onChange={e => setAdminProfile({...adminProfile, firstName: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-705 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-bold uppercase block">Nom</label>
                      <input 
                        type="text" 
                        required
                        value={adminProfile.lastName}
                        onChange={e => setAdminProfile({...adminProfile, lastName: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-705 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-bold uppercase block">Adresse E-mail de Connexion</label>
                      <input 
                        type="email" 
                        required
                        value={adminProfile.email}
                        onChange={e => setAdminProfile({...adminProfile, email: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-705 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-bold uppercase block">Téléphone Secours</label>
                      <input 
                        type="text" 
                        required
                        value={adminProfile.phone}
                        onChange={e => setAdminProfile({...adminProfile, phone: e.target.value})}
                        className="w-full bg-[#242f53] border border-slate-705 px-3 py-2 text-xs rounded-lg text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-2xs text-slate-400 font-bold uppercase block">Changer le Mot de passe Haché</label>
                    <input 
                      type="password" 
                      required
                      value={adminProfile.password}
                      onChange={e => setAdminProfile({...adminProfile, password: e.target.value})}
                      className="w-full bg-[#242f53] border border-slate-705 px-4 py-2.5 text-xs rounded-lg text-slate-100 outline-none font-mono"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg text-xs cursor-pointer transition shadow-md"
                  >
                    Sauvegarder les modifications du profil
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB: GESTION DES ABSENCES */}
          {activeTab === 'absences' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Gestion Administrative des Absences</h3>
                <p className="text-xs text-slate-400 mt-1">Visualisez les déclarations d'absences, enregistrez de nouveaux retards et alertez les parents directeurs de famille</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Form to log an absence */}
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-1 space-y-4 h-fit">
                  <h4 className="font-bold text-white text-sm">Enregistrer une Nouvelle Absence</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!absStudentLastName || !absStudentFirstName) {
                      alert("Veuillez saisir le nom et le prénom de l'élève.");
                      return;
                    }
                    const newAbsRec: AbsenceRecord = {
                      id: 'abs-' + Date.now(),
                      studentId: 'std-' + Date.now(),
                      studentName: `${absStudentFirstName} ${absStudentLastName}`,
                      className: absStudentClass,
                      date: absDate,
                      hour: absHour,
                      motif: absReason.trim() === '' ? 'na' : absReason
                    };
                    setAbsencesList([newAbsRec, ...absencesList]);
                    
                    // Increment student's absences counter in activeStudents if exists
                    const updatedParents = registeredParents.map(parent => {
                      const updatedChildren = parent.children.map(child => {
                        if (child.lastName.toLowerCase() === absStudentLastName.toLowerCase() && child.firstName.toLowerCase() === absStudentFirstName.toLowerCase()) {
                          return {
                            ...child,
                            absences: child.absences + 1,
                            unjustifiedAbsences: absReason.trim() === '' || absReason.toLowerCase() === 'na' ? child.unjustifiedAbsences + 1 : child.unjustifiedAbsences
                          };
                        }
                        return child;
                      });
                      return { ...parent, children: updatedChildren };
                    });
                    onUpdateParents(updatedParents);

                    setAbsStudentLastName('');
                    setAbsStudentFirstName('');
                    setAbsReason('');
                    alert("Absence enregistrée avec succès !");
                  }} className="space-y-3">
                    
                    {/* Quick selection dropdown to prefill */}
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 block font-semibold">🔍 Pré-Remplir depuis les Élèves Inscrits</label>
                      <select 
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            const found = activeStudents.find(p => p.student.id === val);
                            if (found) {
                              setAbsStudentFirstName(found.student.firstName);
                              setAbsStudentLastName(found.student.lastName);
                              setAbsStudentClass(found.student.class);
                            }
                          }
                        }}
                        className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100"
                      >
                        <option value="">-- Choisir un élève (Optionnel) --</option>
                        {activeStudents.map(p => (
                          <option key={p.student.id} value={p.student.id}>
                            {p.student.lastName} {p.student.firstName} ({p.student.class})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Nom de l'élève *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Kouassi"
                        value={absStudentLastName}
                        onChange={e => setAbsStudentLastName(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Prénom de l'élève *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Koffi"
                        value={absStudentFirstName}
                        onChange={e => setAbsStudentFirstName(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Classe *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Terminale-C"
                        value={absStudentClass}
                        onChange={e => setAbsStudentClass(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Jour de l'absence *</label>
                      <input 
                        type="date" 
                        required
                        value={absDate}
                        onChange={e => setAbsDate(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Heure / Période *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: 08h-10h ou Toute la journée"
                        value={absHour}
                        onChange={e => setAbsHour(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Motif d'absence (Si sans motif, mettez 'na')</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Certificat médical, na..."
                        value={absReason}
                        onChange={e => setAbsReason(e.target.value)}
                        className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Enregistrer l'absence</span>
                    </button>
                  </form>
                </div>

                {/* Absence list display */}
                <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-2">
                  <h4 className="font-bold text-white text-sm mb-4">Registre des Absences de l'Académie</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-700 bg-[#121931]">
                          <th className="py-2.5 px-3">Élève</th>
                          <th className="py-2.5 px-3">Classe</th>
                          <th className="py-2.5 px-3">Date & Heure</th>
                          <th className="py-2.5 px-3">Statut / Motif Semestriel</th>
                          <th className="py-2.5 px-3 text-right">Actions Parents</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/85">
                        {absencesList.map((abs) => {
                          const isNoMotif = !abs.motif || abs.motif.toLowerCase() === 'na' || abs.motif === 'sans motif' || abs.motif.trim() === '';
                          return (
                            <tr key={abs.id} className="hover:bg-slate-800/30">
                              <td className="py-3 px-3 font-semibold text-white">{abs.studentName}</td>
                              <td className="py-3 px-3 text-slate-400 font-mono text-xs">{abs.className}</td>
                              <td className="py-3 px-3 text-slate-400 text-2xs">Le {abs.date} • ({abs.hour})</td>
                              <td className="py-3 px-3">
                                {isNoMotif ? (
                                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                    SANS MOTIF (na)
                                  </span>
                                ) : (
                                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                    Motivé : {abs.motif}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-right">
                                {isNoMotif ? (
                                  <button 
                                    onClick={() => alert(`Alerte OTO School envoyée par SMS au tuteur légal de l'élève "${abs.studentName}".\nContenu : "Votre enfant est déclaré absent sans motif ce jour. Merci de justifier d'urgence."`)}
                                    className="bg-yellow-650/15 hover:bg-yellow-600 text-yellow-400 hover:text-white border border-yellow-500/20 px-2 py-1 rounded text-2xs cursor-pointer transition"
                                  >
                                    📞 Contacter le Parent
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-500 italic">Validé par surveillant</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: GESTION DES CLASSES */}
          {activeTab === 'classes' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Définition & Pilotage des Classes</h3>
                  <p className="text-xs text-slate-400 mt-1">Définissez vos classes, répartissez les tranches financières de scolarité et paramétrez les moyens d'évaluation</p>
                </div>
                {selectedClassId && (
                  <button 
                    onClick={() => setSelectedClassId(null)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer text-slate-350"
                  >
                    ← Retour à l'ensemble des classes
                  </button>
                )}
              </div>

              {!selectedClassId ? (
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Create New Class form */}
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-1 space-y-4 h-fit">
                    <h4 className="font-bold text-white text-sm">Définir une Nouvelle Classe</h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newClassName || !newClassFee) {
                        alert("Veuillez remplir le nom et la scolarité globale.");
                        return;
                      }
                      const globalTuition = parseFloat(newClassFee);
                      const t1 = parseFloat(tranche1Amount) || (globalTuition * 0.5);
                      const t2 = parseFloat(tranche2Amount) || (globalTuition * 0.3);
                      const t3 = parseFloat(tranche3Amount) || (globalTuition - t1 - t2);

                      const addedClass: ClassItem = {
                        id: 'c-' + Date.now(),
                        name: newClassName,
                        tuitionFee: globalTuition,
                        tranches: [
                          { label: 'Tranche 1', amount: t1, dueDate: tranche1Date },
                          { label: 'Tranche 2', amount: t2, dueDate: tranche2Date },
                          { label: 'Tranche 3', amount: t3, dueDate: tranche3Date }
                        ],
                        evaluationMethods: ['Interrogation 1', 'Interrogation 2', 'Devoir 1', 'Devoir 2']
                      };

                      setClassesList([...classesList, addedClass]);
                      setNewClassName('');
                      setNewClassFee('');
                      setTranche1Amount('');
                      setTranche2Amount('');
                      setTranche3Amount('');
                      alert(`La classe "${addedClass.name}" de scolarité ${addedClass.tuitionFee.toLocaleString()} FCFA est créée avec succès !`);
                    }} className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Nom de la Classe *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Terminale"
                          value={newClassName}
                          onChange={e => setNewClassName(e.target.value)}
                          className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Scolarité Annuelle Totale (F CFA) *</label>
                        <input 
                          type="number" 
                          required
                          placeholder="Ex: 400000"
                          value={newClassFee}
                          onChange={e => setNewClassFee(e.target.value)}
                          className="w-full bg-[#242f53] border border-slate-700/80 px-3 py-2 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      <div className="border-t border-slate-800 pt-3 space-y-2">
                        <p className="text-2xs text-blue-400 font-bold uppercase">Échéancier des tranches de paiement :</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Tranche 1 (Montant)</label>
                            <input 
                              type="number" 
                              placeholder="Ex: 250000"
                              value={tranche1Amount}
                              onChange={e => setTranche1Amount(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-707 text-slate-100 text-xs px-2 py-1.5 rounded"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Date butoir</label>
                            <input 
                              type="date" 
                              value={tranche1Date}
                              onChange={e => setTranche1Date(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-707 text-slate-100 text-xs px-2 py-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Tranche 2 (Montant)</label>
                            <input 
                              type="number" 
                              placeholder="Ex: 100000"
                              value={tranche2Amount}
                              onChange={e => setTranche2Amount(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-707 text-slate-100 text-xs px-2 py-1"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Date butoir</label>
                            <input 
                              type="date" 
                              value={tranche2Date}
                              onChange={e => setTranche2Date(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-707 text-slate-100 text-xs px-2 py-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Tranche 3 (Montant)</label>
                            <input 
                              type="number" 
                              placeholder="Ex: 100000"
                              value={tranche3Amount}
                              onChange={e => setTranche3Amount(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-705 text-slate-105 text-xs px-2 py-1"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 block font-mono">Date butoir</label>
                            <input 
                              type="date" 
                              value={tranche3Date}
                              onChange={e => setTranche3Date(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-705 text-slate-105 text-xs px-2 py-1"
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition"
                      >
                        Valider et créer la Classe
                      </button>
                    </form>
                  </div>

                  {/* List of existing classes - overview */}
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-2 space-y-4">
                    <h4 className="font-bold text-white text-sm">Aperçu Académique des Classes configurées</h4>
                    <p className="text-3xs text-slate-400 mt-1">Cliquez sur une classe pour y entrer et visualiser son échéancier financier complet et ses libellés d'évaluation</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {classesList.map((cl) => (
                        <div 
                          key={cl.id}
                          onClick={() => setSelectedClassId(cl.id)}
                          className="p-5 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-blue-500 hover:bg-[#151e39] cursor-pointer transition group"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-extrabold text-white text-base group-hover:text-blue-400 transition">{cl.name}</h5>
                              <p className="text-3xs text-slate-505 font-mono">ID UNIQUE: {cl.id}</p>
                            </div>
                            <span className="bg-blue-600/15 text-blue-400 font-bold border border-blue-500/20 px-2 py-0.5 rounded text-3xs uppercase">
                              Entrer dans la classe →
                            </span>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-800 text-xs flex justify-between text-slate-400">
                            <span>Scolarité</span>
                            <strong className="text-emerald-400 font-mono font-bold">{cl.tuitionFee.toLocaleString()} F CFA</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* Class detail Drill-down ("On entre dans la classe") */
                (() => {
                  const targetClass = classesList.find(c => c.id === selectedClassId);
                  if (!targetClass) return <p className="text-slate-500 text-center py-8">Classe non trouvée.</p>;
                  return (
                    <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-6 space-y-6 animate-fade-in text-left">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2.5 rounded-xl text-white">
                          <Bookmark className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white">Fiche Structurelle : Classe {targetClass.name}</h4>
                          <p className="text-2xs text-slate-400 font-mono">SCOLARITÉ FIXE : {targetClass.tuitionFee.toLocaleString()} FCFA</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 pt-2">
                        
                        {/* Installments Tranches details */}
                        <div className="space-y-3.5 bg-slate-900 border border-slate-850 p-5 rounded-2xl">
                          <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span>Planification des Échéances de Solvabilité ({targetClass.tranches.length} Tranches)</span>
                          </h5>
                          <div className="space-y-2">
                            {targetClass.tranches.map((t, idx) => (
                              <div key={idx} className="p-3 bg-[#11182d] border border-slate-800/80 rounded-xl flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-bold text-slate-100">{t.label}</p>
                                  <p className="text-3xs text-slate-505 mt-0.5">Limite de solvabilité : {t.dueDate}</p>
                                </div>
                                <span className="font-mono text-sm font-black text-emerald-400">
                                  {t.amount.toLocaleString()} FCFA
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Evaluation modes */}
                        <div className="space-y-3.5 bg-slate-900 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-3">
                            <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-blue-400" />
                              <span>Moyens d'Évaluation & Coeffs définis</span>
                            </h5>
                            <p className="text-3xs text-slate-400 font-semibold">Ces libellés officiels de même nom régissent la saisie des relevés de notes.</p>
                            
                            <div className="flex flex-wrap gap-2 pt-2">
                              {targetClass.evaluationMethods.map((meth, mid) => (
                                <span key={mid} className="text-2xs bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full font-bold">
                                  {meth}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl text-center space-y-1 mt-4">
                            <p className="text-3xs text-slate-400">Envie d'ajouter un moyen d'évaluation à cette classe ?</p>
                            <button 
                              type="button"
                              onClick={() => {
                                const newLabel = prompt("Entrez le libellé d'évaluation (Ex: Devoir de Synthèse Semestre) :");
                                if (newLabel) {
                                  const updated = classesList.map(c => {
                                    if (c.id === targetClass.id) {
                                      return { ...c, evaluationMethods: [...c.evaluationMethods, newLabel] };
                                    }
                                    return c;
                                  });
                                  setClassesList(updated);
                                  alert("Moyen d'évaluation ajouté !");
                                }
                              }}
                              className="text-3xs text-blue-400 hover:text-white font-bold underline cursor-pointer"
                            >
                              + Ajouter un Libellé d'évaluation
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* TAB: GESTION DES SALLES */}
          {activeTab === 'salles' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Gestion des Salles d'Études (Variantes)</h3>
                  <p className="text-xs text-slate-400 mt-1">Créez et configurez les séries/variantes de vos classes, affectez les professeurs principaux, coefficients et jours par matière</p>
                </div>
                {selectedRoomId && (
                  <button 
                    onClick={() => setSelectedRoomId(null)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer text-slate-350"
                  >
                    ← Retour à l'ensemble des Salles
                  </button>
                )}
              </div>

              {!selectedRoomId ? (
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Create New Salle Form */}
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-1 space-y-4 h-fit text-left">
                    <h4 className="font-bold text-white text-sm">Ajouter une Nouvelle Salle</h4>
                    <p className="text-2xs text-slate-400">Le nom unique de la salle sera composé du nom de la classe et de l'option saisie (ex: Terminale + B1 = Terminale-B1).</p>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!salleOption) {
                        alert("Veuillez renseigner l'option de la salle.");
                        return;
                      }
                      
                      const compName = `${salleParentClass}-${salleOption}`;
                      const chosenPrincipal = registeredStaff.find(s => s.id === salleMainTeacher) || registeredTeachers.find(t => t.id === salleMainTeacher);
                      
                      const newRoom: RoomItem = {
                        id: 'room-' + Date.now(),
                        name: compName,
                        className: salleParentClass,
                        option: salleOption,
                        maxStudents: parseInt(salleMax) || undefined,
                        academicYear: salleYear || '2026-2027',
                        mainTeacherId: salleMainTeacher || 'emp-2',
                        teachers: tempTeachersList.length > 0 ? tempTeachersList : [
                          { teacherId: 'emp-2', teacherName: chosenPrincipal?.name || 'Mme. Sarah Gbagbo', subject: 'Mathématiques', coeff: 4 }
                        ]
                      };

                      setRoomsList([...roomsList, newRoom]);
                      setSalleOption('');
                      setTempTeachersList([]);
                      alert(`Salle "${newRoom.name}" créée avec succès pour l'année ${newRoom.academicYear} !`);
                    }} className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Classe Existante de l'École *</label>
                        <select
                          value={salleParentClass}
                          onChange={e => setSalleParentClass(e.target.value)}
                          className="w-full bg-[#242f53] border border-slate-705 px-3 py-2 text-xs rounded-lg text-slate-100"
                        >
                          {classesList.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Option / Série / Variante *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: B1, C, D"
                          value={salleOption}
                          onChange={e => setSalleOption(e.target.value)}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Année Académique</label>
                          <input 
                            type="text" 
                            value={salleYear}
                            onChange={e => setSalleYear(e.target.value)}
                            className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Effectif Max</label>
                          <input 
                            type="number" 
                            placeholder="35"
                            value={salleMax}
                            onChange={e => setSalleMax(e.target.value)}
                            className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-100"
                          />
                        </div>
                      </div>

                      {/* Professeur Principal selection */}
                      <div className="space-y-1">
                        <label className="text-3xs text-slate-400 block font-bold uppercase font-mono">Professeur Principal *</label>
                        <select
                          value={salleMainTeacher}
                          onChange={e => setSalleMainTeacher(e.target.value)}
                          className="w-full bg-[#242f53] border border-slate-700 px-3 py-2 text-xs rounded-lg text-slate-105"
                        >
                          <option value="">-- Choisir un enseignant --</option>
                          {registeredTeachers.map(t => (
                            <option key={t.id} value={t.id}>{t.firstName} {t.lastName} (Professeur)</option>
                          ))}
                          {registeredStaff.filter(st => st.role === 'Enseignant').map(s => (
                            <option key={s.id} value={s.id}>{s.name} (Personnel)</option>
                          ))}
                        </select>
                      </div>

                      {/* Teacher and Subject configuration sub-form */}
                      <div className="border-t border-slate-800 pt-3 space-y-3">
                        <p className="text-3xs text-blue-400 font-bold uppercase font-semibold">Associer Enseignants & Coefficients :</p>
                        
                        <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                          <div>
                            <label className="text-[9px] text-slate-400 block">Sélectionner enseignant</label>
                            <select 
                              value={tempTeacherId}
                              onChange={e => setTempTeacherId(e.target.value)}
                              className="w-full bg-[#1b2542] border border-slate-700 text-slate-105 text-[11px] rounded p-1"
                            >
                              <option value="">-- Sélectionner --</option>
                              {registeredTeachers.map(t => (
                                <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>
                              ))}
                              {registeredStaff.filter(st => st.role === 'Enseignant').map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-400 block">Matière</label>
                              <select 
                                value={tempTeacherSubject}
                                onChange={e => setTempTeacherSubject(e.target.value)}
                                className="w-full bg-[#1b2542] border border-slate-700 text-slate-105 text-[10px] rounded p-1"
                              >
                                <option value="Mathématiques">Mathématiques</option>
                                <option value="Français">Français</option>
                                <option value="SVT">SVT</option>
                                <option value="Physique-Chimie">Physique-Chimie</option>
                                <option value="Histoire-Géo">Histoire-Géo</option>
                                <option value="Anglais">Anglais</option>
                                <option value="Allemand">Allemand</option>
                                <option value="EPS">EPS</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-400 block">Coeff</label>
                              <input 
                                type="number" 
                                value={tempTeacherCoeff}
                                onChange={e => setTempTeacherCoeff(e.target.value)}
                                className="w-full bg-[#1b2542] border border-slate-700 text-slate-105 text-[10px] rounded p-1"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (!tempTeacherId) {
                                alert("Veuillez choisir un enseignant d'abord.");
                                return;
                              }
                              const matched = (registeredTeachers.find(t => t.id === tempTeacherId) || registeredStaff.find(s => s.id === tempTeacherId)) as any;
                              const newAssign = {
                                teacherId: tempTeacherId,
                                teacherName: matched ? (matched.name || `${matched.firstName} ${matched.lastName}`) : 'Enseignant',
                                subject: tempTeacherSubject,
                                coeff: parseInt(tempTeacherCoeff) || 2
                              };
                              setTempTeachersList([...tempTeachersList, newAssign]);
                              alert(`Enseignant "${newAssign.teacherName}" associé pour la matière "${newAssign.subject}" !`);
                            }}
                            className="w-full bg-blue-700/50 hover:bg-blue-600 text-[10px] py-1 rounded text-white font-bold transition"
                          >
                            + Affecter cet enseignant & coeff
                          </button>
                        </div>

                        {/* List of custom additions prior to submission */}
                        {tempTeachersList.length > 0 && (
                          <div className="text-[10px] text-slate-400 space-y-1">
                            <p className="font-bold text-slate-300">Affectations prêtes :</p>
                            <div className="max-h-24 overflow-y-auto bg-slate-950 p-2 rounded">
                              {tempTeachersList.map((t, index) => (
                                <p key={index}>• {t.teacherName} - {t.subject} (Coeff {t.coeff})</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition"
                      >
                        Créer la salle d'étude
                      </button>
                    </form>
                  </div>

                  {/* Existing Salles list preview */}
                  <div className="bg-[#1b2542] border border-slate-800 rounded-xl p-5 md:col-span-2 space-y-4">
                    <h4 className="font-bold text-white text-sm">Salles actives de l'année scolaire</h4>
                    <p className="text-3xs text-slate-400">Sélectionnez une salle pour accéder à sa composition, sa liste d'enseignants attitrés et aux relevés de notes complets des élèves</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {roomsList.map((room) => {
                        const matchedPrincipal = (registeredStaff.find(s => s.id === room.mainTeacherId) || registeredTeachers.find(t => t.id === room.mainTeacherId)) as any;
                        return (
                          <div 
                            key={room.id}
                            onClick={() => setSelectedRoomId(room.id)}
                            className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500 cursor-pointer transition flex flex-col justify-between"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
                                  Classe: {room.className}
                                </span>
                                <h5 className="font-black text-white text-lg mt-2">{room.name}</h5>
                              </div>
                              <span className="text-3xs text-slate-500 font-mono">{room.academicYear}</span>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                              <p>Prof Principal : <strong className="text-slate-300">{matchedPrincipal ? (matchedPrincipal.name || `${matchedPrincipal.firstName} ${matchedPrincipal.lastName}`) : 'Mme. Sarah Gbagbo'}</strong></p>
                              <p>Effectif Max certifié : <strong className="text-slate-300">{room.maxStudents || 'Manuel'}</strong></p>
                              <p className="text-3xs text-blue-400 font-semibold">{room.teachers.length} Enseignants affectés</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                /* Room detail drill-down ("On entre dans la salle") */
                (() => {
                  const targetRoom = roomsList.find(r => r.id === selectedRoomId);
                  if (!targetRoom) return <p className="text-slate-500 text-center py-8">Salle introuvable.</p>;
                  const matchedPrincipal = (registeredStaff.find(s => s.id === targetRoom.mainTeacherId) || registeredTeachers.find(t => t.id === targetRoom.mainTeacherId)) as any;
                  
                  // Pupils inside this room (matching class string e.g. "3ème A" or "Terminale" or starting with class name like "Terminale-B1" or containing simple matches)
                  const pupilsInRoom = activeStudents.filter(sPair => {
                    const pupilClass = sPair.student.class.toLowerCase();
                    const targetClass = targetRoom.className.toLowerCase();
                    const targetRoomName = targetRoom.name.toLowerCase();
                    return pupilClass.includes(targetClass) || pupilClass.includes(targetRoomName);
                  });

                  return (
                    <div className="space-y-6 animate-fade-in text-left">
                      <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-black text-white">Salle d'Évaluation : {targetRoom.name}</h4>
                          <p className="text-2xs text-slate-450 uppercase font-mono font-bold">Année Académique: {targetRoom.academicYear} • Prof principal: {matchedPrincipal ? (matchedPrincipal.name || `${matchedPrincipal.firstName} ${matchedPrincipal.lastName}`) : 'M_Sarah_Gbagbo'}</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-xl text-center">
                          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">Capacité totale</p>
                          <p className="text-sm font-black text-white">{pupilsInRoom.length} / {targetRoom.maxStudents || 35} Élev.</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* List of Teachers in the Room */}
                        <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-5 space-y-4">
                          <h5 className="font-extrabold text-sm text-white flex items-center gap-1">
                            <Users className="w-4.5 h-4.5 text-blue-400" />
                            <span>Matières enseignées & Professeurs Affectés</span>
                          </h5>
                          
                          <div className="space-y-2.5">
                            {targetRoom.teachers.map((t, idx) => (
                              <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded-xl flex justify-between items-center text-xs">
                                <div>
                                  <p className="font-bold text-white">{t.teacherName}</p>
                                  <p className="text-2xs text-slate-500 font-semibold">{t.subject}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] bg-blue-500/15 text-blue-300 border border-blue-500/15 px-2 py-0.2 rounded font-mono font-bold">
                                    Coeff: {t.coeff}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* List of student grades inside this Room */}
                        <div className="bg-[#1b2542] border border-slate-800 rounded-2xl p-5 space-y-4">
                          <h5 className="font-extrabold text-sm text-white flex items-center gap-1">
                            <BookOpen className="w-4.5 h-4.5 text-rose-400" />
                            <span>Notes des Élèves par Matière dans {targetRoom.name}</span>
                          </h5>

                          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                            {pupilsInRoom.length > 0 ? (
                              pupilsInRoom.map((pair) => (
                                <div key={pair.student.id} className="p-4 bg-slate-900 border border-slate-800/65 rounded-xl">
                                  <div className="flex justify-between items-center border-b border-slate-800/50 pb-2 mb-2">
                                    <p className="font-extrabold text-white text-xs">{pair.student.firstName} {pair.student.lastName}</p>
                                    <span className="text-[10px] text-slate-500 font-mono font-bold">{pair.student.class}</span>
                                  </div>
                                  
                                  {pair.student.notes && pair.student.notes.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2 text-2xs">
                                      {pair.student.notes.map((note, noteIdx) => (
                                        <div key={noteIdx} className="bg-slate-950/40 p-1.5 rounded flex justify-between items-center">
                                          <span className="text-slate-400 font-semibold">{note.subject}</span>
                                          <strong className={note.score >= 10 ? "text-emerald-400 font-mono font-bold" : "text-yellow-500 font-mono font-bold"}>
                                            {note.score}
                                          </strong>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-3xs text-slate-500 italic text-center py-1">Aucune note n'a encore été saisie pour cet élève.</p>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-500 text-center py-6">Aucun élève de l'établissement n'est actuellement repéré comme appartenant à la classe ou option "{targetRoom.name}". Veuillez réaliser une inscription.</p>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* TAB: EMPLOI DU TEMPS (PDF WEEKLY TIMETABLE PREVIEW) */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Consulter l'Emploi du Temps Scolaire</h3>
                  <p className="text-xs text-slate-400 mt-1">Générez et visualisez l'emploi du temps de la semaine pour chaque option au format PDF officiel</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-slate-400 font-semibold">Sélectionner Salle :</label>
                  <select
                    value={scheduleSelectedRoomId}
                    onChange={e => setScheduleSelectedRoomId(e.target.value)}
                    className="bg-[#242f53] border border-[#374151] px-3 py-1.5 text-xs rounded-lg text-slate-100"
                  >
                    {roomsList.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Printable PDF Simulation Box */}
              {(() => {
                const targetRoom = roomsList.find(r => r.id === scheduleSelectedRoomId) || roomsList[0];
                if (!targetRoom) return <p className="text-slate-500 text-center py-8">Aucune salle configurée.</p>;
                
                // Fetch the subjects registered for current room
                const subjectsList = targetRoom.teachers.map(t => t.subject);
                
                return (
                  <div className="bg-white text-slate-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative border-4 border-slate-400">
                    
                    {/* Header Watermark and Title */}
                    <div className="border-b-2 border-slate-900 pb-5 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-left font-serif leading-none">
                        <p className="text-xs uppercase font-extrabold tracking-wide text-slate-800">REPUBLIQUE DE COTE D'IVOIRE</p>
                        <p className="text-[10px] text-slate-600 mt-1">Ministère de l'Éducation Nationale</p>
                        <p className="text-[9px] text-slate-500 italic mt-0.5">OTO School Manager - Plateforme d'excellence</p>
                      </div>
                      
                      <div className="text-center sm:text-right">
                        <span className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded font-black font-mono">
                          ANNÉE ACADÉMIQUE {targetRoom.academicYear}
                        </span>
                        <p className="text-lg font-black tracking-tight text-[#0f172a] mt-2 font-mono">SALLE : {targetRoom.name}</p>
                      </div>
                    </div>

                    <div className="text-center py-2 space-y-1">
                      <h4 className="text-lg font-bold font-serif uppercase tracking-wider text-slate-900">EMPLOI DU TEMPS OFFICIEL DE LA CLASSE</h4>
                      <p className="text-2xs text-slate-500 italic">Généré et visé par l'équipe d'encadrement pédagogique de l'établissement</p>
                    </div>

                    {/* Table Simulator Grid */}
                    <div className="overflow-x-auto border-2 border-slate-900 rounded-lg">
                      <table className="w-full text-center border-collapse text-xs font-semibold">
                        <thead>
                          <tr className="bg-slate-100 text-slate-900 border-b-2 border-slate-900 text-[11px] font-bold">
                            <th className="py-3 px-2 border-r-2 border-slate-300">JOURS</th>
                            <th className="py-3 px-2 border-r border-slate-300">08h00 - 10h00</th>
                            <th className="py-3 px-2 border-r border-slate-300">10h00 - 12h00</th>
                            <th className="py-3 px-2 border-r border-slate-300 bg-slate-50 text-slate-400 italic text-[9px]">RÉCRÉ / PAUSE</th>
                            <th className="py-3 px-2 border-r border-slate-300">14h00 - 16h00</th>
                            <th className="py-3 px-2">16h00 - 18h00</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300 text-slate-800">
                          {[
                            { day: 'LUNDI', h1: subjectsList[0] || 'Anglais', h2: subjectsList[1] || 'Français', h3: subjectsList[0] || 'Histoire-Géo', h4: 'Étude Libre' },
                            { day: 'MARDI', h1: subjectsList[1] || 'Mathématiques', h2: 'EPS', h3: subjectsList[0] || 'SVT', h4: subjectsList[1] || 'Physique' },
                            { day: 'MERCREDI', h1: subjectsList[0] || 'Français', h2: subjectsList[1] || 'Mathématiques', h3: '-', h4: '-' },
                            { day: 'JEUDI', h1: subjectsList[1] || 'Physique-Chimie', h2: subjectsList[0] || 'SVT', h3: subjectsList[1] || 'Allemand', h4: subjectsList[0] || 'Histoire-Géo' },
                            { day: 'VENDREDI', h1: subjectsList[0] || 'Anglais', h2: subjectsList[1] || 'Mathématiques', h3: subjectsList[0] || 'Français', h4: 'Devoirs Surveillés' },
                            { day: 'SAMEDI', h1: 'Évaluations', h2: 'Activités Scolaires', h3: '-', h4: '-' }
                          ].map((row, index) => (
                            <tr key={index} className="hover:bg-slate-50 font-medium font-semibold text-slate-900">
                              <td className="py-3 px-2 font-black bg-slate-100 text-slate-900 border-r-2 border-slate-300 text-2xs">{row.day}</td>
                              <td className="py-3 px-2 border-r border-slate-300">{row.h1}</td>
                              <td className="py-3 px-2 border-r border-slate-300">{row.h2}</td>
                              <td className="py-3 px-1 border-r border-slate-300 bg-slate-50/50 text-[9px] text-slate-400 italic">PAUSE COLLATION</td>
                              <td className="py-3 px-2 border-r border-slate-300">{row.h3}</td>
                              <td className="py-3 px-2">{row.h4}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* PDF Footer signatures simulation */}
                    <div className="pt-6 grid grid-cols-2 text-center text-3xs font-bold text-slate-700">
                      <div>
                        <p className="underline italic">Signature du Secrétariat Général</p>
                        <p className="mt-8 font-serif uppercase tracking-wider">[ Visé le 22 Mai 2026 ]</p>
                      </div>
                      <div>
                        <p className="underline italic">Cachet du Censeur Académique</p>
                        <p className="mt-8 font-serif uppercase text-rose-600 tracking-wide font-black">[ CERTIFIÉ OTO APPROVED ]</p>
                      </div>
                    </div>

                    {/* Print Action Buttons floating below card */}
                    <div className="absolute -bottom-14 left-0 right-0 flex justify-center gap-4">
                      <button 
                        type="button"
                        onClick={() => window.print()}
                        className="bg-slate-900 hover:bg-black text-white text-2xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-inherit" />
                        <span>Télécharger le PDF de l'Emploi de temps</span>
                      </button>
                    </div>

                  </div>
                );
              })()}

              <div className="h-14 pt-4"></div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
