# Interface de Digitalisation de Titre Foncier

## Vue d'ensemble

Cette interface web desktop est conçue pour la numérisation et la saisie des métadonnées de titres fonciers. Elle offre une expérience utilisateur optimisée pour les agents de saisie de données avec une interface deux colonnes : un viewer d'image à gauche et un panneau de saisie à droite.

## Architecture

```
digitalization/
├── components/
│   ├── title-digitalization.component.*      # Composant principal
│   ├── image-viewer/                         # Composant viewer d'image
│   │   ├── image-viewer.component.ts
│   │   ├── image-viewer.component.html
│   │   └── image-viewer.component.scss
│   └── metadata-editor/                      # Composant éditeur de métadonnées
│       ├── metadata-editor.component.ts
│       ├── metadata-editor.component.html
│       ├── metadata-editor.component.scss
│       └── sections/                         # Composants des 5 sections
│           ├── section1.component.*          # Désignation et description
│           ├── section2.component.*          # Modifications consistance
│           ├── section3.component.*          # Modifications droit propriété
│           ├── section4.component.*          # Mutations
│           └── section5.component.*          # Privilèges et hypothèques
├── models/
│   └── title-document.model.ts               # Modèles de données
├── services/
│   └── title-document.service.ts             # Service de gestion
├── digitalization.module.ts
└── digitalization-routing.module.ts
```

## Caractéristiques principales

### 1. **Image Viewer (Colonne gauche)**
- Affichage haute résolution du document scanné
- Zoom (50% - 300%) avec réinitialisation
- Rotation (90°, 180°, 270°)
- Navigation entre les pages
- Mode plein écran
- Interface de contrôle intuitive avec icônes SVG

### 2. **Panneau de Saisie (Colonne droite)**
Cinq sections repliables/accordéons:

#### Section I - Désignation et description de l'immeuble
- Nature et consistance de l'immeuble
- Contenance
- Situation
- Limites
- Rappel des ventes (10 dernières années)

#### Section II - Modifications dans la consistance
- **Augmentations**: designation, nature, contenance, prix d'acquisition
- **Diminutions**: designation, nature, contenance, prix d'aliénation

#### Section III - Modifications dans l'exercice du droit
- **A. Droits réels**: démembrement, bail, charges, servitudes
- **B. Clauses d'indisponibilité**: restrictions temporaires

#### Section IV - Mutations
- Date d'inscription
- Propriétaire/Acquéreur (nom, profession, domicile)
- Prix d'acquisition

#### Section V - Privilèges et hypothèques
- **Constitution**: créancier, montant, intérêt
- **Libération**: date, montant, intérêt

### 3. **Header (En haut)**
- Titre du dossier
- Barre de progression globale avec pourcentage
- Indicateur sections complétées
- Badge de statut OCR
- Bouton d'action principal (Commencer/Marquer comme complété)

### 4. **Indicateurs de statut**
Chaque section affiche un badge avec l'état:
- **Vide** (gris): Aucune donnée
- **En cours** (orange): En cours de saisie
- **Complété** (vert): Section terminée
- **À corriger** (bleu): Données à revoir

### 5. **Design & UX**
- Minimaliste et professionnel
- Palette de couleurs moderne et sobre
- Typographie Inter (Google Fonts)
- Animations douces et transitions
- Responsive (fonctionne sur desktop, tablette, mobile)
- Ombres légères et bordures fines
- Espacements généreux

## Installation et utilisation

### 1. Navigation
```
Application > Digitalisation
URL: http://localhost:4200/digitalization
```

### 2. Démarrer une numérisation
```typescript
// Dans tout composant
import { TitleDocumentService } from './services/title-document.service';

constructor(private titleService: TitleDocumentService) {}

// Le document est automatiquement chargé au démarrage
```

### 3. Accéder aux données
```typescript
// Obtenir le document courant
this.titleService.getCurrentDocument().subscribe(doc => {
  console.log(doc);
});

// Obtenir les métriques de complétion
this.titleService.getCompletionMetrics().subscribe(metrics => {
  console.log(metrics.percentage); // 0-100
});
```

### 4. Mettre à jour les données
```typescript
// Mettre à jour une section
const updatedSection = {
  ...this.section,
  nature: 'Nouvelle valeur'
};
this.titleService.updateSection('section1', updatedSection);

// Mettre à jour le statut d'une section
this.titleService.updateSectionStatus('section1', 'completed');

// Mettre à jour le statut OCR
this.titleService.setOCRStatus('completed');
```

## Modèles de données

### TitleDocument
```typescript
{
  id: string;
  folderId: string;
  folderName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  ocrStatus: 'not_started' | 'processing' | 'completed' | 'failed';
  pages: DocumentPage[];
  metadata: TitleMetadata;
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### CompletionMetrics
```typescript
{
  totalSections: number;
  completedSections: number;
  percentage: number;
  sectionStates: {
    [key: string]: SectionStatus;
  };
}
```

## Personnalisation

### Couleurs
Modifiez les variables SCSS dans [title-digitalization.component.scss](components/title-digitalization.component.scss):
```scss
$primary-color: #2563eb;
$success-color: #16a34a;
$warning-color: #ea580c;
$danger-color: #dc2626;
```

### Sections
Pour ajouter une nouvelle section:
1. Ajouter le modèle dans `title-document.model.ts`
2. Créer un nouveau composant `sectionN.component.ts`
3. L'ajouter dans `metadata-editor.component.ts`

### Intégration API
Le service `TitleDocumentService` peut être facilement étendu pour faire des appels HTTP:
```typescript
// Dans title-document.service.ts
constructor(private http: HttpClient) {}

loadDocument(id: string): Observable<TitleDocument> {
  return this.http.get<TitleDocument>(`/api/documents/${id}`)
    .pipe(
      tap(doc => this.currentDocument$.next(doc))
    );
}
```

## Performance

- Composants standalone (lazy loading par défaut)
- Détection de changement OnPush possible
- Scrollbar personnalisée pour le panneau de droite
- Images optimisées avec transformation au zoom
- Animations GPU-accélérées

## Accessibilité

- Labels explicites pour tous les champs
- Navigation au clavier
- Contraste des couleurs conforme WCAG
- ARIA labels sur les boutons
- Structure sémantique HTML

## Responsive

L'interface s'adapte automatiquement:
- **Desktop** (>1200px): Deux colonnes côte à côte
- **Tablette** (768px-1200px): Deux colonnes mais plus étroites
- **Mobile** (<768px): Une colonne avec sections empilées

## Technologies utilisées

- **Angular 18**: Framework frontend
- **Bootstrap 5 / ng-bootstrap**: Composants UI
- **Reactive Forms**: Gestion des formulaires
- **RxJS**: Gestion réactive des données
- **SCSS**: Stylisation avancée
- **TypeScript**: Typage fort

## Déploiement

L'interface est prête pour:
- Build de production: `ng build --configuration production`
- Compilation AOT incluse
- Tree-shaking automatique
- Code splitting par feature

## Support et maintenance

- Logs de console pour déboggage
- Validation des données au niveau du formulaire
- Gestion des erreurs avec modales
- Messages de confirmation avant suppression
- Historique des modifications avec timestamps

## Prochaines étapes possibles

1. **Intégration OCR**: Pré-remplissage automatique des champs
2. **Scan de documents**: Upload directement depuis l'interface
3. **Export PDF**: Générer un PDF avec les données saisies
4. **Vérification**: Outils de validation des données
5. **Collaboration**: Partage et commentaires sur les sections
6. **Historique**: Versionning des modifications
7. **Templates**: Modèles pour différents types de propriétés

---

**Version**: 1.0.0  
**Dernière mise à jour**: Mai 2026
