import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TitleDocument,
  TitleMetadata,
  DesignationSection,
  ModificationsConsistance,
  ModificationsPropertyRight,
  Mutations,
  PrivilegesHypothecs,
  CompletionMetrics,
  SectionStatus,
  DocumentPage
} from '../models/title-document.model';

@Injectable({
  providedIn: 'root'
})
export class TitleDocumentService {
  private currentDocument$ = new BehaviorSubject<TitleDocument | null>(null);
  private completionMetrics$ = new BehaviorSubject<CompletionMetrics | null>(null);

  constructor() {
    this.initializeDefaultDocument();
  }

  getCurrentDocument(): Observable<TitleDocument | null> {
    return this.currentDocument$.asObservable();
  }

  getCompletionMetrics(): Observable<CompletionMetrics | null> {
    return this.completionMetrics$.asObservable();
  }

  /**
   * Initialise un document par défaut pour la démonstration
   */
  private initializeDefaultDocument(): void {
    const defaultDocument: TitleDocument = {
      id: 'DOC-001',
      folderId: 'FOLDER-2024-001',
      folderName: 'Dossier de Titre Foncier - Parcelle XY123',
      status: 'in_progress',
      ocrStatus: 'completed',
      pages: this.generateDefaultPages(),
      metadata: this.getDefaultMetadata(),
      completionPercentage: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.currentDocument$.next(defaultDocument);
    this.updateCompletionMetrics(defaultDocument);
  }

  /**
   * Génère les pages par défaut avec des images d'exemple
   */
  private generateDefaultPages(): DocumentPage[] {
    return [
      {
        id: 'page-1',
        pageNumber: 1,
        imageUrl: 'assets/sample-page-1.jpg',
        width: 1200,
        height: 1600
      },
      {
        id: 'page-2',
        pageNumber: 2,
        imageUrl: 'assets/sample-page-2.jpg',
        width: 1200,
        height: 1600
      }
    ];
  }

  /**
   * Retourne les métadonnées par défaut
   */
  private getDefaultMetadata(): TitleMetadata {
    return {
      section1: {
        status: 'in_progress',
        nature: 'Terre labourable',
        contenance: '2.5 hectares',
        situation: 'Commune de Dakar, Région de Dakar',
        limits: 'Nord: Route nationale, Sud: Propriété XXX, Est: Cours d\'eau YYY',
        salesLast10Years: 'Aucune',
        actes: []
      },
      section2: {
        status: 'empty',
        augmentations: [],
        diminutions: []
      },
      section3: {
        status: 'empty',
        realRights: [],
        unavailabilityClauses: []
      },
      section4: {
        status: 'empty',
        mutations: []
      },
      section5: {
        status: 'empty',
        constitutions: [],
        liberations: []
      }
    };
  }

  /**
   * Met à jour une section de métadonnées
   */
  updateSection<K extends keyof TitleMetadata>(
    sectionKey: K,
    sectionData: TitleMetadata[K]
  ): void {
    const doc = this.currentDocument$.value;
    if (!doc) return;

    const updatedDoc: TitleDocument = {
      ...doc,
      metadata: {
        ...doc.metadata,
        [sectionKey]: sectionData
      },
      updatedAt: new Date()
    };

    this.currentDocument$.next(updatedDoc);
    this.updateCompletionMetrics(updatedDoc);
  }

  /**
   * Met à jour le statut d'une section
   */
  updateSectionStatus(
    sectionKey: keyof TitleMetadata,
    status: SectionStatus
  ): void {
    const doc = this.currentDocument$.value;
    if (!doc) return;

    const section = doc.metadata[sectionKey] as any;
    if (section && 'status' in section) {
      section.status = status;
      this.updateSection(sectionKey, section);
    }
  }

  /**
   * Met à jour la page active du document
   */
  setActivePage(pageNumber: number): void {
    const doc = this.currentDocument$.value;
    if (!doc) return;

    const page = doc.pages.find(p => p.pageNumber === pageNumber);
    if (page) {
      // La page active est gérée par le composant, on peut en notifier ici si nécessaire
    }
  }

  /**
   * Met à jour le statut OCR du document
   */
  setOCRStatus(status: 'not_started' | 'processing' | 'completed' | 'failed'): void {
    const doc = this.currentDocument$.value;
    if (!doc) return;

    const updatedDoc: TitleDocument = {
      ...doc,
      ocrStatus: status,
      updatedAt: new Date()
    };

    this.currentDocument$.next(updatedDoc);
  }

  /**
   * Met à jour le statut global du document
   */
  setDocumentStatus(status: 'pending' | 'in_progress' | 'completed' | 'rejected'): void {
    const doc = this.currentDocument$.value;
    if (!doc) return;

    const updatedDoc: TitleDocument = {
      ...doc,
      status: status,
      updatedAt: new Date()
    };

    this.currentDocument$.next(updatedDoc);
  }

  /**
   * Calcule et met à jour les métriques de complétion
   */
  private updateCompletionMetrics(doc: TitleDocument): void {
    const sectionKeys: (keyof TitleMetadata)[] = [
      'section1',
      'section2',
      'section3',
      'section4',
      'section5'
    ];

    const sectionStates: { [key: string]: SectionStatus } = {};
    let completedCount = 0;

    sectionKeys.forEach(key => {
      const section = doc.metadata[key] as any;
      const status = section?.status || 'empty';
      sectionStates[key] = status;

      if (status === 'completed') {
        completedCount++;
      }
    });

    const metrics: CompletionMetrics = {
      totalSections: sectionKeys.length,
      completedSections: completedCount,
      percentage: Math.round((completedCount / sectionKeys.length) * 100),
      sectionStates
    };

    this.completionMetrics$.next(metrics);

    // Mettre à jour le pourcentage du document
    const updatedDoc: TitleDocument = {
      ...doc,
      completionPercentage: metrics.percentage
    };
    this.currentDocument$.next(updatedDoc);
  }

  /**
   * Vérifie si une section est complète
   */
  isSectionComplete(sectionKey: keyof TitleMetadata): Observable<boolean> {
    return this.currentDocument$.pipe(
      map(doc => {
        if (!doc) return false;
        const section = doc.metadata[sectionKey] as any;
        return section?.status === 'completed';
      })
    );
  }

  /**
   * Réinitialise le document
   */
  resetDocument(): void {
    this.initializeDefaultDocument();
  }

  /**
   * Exporte les données du document
   */
  exportDocument(): Observable<TitleDocument | null> {
    return this.currentDocument$.asObservable();
  }
}
