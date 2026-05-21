# Guide de Démarrage Rapide - Digitalisation de Titre Foncier

## ✅ Installation

### 1. Vérifier les dépendances
```bash
npm install
# ou
yarn install
```

Les packages requis sont déjà dans `package.json`:
- `@angular/core@^18.2.0`
- `@angular/forms@^18.2.0`
- `@ng-bootstrap/ng-bootstrap@^17.0.0`

### 2. Lancer l'application
```bash
# Port par défaut
npm start

# Port personnalisé
npm run dev  # Port 4205
```

L'application sera disponible à: `http://localhost:4200`

## 🚀 Accès à l'Interface

### URL directe
```
http://localhost:4200/digitalization
```

### Depuis le menu
Si vous avez ajouté un lien dans le menu principal, cliquez dessus.

## 📋 Utilisation de Base

### 1. Vue d'ensemble
L'interface affiche:
- **Gauche**: Viewer d'image du document (avec zoom, rotation, pagination)
- **Droite**: Panneau d'édition des métadonnées (5 sections repliables)
- **Haut**: Header avec progression et statut

### 2. Navigation dans le document
```
Boutons de navigation en bas du viewer:
◀ Précédent | Page 1/2 | Suivant ▶
```

### 3. Contrôles du viewer
```
Zoom:        🔍- (zoom out) | 100% | 🔍+ (zoom in)
Rotation:    ↻ (pivoter) | ↻↻ (réinitialiser)
Plein écran: ⛶ (activer/désactiver)
```

### 4. Remplir les données
1. Cliquez sur une section pour l'ouvrir
2. Remplissez les champs (certains peuvent être pré-remplis par OCR)
3. Cliquez sur **"Enregistrer"** en bas de la section
4. Le badge de statut se met à jour

## 🎯 Sections à compléter

### I - Désignation et description (Obligatoire)
- **Nature**: Terre, Bâtiment, Terrain nu...
- **Contenance**: Superficie (ha, m², etc.)
- **Situation**: Localisation géographique
- **Limites**: Description des frontières
- **Ventes 10 ans**: Historique des transactions

### II - Modifications consistance (Optionnel)
- **Augmentations**: Agrandissements du bien
- **Diminutions**: Réductions du bien

### III - Modifications droit propriété (Optionnel)
- **A - Droits réels**: Servitudes, bails, charges
- **B - Clauses**: Restrictions temporaires

### IV - Mutations (Optionnel)
- **Propriétaire**: Nom, profession, domicile
- **Date**: Date de la mutation
- **Prix**: Prix d'acquisition

### V - Privilèges et hypothèques (Optionnel)
- **Constitution**: Dettes garanties
- **Libération**: Dettes payées

## 📊 Indicateurs de progression

### Barre de progression (Haut)
```
Progression globale: 35%
▓░░░░░░░░░░░░░░░░░░░░░░░░░░ 35%
Sections: 2/5 complétées
```

### Badges de statut par section
```
🔘 Vide       (gris)     - Pas de données
🟡 En cours   (orange)   - Données partielles
🟢 Complété   (vert)     - Section terminée
🔵 À corriger (bleu)     - Erreurs détectées
```

## 💾 Sauvegarde et export

### Sauvegarde automatique
- Les modifications sont automatiquement sauvegardées
- Horodatage: Dernière modification affichée

### Export des données
Pour exporter (si intégré):
1. Cliquez sur le bouton d'action principal
2. Marquez le document comme "Complété"
3. Le document peut alors être exporté/imprimé

## ⌨️ Raccourcis clavier

| Action | Raccourci |
|--------|-----------|
| Zoom avant | Ctrl + + |
| Zoom arrière | Ctrl + - |
| Réinitialiser zoom | Ctrl + 0 |
| Plein écran | F11 |
| Page précédente | ← |
| Page suivante | → |

## 🔍 Dépannage

### L'interface ne s'affiche pas
1. Vérifier que vous êtes connecté
2. Vérifier la console du navigateur (F12) pour les erreurs
3. Rafraîchir la page (Ctrl+R)

### L'image ne charge pas
1. Vérifier que le chemin vers l'image est correct
2. Vérifier les permissions d'accès au fichier
3. Vérifier que le navigateur accepte les images

### Les données ne sont pas sauvegardées
1. Vérifier que le bouton "Enregistrer" a été cliqué
2. Vérifier la connexion à l'API (si configurée)
3. Vérifier les logs de la console

### L'interface est lente
1. Vérifier la charge CPU/RAM disponible
2. Réduire le zoom de l'image
3. Utiliser un navigateur plus moderne (Chrome, Firefox, Edge)

## 🎨 Personnalisation rapide

### Changer la couleur primaire
Ouvrir: `components/title-digitalization.component.scss`
```scss
// Trouver et modifier:
$primary-color: #2563eb;  // Changer cette couleur
```

### Changer les couleurs des badges
```scss
$success-color: #16a34a;   // Vert (Complété)
$warning-color: #ea580c;   // Orange (En cours)
$danger-color: #dc2626;    // Rouge (Erreur)
```

## 📱 Responsivité

L'interface s'adapte automatiquement:

### Desktop (> 1200px)
- Deux colonnes côte à côte
- Viewer pleine hauteur
- Panneau avec scrollbar

### Tablette (768px - 1200px)
- Deux colonnes réduites
- Viewer légèrement réduit
- Panneau resserré

### Mobile (< 768px)
- Une colonne empilée
- Viewer pleine largeur
- Panneau en dessous
- Navigation simplifiée

## 📚 Ressources supplémentaires

- [Documentation complète](./README.md)
- [Modèles de données](./models/title-document.model.ts)
- [Exemples d'utilisation](./EXAMPLES.ts)
- [Service de données](./services/title-document.service.ts)

## ❓ FAQ

### Q: Comment charger un document spécifique?
A: Passez l'ID dans l'URL:
```
http://localhost:4200/digitalization/DOC-001
```

### Q: Comment pré-remplir les champs avec OCR?
A: Intégrez un service OCR qui met à jour les champs via le formulaire réactif.

### Q: Puis-je modifier les sections?
A: Oui, en modifiant les composants dans `sections/`.

### Q: Comment ajouter une nouvelle section?
A: 
1. Créer un nouveau composant `section6.component.ts`
2. L'ajouter dans `metadata-editor.component.ts`
3. Ajouter le modèle correspondant

### Q: Le zoom max est-il limité?
A: Oui, à 300%. Vous pouvez modifier dans `image-viewer.component.ts`.

### Q: Peut-on imprimer le document?
A: Oui, avec Ctrl+P. Les contrôles sont masqués à l'impression.

## 🔒 Sécurité

- Validation des formulaires côté client
- Protection CSRF si API configurée
- Authentification via AuthGuard
- Validation des images (types acceptés)

## 🚢 Déploiement

### Build de production
```bash
npm run build
# Fichiers dans dist/sigef-web
```

### Serveur
Les fichiers générés peuvent être servis par:
- Apache / Nginx
- Node.js / Express
- n'importe quel serveur web statique

## 📞 Support

Pour les problèmes ou questions:
1. Vérifier les logs de la console (F12)
2. Consulter la documentation
3. Vérifier les exemples fournis

---

**Bon travail! 🎉**  
Vous êtes maintenant prêt à utiliser l'interface de digitalisation de titre foncier.
