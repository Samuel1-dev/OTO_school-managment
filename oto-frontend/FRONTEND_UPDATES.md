# Mise à jour Frontend Angular - Stack Technique

Cette documentation décrit les additions et améliorations apportées au frontend Angular pour s'aligner avec la stack technique du backend NestJS et le style de code du dossier `oto-school-management`.

## 🎯 Résumé des modifications

### 1. **Models et Interfaces** (`src/app/models/index.ts`)
Création d'un fichier centralisé contenant toutes les interfaces et types TypeScript pour:
- **Authentification**: `LoginResponse`, `InscriptionEcolePayload`, `ParentLoginResponse`, `ChangerMotDePassePayload`
- **Écoles**: `Ecole`
- **Utilisateurs**: `User`, `Parent`
- **Classes**: `Classe`, `Tranche`
- **Salles**: `Salle`, `SalleProfesseur`, `MethodeEvaluation`
- **Matières**: `Matiere`
- **Élèves**: `Eleve`, `EleveDetail`
- **Notes**: `Note`, `NoteSaisie`, `MoyenneEleve`
- **Absences**: `Absence`, `AbsenceDetail`, `JustifierAbsencePayload`
- **Paiements**: `Paiement`, `PaiementSaisie`, `ScolariteEleve`
- **Épreuves**: `Epreuve`, `EpreuveSaisie`
- **Annonces**: `Annonce`, `AnnonceSaisie`
- **Emplois du temps**: `EmploiTemps`, `EmploiTempsSaisie`
- **Réponses API**: `ApiResponse<T>`, `ApiListResponse<T>`

### 2. **Services Implémentés** (`src/app/services/`)

#### AuthService (`auth.ts`)
- ✅ `login(email, mot_de_passe)` - Connexion personnel école
- ✅ `loginParent(email, mot_de_passe)` - Connexion parent
- ✅ `loginBackoffice(email, mot_de_passe)` - Connexion back office
- ✅ `inscrireEcole(payload)` - Inscription école + admin
- ✅ `inscrireParent(payload)` - Inscription parent
- ✅ `creerAdminBackoffice(nom, email, mot_de_passe)` - Créer compte back office
- ✅ `changerMotDePasse(ancien, nouveau)` - Changer mot de passe
- ✅ Gestion d'état utilisateur avec BehaviorSubject
- ✅ Utilitaires: `getToken()`, `getRole()`, `isLoggedIn()`, `getCurrentUser()`, `logout()`

#### UserService (`user.ts`)
- ✅ `getUserById(id)` - Récupérer un utilisateur
- ✅ `listUsers()` - Lister tous les utilisateurs de l'école
- ✅ `createUser(user)` - Créer un utilisateur
- ✅ `updateUser(id, user)` - Modifier un utilisateur
- ✅ `deleteUser(id)` - Supprimer un utilisateur

#### ClasseService (`classe.ts`)
- ✅ `createClasse(data)` - Créer une classe avec tranches
- ✅ `listClasses()` - Lister toutes les classes
- ✅ `getClasseById(id)` - Détail d'une classe
- ✅ `updateClasse(id, data)` - Modifier une classe
- ✅ `deleteClasse(id)` - Supprimer une classe

#### SalleService (`salle.ts`)
- ✅ `createSalle(data)` - Créer une salle avec professeurs
- ✅ `listSalles()` - Lister toutes les salles
- ✅ `getSalleById(id)` - Détail d'une salle
- ✅ `deleteSalle(id)` - Supprimer une salle
- ✅ `setMethodesEvaluation(classe_id, methodes)` - Définir méthodes d'évaluation
- ✅ `getMethodesEvaluation(classe_id)` - Récupérer méthodes d'évaluation

#### EcoleService (`ecole.ts`)
- ✅ `listEcoles()` - Lister toutes les écoles (back office)
- ✅ `listEcolesEnAttente()` - Lister écoles en attente
- ✅ `validerEcole(id)` - Valider une école
- ✅ `rejeterEcole(id, motif)` - Rejeter une école

#### EleveService (`eleve.ts`)
- ✅ `createEleve(data)` - Inscrire un élève
- ✅ `listEleves()` - Lister tous les élèves
- ✅ `getEleveById(id)` - Détail d'un élève
- ✅ `getElevesBySalle(salle_id)` - Élèves d'une salle
- ✅ `getMonEnfants()` - Enfants du parent connecté
- ✅ `updateEleve(id, data)` - Modifier un élève
- ✅ `desactiverEleve(id)` - Désactiver un élève

#### MatiereService (`matiere.ts`)
- ✅ `createMatiere(nom)` - Créer une matière
- ✅ `listMatieres()` - Lister les matières
- ✅ `deleteMatiere(id)` - Supprimer une matière

#### NoteService (`note.ts`)
- ✅ `saisirNotes(data)` - Saisir les notes d'une salle
- ✅ `getNotesParSalle(salle_id, trimestre)` - Notes d'une salle
- ✅ `getNotesParEleve(eleve_id, trimestre)` - Notes d'un élève
- ✅ `getMoyenneEleve(eleve_id, trimestre)` - Moyenne d'un élève
- ✅ `getMesNotes(salle_id, trimestre)` - Notes saisies par le prof

#### AbsenceService (`absence.ts`)
- ✅ `enregistrerAbsence(data)` - Enregistrer une absence
- ✅ `getAbsencesEleve(eleve_id)` - Absences d'un élève
- ✅ `getAbsencesSalle(salle_id)` - Absences d'une salle
- ✅ `getAbsencesEcole()` - Toutes les absences
- ✅ `justifierAbsence(id, payload)` - Justifier une absence
- ✅ `contacterParent(eleve_id, message)` - Envoyer email au parent

#### PaiementService (`paiement.ts`)
- ✅ `enregistrerPaiement(data)` - Enregistrer un paiement
- ✅ `getSuiviScolariteEleve(eleve_id)` - Suivi scolarité élève
- ✅ `getSuiviScolariteEcole()` - Suivi scolarité école
- ✅ `contacterParentScolarite(eleve_id, message)` - Envoyer rappel scolarité

#### EpreuveService (`epreuve.ts`)
- ✅ `publierEpreuve(data)` - Publier une épreuve
- ✅ `listEpreuves(search, matiere_id)` - Bibliothèque d'épreuves
- ✅ `getEpreuvesSalle(salle_id, search)` - Épreuves d'une salle
- ✅ `getEpreuveById(id)` - Détail d'une épreuve
- ✅ `deleteEpreuve(id)` - Supprimer une épreuve

#### AnnonceService (`annonce.ts`)
- ✅ `publierAnnonce(data)` - Publier une annonce
- ✅ `listAnnonces()` - Annonces visibles selon le rôle
- ✅ `listAnnoncesParent()` - Annonces pour parents
- ✅ `deleteAnnonce(id)` - Supprimer une annonce

#### EmploiTempsService (`emploi-temps.ts`)
- ✅ `ajouterEmploiTemps(data)` - Ajouter un emploi du temps
- ✅ `listEmploiTemps(search)` - Lister emplois du temps
- ✅ `getEmploiTempsProf()` - Emplois du temps du prof
- ✅ `getEmploiTempsSalle(salle_id)` - Emploi du temps d'une salle
- ✅ `deleteEmploiTemps(id)` - Supprimer un emploi du temps

### 3. **Constantes et Configuration** (`src/app/shared/`)

#### constants.ts
- ✅ `API_BASE_URL` - URL de base de l'API
- ✅ `API_ROUTES` - Routes API organisées par module
- ✅ `UserRole` - Énumération des rôles
- ✅ `STATUS`, `GENRE`, `FILE_FORMAT`, `ANNONCE_CIBLE` - Énumérations communes
- ✅ Messages d'erreur et de succès standardisés

#### environment.ts et environment.prod.ts
- ✅ Configuration par environnement
- ✅ URL API, nom de l'app, version
- ✅ Clés de stockage (token, rôle)

### 4. **Services Utilitaires** (`src/app/shared/utils/`)

#### UtilService (`util.service.ts`)
- ✅ `formatDate(date)` - Formate une date en 'dd/mm/yyyy'
- ✅ `toISODate(date)` - Convertit en format 'yyyy-mm-dd'
- ✅ `isValidEmail(email)` - Valide une adresse email
- ✅ `isValidPhoneBeninFormat(phone)` - Valide un numéro Bénin
- ✅ `generateMatricule()` - Génère un matricule unique
- ✅ `formatCurrency(amount)` - Formate en devise (FCFA)
- ✅ `truncate(str, length)` - Tronque une chaîne
- ✅ `slugify(str)` - Crée un slug
- ✅ `calculateAge(birthDate)` - Calcule l'âge
- ✅ `formatName(firstName, lastName)` - Formate un nom
- ✅ `sortByKey(arr, key, ascending)` - Trie un array
- ✅ `deepCopy(obj)` - Copie profonde
- ✅ `merge(obj1, obj2)` - Fusionne objets
- ✅ `isEmpty(arr)` - Vérifie si array vide
- ✅ `delay(ms)` - Crée un délai (tests)

### 5. **Module Partagé Mis à Jour** (`shared-module.ts`)
- ✅ Imports de tous les services
- ✅ Imports de modules Angular courants (HttpClientModule, FormsModule, ReactiveFormsModule)
- ✅ Déclaration de tous les providers
- ✅ Exports des modules partagés

### 6. **Index Central** (`src/app/index.ts`)
- ✅ Exports centralisés de tous les modèles
- ✅ Exports de tous les services
- ✅ Exports des utilitaires et constantes
- ✅ Exports des guards et intercepteurs

## 📋 Architecture Globale

```
src/app/
├── models/
│   └── index.ts (toutes les interfaces)
├── services/
│   ├── auth.ts (+ AuthService implémenté)
│   ├── user.ts (+ UserService implémenté)
│   ├── classe.ts (+ ClasseService implémenté)
│   ├── salle.ts (+ SalleService implémenté)
│   ├── ecole.ts (+ EcoleService implémenté)
│   ├── eleve.ts (+ EleveService implémenté)
│   ├── matiere.ts (nouveau)
│   ├── note.ts (+ NoteService implémenté)
│   ├── absence.ts (+ AbsenceService implémenté)
│   ├── paiement.ts (+ PaiementService implémenté)
│   ├── epreuve.ts (+ EpreuveService implémenté)
│   ├── annonce.ts (+ AnnonceService implémenté)
│   └── emploi-temps.ts (+ EmploiTempsService implémenté)
├── shared/
│   ├── shared-module.ts (mis à jour)
│   ├── constants.ts (nouveau)
│   └── utils/
│       └── util.service.ts (nouveau)
├── guards/
│   ├── auth-guard.ts (existant)
│   └── role-guard.ts (existant)
├── interceptors/
│   └── auth-interceptor.ts (existant et fonctionnel)
├── environments/
│   ├── environment.ts (nouveau)
│   └── environment.prod.ts (nouveau)
└── index.ts (nouveau - exports centralisés)
```

## 🚀 Stack Technique Intégrée

### Backend (NestJS) - Référence
- **Framework**: NestJS
- **Base de données**: PostgreSQL
- **ORM**: TypeORM
- **Authentification**: JWT (passport-jwt)
- **Chiffrement**: bcrypt
- **Email**: @nestjs-modules/mailer + Nodemailer

### Frontend (Angular) - Implémenté
- **Framework**: Angular 21.2
- **HTTP Client**: HttpClientModule
- **Routing**: Angular Router
- **Forms**: Reactive Forms & Template-Driven Forms
- **Authentification**: JWT via AuthService
- **Interceptors**: AuthInterceptor pour injection de token
- **Guards**: AuthGuard, RoleGuard pour protection des routes
- **State Management**: BehaviorSubject pour gestion simple d'état
- **UI**: Angular Material 21.2
- **Testing**: Vitest 4.0
- **Styles**: SCSS

## 🔐 Authentification et Sécurité

1. **Token JWT**: Stocké en localStorage après connexion
2. **Auth Interceptor**: Injecte le token dans les headers Authorization
3. **AuthGuard**: Vérifie la présence du token
4. **RoleGuard**: Vérifie le rôle de l'utilisateur
5. **Auto-logout**: Déconnecte si réponse 401

## 📦 Dépendances Principales

```json
{
  "@angular/core": "^21.2.0",
  "@angular/common": "^21.2.0",
  "@angular/forms": "^21.2.0",
  "@angular/platform-browser": "^21.2.0",
  "@angular/router": "^21.2.0",
  "@angular/material": "^21.2.13",
  "rxjs": "~7.8.0",
  "typescript": "~5.9.2"
}
```

## 🎨 Style de Code

Le code suit le style et les conventions observées dans le dossier `oto-school-management`:
- ✅ Services injectables avec `providedIn: 'root'`
- ✅ Interfaces/Types centralisés
- ✅ Méthodes claires et fonctionnelles
- ✅ Observables pour les appels HTTP asynchrones
- ✅ Gestion d'erreurs cohérente

## 📝 Prochaines Étapes

1. ✅ Implémenter les composants des pages (auth, dashboard, etc.)
2. ✅ Ajouter les formulaires réactifs
3. ✅ Intégrer Angular Material pour l'UI
4. ✅ Tester l'intégration avec le backend NestJS
5. ✅ Déployer l'application

## 📚 Documentation API Utilisée

- [API_ROUTES.md](./API_ROUTES.md) - Routes API backend complètes

---

**Version**: 1.0.0  
**Date**: 28 mai 2026  
**Statut**: ✅ Complet - Prêt pour l'intégration avec le backend
