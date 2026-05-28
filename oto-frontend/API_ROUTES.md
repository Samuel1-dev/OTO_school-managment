# OTO School Management — Guide des Routes API

> Base URL : `http://localhost:3000`
> Pour les routes protégées, ajouter le header : `Authorization: Bearer <token>`

---

## AUTH — `/auth`

### POST `/auth/inscription-ecole`
> Inscription d'une école + compte admin — ❌ Auth non requise

**Body :**
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
**Réponse :**
```json
{
  "message": "Inscription soumise. En attente de validation du back office.",
  "ecole_id": "uuid"
}
```

---

### POST `/auth/login`
> Connexion du personnel — ❌ Auth non requise

**Body :**
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

---

### POST `/auth/changer-mot-de-passe`
> Changer le mot de passe — ✅ Auth requise

**Body :**
```json
{
  "ancien_mot_de_passe": "0000",
  "nouveau_mot_de_passe": "nouveaumdp123"
}
```
**Réponse :**
```json
{
  "message": "Mot de passe changé avec succès"
}
```

---

## PARENTS — `/parents`

### POST `/parents/inscription`
> Inscription d'un parent — ❌ Auth non requise

**Body :**
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
**Réponse :**
```json
{
  "message": "Inscription réussie"
}
```

---

### POST `/parents/login`
> Connexion d'un parent — ❌ Auth non requise

**Body :**
```json
{
  "email": "koffi.kouassi@gmail.com",
  "mot_de_passe": "motdepasse123"
}
```
**Réponse :**
```json
{
  "access_token": "eyJhbGci...",
  "parent": {
    "id": "uuid",
    "nom": "Kouassi",
    "prenom": "Koffi",
    "email": "koffi.kouassi@gmail.com"
  }
}
```

---

## BACK OFFICE — `/backoffice`

### POST `/backoffice/creer-admin`
> Créer un compte admin back office — ❌ Auth non requise

**Body :**
```json
{
  "nom": "Super Admin",
  "email": "admin@backoffice.com",
  "mot_de_passe": "motdepasse123"
}
```
**Réponse :**
```json
{
  "message": "Admin back office créé"
}
```

---

### POST `/backoffice/login`
> Connexion admin back office — ❌ Auth non requise

**Body :**
```json
{
  "email": "admin@backoffice.com",
  "mot_de_passe": "motdepasse123"
}
```
**Réponse :**
```json
{
  "access_token": "eyJhbGci..."
}
```

---

### GET `/backoffice/ecoles`
> Lister toutes les écoles — ✅ Auth requise

**Body :** aucun

---

### GET `/backoffice/ecoles/en-attente`
> Lister les écoles en attente de validation — ✅ Auth requise

**Body :** aucun

---

### PATCH `/backoffice/ecoles/:id/valider`
> Valider une école — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "École validée avec succès"
}
```

---

### PATCH `/backoffice/ecoles/:id/rejeter`
> Rejeter une école — ✅ Auth requise

**Body :**
```json
{
  "motif": "Documents incomplets"
}
```
**Réponse :**
```json
{
  "message": "École rejetée"
}
```

---

## CLASSES — `/classes`

### POST `/classes`
> Créer une classe avec ses tranches — ✅ Auth requise

**Body :**
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

### GET `/classes`
> Lister toutes les classes de l'école — ✅ Auth requise

**Body :** aucun

---

### GET `/classes/:id`
> Détail d'une classe — ✅ Auth requise

**Body :** aucun

---

### PATCH `/classes/:id`
> Modifier une classe — ✅ Auth requise

**Body :**
```json
{
  "nom": "Terminale",
  "scolarite_totale": 500000,
  "tranches": [
    { "numero": 1, "montant": 250000, "date_limite": "2026-09-30" },
    { "numero": 2, "montant": 150000, "date_limite": "2026-12-31" },
    { "numero": 3, "montant": 100000, "date_limite": "2027-03-31" }
  ]
}
```

---

### DELETE `/classes/:id`
> Supprimer une classe — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "Classe supprimée"
}
```

---

## SALLES — `/salles`

### POST `/salles`
> Créer une salle — ✅ Auth requise

**Body :**
```json
{
  "classe_id": "uuid-classe",
  "option": "B1",
  "annee_academique": "2026-2027",
  "effectif_max": 60,
  "prof_principal_id": "uuid-prof",
  "professeurs": [
    { "user_id": "uuid-prof1", "matiere": "Mathématiques", "coefficient": 5 },
    { "user_id": "uuid-prof2", "matiere": "Français", "coefficient": 3 },
    { "user_id": "uuid-prof1", "matiere": "Physique", "coefficient": 4 }
  ]
}
```
> Le nom de la salle est généré automatiquement : `Terminale-B1`

---

### GET `/salles`
> Lister toutes les salles de l'école — ✅ Auth requise

**Body :** aucun

---

### GET `/salles/:id`
> Détail d'une salle avec ses professeurs — ✅ Auth requise

**Body :** aucun

---

### DELETE `/salles/:id`
> Supprimer une salle — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "Salle supprimée"
}
```

---

### POST `/salles/classes/:classe_id/methodes`
> Définir les méthodes d'évaluation d'une classe — ✅ Auth requise

**Body :**
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
**Réponse :**
```json
{
  "message": "Méthodes d'évaluation enregistrées"
}
```

---

### GET `/salles/classes/:classe_id/methodes`
> Lister les méthodes d'évaluation d'une classe — ✅ Auth requise

**Body :** aucun

---

## MATIÈRES — `/matieres`

### POST `/matieres`
> Créer une matière — ✅ Auth requise

**Body :**
```json
{
  "nom": "Mathématiques"
}
```
**Réponse :**
```json
{
  "id": "uuid",
  "nom": "Mathématiques",
  "ecole_id": "uuid",
  "created_at": "2026-05-26T..."
}
```

---

### GET `/matieres`
> Lister les matières de l'école — ✅ Auth requise

**Body :** aucun

---

### DELETE `/matieres/:id`
> Supprimer une matière — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "Matière supprimée"
}
```

---

## ÉLÈVES — `/eleves`

### POST `/eleves`
> Inscrire un élève — ✅ Auth requise

**Body :**
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
> Valeurs possibles pour `sexe` : `masculin`, `feminin`

---

### GET `/eleves`
> Lister tous les élèves de l'école — ✅ Auth requise

**Body :** aucun

---

### GET `/eleves/:id`
> Détail d'un élève — ✅ Auth requise

**Body :** aucun

---

### GET `/eleves/salle/:salle_id`
> Élèves d'une salle — ✅ Auth requise

**Body :** aucun

---

### GET `/eleves/parent/mes-enfants`
> Enfants du parent connecté — ✅ Auth requise (token parent)

**Body :** aucun

---

### PATCH `/eleves/:id`
> Modifier un élève — ✅ Auth requise

**Body :** (champs à modifier uniquement)
```json
{
  "quartier": "Cadjehoun",
  "contact_parent": "+229 09876543"
}
```

---

### PATCH `/eleves/:id/desactiver`
> Désactiver un élève — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "Élève désactivé"
}
```

---

## NOTES — `/notes`

### POST `/notes`
> Saisir les notes d'une salle — ✅ Auth requise (professeur uniquement)

**Body :**
```json
{
  "methode_id": "uuid-methode",
  "matiere": "Mathématiques",
  "salle_id": "uuid-salle",
  "trimestre": "1",
  "notes": [
    { "eleve_id": "uuid-eleve1", "valeur": 15.5 },
    { "eleve_id": "uuid-eleve2", "valeur": 12 },
    { "eleve_id": "uuid-eleve3", "valeur": 18 }
  ]
}
```
**Réponse :**
```json
{
  "message": "Notes enregistrées avec succès",
  "count": 3
}
```

---

### GET `/notes/salle/:salle_id`
> Notes d'une salle — ✅ Auth requise

**Query params (optionnels) :** `?trimestre=1`

**Body :** aucun

---

### GET `/notes/eleve/:eleve_id`
> Notes d'un élève — ✅ Auth requise

**Query params (optionnels) :** `?trimestre=1`

**Body :** aucun

---

### GET `/notes/eleve/:eleve_id/moyenne`
> Moyenne d'un élève — ✅ Auth requise

**Query params :** `?trimestre=1`

**Body :** aucun

**Réponse :**
```json
{
  "moyenne": 15.5,
  "notes": [...]
}
```

---

### GET `/notes/prof/mes-notes`
> Notes saisies par le prof connecté — ✅ Auth requise

**Query params :** `?salle_id=uuid&trimestre=1`

**Body :** aucun

---

## ABSENCES — `/absences`

### POST `/absences`
> Enregistrer une absence — ✅ Auth requise

**Body :**
```json
{
  "eleve_id": "uuid-eleve",
  "duree_heures": 2,
  "motif": "Rendez-vous médical",
  "justifiee": false,
  "date": "2026-05-26"
}
```
**Réponse :**
```json
{
  "message": "Absence enregistrée",
  "absence": { ... }
}
```

---

### GET `/absences/eleve/:eleve_id`
> Absences d'un élève — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "absences": [...],
  "total_heures": 5,
  "non_justifiees": 3
}
```

---

### GET `/absences/salle/:salle_id`
> Absences de tous les élèves d'une salle — ✅ Auth requise

**Body :** aucun

---

### GET `/absences/ecole`
> Toutes les absences de l'école — ✅ Auth requise

**Body :** aucun

---

### PATCH `/absences/:id/justifier`
> Justifier une absence — ✅ Auth requise

**Body :**
```json
{
  "motif": "Certificat médical fourni"
}
```
**Réponse :**
```json
{
  "message": "Absence justifiée"
}
```

---

### POST `/absences/eleve/:eleve_id/contacter-parent`
> Envoyer un email au parent — ✅ Auth requise

**Body :**
```json
{
  "message": "Votre enfant a accumulé 5h d'absences non justifiées cette semaine."
}
```
**Réponse :**
```json
{
  "message": "Email envoyé au parent"
}
```

---

## PAIEMENTS — `/paiements`

### POST `/paiements`
> Enregistrer un paiement — ✅ Auth requise

**Body :**
```json
{
  "eleve_id": "uuid-eleve",
  "tranche_id": "uuid-tranche",
  "montant": 200000
}
```
**Réponse :**
```json
{
  "message": "Paiement enregistré",
  "solde": true,
  "paiement": { ... }
}
```

---

### GET `/paiements/eleve/:eleve_id`
> Suivi scolarité d'un élève — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "eleve": {
    "id": "uuid",
    "nom": "Kouassi",
    "prenom": "Koffi Junior",
    "matricule": "ELV-2026-4872"
  },
  "scolarite": [
    {
      "tranche": { "numero": 1, "montant": 200000, "date_limite": "2026-09-30" },
      "paiement": { "montant": 200000, "date_paiement": "2026-09-15" },
      "solde": true
    },
    {
      "tranche": { "numero": 2, "montant": 150000, "date_limite": "2026-12-31" },
      "paiement": null,
      "solde": false
    }
  ]
}
```

---

### GET `/paiements/ecole`
> Suivi scolarité de toute l'école — ✅ Auth requise

**Body :** aucun

---

### POST `/paiements/eleve/:eleve_id/contacter-parent`
> Envoyer un rappel scolarité au parent — ✅ Auth requise

**Body :**
```json
{
  "message": "La 2ème tranche de scolarité est due avant le 31 décembre 2026."
}
```
**Réponse :**
```json
{
  "message": "Email de rappel envoyé"
}
```

---

## ÉPREUVES — `/epreuves`

### POST `/epreuves`
> Publier une épreuve — ✅ Auth requise — ⚠️ Professeurs uniquement

**Body :**
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

**Réponse :**
```json
{
  "message": "Épreuve publiée",
  "epreuve": { ... }
}
```

---

### GET `/epreuves`
> Bibliothèque d'épreuves — ✅ Auth requise

**Query params (optionnels) :** `?search=devoir&matiere_id=uuid-matiere`

**Body :** aucun

---

### GET `/epreuves/salle/:salle_id`
> Épreuves d'une salle — ✅ Auth requise

**Query params (optionnels) :** `?search=math`

**Body :** aucun

---

### GET `/epreuves/:id`
> Détail d'une épreuve — ✅ Auth requise

**Body :** aucun

---

### DELETE `/epreuves/:id`
> Supprimer une épreuve — ✅ Auth requise (auteur uniquement)

**Body :** aucun

**Réponse :**
```json
{
  "message": "Épreuve supprimée"
}
```

---

## ANNONCES — `/annonces`

### POST `/annonces`
> Publier une annonce — ✅ Auth requise — ⚠️ Admin et Superviseur uniquement

**Body :**
```json
{
  "titre": "Réunion de parents",
  "contenu": "Une réunion est prévue le 30 mai 2026 à 10h dans la grande salle.",
  "cible": "parents"
}
```
> Valeurs possibles pour `cible` : `membres`, `parents`, `tous`

**Réponse :**
```json
{
  "message": "Annonce publiée",
  "annonce": { ... }
}
```

---

### GET `/annonces`
> Annonces visibles selon le rôle connecté — ✅ Auth requise

**Body :** aucun

> Les professeurs voient uniquement les annonces `membres` et `tous`.

---

### GET `/annonces/parent`
> Annonces visibles par le parent connecté — ✅ Auth requise (token parent)

**Body :** aucun

---

### DELETE `/annonces/:id`
> Supprimer une annonce — ✅ Auth requise (auteur ou admin)

**Body :** aucun

**Réponse :**
```json
{
  "message": "Annonce supprimée"
}
```

---

## EMPLOIS DU TEMPS — `/emplois-temps`

### POST `/emplois-temps`
> Ajouter un emploi du temps — ✅ Auth requise

**Body :**
```json
{
  "salle_id": "uuid-salle",
  "fichier_pdf_url": "https://storage.example.com/emploi-temps.pdf",
  "annee_academique": "2026-2027"
}
```
**Réponse :**
```json
{
  "message": "Emploi du temps enregistré",
  "emploi": { ... }
}
```

---

### GET `/emplois-temps`
> Lister tous les emplois du temps — ✅ Auth requise

**Query params (optionnels) :** `?search=Terminale`

**Body :** aucun

---

### GET `/emplois-temps/prof`
> Emplois du temps des salles du prof connecté — ✅ Auth requise

**Body :** aucun

---

### GET `/emplois-temps/salle/:salle_id`
> Emploi du temps d'une salle — ✅ Auth requise

**Body :** aucun

---

### DELETE `/emplois-temps/:id`
> Supprimer un emploi du temps — ✅ Auth requise

**Body :** aucun

**Réponse :**
```json
{
  "message": "Emploi du temps supprimé"
}
```
