# Vérification de l'Installation

## ✅ Checklist de vérification - Interface Digitalization

### 1. Fichiers créés

```bash
# Vérifier que tous les fichiers sont présents
ls -la src/app/features/digitalization/

# Doit afficher:
# ✓ components/
# ✓ services/
# ✓ models/
# ✓ *.module.ts
# ✓ *.spec.ts
# ✓ config.ts
# ✓ index.ts
# ✓ README.md
# etc.
```

### 2. Compilation

```bash
# Compiler le projet
ng build --configuration development

# Doit terminer SANS erreurs
# Doit afficher: "✓ build successful"
```

### 3. TypeScript

```bash
# Vérifier qu'il n'y a pas d'erreurs TypeScript
ng build

# Ou vérifier directement le dossier
npx tsc --noEmit src/app/features/digitalization/

# Doit retourner: "0 errors"
```

### 4. Démarrage de l'application

```bash
# Lancer l'application
npm start

# Doit afficher:
# ✓ Compiling... 
# ✓ Successfully compiled after X ms
# ✓ Application bundle generated successfully

# L'application devrait être accessible à:
# http://localhost:4200
```

### 5. Navigation vers l'interface

```bash
# Dans le navigateur, accédez à:
http://localhost:4200/digitalization

# Doit charger l'interface digitalization
```

### 6. Vérification visuelle

#### Header
- [ ] Titre du dossier visible
- [ ] Barre de progression affichée
- [ ] Pourcentage affiché (35%)
- [ ] Badge OCR visible (vert)
- [ ] Bouton "Commencer la numérisation" visible

#### Colonne gauche (Viewer)
- [ ] Image affichée
- [ ] Barre d'outils visible en haut
- [ ] Barre d'outils visible en bas
- [ ] Buttons zoom (+/-, %)
- [ ] Button rotation
- [ ] Button plein écran
- [ ] Page info affichée (1/2)

#### Colonne droite (Métadonnées)
- [ ] Section 1 visible (titre)
- [ ] Section 1 peut s'ouvrir/fermer
- [ ] Section 2, 3, 4, 5 visibles
- [ ] Badges de statut visibles
- [ ] Champs de saisie visibles (quand ouvert)

### 7. Tests d'interaction

#### Image Viewer
```javascript
// F12 -> Console
// Zoom
document.querySelector('.toolbar-btn').click(); // Zoom in
// Doit augmenter le zoom de 10%

// Rotation
// Doit tourner l'image
```

#### Métadonnées
```javascript
// Ouvrir une section
document.querySelector('.section-header').click();
// Doit afficher les champs

// Remplir un champ
document.querySelector('input').value = 'Test';
// Doit accepter l'input

// Cliquer Enregistrer
document.querySelector('.save-button').click();
// Doit mettre à jour le badge de statut
```

#### Progression
```javascript
// Vérifier que la progression change
// Ouvrir une section et remplir un champ
// Observer la barre de progression

// Doit augmenter
```

### 8. Vérification des logs

```bash
# F12 -> Console
# Doit afficher:
# ✓ Pas d'erreurs rouges
# ✓ Pas d'avertissements
# ✓ Les observables reçoivent les données

# Taper dans la console:
ng.probe(ng.getAllAngularRootElements()[0]).injector.get('TitleDocumentService').getCurrentDocument().subscribe(doc => console.log(doc))

# Doit afficher le document courant
```

### 9. Tests unitaires

```bash
# Lancer les tests
ng test

# Doit afficher:
# ✓ Tests passés
# ✓ Code coverage > 80%

# Ou spécifiquement:
ng test --watch=false --code-coverage --include='**/digitalization/**'
```

### 10. Build production

```bash
# Build pour la production
ng build --configuration production

# Doit afficher:
# ✓ build successful
# ✓ Total bundle sizes:
#   - main-HASH.js: X KB
#   - styles-HASH.css: Y KB

# Fichiers dans dist/sigef-web/
```

### 11. Responsivité

```bash
# F12 -> Device Toolbar

# Desktop (> 1200px)
# [ ] Deux colonnes côte à côte
# [ ] Espacements généreux

# Tablet (768px-1200px)
# [ ] Deux colonnes réduites
# [ ] Interface adaptée

# Mobile (< 768px)
# [ ] Une colonne empilée
# [ ] Viewer en haut
# [ ] Métadonnées en bas
# [ ] Boutons plus grands
```

### 12. Accessibilité

```bash
# F12 -> Lighthouse

# [ ] Score Accessibility > 90
# [ ] Pas d'erreurs WCAG

# Ou tester au clavier:
# [ ] Tab navigation fonctionne
# [ ] Focus visible sur les éléments
# [ ] Formulaires navigables
```

### 13. Performance

```bash
# F12 -> Performance

# [ ] First Contentful Paint < 2s
# [ ] Largest Contentful Paint < 2.5s
# [ ] Cumulative Layout Shift < 0.1

# Bundle size
# [ ] Main bundle < 600 KB gzippé
# [ ] Total < 1 MB gzippé
```

---

## 🐛 Troubleshooting

### L'interface ne s'affiche pas

```bash
# 1. Vérifier la route
grep -n "digitalization" src/app/app-routing.module.ts

# 2. Vérifier le module
ls src/app/features/digitalization/digitalization.module.ts

# 3. Vérifier la compilation
ng build

# 4. Vérifier les logs
F12 -> Console -> Chercher les erreurs
```

### Les styles ne s'appliquent pas

```bash
# 1. Vérifier les imports SCSS
grep -n "@import" src/app/features/digitalization/components/*.scss

# 2. Vérifier les variables SCSS
grep -n "\$primary-color" src/app/features/digitalization/components/*.scss

# 3. Hard refresh (Ctrl+Shift+R sur Windows)
# Cmd+Shift+R sur Mac
```

### Le service ne fonctionne pas

```bash
# 1. Vérifier le service
ng generate service services/title-document --dry-run

# 2. Vérifier l'injection
grep -n "constructor(private titleService" src/app/features/digitalization/components/title-digitalization.component.ts

# 3. Vérifier les observables
# F12 -> Console
ng.probe(...).injector.get('TitleDocumentService').getCurrentDocument().subscribe(console.log)
```

### Les images ne chargent pas

```bash
# 1. Vérifier le chemin
grep -n "imageUrl" src/app/features/digitalization/services/title-document.service.ts

# 2. Vérifier les assets
ls public/assets/

# 3. Créer les dossier si nécessaire
mkdir -p public/assets/
# Puis ajouter les images

# 4. Mettre à jour le service
# Modifier imageUrl dans title-document.service.ts
```

---

## ✨ Points à vérifier avant la production

- [ ] Compilation sans erreurs
- [ ] TypeScript strict OK
- [ ] Tests passés
- [ ] Coverage > 80%
- [ ] Performance acceptable
- [ ] Responsive OK
- [ ] Accessibilité OK
- [ ] Pas de console.log en production
- [ ] Pas de debugger statements
- [ ] Authentification fonctionne
- [ ] API peut être intégrée
- [ ] Logs propres
- [ ] Pas de memory leaks
- [ ] Bundle size acceptable

---

## 🚀 Commandes utiles

```bash
# Développement
npm start                      # Démarrer avec hot reload
npm run dev                    # Port 4205

# Build
ng build                       # Development
ng build --configuration production  # Production
ng build --watch              # Watch mode

# Tests
ng test                        # Tests + watch
ng test --watch=false         # Tests une fois
ng test --code-coverage       # Avec coverage

# Linting (si configuré)
ng lint

# Nettoyage
rm -rf dist/
rm -rf node_modules/
npm ci                         # Clean install
```

---

## 📊 Checklist finale

```
VÉRIFICATION COMPLÈTE
═══════════════════════════════════════════════

Fichiers créés
  [ ] 24+ fichiers présents
  [ ] Structure complète
  
Compilation
  [ ] ng build réussit
  [ ] Pas d'erreurs TypeScript
  [ ] Pas de warnings critiques
  
Exécution
  [ ] Application démarre
  [ ] Route accessible
  [ ] Interface charge

Visuels
  [ ] Header correct
  [ ] Viewer d'image OK
  [ ] Métadonnées visibles
  [ ] Sections repliables
  
Interaction
  [ ] Zoom fonctionne
  [ ] Rotation fonctionne
  [ ] Champs editable
  [ ] Progression se met à jour
  
Responsive
  [ ] Desktop OK
  [ ] Tablet OK
  [ ] Mobile OK
  
Performance
  [ ] Bundle size OK
  [ ] Performance acceptable
  [ ] Pas de memory leaks
  
Documentation
  [ ] README présent
  [ ] Exemples fournis
  [ ] Architecture documentée
  [ ] Tests inclus

✅ READY FOR PRODUCTION
```

---

**Tout vérifier avant de déployer! ✓**
