// ==================== Authentification ====================
export interface LoginResponse {
  access_token: string;
  mot_de_passe_change: boolean;
  role: string;
}

export interface InscriptionEcolePayload {
  ecole: {
    nom: string;
    ville: string;
    boite_postale?: string;
    nom_fondateur: string;
    email: string;
    telephone: string;
    description?: string;
  };
  admin: {
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    telephone?: string;
  };
}

export interface InscriptionParentPayload {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  telephone?: string;
  profession?: string;
}

export interface ParentLoginResponse {
  access_token: string;
  mot_de_passe_change: boolean;
  parent: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
}

export interface ChangerMotDePassePayload {
  ancien_mot_de_passe: string;
  nouveau_mot_de_passe: string;
}

// ==================== Écoles ====================
export interface Ecole {
  id: string;
  nom: string;
  ville: string;
  boite_postale: string;
  nom_fondateur: string;
  email: string;
  telephone: string;
  description?: string;
  status: 'pending' | 'active' | 'rejected';
  created_at: string;
}

// ==================== Utilisateurs ====================
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  role: 'admin' | 'professeur' | 'secretaire' | 'superviseur';
  ecole_id: string;
  created_at: string;
}

export interface Parent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  profession: string;
  created_at: string;
}

// ==================== Classes ====================
export interface Classe {
  id: string;
  nom: string;
  scolarite_totale: number;
  ecole_id: string;
  tranches: Tranche[];
  created_at: string;
}

export interface Tranche {
  id?: string;
  numero: number;
  montant: number;
  date_limite: string;
}

// ==================== Salles ====================
export interface Salle {
  id: string;
  classe_id: string;
  option: string;
  annee_academique: string;
  effectif_max: number;
  prof_principal_id: string;
  ecole_id: string;
  nom: string;
  professeurs: SalleProfesseur[];
  created_at: string;
}

export interface SalleProfesseur {
  id?: string;
  user_id: string;
  matiere: string;
  coefficient: number;
  nom?: string;
  prenom?: string;
}

export interface MethodeEvaluation {
  id?: string;
  classe_id: string;
  libelle: string;
  created_at?: string;
}

// ==================== Matières ====================
export interface Matiere {
  id: string;
  nom: string;
  ecole_id: string;
  created_at: string;
}

// ==================== Élèves ====================
export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'masculin' | 'feminin';
  npi: string;
  date_naissance: string;
  lieu_naissance: string;
  quartier: string;
  nom_parent: string;
  contact_parent: string;
  email_parent: string;
  profession_parent: string;
  salle_id: string;
  ecole_id: string;
  matricule: string;
  active: boolean;
  created_at: string;
}

export interface EleveDetail extends Eleve {
  salle?: Salle;
  paiements?: Paiement[];
  absences?: Absence[];
}

// ==================== Notes ====================
export interface Note {
  id: string;
  methode_id: string;
  matiere: string;
  salle_id: string;
  eleve_id: string;
  valeur: number;
  trimestre: string;
  created_at: string;
}

export interface NoteSaisie {
  methode_id: string;
  matiere: string;
  salle_id: string;
  trimestre: string;
  notes: {
    eleve_id: string;
    valeur: number;
  }[];
}

export interface MoyenneEleve {
  moyenne: number;
  notes: Note[];
}

// ==================== Absences ====================
export interface Absence {
  id: string;
  eleve_id: string;
  duree_heures: number;
  motif?: string;
  justifiee: boolean;
  date: string;
  created_at: string;
}

export interface AbsenceDetail {
  absences: Absence[];
  total_heures: number;
  non_justifiees: number;
}

export interface JustifierAbsencePayload {
  motif: string;
}

// ==================== Paiements ====================
export interface Paiement {
  id: string;
  eleve_id: string;
  tranche_id: string;
  montant: number;
  date_paiement: string;
  created_at: string;
}

export interface PaiementSaisie {
  eleve_id: string;
  tranche_id: string;
  montant: number;
}

export interface ScolariteEleve {
  eleve: {
    id: string;
    nom: string;
    prenom: string;
    matricule: string;
  };
  scolarite: {
    tranche: Tranche;
    paiement: Paiement | null;
    solde: boolean;
  }[];
}

// ==================== Épreuves ====================
export interface Epreuve {
  id: string;
  titre: string;
  matiere_id: string;
  classe_id: string;
  salle_id: string;
  fichier_url: string;
  format: 'pdf' | 'image';
  description?: string;
  prof_id: string;
  created_at: string;
}

export interface EpreuveSaisie {
  titre: string;
  matiere_id: string;
  classe_id: string;
  fichier_url: string;
  format: 'pdf' | 'image';
  description?: string;
}

// ==================== Annonces ====================
export interface Annonce {
  id: string;
  titre: string;
  contenu: string;
  cible: 'membres' | 'parents' | 'tous';
  auteur_id: string;
  created_at: string;
}

export interface AnnonceSaisie {
  titre: string;
  contenu: string;
  cible: 'membres' | 'parents' | 'tous';
}

// ==================== Emplois du temps ====================
export interface EmploiTemps {
  id: string;
  salle_id: string;
  fichier_pdf_url: string;
  annee_academique: string;
  created_at: string;
}

export interface EmploiTempsSaisie {
  salle_id: string;
  fichier_pdf_url: string;
  annee_academique: string;
}

// ==================== Réponses API ====================
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  count?: number;
  [key: string]: any;
}

export interface ApiListResponse<T> {
  items: T[];
  total?: number;
  page?: number;
  limit?: number;
}

// ==================== Contacting ====================
export interface ContactPayload {
  message: string;
}
