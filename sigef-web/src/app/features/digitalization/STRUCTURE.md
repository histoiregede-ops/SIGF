# Architecture et Structure - Interface de Digitalisation

## 🏗️ Architecture générale

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Angular 18                   │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  App Module       │
                    │  App Routing      │
                    └─────────┬─────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼───┐         ┌──────▼───┐        ┌──────▼───┐
    │  Auth  │         │ Features │        │  Other   │
    │ Module │         │ Modules  │        │ Modules  │
    └────────┘         └──────┬───┘        └──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
    ┌────▼────┐         ┌──────▼──────┐        ┌────▼────┐
    │ Commun  │         │Digitalisation◄───── │Indexation│
    │ Module  │         │   Module    │        │ Module  │
    └─────────┘         └──────┬──────┘        └─────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
    ┌───▼────┐          ┌────────▼──────┐       ┌──────▼──┐
    │Services │          │  Components   │       │ Models  │
    └────┬────┘          └────────┬──────┘       └─────────┘
         │                        │
    ┌────▼──────────┐       ┌─────▼───────────┐
    │Title Document │       │Title             │
    │Service (RxJS) │       │Digitalization   │
    └───────────────┘       └─────┬───────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
            ┌───────▼────┐  ┌─────▼────┐ ┌────▼────────┐
            │   Image    │  │ Metadata  │ │   Sections  │
            │   Viewer   │  │  Editor   │ │  (1-5)      │
            └────────────┘  └──────────┘ └─────────────┘
```

## 📁 Arborescence des fichiers

### Racine du module

```
digitalization/
├── index.ts                        # Exports publics
├── config.ts                       # Configuration globale
├── digitalization.module.ts        # Module Angular
├── digitalization-routing.module.ts # Routes du module
└── digitalization.module.spec.ts   # Tests unitaires
```

### Composants (8 fichiers)

```
components/
├── title-digitalization.component.ts     # Composant principal
├── title-digitalization.component.html   # Template principal
├── title-digitalization.component.scss   # Styles principaux
│
├── image-viewer/
│   ├── image-viewer.component.ts         # Logique du viewer
│   ├── image-viewer.component.html       # Template viewer
│   └── image-viewer.component.scss       # Styles viewer
│
└── metadata-editor/
    ├── metadata-editor.component.ts      # Logique éditeur
    ├── metadata-editor.component.html    # Template éditeur
    ├── metadata-editor.component.scss    # Styles éditeur
    │
    └── sections/ (10 fichiers)
        ├── section1.component.ts         # Désignation
        ├── section1.component.html
        ├── section2.component.ts         # Modifications
        ├── section2.component.html
        ├── section3.component.ts         # Propriété
        ├── section3.component.html
        ├── section4.component.ts         # Mutations
        ├── section4.component.html
        ├── section5.component.ts         # Privilèges
        └── section5.component.html
```

### Services (1 fichier)

```
services/
└── title-document.service.ts
    ├── getCurrentDocument()
    ├── getCompletionMetrics()
    ├── updateSection()
    ├── updateSectionStatus()
    ├── setOCRStatus()
    ├── setDocumentStatus()
    ├── resetDocument()
    └── exportDocument()
```

### Modèles (1 fichier)

```
models/
└── title-document.model.ts
    ├── TitleDocument
    ├── DocumentPage
    ├── TitleMetadata
    ├── DesignationSection
    ├── ModificationsConsistance
    ├── ModificationsPropertyRight
    ├── Mutations
    ├── PrivilegesHypothecs
    └── Autres interfaces...
```

### Documentation (6 fichiers)

```
Documentation/
├── README.md              # Documentation complète
├── QUICK_START.md        # Guide de démarrage rapide
├── INSTALLATION.md       # Instructions d'installation
├── FEATURES.md           # Liste des fonctionnalités
├── STRUCTURE.md          # Ce fichier
└── EXAMPLES.ts           # Exemples d'utilisation
```

## 🔄 Flux de données

### 1. Chargement du document

```
┌─────────────────────┐
│ TitleDigitaliz...   │
│ Component OnInit    │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────────────┐
│ TitleDocumentService             │
│ getCurrentDocument()              │
│ (Observable<TitleDocument | null>)│
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Initialize Default Document      │
│ - id, folderId, pages            │
│ - metadata sections              │
│ - completion percentage          │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ BehaviorSubject<TitleDocument>   │
│ currentDocument$                 │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Composants subscribed            │
│ - TitleDigitalization            │
│ - MetadataEditor                 │
└──────────────────────────────────┘
```

### 2. Mise à jour d'une section

```
User fills form in SectionX
        │
        ▼
Clicks "Enregistrer" button
        │
        ▼
onSave() method called
        │
        ▼
statusChange.emit('in_progress')
        │
        ▼
Parent: updateSectionStatus()
        │
        ▼
TitleDocumentService.updateSectionStatus()
        │
        ▼
updateSection(sectionKey, data)
        │
        ▼
Merge & update metadata
        │
        ▼
currentDocument$.next(updatedDoc)
        │
        ▼
updateCompletionMetrics()
        │
        ▼
completionMetrics$.next(metrics)
        │
        ▼
All subscribed components update
```

### 3. Calcul de la progression

```
updateCompletionMetrics()
        │
        ▼
Loop through 5 sections
        │
        ├─ Check section1.status
        ├─ Check section2.status
        ├─ Check section3.status
        ├─ Check section4.status
        └─ Check section5.status
        │
        ▼
Count completed sections
        │
        ▼
Calculate percentage
(completedSections / totalSections) * 100
        │
        ▼
Build CompletionMetrics
        │
        ▼
completionMetrics$.next()
        │
        ▼
Header updates progress bar
```

## 🎨 Système de styles

### Architecture SCSS

```
title-digitalization.component.scss
├── Import fonts
├── Variables & Colors
│   ├── $primary-color: #2563eb
│   ├── $success-color: #16a34a
│   ├── $warning-color: #ea580c
│   └── ...
├── Mixins
│   ├── @mixin smooth-transition
│   └── @mixin subtle-shadow
├── Main header styles
│   ├── .digitalization-header
│   ├── .header-left/center/right
│   ├── .folder-title
│   ├── .progress-container
│   └── .action-button
├── Main container
│   ├── .digitalization-container
│   ├── .viewer-column
│   └── .editor-column
└── Responsive media queries

metadata-editor.component.scss
├── Variables & Mixins
├── Accordion styles
│   ├── .collapsible-section
│   ├── .section-header
│   ├── .section-content
│   └── .section-footer
├── Form elements
│   ├── .form-group
│   ├── .form-label
│   ├── .form-input
│   ├── .form-textarea
│   └── .form-input-group
├── Status badges
├── Subsections
└── Responsive

image-viewer.component.scss
├── Container & layout
├── Toolbar styles
├── Image display
├── Controls styling
└── Responsive & print

sections.component.scss
(uses parent styles from metadata-editor)
```

## 🔄 Cycle de vie des composants

### TitleDigitalizationComponent

```
Constructor
    │
    ▼
ngOnInit()
    │
    ├─ Subscribe to getCurrentDocument()
    │   └─ Update this.document & this.totalPages
    │
    ├─ Subscribe to getCompletionMetrics()
    │   └─ Update this.metrics
    │
    └─ Initialize currentPage = 1
    
    │
    ▼
Component renders
    │
    ├─ Renders header with folder title
    ├─ Renders progress bar
    ├─ Renders OCR status badge
    ├─ Renders action button
    ├─ Renders ImageViewerComponent
    └─ Renders MetadataEditorComponent
    
    │
    ▼
User interactions
    │
    ├─ Click page nav
    ├─ Fill form sections
    ├─ Update status
    └─ Change document status
    
    │
    ▼
ngOnDestroy()
    │
    └─ Complete destroy$ subject
       (triggers takeUntil unsubscription)
```

### MetadataEditorComponent

```
@Input() metadata!: TitleMetadata
@Input() expandedSections object

Constructor → FormBuilder injected

ngOnInit() → Nothing (metadata is input)

Render loop:
    │
    ├─ app-section1
    │   └─ Pass section1 & status
    │
    ├─ app-section2
    │   └─ Pass section2 & status
    │
    └─ etc...

User interaction in Section:
    │
    ├─ toggleExpand() → Update expandedSections
    │
    └─ onSave() → @Output statusChange
                   → Parent updates service
```

### SectionComponents (1-5)

```
@Input() section: DesignationSection|etc
@Input() isExpanded: boolean
@Output() toggleExpand: EventEmitter
@Output() statusChange: EventEmitter<SectionStatus>

Constructor → FormBuilder injected

ngOnInit() → initializeForm()
    │
    └─ Create FormGroup
       ├─ Add form controls
       └─ Patch initial values

ngOnChanges() (if input changes)
    │
    └─ updateForm()
       └─ Re-patch values

Render section accordion:
    │
    ├─ Header with toggle button
    ├─ Form fields (if expanded)
    └─ Save button & status badge

User interaction:
    │
    ├─ Click toggle → toggleExpand.emit()
    │
    ├─ Fill form → Form state changes
    │
    └─ Click save → onSave()
                    └─ Validate & emit statusChange
```

## 📊 État et réactivité (RxJS)

### BehaviorSubjects

```
TitleDocumentService
│
├─ currentDocument$: BehaviorSubject<TitleDocument | null>
│  ├─ Initial: defaultDocument
│  ├─ Emits when: Document updated, status changed
│  └─ Consumers: All components
│
└─ completionMetrics$: BehaviorSubject<CompletionMetrics | null>
   ├─ Initial: null
   ├─ Emits when: Section status changes
   └─ Consumers: Header, Metrics display
```

### Observables

```
getCurrentDocument(): Observable<TitleDocument | null>
    └─ return this.currentDocument$.asObservable()

getCompletionMetrics(): Observable<CompletionMetrics | null>
    └─ return this.completionMetrics$.asObservable()

isSectionComplete(sectionKey): Observable<boolean>
    └─ return this.currentDocument$.pipe(
         map(doc => doc?.metadata[sectionKey].status === 'completed')
       )

exportDocument(): Observable<TitleDocument | null>
    └─ return this.currentDocument$.asObservable()
```

### Pipe Operators utilisés

```
takeUntil(destroy$)
    └─ Unsubscribe quand destroy$ émet
       (gestion automatique des memory leaks)

map(doc => ...)
    └─ Transformer les données

filter(...)
    └─ Filtrer selon conditions
```

## 🧩 Points d'intégration

### Avec le backend

```
TitleDocumentService
    │
    └─ Peut être étendu avec:
       ├─ HttpClient injection
       ├─ API calls (GET/POST/PUT)
       ├─ Error handling
       └─ Retry logic
```

### Avec l'OCR

```
ImageViewerComponent
    │
    ├─ Load image from OCR service
    │
    └─ MetadataEditor
       └─ Pre-fill form fields with OCR results
          └─ Add confidence badges
```

### Avec l'authentification

```
App Routing
    │
    └─ AuthGuard on digitalization route
       │
       ├─ canLoad check
       ├─ Redirect if not authenticated
       └─ Allow if authenticated
```

## 🎯 Bonnes pratiques implémentées

1. **Séparation des responsabilités**
   - Service: Gestion de l'état
   - Composants: Présentation
   - Modèles: Interfaces de données

2. **Réactivité**
   - RxJS Observables
   - Gestion automatique des souscriptions
   - BehaviorSubjects pour l'état

3. **Accessibilité**
   - Sémantique HTML
   - ARIA labels
   - Navigation au clavier

4. **Performance**
   - Lazy loading du module
   - Composants standalone
   - Change detection optimisée

5. **Maintenabilité**
   - Code bien documenté
   - Structure claire
   - Tests inclus
   - Configuration centralisée

---

## 📈 Flux d'interaction utilisateur

```
Utilisateur ouvre /digitalization
        │
        ▼
TitleDigitalizationComponent charge
        │
        ├─ Service initialise document par défaut
        │
        ├─ Header affiche titre & progression
        │
        ├─ ImageViewer affiche document
        │
        └─ MetadataEditor affiche sections repliées
                │
                ▼
Utilisateur ouvre Section 1
                │
                ▼
Form fields visibles
                │
                ├─ Remplit les champs
                │
                ▼
Clique "Enregistrer"
                │
                ▼
Section status passe de "empty" à "in_progress"
                │
                ├─ Badge change couleur
                ├─ Progression globale augmente
                ├─ Métriques se mettent à jour
                │
                ▼
Les autres sections se mettent à jour
                │
                ▼
Processus se répète pour autres sections
                │
                ▼
Quand toutes les sections sont "completed"
                │
                ▼
Progression atteint 100%
                │
                ▼
Utilisateur clique "Marquer comme complété"
                │
                ▼
Document.status = 'completed'
                │
                ▼
Bouton d'action devient disabled
```

---

**Architecture complète et cohérente! 🏗️**
