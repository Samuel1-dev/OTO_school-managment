# OTO School Management — Backend API

Backend de la plateforme de gestion scolaire **OTO School**, développé avec **NestJS** et **PostgreSQL** via TypeORM.

---

## Stack technique

- **Framework** : NestJS
- **Base de données** : PostgreSQL
- **ORM** : TypeORM
- **Authentification** : JWT (passport-jwt)
- **Chiffrement** : bcrypt
- **Email** : @nestjs-modules/mailer + Nodemailer
- **Système** : Fedora Linux

---

## Installation

```bash
npm install
```

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=mon_user
DB_PASSWORD=mon_password
DB_NAME=mon_app_db

# JWT
JWT_SECRET=oto_school_secret_key_2026
JWT_EXPIRES_IN=7d

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=ton_email@gmail.com
MAIL_PASSWORD=ton_mot_de_passe_app
MAIL_FROM=OTO School <ton_email@gmail.com>
```

### Démarrage

```bash
# Développement
npm run start:dev

# Production
npm run start:prod
```

---

## Architecture des modules

```
src/
├── auth/               # Authentification personnel école
├── parent/             # Espace parent
├── backoffice/         # Administration back office
├── ecole/              # Entité école
├── user/               # Entité utilisateur (personnel)
├── classe/             # Gestion des classes et tranches
├── salle/              # Gestion des salles, professeurs et méthodes d'évaluation
├── eleve/              # Gestion des élèves
├── matiere/            # Gestion des matières par école
├── note/               # Saisie et consultation des notes
├── absence/            # Gestion des absences
├── paiement/           # Suivi de la scolarité et paiements
├── epreuve/            # Bibliothèque d'épreuves (publication réservée aux profs)
├── annonce/            # Annonces et communication
└── emploi-temps/       # Emplois du temps par salle
```

---

## Entités (tables PostgreSQL)

| Table | Description |
|-------|-------------|
| `ecoles` | Établissements scolaires inscrits |
| `users` | Personnel des établissements (admin, prof, secrétaire, superviseur) |
| `parents` | Comptes parents |
| `backoffice_admins` | Administrateurs du back office |
| `classes` | Classes d'un établissement (ex: Terminale) |
| `tranches_classe` | Tranches de scolarité par classe |
| `salles` | Variantes d'une classe (ex: Terminale-B1) |
| `salle_professeurs` | Affectation professeurs ↔ salles ↔ matières |
| `methodes_evaluation` | Libellés d'évaluation par classe (Interro1, Devoir2...) |
| `eleves` | Élèves inscrits dans un établissement |
| `matieres` | Matières définies par école |
| `notes` | Notes des élèves par matière et libellé d'évaluation |
| `absences` | Absences enregistrées par élève |
| `paiements` | Paiements de scolarité par tranche |
| `epreuves` | Épreuves publiées par les professeurs |
| `annonces` | Annonces publiées par l'admin ou le superviseur |
| `emplois_temps` | Emplois du temps en PDF par salle |

---

## Rôles utilisateurs

| Rôle | Code | Préfixe identifiant |
|------|------|-------------------|
| Administrateur école | `admin` | `ADM-YYYY-XXXX` |
| Professeur | `professeur` | `TCH-YYYY-XXXX` |
| Secrétaire | `secretaire` | `SEC-YYYY-XXXX` |
| Superviseur | `superviseur` | `SUP-YYYY-XXXX` |
| Autre membre | `autre` | `MBR-YYYY-XXXX` |

---

## Routes API

### Auth — `/auth`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/auth/inscription-ecole` | Inscription d'une école + compte admin | ❌ |
| `POST` | `/auth/login` | Connexion du personnel (rôle détecté automatiquement) | ❌ |
| `POST` | `/auth/changer-mot-de-passe` | Changer le mot de passe (obligatoire à la 1ère connexion) | ✅ JWT |

#### `POST /auth/inscription-ecole`
```json
{
  "ecole": {
    "nom": "Lycée Excellence",
    "ville": "Cotonou",
    "boite_postale": "01 BP 456",
    "nom_fondateur": "Jean Dupont",
    "email": "contact@lycee-excellence.com",
    "telephone": "+229 01234567",
    "description": "Description optionnelle"
  },
  "admin": {
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "admin@lycee-excellence.com",
    "mot_de_passe": "motdepasse123",
    "telephone": "+229 01234567"
  }
}
```

#### `POST /auth/login`
```json
{
  "email": "admin@lycee-excellence.com",
  "mot_de_passe": "motdepasse123"
}
```
**Réponse :**
```json
{
  "access_token": "eyJhbGci...",
  "mot_de_passe_change": true,
  "role": "admin"
}
```
> Un seul formulaire de connexion pour tout le personnel. Le front lit le champ `role` pour rediriger vers le bon dashboard. Si `mot_de_passe_change: false` → forcer la page de changement de mot de passe.

#### `POST /auth/changer-mot-de-passe`
```json
{
  "ancien_mot_de_passe": "0000",
  "nouveau_mot_de_passe": "nouveaumdp123"
}
```

---

### Parents — `/parents`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/parents/inscription` | Inscription d'un parent | ❌ |
| `POST` | `/parents/login` | Connexion d'un parent | ❌ |

#### `POST /parents/inscription`
```json
{
  "nom": "Kouassi",
  "prenom": "Koffi",
  "email": "koffi.kouassi@gmail.com",
  "mot_de_passe": "motdepasse123",
  "telephone": "+229 01234567",
  "profession": "Ingénieur"
}
```

#### `POST /parents/login`
```json
{
  "email": "koffi.kouassi@gmail.com",
  "mot_de_passe": "motdepasse123"
}
```

---

### Back Office — `/backoffice`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/backoffice/login` | Connexion admin back office | ❌ |
| `POST` | `/backoffice/creer-admin` | Créer un compte admin back office | ❌ |
| `GET` | `/backoffice/ecoles` | Lister toutes les écoles | ✅ JWT |
| `GET` | `/backoffice/ecoles/en-attente` | Écoles en attente de validation | ✅ JWT |
| `PATCH` | `/backoffice/ecoles/:id/valider` | Valider une école | ✅ JWT |
| `PATCH` | `/backoffice/ecoles/:id/rejeter` | Rejeter une école | ✅ JWT |

#### `PATCH /backoffice/ecoles/:id/rejeter`
```json
{
  "motif": "Documents incomplets"
}
```

---

### Classes — `/classes`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/classes` | Créer une classe avec ses tranches | ✅ JWT |
| `GET` | `/classes` | Lister toutes les classes de l'école | ✅ JWT |
| `GET` | `/classes/:id` | Détail d'une classe | ✅ JWT |
| `PATCH` | `/classes/:id` | Modifier une classe | ✅ JWT |
| `DELETE` | `/classes/:id` | Supprimer une classe | ✅ JWT |

#### `POST /classes`
```json
{
  "nom": "Terminale",
  "scolarite_totale": 450000,
  "tranches": [
    { "numero": 1, "montant": 200000, "date_limite": "2026-09-30" },
    { "numero": 2, "montant": 150000, "date_limite": "2026-12-31" },
    { "numero": 3, "montant": 100000, "date_limite": "2027-03-31" }
  ]
}
```

---

### Salles — `/salles`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/salles` | Créer une salle | ✅ JWT |
| `GET` | `/salles` | Lister toutes les salles de l'école | ✅ JWT |
| `GET` | `/salles/:id` | Détail d'une salle | ✅ JWT |
| `DELETE` | `/salles/:id` | Supprimer une salle | ✅ JWT |
| `POST` | `/salles/classes/:classe_id/methodes` | Définir les méthodes d'évaluation | ✅ JWT |
| `GET` | `/salles/classes/:classe_id/methodes` | Lister les méthodes d'évaluation | ✅ JWT |

#### `POST /salles`
```json
{
  "classe_id": "uuid-classe",
  "option": "B1",
  "annee_academique": "2026-2027",
  "effectif_max": 60,
  "prof_principal_id": "uuid-prof",
  "professeurs": [
    { "user_id": "uuid-prof1", "matiere": "Mathématiques", "coefficient": 5 },
    { "user_id": "uuid-prof2", "matiere": "Français", "coefficient": 3 }
  ]
}
```

#### `POST /salles/classes/:classe_id/methodes`
```json
{
  "methodes": [
    { "libelle": "Interrogation 1" },
    { "libelle": "Interrogation 2" },
    { "libelle": "Devoir 1" },
    { "libelle": "Devoir 2" }
  ]
}
```

---

### Matières — `/matieres`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/matieres` | Créer une matière | ✅ JWT |
| `GET` | `/matieres` | Lister les matières de l'école | ✅ JWT |
| `DELETE` | `/matieres/:id` | Supprimer une matière | ✅ JWT |

#### `POST /matieres`
```json
{
  "nom": "Mathématiques"
}
```

---

### Élèves — `/eleves`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/eleves` | Inscrire un élève | ✅ JWT |
| `GET` | `/eleves` | Lister tous les élèves de l'école | ✅ JWT |
| `GET` | `/eleves/:id` | Détail d'un élève | ✅ JWT |
| `GET` | `/eleves/salle/:salle_id` | Élèves d'une salle | ✅ JWT |
| `GET` | `/eleves/parent/mes-enfants` | Enfants du parent connecté | ✅ JWT |
| `PATCH` | `/eleves/:id` | Modifier un élève | ✅ JWT |
| `PATCH` | `/eleves/:id/desactiver` | Désactiver un élève | ✅ JWT |

#### `POST /eleves`
```json
{
  "nom": "Kouassi",
  "prenom": "Koffi Junior",
  "sexe": "masculin",
  "npi": "1234567890",
  "date_naissance": "2008-05-12",
  "lieu_naissance": "Cotonou",
  "quartier": "Akpakpa",
  "nom_parent": "Kouassi Jean",
  "contact_parent": "+229 01234567",
  "email_parent": "koffi.kouassi@gmail.com",
  "profession_parent": "Ingénieur",
  "salle_id": "uuid-salle"
}
```

---

### Notes — `/notes`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/notes` | Saisir les notes d'une salle | ✅ JWT |
| `GET` | `/notes/salle/:salle_id` | Notes d'une salle (filtre par trimestre) | ✅ JWT |
| `GET` | `/notes/eleve/:eleve_id` | Notes d'un élève (filtre par trimestre) | ✅ JWT |
| `GET` | `/notes/eleve/:eleve_id/moyenne` | Moyenne d'un élève par trimestre | ✅ JWT |
| `GET` | `/notes/prof/mes-notes` | Notes saisies par le prof connecté | ✅ JWT |

#### `POST /notes`
```json
{
  "methode_id": "uuid-methode",
  "matiere": "Mathématiques",
  "salle_id": "uuid-salle",
  "trimestre": "1",
  "notes": [
    { "eleve_id": "uuid-eleve1", "valeur": 15.5 },
    { "eleve_id": "uuid-eleve2", "valeur": 12 }
  ]
}
```

---

### Absences — `/absences`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/absences` | Enregistrer une absence | ✅ JWT |
| `GET` | `/absences/eleve/:eleve_id` | Absences d'un élève | ✅ JWT |
| `GET` | `/absences/salle/:salle_id` | Absences par salle | ✅ JWT |
| `GET` | `/absences/ecole` | Toutes les absences de l'école | ✅ JWT |
| `PATCH` | `/absences/:id/justifier` | Justifier une absence | ✅ JWT |
| `POST` | `/absences/eleve/:eleve_id/contacter-parent` | Contacter le parent | ✅ JWT |

#### `POST /absences`
```json
{
  "eleve_id": "uuid-eleve",
  "duree_heures": 2,
  "motif": "Rendez-vous médical",
  "justifiee": false,
  "date": "2026-05-26"
}
```
> Si l'absence est non justifiée et que le parent a un compte, un email lui est automatiquement envoyé.

---

### Paiements — `/paiements`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/paiements` | Enregistrer un paiement | ✅ JWT |
| `GET` | `/paiements/eleve/:eleve_id` | Suivi scolarité d'un élève | ✅ JWT |
| `GET` | `/paiements/ecole` | Suivi scolarité de toute l'école | ✅ JWT |
| `POST` | `/paiements/eleve/:eleve_id/contacter-parent` | Rappel scolarité au parent | ✅ JWT |

#### `POST /paiements`
```json
{
  "eleve_id": "uuid-eleve",
  "tranche_id": "uuid-tranche",
  "montant": 200000
}
```

---

### Épreuves — `/epreuves`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/epreuves` | Publier une épreuve (professeurs uniquement) | ✅ JWT |
| `GET` | `/epreuves` | Bibliothèque d'épreuves (search, filtre matière) | ✅ JWT |
| `GET` | `/epreuves/salle/:salle_id` | Épreuves d'une salle | ✅ JWT |
| `GET` | `/epreuves/:id` | Détail d'une épreuve | ✅ JWT |
| `DELETE` | `/epreuves/:id` | Supprimer une épreuve | ✅ JWT |

#### `POST /epreuves`
```json
{
  "titre": "Devoir de Mathématiques N°2",
  "matiere_id": "uuid-matiere",
  "classe_id": "uuid-classe",
  "salle_id": "uuid-salle",
  "fichier_url": "https://storage.example.com/epreuve.pdf",
  "format": "pdf",
  "description": "Devoir surveillé du 1er trimestre"
}
```
> Valeurs possibles pour `format` : `pdf`, `image`

> `GET /epreuves?search=devoir&matiere_id=uuid-matiere` — recherche filtrée

> ⚠️ Seuls les **professeurs** peuvent publier. Les autres rôles reçoivent une erreur `403 Forbidden`.

---

### Annonces — `/annonces`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/annonces` | Publier une annonce (admin/superviseur) | ✅ JWT |
| `GET` | `/annonces` | Annonces visibles selon le rôle connecté | ✅ JWT |
| `GET` | `/annonces/parent` | Annonces visibles par le parent connecté | ✅ JWT |
| `DELETE` | `/annonces/:id` | Supprimer une annonce | ✅ JWT |

#### `POST /annonces`
```json
{
  "titre": "Réunion de parents",
  "contenu": "Une réunion est prévue le 30 mai 2026 à 10h.",
  "cible": "parents"
}
```
> Valeurs possibles pour `cible` : `membres`, `parents`, `tous`

> Les professeurs ne reçoivent que les annonces destinées aux `membres` et `tous`.

---

### Emplois du temps — `/emplois-temps`

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|-------------|
| `POST` | `/emplois-temps` | Ajouter un emploi du temps | ✅ JWT |
| `GET` | `/emplois-temps` | Lister tous les emplois du temps | ✅ JWT |
| `GET` | `/emplois-temps/prof` | Emplois du temps du prof connecté | ✅ JWT |
| `GET` | `/emplois-temps/salle/:salle_id` | Emploi du temps d'une salle | ✅ JWT |
| `DELETE` | `/emplois-temps/:id` | Supprimer un emploi du temps | ✅ JWT |

#### `POST /emplois-temps`
```json
{
  "salle_id": "uuid-salle",
  "fichier_pdf_url": "https://storage.example.com/emploi-temps.pdf",
  "annee_academique": "2026-2027"
}
```
> `GET /emplois-temps?search=Terminale` — recherche par nom de salle ou année académique

---

## Logique métier importante

### Connexion du personnel
Un seul formulaire de connexion pour tout le personnel. La réponse contient le `role` et l'`ecole_id` dans le JWT. Le front redirige vers le dashboard correspondant au rôle. L'admin accède directement à son école sans avoir à la choisir.

### Première connexion du personnel
Lors de la création d'un compte membre par l'admin :
1. Génération d'un identifiant unique (ex: `TCH-2026-1234`)
2. Mot de passe par défaut `0000`
3. Envoi email avec les identifiants
4. `mot_de_passe_change = false`

À la première connexion, si `mot_de_passe_change: false` → le front force la page de changement de mot de passe.

### Statuts d'une école
- `en_attente` — après inscription, en attente de validation
- `validee` — école active, le personnel peut se connecter
- `rejetee` — inscription rejetée

### Matricule élève
Généré automatiquement et garanti unique : `ELV-YYYY-XXXX`. Le système vérifie en base avant d'attribuer.

### Lien élève ↔ parent
Si l'email du parent renseigné lors de l'inscription de l'élève correspond à un compte parent existant, le lien est créé automatiquement.

### Restrictions par rôle
| Fonctionnalité | Admin | Superviseur | Secrétaire | Professeur |
|----------------|-------|-------------|------------|------------|
| Publier annonce | ✅ | ✅ | ❌ | ❌ |
| Publier épreuve | ❌ | ❌ | ❌ | ✅ |
| Inscrire élève | ❌ | ❌ | ✅ | ❌ |
| Saisir notes | ❌ | ❌ | ❌ | ✅ |
| Enregistrer absence | ❌ | ✅ | ❌ | ✅ |
| Enregistrer paiement | ❌ | ❌ | ✅ | ❌ |
| Créer membres | ✅ | ❌ | ❌ | ❌ |

### Notifications email automatiques
- Validation/rejet d'une école → email à l'école
- Création d'un membre → email avec identifiants + mot de passe `0000`
- Absence non justifiée → email au parent
- Rappel scolarité → email au parent
