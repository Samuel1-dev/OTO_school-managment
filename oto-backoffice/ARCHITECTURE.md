# Architecture du Back Office OTO School

## Structure des Fichiers

### Services (`src/app/service/`)

#### `auth.service.ts`
- **Responsabilité**: Gestion de l'authentification du back office
- **Fonctionnalités**:
  - `loginBackoffice()`: Connexion avec email et mot de passe
  - `createAdminBackoffice()`: Créer un nouveau compte admin
  - `changePassword()`: Changer le mot de passe
  - `isAuthenticated()`: Vérifier l'authentification
  - `getToken()` / `setToken()`: Gestion du token JWT
  - `getRole()` / `setRole()`: Gestion du rôle utilisateur
  - `logout()`: Déconnexion et nettoyage
  - `getAuthHeaders()`: Obtenir les headers avec authorization

#### `ecole.service.ts`
- **Responsabilité**: Gestion des écoles (CRUD)
- **Fonctionnalités**:
  - `getAllEcoles()`: Récupérer toutes les écoles
  - `getEcolesPending()`: Récupérer les écoles en attente de validation
  - `validateEcole(ecoleId)`: Valider une école
  - `rejectEcole(ecoleId, raison)`: Rejeter une école avec raison
  - `getEcoleDetails(ecoleId)`: Obtenir les détails d'une école
  - `deleteEcole(ecoleId)`: Supprimer une école

#### `auth.interceptor.ts`
- **Responsabilité**: Intercepteur HTTP pour gérer les requêtes authentifiées
- **Fonctionnalités**:
  - Ajoute automatiquement le token Bearer aux requêtes `/backoffice/`
  - Gère les erreurs 401 (redirection vers login)
  - Gère les erreurs 403 (accès refusé)

### Composants (`src/app/backoffice/`)

#### `backoffice.ts`
- **Responsabilité**: Composant parent du back office
- **Fonctionnalités**:
  - Affiche la navbar avec le menu
  - Affiche le `router-outlet` pour les pages enfants
  - Gère la déconnexion

#### `login/login.ts`
- **Responsabilité**: Page de connexion
- **Améliorations apportées**:
  - Validation des champs email et mot de passe
  - Validation du format email
  - Gestion des erreurs et messages d'erreur détaillés
  - Affichage du mot de passe (toggle show/hide)
  - Vérification si l'utilisateur est déjà connecté
  - Support des messages de query parameters
  - Gestion du premier changement de mot de passe
  - Unsubscription automatique avec `takeUntil()`

#### `dashboard/dashboard.ts`
- **Responsabilité**: Tableau de bord principal
- **Améliorations apportées**:
  - Chargement des écoles (toutes et en attente)
  - Affichage en onglets (Toutes / En attente)
  - Filtrage et recherche des écoles
  - Validation d'une école
  - Rejet d'une école avec raison
  - Affichage des détails d'une école
  - Gestion d'erreurs et chargement
  - Statistiques (total écoles, total en attente)
  - Déconnexion

### Modules et Routing

#### `backoffice.module.ts`
- Déclaration des composants
- Import des modules nécessaires (CommonModule, FormsModule, HttpClientModule, etc.)
- Configuration de l'intercepteur HTTP

#### `backoffice-routing.module.ts`
- Routes enfants du module backoffice
- `/backoffice/login` → Login
- `/backoffice/dashboard` → Dashboard
- Route par défaut vers dashboard

## Routes API Implémentées

### Authentification
- `POST /backoffice/login` - Connexion
- `POST /backoffice/creer-admin` - Créer un admin
- `POST /auth/changer-mot-de-passe` - Changer le mot de passe

### Gestion des Écoles
- `GET /backoffice/ecoles` - Lister toutes les écoles
- `GET /backoffice/ecoles/en-attente` - Écoles en attente
- `PATCH /backoffice/ecoles/:id/valider` - Valider une école
- `PATCH /backoffice/ecoles/:id/rejeter` - Rejeter une école

## Flux d'Authentification

1. L'utilisateur accède à `/backoffice`
2. Redirection vers `/backoffice/login` si non authentifié
3. Connexion avec email et mot de passe
4. Le token JWT est stocké dans localStorage
5. Le token est automatiquement ajouté par l'intercepteur à toutes les requêtes `/backoffice/`
6. Si le token expire (erreur 401), redirection vers login
7. Le rôle de l'utilisateur est stocké et accessible

## Points Clés d'Améliorations

### Sécurité
- ✅ Utilisation de JWT avec Bearer token
- ✅ Stockage sécurisé dans localStorage
- ✅ Gestion automatique du token par intercepteur
- ✅ Gestion des erreurs d'authentification (401, 403)

### Validation
- ✅ Validation du format email
- ✅ Validation des champs obligatoires
- ✅ Gestion des erreurs serveur

### Gestion de Ressources
- ✅ Unsubscription automatique avec `takeUntil()`
- ✅ Nettoyage des ressources dans `ngOnDestroy()`

### UX/DX
- ✅ Messages d'erreur clairs
- ✅ Indicateurs de chargement
- ✅ Filtrage et recherche des écoles
- ✅ Navigation fluide

## Configuration Requise

### Backend (API)
- URL de base: `http://localhost:3000`
- JWT_SECRET configuré
- CORS activé pour l'application front-end

### Variables d'Environnement (si nécessaire)
- `API_URL`: URL de l'API (par défaut `http://localhost:3000`)

## Utilisation

### Pour lancer l'application:
```bash
npm start
```

### Pour tester la connexion:
- Email: `admin@backoffice.com`
- Mot de passe: `motdepasse123`

## Notes Techniques

- **Angular Version**: 21.2.0
- **HttpClient**: Utilisé pour les requêtes HTTP
- **RxJS**: Gestion des observables avec `takeUntil()` pour la gestion de mémoire
- **JWT**: Stocké dans localStorage
- **Interceptor**: Ajoute automatiquement le header Authorization
