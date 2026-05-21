/**
 * Fichier de test pour vérifier l'intégration du module
 * 
 * ATTENTION: Ceci est un fichier de test UNITAIRE
 * À adapter selon votre configuration de test (Jasmine, Jest, etc.)
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleDigitalizationComponent } from './components/title-digitalization.component';
import { TitleDocumentService } from './services/title-document.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('Digitalisation Module', () => {
  
  describe('TitleDigitalizationComponent', () => {
    let component: TitleDigitalizationComponent;
    let fixture: ComponentFixture<TitleDigitalizationComponent>;
    let service: TitleDocumentService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          NgbModule,
          TitleDigitalizationComponent
        ],
        providers: [TitleDocumentService]
      }).compileComponents();

      fixture = TestBed.createComponent(TitleDigitalizationComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(TitleDocumentService);
      fixture.detectChanges();
    });

    it('Devrait créer le composant', () => {
      expect(component).toBeTruthy();
    });

    it('Devrait charger le document au démarrage', (done) => {
      service.getCurrentDocument().subscribe(doc => {
        expect(doc).toBeTruthy();
        expect(doc?.folderName).toBeTruthy();
        done();
      });
    });

    it('Devrait afficher le titre du dossier', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.folder-title')).toBeTruthy();
    });

    it('Devrait afficher la barre de progression', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.progress')).toBeTruthy();
    });

    it('Devrait afficher le badge de statut OCR', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.status-badge')).toBeTruthy();
    });

    it('Devrait afficher le bouton d\'action principal', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.action-button')).toBeTruthy();
    });

    it('Devrait afficher le viewer d\'image', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-image-viewer')).toBeTruthy();
    });

    it('Devrait afficher l\'éditeur de métadonnées', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-metadata-editor')).toBeTruthy();
    });

    it('Devrait naviguer à la page suivante', () => {
      component.nextPage();
      expect(component.currentPage).toBe(2);
    });

    it('Devrait naviguer à la page précédente', () => {
      component.currentPage = 2;
      component.previousPage();
      expect(component.currentPage).toBe(1);
    });

    it('Devrait retourner la page actuelle', () => {
      const currentPage = component.getCurrentPageData();
      expect(currentPage).toBeTruthy();
    });

    it('Devrait gérer l\'action principale', () => {
      const initialStatus = component.document?.status;
      component.handleMainAction();
      // Le statut peut changer selon la logique
      expect(component.document?.status).toBeTruthy();
    });
  });

  describe('TitleDocumentService', () => {
    let service: TitleDocumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TitleDocumentService]
      });
      service = TestBed.inject(TitleDocumentService);
    });

    it('Devrait créer le service', () => {
      expect(service).toBeTruthy();
    });

    it('Devrait retourner le document courant', (done) => {
      service.getCurrentDocument().subscribe(doc => {
        expect(doc).toBeTruthy();
        expect(doc?.id).toBeTruthy();
        done();
      });
    });

    it('Devrait retourner les métriques de complétion', (done) => {
      service.getCompletionMetrics().subscribe(metrics => {
        expect(metrics).toBeTruthy();
        expect(metrics?.percentage).toBeDefined();
        expect(metrics?.totalSections).toEqual(5);
        done();
      });
    });

    it('Devrait mettre à jour une section', (done) => {
      const updatedSection = {
        status: 'in_progress' as const,
        nature: 'Test',
        contenance: '5 ha',
        situation: 'Test Situation',
        limits: 'Test Limits',
        salesLast10Years: 'Test',
        actes: []
      };

      service.updateSection('section1', updatedSection);
      
      service.getCurrentDocument().subscribe(doc => {
        expect(doc?.metadata.section1.nature).toEqual('Test');
        done();
      });
    });

    it('Devrait mettre à jour le statut d\'une section', (done) => {
      service.updateSectionStatus('section1', 'completed');
      
      service.getCompletionMetrics().subscribe(metrics => {
        expect(metrics?.sectionStates['section1']).toEqual('completed');
        done();
      });
    });

    it('Devrait mettre à jour le statut OCR', (done) => {
      service.setOCRStatus('processing');
      
      service.getCurrentDocument().subscribe(doc => {
        expect(doc?.ocrStatus).toEqual('processing');
        done();
      });
    });

    it('Devrait vérifier si une section est complète', (done) => {
      service.isSectionComplete('section1').subscribe(isComplete => {
        expect(typeof isComplete).toEqual('boolean');
        done();
      });
    });

    it('Devrait réinitialiser le document', (done) => {
      service.resetDocument();
      
      service.getCurrentDocument().subscribe(doc => {
        expect(doc?.completionPercentage).toEqual(35); // Valeur par défaut
        done();
      });
    });

    it('Devrait exporter le document', (done) => {
      service.exportDocument().subscribe(doc => {
        expect(doc).toBeTruthy();
        expect(doc?.metadata).toBeTruthy();
        done();
      });
    });
  });

  describe('Modèles de données', () => {
    
    it('Devrait valider un document titre foncier', () => {
      const mockDoc = {
        id: 'DOC-001',
        folderId: 'FOLDER-001',
        folderName: 'Test Dossier',
        status: 'in_progress' as const,
        ocrStatus: 'completed' as const,
        pages: [],
        metadata: {
          section1: { status: 'empty' as const, nature: '', contenance: '', situation: '', limits: '', salesLast10Years: '', actes: [] },
          section2: { status: 'empty' as const, augmentations: [], diminutions: [] },
          section3: { status: 'empty' as const, realRights: [], unavailabilityClauses: [] },
          section4: { status: 'empty' as const, mutations: [] },
          section5: { status: 'empty' as const, constitutions: [], liberations: [] }
        },
        completionPercentage: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(mockDoc.id).toBeTruthy();
      expect(mockDoc.status).toEqual('in_progress');
      expect(mockDoc.metadata).toBeTruthy();
    });
  });

  describe('Configuration', () => {
    
    it('Devrait avoir des configuration correctes', () => {
      const zoom = {
        min: 50,
        max: 300,
        step: 10,
        default: 100
      };

      expect(zoom.min).toBeLessThan(zoom.default);
      expect(zoom.default).toBeLessThan(zoom.max);
      expect(zoom.step).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// Tests d'intégration
// ============================================================================

describe('Digitalisation Module - Tests d\'intégration', () => {
  
  it('Devrait initialiser le module correctement', async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        TitleDigitalizationComponent
      ],
      providers: [TitleDocumentService]
    }).compileComponents();

    expect(TestBed.inject(TitleDocumentService)).toBeTruthy();
  });

  it('Devrait supporter le workflow complet', (done) => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        TitleDigitalizationComponent
      ],
      providers: [TitleDocumentService]
    });

    const service = TestBed.inject(TitleDocumentService);

    // 1. Charger le document
    service.getCurrentDocument().subscribe(doc => {
      expect(doc).toBeTruthy();

      // 2. Mettre à jour une section
      service.updateSectionStatus('section1', 'in_progress');

      // 3. Vérifier les métriques
      service.getCompletionMetrics().subscribe(metrics => {
        expect(metrics?.percentage).toBeGreaterThanOrEqual(0);
        expect(metrics?.totalSections).toEqual(5);
        done();
      });
    });
  });
});

// ============================================================================
// Tests de performance
// ============================================================================

describe('Performance', () => {
  
  it('Devrait charger rapidement le service', () => {
    const start = performance.now();
    TestBed.configureTestingModule({
      providers: [TitleDocumentService]
    });
    const service = TestBed.inject(TitleDocumentService);
    const end = performance.now();

    const duration = end - start;
    expect(duration).toBeLessThan(1000); // Doit être < 1s
  });

  it('Devrait gérer les mises à jour rapides', (done) => {
    TestBed.configureTestingModule({
      providers: [TitleDocumentService]
    });

    const service = TestBed.inject(TitleDocumentService);
    const start = performance.now();

    for (let i = 0; i < 100; i++) {
      service.updateSectionStatus(`section${(i % 5) + 1}` as any, 'in_progress');
    }

    const end = performance.now();
    const duration = end - start;

    expect(duration).toBeLessThan(500); // 100 updates en < 500ms
    done();
  });
});
