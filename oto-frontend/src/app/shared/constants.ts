// API Base URL
export const API_BASE_URL = 'http://localhost:3000';

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    INSCRIPTION_ECOLE: '/auth/inscription-ecole',
    CHANGER_MOT_DE_PASSE: '/auth/changer-mot-de-passe',
    BACKOFFICE_LOGIN: '/backoffice/login',
    BACKOFFICE_CREER_ADMIN: '/backoffice/creer-admin',
  },
  PARENTS: {
    INSCRIPTION: '/parents/inscription',
    LOGIN: '/parents/login',
  },
  BACKOFFICE: {
    ECOLES: '/backoffice/ecoles',
    ECOLES_EN_ATTENTE: '/backoffice/ecoles/en-attente',
    ECOLE_VALIDER: '/backoffice/ecoles/{id}/valider',
    ECOLE_REJETER: '/backoffice/ecoles/{id}/rejeter',
  },
  CLASSES: {
    LIST: '/classes',
    CREATE: '/classes',
    DETAIL: '/classes/{id}',
    UPDATE: '/classes/{id}',
    DELETE: '/classes/{id}',
  },
  SALLES: {
    LIST: '/salles',
    CREATE: '/salles',
    DETAIL: '/salles/{id}',
    DELETE: '/salles/{id}',
    METHODES_SET: '/salles/classes/{classe_id}/methodes',
    METHODES_GET: '/salles/classes/{classe_id}/methodes',
  },
  MATIERES: {
    LIST: '/matieres',
    CREATE: '/matieres',
    DELETE: '/matieres/{id}',
  },
  ELEVES: {
    LIST: '/eleves',
    CREATE: '/eleves',
    DETAIL: '/eleves/{id}',
    BY_SALLE: '/eleves/salle/{salle_id}',
    PARENT_ENFANTS: '/eleves/parent/mes-enfants',
    UPDATE: '/eleves/{id}',
    DESACTIVER: '/eleves/{id}/desactiver',
  },
  NOTES: {
    CREATE: '/notes',
    BY_SALLE: '/notes/salle/{salle_id}',
    BY_ELEVE: '/notes/eleve/{eleve_id}',
    MOYENNE_ELEVE: '/notes/eleve/{eleve_id}/moyenne',
    PROF_NOTES: '/notes/prof/mes-notes',
  },
  ABSENCES: {
    CREATE: '/absences',
    BY_ELEVE: '/absences/eleve/{eleve_id}',
    BY_SALLE: '/absences/salle/{salle_id}',
    BY_ECOLE: '/absences/ecole',
    JUSTIFIER: '/absences/{id}/justifier',
    CONTACTER_PARENT: '/absences/eleve/{eleve_id}/contacter-parent',
  },
  PAIEMENTS: {
    CREATE: '/paiements',
    BY_ELEVE: '/paiements/eleve/{eleve_id}',
    BY_ECOLE: '/paiements/ecole',
    CONTACTER_PARENT: '/paiements/eleve/{eleve_id}/contacter-parent',
  },
  EPREUVES: {
    LIST: '/epreuves',
    CREATE: '/epreuves',
    BY_SALLE: '/epreuves/salle/{salle_id}',
    DETAIL: '/epreuves/{id}',
    DELETE: '/epreuves/{id}',
  },
  ANNONCES: {
    LIST: '/annonces',
    CREATE: '/annonces',
    PARENT_LIST: '/annonces/parent',
    DELETE: '/annonces/{id}',
  },
  EMPLOIS_TEMPS: {
    LIST: '/emplois-temps',
    CREATE: '/emplois-temps',
    PROF: '/emplois-temps/prof',
    BY_SALLE: '/emplois-temps/salle/{salle_id}',
    DELETE: '/emplois-temps/{id}',
  },
};

// Rôles
export enum UserRole {
  ADMIN = 'admin',
  PROFESSEUR = 'professeur',
  SECRETAIRE = 'secretaire',
  SUPERVISEUR = 'superviseur',
  PARENT = 'parent',
  BACKOFFICE_ADMIN = 'backoffice_admin',
}

// Statuts
export const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  REJECTED: 'rejected',
  INACTIVE: 'inactive',
};

// Genres
export const GENRE = {
  MASCULIN: 'masculin',
  FEMININ: 'feminin',
};

// Format fichiers
export const FILE_FORMAT = {
  PDF: 'pdf',
  IMAGE: 'image',
  DOC: 'doc',
  LINK: 'link',
};

// Cibles annonces
export const ANNONCE_CIBLE = {
  MEMBRES: 'membres',
  PARENTS: 'parents',
  TOUS: 'tous',
};

// Messages d'erreur courants
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Non autorisé. Veuillez vous connecter.',
  FORBIDDEN: 'Accès refusé.',
  NOT_FOUND: 'Ressource non trouvée.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer.',
  NETWORK_ERROR: 'Erreur réseau. Vérifiez votre connexion.',
};

// Messages de succès courants
export const SUCCESS_MESSAGES = {
  CREATE_SUCCESS: 'Créé avec succès.',
  UPDATE_SUCCESS: 'Modifié avec succès.',
  DELETE_SUCCESS: 'Supprimé avec succès.',
  SAVE_SUCCESS: 'Enregistré avec succès.',
};
