/**
 * EXEMPLE D'UTILISATION - Interface de Digitalisation de Titre Foncier
 * 
 * Ce fichier montre comment intégrer et utiliser l'interface de digitalisation
 * dans d'autres composants de l'application.
 */

// ============================================================================
// 1. IMPORTS ET INTÉGRATION DANS UN MODULE
// ============================================================================

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalizationModule } from './digitalization.module';

@NgModule({
  imports: [
    CommonModule,
    // Importer le module de digitalisation
    DigitalizationModule
  ]
})
export class MyFeatureModule { }

// ============================================================================
// 2. UTILISATION DANS UN COMPOSANT PARENT
// ============================================================================

import { Component, OnInit } from '@angular/core';
import { TitleDocumentService } from '../digitalization/services/title-document.service';
import { TitleDocument, CompletionMetrics } from '../digitalization/models/title-document.model';

@Component({
  selector: 'app-document-manager',
  template: `
    <div class="document-manager">
      <button (click)="openDigitalization()">Numériser un titre</button>
      
      <div *ngIf="selectedDocument">
        <!-- Afficher l'interface de digitalisation -->
        <app-title-digitalization></app-title-digitalization>
      </div>
    </div>
  `
})
export class DocumentManagerComponent implements OnInit {
  selectedDocument: TitleDocument | null = null;

  constructor(private titleService: TitleDocumentService) {}

  ngOnInit(): void {
    // Écouter les changements du document
    this.titleService.getCurrentDocument().subscribe(doc => {
      this.selectedDocument = doc;
    });
  }

  openDigitalization(): void {
    // Le document est automatiquement initialisé
    // Vous pouvez ajouter votre logique ici
  }
}

// ============================================================================
// 3. EXEMPLE: CHARGEMENT D'UN DOCUMENT DEPUIS UNE API
// ============================================================================

// Dans title-document.service.ts, vous pouvez ajouter:

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleDocumentServiceWithAPI {
  
  constructor(private http: HttpClient, private titleService: TitleDocumentService) {}

  /**
   * Charge un document depuis l'API
   */
  loadDocumentFromAPI(documentId: string) {
    return this.http.get<TitleDocument>(`/api/documents/${documentId}`)
      .subscribe(
        (document) => {
          // Mettre à jour le service avec le document chargé
          this.titleService.currentDocument$.next(document);
        },
        (error) => {
          console.error('Erreur lors du chargement du document:', error);
        }
      );
  }

  /**
   * Sauvegarde les modifications du document
   */
  saveDocument(document: TitleDocument) {
    return this.http.post(`/api/documents/${document.id}`, document)
      .subscribe(
        (response) => {
          console.log('Document sauvegardé avec succès');
        },
        (error) => {
          console.error('Erreur lors de la sauvegarde:', error);
        }
      );
  }
}

// ============================================================================
// 4. EXEMPLE: ÉCOUTER LES CHANGEMENTS ET METTRE À JOUR LES DONNÉES
// ============================================================================

export class DocumentTrackerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private titleService: TitleDocumentService) {}

  ngOnInit(): void {
    // Écouter les métriques de complétion
    this.titleService.getCompletionMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        if (metrics) {
          console.log(`Progression: ${metrics.percentage}%`);
          console.log(`Sections complétées: ${metrics.completedSections}/${metrics.totalSections}`);
          
          // Afficher une notification si tout est complété
          if (metrics.percentage === 100) {
            console.log('🎉 Digitalisation complète!');
          }
        }
      });

    // Écouter le document courant
    this.titleService.getCurrentDocument()
      .pipe(takeUntil(this.destroy$))
      .subscribe(doc => {
        if (doc) {
          console.log('Document actualisé:', doc.metadata);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// ============================================================================
// 5. EXEMPLE: ACTIONS PERSONNALISÉES
// ============================================================================

export class CustomActionsComponent {
  
  constructor(private titleService: TitleDocumentService) {}

  /**
   * Compléter une section spécifique
   */
  completeSection(sectionKey: string): void {
    this.titleService.updateSectionStatus(sectionKey as any, 'completed');
  }

  /**
   * Obtenir le statut de complétion
   */
  getCompletionStatus(): void {
    this.titleService.getCompletionMetrics().subscribe(metrics => {
      if (metrics) {
        const status = metrics.percentage === 100 ? 'COMPLÉTÉ' : `${metrics.percentage}%`;
        console.log(`État du document: ${status}`);
      }
    });
  }

  /**
   * Exporter les données
   */
  exportDocument(): void {
    this.titleService.exportDocument().subscribe(doc => {
      if (doc) {
        // Créer un JSON pour l'export
        const json = JSON.stringify(doc, null, 2);
        
        // Télécharger le fichier
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `document-${doc.id}.json`;
        link.click();
      }
    });
  }

  /**
   * Marquer le document comme complété
   */
  submitDocument(): void {
    this.titleService.setDocumentStatus('completed');
    console.log('Document soumis pour validation');
  }

  /**
   * Réinitialiser le document
   */
  resetDocument(): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le document?')) {
      this.titleService.resetDocument();
    }
  }
}

// ============================================================================
// 6. EXEMPLE: INTÉGRATION AVEC UN WORKFLOW DE VALIDATION
// ============================================================================

export class ValidationWorkflowComponent implements OnInit {
  
  constructor(private titleService: TitleDocumentService) {}

  ngOnInit(): void {
    this.setupValidationWorkflow();
  }

  private setupValidationWorkflow(): void {
    this.titleService.getCompletionMetrics().subscribe(metrics => {
      if (metrics) {
        // Si 80% complété, proposer une validation
        if (metrics.percentage >= 80 && metrics.percentage < 100) {
          this.showValidationPrompt();
        }

        // Afficher les sections incomplètes
        const incomplete = Object.entries(metrics.sectionStates)
          .filter(([_, status]) => status !== 'completed')
          .map(([key, _]) => key);

        if (incomplete.length > 0) {
          console.log('Sections restantes:', incomplete);
        }
      }
    });
  }

  private showValidationPrompt(): void {
    console.log('⚠️ Document presque complété. Sections à vérifier?');
  }
}

// ============================================================================
// 7. EXEMPLE: CONFIGURATION D'IMAGES MULTIPLES PAGES
// ============================================================================

export class MultiPageDocumentService {
  
  constructor(private titleService: TitleDocumentService) {}

  /**
   * Charge les pages d'un document scanné
   */
  loadPages(documentPath: string): void {
    // Exemple: changer les pages du document
    // this.titleService.document.pages = [
    //   { id: 'page-1', pageNumber: 1, imageUrl: `${documentPath}/page1.jpg` },
    //   { id: 'page-2', pageNumber: 2, imageUrl: `${documentPath}/page2.jpg` },
    //   { id: 'page-3', pageNumber: 3, imageUrl: `${documentPath}/page3.jpg` },
    // ];
  }
}

// ============================================================================
// 8. INTÉGRATION AVEC LE ROUTEUR
// ============================================================================

// Dans app-routing.module.ts, l'interface est accessible à:
// http://localhost:4200/digitalization

// Pour charger un document spécifique:
// http://localhost:4200/digitalization/DOC-001

import { Router, ActivatedRoute } from '@angular/router';

export class DigitalizationPageComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleDocumentService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du document depuis la route
    this.route.params.subscribe(params => {
      if (params['id']) {
        // Charger le document avec l'ID
        console.log('Chargement du document:', params['id']);
      }
    });
  }
}

// ============================================================================
// 9. EXEMPLE: STYLES PERSONNALISÉS
// ============================================================================

// Pour personnaliser l'interface, vous pouvez ajouter des styles globaux:
// Dans votre fichier styles.scss global:

/*
// Personnaliser les couleurs primaires
:root {
  --primary-color: #2563eb;
  --success-color: #16a34a;
  --warning-color: #ea580c;
}

// Personnaliser les fonts
body {
  font-family: 'Inter', sans-serif;
}

// Ajouter des thèmes
.dark-mode {
  .digitalization-header {
    background: #1e293b;
    color: white;
  }
}
*/

// ============================================================================
// 10. EXEMPLE: MAQUETTE DE TEST
// ============================================================================

/*
<div class="example-usage">
  <!-- Exemple basique -->
  <app-title-digitalization></app-title-digitalization>

  <!-- Avec actions personnalisées -->
  <div class="controls">
    <button (click)="completeSection('section1')">Compléter Section 1</button>
    <button (click)="exportDocument()">Télécharger JSON</button>
    <button (click)="submitDocument()">Soumettre</button>
    <button (click)="resetDocument()">Recommencer</button>
  </div>

  <!-- Affichage des métriques -->
  <div class="metrics" *ngIf="metrics">
    <p>{{ metrics.percentage }}% complété</p>
    <p>{{ metrics.completedSections }}/{{ metrics.totalSections }} sections</p>
  </div>
</div>
*/

// ============================================================================

export const USAGE_EXAMPLES = {
  basicUsage: `
    import { DigitalizationModule } from './features/digitalization/digitalization.module';
    
    @NgModule({
      imports: [DigitalizationModule]
    })
    export class AppModule { }
  `,
  
  loadingDocument: `
    this.titleService.getCurrentDocument().subscribe(doc => {
      console.log(doc.metadata);
    });
  `,
  
  updatingData: `
    this.titleService.updateSection('section1', {
      ...this.section,
      nature: 'Nouvelle valeur'
    });
  `,
  
  trackingProgress: `
    this.titleService.getCompletionMetrics().subscribe(metrics => {
      console.log(\`\${metrics.percentage}% complété\`);
    });
  `
};
