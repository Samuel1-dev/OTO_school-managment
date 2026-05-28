# Guide d'Utilisation des Services - OTO Frontend Angular

Ce guide explique comment utiliser les services implémentés dans les composants Angular.

## 🔑 Concepts Clés

### 1. Injection de dépendances
```typescript
import { Component } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
}
```

### 2. Observable et Subscription
```typescript
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }
}
```

### 3. Async Pipe (Recommandé)
```typescript
export class UserListComponent {
  users$ = this.userService.listUsers();

  constructor(private userService: UserService) {}
}
```

Template:
```html
<div *ngFor="let user of users$ | async">
  {{ user.nom }} {{ user.prenom }}
</div>
```

---

## 📚 Exemples d'Utilisation par Service

### AuthService - Gestion de l'authentification

#### Connexion personnel école
```typescript
import { AuthService } from '../services/auth';

export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Connexion réussie, rôle:', response.role);
        // Redirection automatique gérée par le service
      },
      (error) => {
        console.error('Erreur:', error.error.message);
      }
    );
  }
}
```

#### Inscription école
```typescript
const payload: InscriptionEcolePayload = {
  ecole: {
    nom: 'Lycée Excellence',
    ville: 'Cotonou',
    boite_postale: '01 BP 456',
    nom_fondateur: 'Jean Dupont',
    email: 'contact@lycee.com',
    telephone: '+229 01234567',
    description: 'Une excellente école'
  },
  admin: {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'admin@lycee.com',
    mot_de_passe: 'SecurePass123',
    telephone: '+229 01234567'
  }
};

this.authService.inscrireEcole(payload).subscribe(
  (response) => {
    console.log('Inscription réussie:', response.ecole_id);
  }
);
```

#### Vérification de l'authentification
```typescript
export class AppComponent {
  isLoggedIn = this.authService.isLoggedIn();
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
```

---

### EleveService - Gestion des élèves

#### Inscrire un élève
```typescript
import { EleveService } from '../services/eleve';

export class EleveFormComponent {
  constructor(private eleveService: EleveService) {}

  onSubmit(formData: any) {
    const eleveData = {
      nom: formData.nom,
      prenom: formData.prenom,
      sexe: 'masculin',
      npi: formData.npi,
      date_naissance: '2010-05-15',
      lieu_naissance: 'Cotonou',
      quartier: 'Akpakpa',
      nom_parent: 'Kouassi Jean',
      contact_parent: '+229 01234567',
      email_parent: 'parent@email.com',
      profession_parent: 'Ingénieur',
      salle_id: 'uuid-salle'
    };

    this.eleveService.createEleve(eleveData).subscribe(
      (eleve) => {
        console.log('Élève inscrit:', eleve.matricule);
      }
    );
  }
}
```

#### Récupérer les élèves d'une salle
```typescript
export class SalleDetailComponent {
  eleves$ = this.eleveService.getElevesBySalle(this.salleId);

  constructor(
    private eleveService: EleveService,
    private route: ActivatedRoute
  ) {
    this.salleId = this.route.snapshot.params['id'];
  }
}
```

#### Parent récupère ses enfants
```typescript
export class ParentDashboardComponent {
  enfants$ = this.eleveService.getMonEnfants();

  constructor(private eleveService: EleveService) {}
}
```

---

### NoteService - Gestion des notes

#### Saisir les notes d'une salle
```typescript
import { NoteService } from '../services/note';

export class SaisieNotesComponent {
  constructor(private noteService: NoteService) {}

  saisirNotes(salleId: string) {
    const noteData: NoteSaisie = {
      methode_id: 'uuid-interrogation-1',
      matiere: 'Mathématiques',
      salle_id: salleId,
      trimestre: '1',
      notes: [
        { eleve_id: 'uuid-eleve1', valeur: 15.5 },
        { eleve_id: 'uuid-eleve2', valeur: 12.0 },
        { eleve_id: 'uuid-eleve3', valeur: 18.5 }
      ]
    };

    this.noteService.saisirNotes(noteData).subscribe(
      (response) => {
        console.log(`${response.count} notes enregistrées`);
      }
    );
  }
}
```

#### Obtenir la moyenne d'un élève
```typescript
export class EleveDetailsComponent {
  moyenne$ = this.noteService.getMoyenneEleve(eleveId, '1');

  constructor(private noteService: NoteService) {}
}
```

---

### AbsenceService - Gestion des absences

#### Enregistrer une absence
```typescript
import { AbsenceService } from '../services/absence';

export class AbsenceFormComponent {
  constructor(private absenceService: AbsenceService) {}

  enregistrerAbsence(eleveId: string, duree: number) {
    const absenceData = {
      eleve_id: eleveId,
      duree_heures: duree,
      motif: 'Rendez-vous médical',
      justifiee: false,
      date: new Date().toISOString().split('T')[0]
    };

    this.absenceService.enregistrerAbsence(absenceData).subscribe(
      (absence) => {
        console.log('Absence enregistrée');
      }
    );
  }
}
```

#### Récupérer les absences d'un élève
```typescript
export class AbsenceDetailComponent {
  absences$ = this.absenceService.getAbsencesEleve(eleveId);

  constructor(private absenceService: AbsenceService) {}
}
```

#### Contacter le parent (absences)
```typescript
contacterParent(eleveId: string) {
  const message = `Votre enfant a accumulé 5h d'absences non justifiées`;

  this.absenceService.contacterParent(eleveId, message).subscribe(
    () => {
      console.log('Email envoyé au parent');
    }
  );
}
```

---

### PaiementService - Suivi de la scolarité

#### Enregistrer un paiement
```typescript
import { PaiementService } from '../services/paiement';

export class PaiementFormComponent {
  constructor(private paiementService: PaiementService) {}

  enregistrerPaiement(eleveId: string, trancheId: string) {
    const paiementData: PaiementSaisie = {
      eleve_id: eleveId,
      tranche_id: trancheId,
      montant: 200000 // FCFA
    };

    this.paiementService.enregistrerPaiement(paiementData).subscribe(
      (response) => {
        if (response.solde) {
          console.log('Scolarité soldée!');
        }
      }
    );
  }
}
```

#### Suivre la scolarité d'un élève
```typescript
export class ScolariteDetailComponent {
  scolarite$ = this.paiementService.getSuiviScolariteEleve(eleveId);

  constructor(private paiementService: PaiementService) {}
}
```

---

### EpreuveService - Bibliothèque d'épreuves

#### Publier une épreuve (Professeur)
```typescript
import { EpreuveService } from '../services/epreuve';

export class EpreuveFormComponent {
  constructor(private epreuveService: EpreuveService) {}

  publierEpreuve(formData: any) {
    const epreuveData: EpreuveSaisie = {
      titre: 'Devoir de Mathématiques N°2',
      matiere_id: 'uuid-matiere',
      classe_id: 'uuid-classe',
      salle_id: 'uuid-salle',
      fichier_url: 'https://storage.example.com/epreuve.pdf',
      format: 'pdf',
      description: 'Devoir surveillé du 1er trimestre'
    };

    this.epreuveService.publierEpreuve(epreuveData).subscribe(
      (response) => {
        console.log('Épreuve publiée:', response.epreuve.id);
      }
    );
  }
}
```

#### Lister les épreuves d'une salle
```typescript
export class EpreuveListComponent {
  epreuves$ = this.epreuveService.getEpreuvesSalle(salleId);

  constructor(private epreuveService: EpreuveService) {}
}
```

---

### AnnonceService - Communication

#### Publier une annonce
```typescript
import { AnnonceService } from '../services/annonce';

export class AnnonceFormComponent {
  constructor(private annonceService: AnnonceService) {}

  publierAnnonce(titre: string, contenu: string, cible: string) {
    const annonceData: AnnonceSaisie = {
      titre: titre,
      contenu: contenu,
      cible: cible as 'membres' | 'parents' | 'tous'
    };

    this.annonceService.publierAnnonce(annonceData).subscribe(
      (response) => {
        console.log('Annonce publiée');
      }
    );
  }
}
```

#### Récupérer les annonces (Parent)
```typescript
export class AnnonceListComponent {
  annonces$ = this.annonceService.listAnnoncesParent();

  constructor(private annonceService: AnnonceService) {}
}
```

---

### ClasseService - Gestion des classes

#### Créer une classe avec tranches
```typescript
import { ClasseService } from '../services/classe';
import { Tranche } from '../models';

export class ClasseFormComponent {
  constructor(private classeService: ClasseService) {}

  creerClasse() {
    const tranches: Tranche[] = [
      { numero: 1, montant: 200000, date_limite: '2026-09-30' },
      { numero: 2, montant: 150000, date_limite: '2026-12-31' },
      { numero: 3, montant: 100000, date_limite: '2027-03-31' }
    ];

    const classeData = {
      nom: 'Terminale',
      scolarite_totale: 450000,
      tranches: tranches
    };

    this.classeService.createClasse(classeData).subscribe(
      (classe) => {
        console.log('Classe créée:', classe.id);
      }
    );
  }
}
```

---

### SalleService - Gestion des salles

#### Créer une salle avec professeurs
```typescript
import { SalleService } from '../services/salle';
import { SalleProfesseur } from '../models';

export class SalleFormComponent {
  constructor(private salleService: SalleService) {}

  creerSalle() {
    const professeurs: SalleProfesseur[] = [
      {
        user_id: 'prof-1',
        matiere: 'Mathématiques',
        coefficient: 5
      },
      {
        user_id: 'prof-2',
        matiere: 'Français',
        coefficient: 3
      }
    ];

    const salleData = {
      classe_id: 'uuid-classe',
      option: 'B1',
      annee_academique: '2026-2027',
      effectif_max: 60,
      prof_principal_id: 'prof-1',
      professeurs: professeurs
    };

    this.salleService.createSalle(salleData).subscribe(
      (salle) => {
        console.log('Salle créée:', salle.nom); // "Terminale-B1"
      }
    );
  }
}
```

---

## 🛠️ Utilitaires (UtilService)

### Utiliser les utilitaires
```typescript
import { UtilService } from '../shared/utils/util.service';

export class MyComponent {
  constructor(private util: UtilService) {}

  exemples() {
    // Formatage de date
    const formatted = this.util.formatDate('2026-05-28'); // "28/05/2026"

    // Validation email
    const isValid = this.util.isValidEmail('test@example.com'); // true

    // Formatage devise
    const prix = this.util.formatCurrency(450000); // "450 000 FCFA"

    // Calculer l'âge
    const age = this.util.calculateAge('2010-05-15'); // 15 (ou 16)

    // Générer matricule
    const matricule = this.util.generateMatricule(); // "ELV-2026-5847"
  }
}
```

---

## 🔒 Gestion des Erreurs

### Gestion globale d'erreur
```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

this.eleveService.listEleves().pipe(
  catchError((error) => {
    console.error('Erreur lors du chargement:', error);
    return throwError(() => new Error('Erreur serveur'));
  })
).subscribe(
  (eleves) => console.log(eleves)
);
```

### Types d'erreurs courants
- **401 Unauthorized**: Token expiré ou invalide (auto-gérée par l'intercepteur)
- **403 Forbidden**: Accès refusé (rôle insuffisant)
- **404 Not Found**: Ressource non trouvée
- **500 Server Error**: Erreur serveur
- **Network Error**: Problème de connexion

---

## 📋 Checklist d'Utilisation

- ✅ Injecter le service dans le constructor
- ✅ Souscrire aux Observables (subscribe ou async pipe)
- ✅ Gérer les erreurs avec catchError
- ✅ Utiliser les interfaces TypeScript pour la sécurité des types
- ✅ Vérifier que l'utilisateur est authentifié (AuthGuard)
- ✅ Vérifier le rôle de l'utilisateur si nécessaire (RoleGuard)

---

**Version**: 1.0.0  
**Dernière mise à jour**: 28 mai 2026
