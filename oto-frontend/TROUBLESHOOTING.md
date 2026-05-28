# 🔧 Guide de Dépannage - OTO Frontend Angular

## ⚠️ Problèmes Courants et Solutions

### 1. Erreur: "Cannot find module '../models/index'"

**Cause**: Import incorrect ou fichier manquant

**Solution**:
```typescript
// ❌ MAUVAIS
import { User } from '../models';

// ✅ BON
import { User } from '../models/index';
// ou
import { User } from '../models';  // Si index est bien nommé
```

Vérifiez que `src/app/models/index.ts` existe.

---

### 2. Service non disponible dans le composant

**Cause**: Service non déclaré dans SharedModule

**Solution**:
1. Assurez-vous que le service est importé dans `SharedModule`
2. Vérifiez que le service est dans `providers: [...]`
3. Importer SharedModule dans votre FeatureModule

```typescript
// Dans votre feature module
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [SharedModule],
  // ...
})
export class MaFeatureModule { }
```

---

### 3. Erreur 401 (Unauthorized) à chaque requête

**Cause**: Token non valide ou not in localStorage

**Solution**:
1. Vérifiez que vous êtes connecté: `this.authService.isLoggedIn()`
2. Vérifiez le token en devtools: `localStorage.getItem('access_token')`
3. Rechargez et reconnectez-vous
4. Vérifiez que l'intercepteur fonctionne:

```typescript
// Dans browser console
localStorage.getItem('access_token')
// Doit afficher un long token JWT
```

---

### 4. CORS Error

**Cause**: Le backend ne permet pas les requêtes du frontend

**Solution** (côté backend NestJS):
```typescript
// main.ts
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true
});
```

**Frontend**: Vérifiez que l'URL du backend est correcte:
```typescript
// environment.ts
export const environment = {
  apiUrl: 'http://localhost:3000'  // Doit correspondre au backend
};
```

---

### 5. Observable subscription leak

**Cause**: Oublier de se désabonner ou utiliser le bon pattern

**Solution** (utiliser async pipe):
```typescript
// ❌ MAUVAIS - Peut causer des fuites mémoire
export class MyComponent {
  eleves: Eleve[];

  constructor(private eleveService: EleveService) {
    this.eleveService.listEleves().subscribe(
      data => this.eleves = data
    );
  }
}

// ✅ BON - Async pipe se désabonne automatiquement
export class MyComponent {
  eleves$ = this.eleveService.listEleves();

  constructor(private eleveService: EleveService) {}
}

// Template
<div *ngFor="let eleve of eleves$ | async">
  {{ eleve.nom }}
</div>
```

---

### 6. Type 'any' Utilisé Partout

**Cause**: Interfaces manquantes ou imports incorrect

**Solution**:
```typescript
// ❌ MAUVAIS
const response: any = await this.api.get(...);

// ✅ BON
import { User } from '../models/index';
const response: User = await this.api.get(...);
```

---

### 7. Erreur: "Cannot read property 'token' of undefined"

**Cause**: Réponse API différente de celle attendue

**Solution**:
1. Vérifiez que la réponse API correspond à l'interface:

```typescript
// Vérifiez la structure réelle du backend
// Utilisez Postman pour tester

// Interface (models/index.ts)
export interface LoginResponse {
  access_token: string;
  mot_de_passe_change: boolean;
  role: string;
}

// Service
login(email: string, mot_de_passe: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
    email,
    mot_de_passe
  });
}
```

2. Testez d'abord l'endpoint avec Postman

---

### 8. SharedModule / Service non trouvé dans un lazy-loaded module

**Cause**: Lazy-loaded modules doivent importer SharedModule

**Solution**:
```typescript
// Dans chaque feature module
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [MyComponent],
  imports: [SharedModule]  // ← IMPORTANT
})
export class FeatureModule { }
```

---

### 9. Routes non définies

**Cause**: Routes pas configurées ou AuthGuard bloquant

**Solution**:
```typescript
// app-routing-module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],  // Vérifie que vous êtes connecté
    loadChildren: () => import('./pages/dashboard/dashboard-module')
      .then(m => m.DashboardModule)
  }
];
```

---

### 10. TypeError: "Cannot read property of undefined"

**Cause**: Accès à des propriétés avant que les données ne chargent

**Solution**:
```typescript
// ❌ MAUVAIS
export class Component {
  eleve = this.service.getEleve(id);
  nom = this.eleve.nom;  // undefined!
}

// ✅ BON
export class Component {
  eleve$ = this.service.getEleve(id);

  // Dans le template avec async pipe
  // ou dans le subscribe
  constructor(private service: Service) {
    this.eleve$.subscribe(eleve => {
      console.log(eleve.nom);  // Maintenant défini
    });
  }
}
```

---

## 🔍 Checklist de Dépannage

- [ ] Le backend est lancé sur `http://localhost:3000`
- [ ] La base de données PostgreSQL est connectée
- [ ] Vérifiez les logs du backend pour les erreurs
- [ ] Ouvrez DevTools (F12) pour voir les erreurs console
- [ ] Vérifiez l'onglet Network pour les requêtes HTTP
- [ ] Testez les endpoints avec Postman d'abord
- [ ] Vérifiez localStorage pour le token: `localStorage.getItem('access_token')`
- [ ] Vérifiez que tous les services sont dans SharedModule
- [ ] Assurez-vous que le module est importé correctement
- [ ] Vérifiez les versions npm avec `npm list`

---

## 📊 Commandes Utiles

### Démarrer l'application
```bash
npm start
# ou
ng serve
```

### Compiler uniquement (sans serveur)
```bash
ng build
```

### Lancer les tests
```bash
npm test
# ou
ng test
```

### Vérifier les erreurs TypeScript
```bash
npx tsc --noEmit
```

---

## 🛠️ Outils Recommandés

1. **Postman** - Tester les endpoints API
2. **Redux DevTools** - Déboguer l'état (si utilisé)
3. **Angular DevTools** - Extension Chrome pour Angular
4. **Network Tab** - Déboguer les requêtes HTTP
5. **Console** - Vérifier les erreurs JavaScript

---

## 📝 Logs Utiles

### Vérifier que le service est chargé
```typescript
console.log(this.eleveService);  // Doit afficher l'instance
```

### Vérifier les données d'une requête
```typescript
this.eleveService.listEleves().pipe(
  tap(data => console.log('Élèves reçus:', data)),
  catchError(error => {
    console.error('Erreur:', error);
    return throwError(() => error);
  })
).subscribe();
```

### Vérifier le token
```typescript
console.log('Token:', localStorage.getItem('access_token'));
console.log('Rôle:', localStorage.getItem('role'));
console.log('Connecté:', this.authService.isLoggedIn());
```

---

## 🌐 Requête avec Postman

Pour tester un endpoint avant de l'utiliser en frontend:

1. Ouvrez Postman
2. Créez une nouvelle requête
3. Sélectionnez le type (GET, POST, etc.)
4. Entrez l'URL: `http://localhost:3000/endpoint`
5. Ajoutez un header: `Authorization: Bearer <token>`
6. Entrez le body en JSON (pour POST/PATCH)
7. Cliquez Send

---

## 💡 Tips

- Utilisez **async pipe** au lieu de subscribe dans les templates
- **RxJS Operators**: pipe(), tap(), catchError(), map()
- **DevTools**: Inspecter les requêtes HTTP en Network tab
- **Logs**: Ajouter des console.log() temporaires pour déboguer
- **Tests**: Écrire des tests pour vérifier les services

---

**Dernière mise à jour**: 28 mai 2026
