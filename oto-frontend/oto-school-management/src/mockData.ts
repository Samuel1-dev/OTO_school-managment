export interface School {
  id: string;
  name: string;
  city: string;
  poBox: string;
  founder: string;
  email: string;
  phone: string;
  description?: string;
  status: 'pending' | 'active';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  schoolId: string;
}

export interface TeacherUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  schoolId: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  notes: { subject: string; score: number; date: string }[];
  absences: number;
  unjustifiedAbsences: number;
}

export interface ParentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  schoolIds: string[];
  children: Student[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target: 'all' | 'teachers' | 'parents';
  date: string;
  author: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  subject: string;
  className: string;
  fileType: 'pdf' | 'doc' | 'link' | 'image';
  fileSize?: string;
  dateAdded: string;
  imageUrl?: string;
  fileUrl?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Enseignant' | 'Secrétaire' | 'Superviseur' | 'Admin';
  phone: string;
  email: string;
}

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'lycee-excellence',
    name: "Lycée d'Excellence d'Abidjan",
    city: 'Abidjan',
    poBox: '01 BP 456',
    founder: 'Jean Kouamé',
    email: 'contact@excellence.ci',
    phone: '+225 01 23 45 67 89',
    description: "Établissement d'enseignement secondaire technique et général de référence.",
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'groupe-scolaire-etoile',
    name: 'Groupe Scolaire Étoile du Nord',
    city: 'Yamoussoukro',
    poBox: 'BP 88',
    founder: 'Marie-Antoinette Soro',
    email: 'direction@etoiledunord.ci',
    phone: '+225 05 99 88 77 66',
    description: 'Enseignement primaire et préscolaire moderne.',
    status: 'active',
    createdAt: '2026-02-15'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    firstName: 'Koffi',
    lastName: 'Kouassi',
    class: '3ème A',
    notes: [
      { subject: 'Mathématiques', score: 16.5, date: '2026-05-10' },
      { subject: 'Physique-Chimie', score: 14, date: '2026-05-12' },
      { subject: 'Français', score: 15, date: '2026-05-15' },
      { subject: 'SVT', score: 17, date: '2026-05-18' }
    ],
    absences: 3,
    unjustifiedAbsences: 1
  },
  {
    id: 'std-2',
    firstName: 'Amina',
    lastName: 'Kouassi',
    class: '6ème C',
    notes: [
      { subject: 'Mathématiques', score: 12, date: '2026-05-10' },
      { subject: 'Français', score: 18, date: '2026-05-14' },
      { subject: 'Histoire-Géo', score: 15.5, date: '2026-05-16' }
    ],
    absences: 1,
    unjustifiedAbsences: 0
  }
];

export const INITIAL_PARENTS: ParentUser[] = [
  {
    id: 'parent-1',
    firstName: 'Michel',
    lastName: 'Kouassi',
    email: 'michel.kouassi@gmail.com',
    phone: '+225 07 44 55 66 11',
    profession: 'Ingénieur Télécom',
    schoolIds: ['lycee-excellence'],
    children: INITIAL_STUDENTS
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Réunion de fin de semestre',
    content: "La réunion parents-enseignants pour le bilan de fin de semestre se tiendra le samedi 27 mai à 9h00 dans la grande salle d'animation.",
    target: 'parents',
    date: '2026-05-20',
    author: 'Direction OTO School'
  },
  {
    id: 'ann-2',
    title: 'Mise à disposition des sujets scolaires',
    content: 'Les épreuves du baccalauréat blanc 2026 ont été ajoutées dans la bibliothèque numérique commune pour tous les élèves de Terminale.',
    target: 'all',
    date: '2026-05-19',
    author: "Pr. Koffi, Secrétaire général"
  }
];

export const INITIAL_MATERIALS: CourseMaterial[] = [
  {
    id: 'mat-1',
    title: 'Élection et calcul matriciel - Exercices résolus',
    subject: 'Mathématiques',
    className: '3ème A',
    fileType: 'pdf',
    fileSize: '1.4 MB',
    dateAdded: '2026-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'mat-2',
    title: 'Cours complet d\'Optique Géométrique',
    subject: 'Physique-Chimie',
    className: '6ème C',
    fileType: 'pdf',
    fileSize: '2.8 MB',
    dateAdded: '2026-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1636466483774-4d16e0b519ed?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'mat-3',
    title: 'Sujet Type BEPC 2026 - SVT',
    subject: 'SVT',
    className: '3ème A',
    fileType: 'pdf',
    fileSize: '950 KB',
    dateAdded: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=400'
  }
];

export const INITIAL_STAFF: Employee[] = [
  { id: 'emp-1', name: 'Dr. Amadou Diallo', role: 'Admin', phone: '+225 01 02 03 04', email: 'amadou.diallo@oto.ci' },
  { id: 'emp-2', name: 'Mme. Sarah Gbagbo', role: 'Enseignant', phone: '+225 05 11 22 33', email: 'sarah.g@oto.ci' },
  { id: 'emp-3', name: 'M. Ibrahim Touré', role: 'Secrétaire', phone: '+225 07 55 66 77', email: 'ibrahim.toure@oto.ci' },
  { id: 'emp-4', name: 'Mme. Assetou Koné', role: 'Superviseur', phone: '+225 09 88 99 00', email: 'assetou.k@oto.ci' }
];
