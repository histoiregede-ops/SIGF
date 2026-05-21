import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleDocumentService } from '../services/title-document.service';
import { DocumentPage, TitleDocument, CompletionMetrics, TitleMetadata } from '../models/title-document.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';

@Component({
  selector: 'app-title-digitalization',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ImageViewerComponent,
    MetadataEditorComponent
  ],
  templateUrl: './title-digitalization.component.html',
  styleUrls: ['./title-digitalization.component.scss']
})
export class TitleDigitalizationComponent implements OnInit, OnDestroy {
  document: TitleDocument | null = null;
  metrics: CompletionMetrics | null = null;
  currentPage = 1;
  totalPages = 0;

  private destroy$ = new Subject<void>();

  constructor(private titleService: TitleDocumentService) {}

  ngOnInit(): void {
    this.titleService.getCurrentDocument()
      .pipe(takeUntil(this.destroy$))
      .subscribe(doc => {
        this.document = doc;
        if (doc) {
          this.totalPages = doc.pages.length;
          this.currentPage = 1;
        }
      });

    this.titleService.getCompletionMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.metrics = metrics;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Navigue vers la page précédente
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Navigue vers la page suivante
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Obtient la page actuelle
   */
getCurrentPageData(): DocumentPage | null {
    if (!this.document) return null;
    return this.document.pages.find(p => p.pageNumber === this.currentPage) ?? null;
  }

  /**
   * Obtient la classe CSS pour le badge de statut OCR
   */
  getOCRStatusBadgeClass(): string {
    if (!this.document) return 'bg-secondary';
    const status = this.document.ocrStatus;
    const statusMap: { [key: string]: string } = {
      'not_started': 'bg-secondary',
      'processing': 'bg-info',
      'completed': 'bg-success',
      'failed': 'bg-danger'
    };
    return statusMap[status] || 'bg-secondary';
  }

  /**
   * Obtient le texte du badge de statut OCR
   */
  getOCRStatusText(): string {
    if (!this.document) return 'Non disponible';
    const statusMap: { [key: string]: string } = {
      'not_started': 'Non commencé',
      'processing': 'En cours...',
      'completed': 'Complété',
      'failed': 'Erreur'
    };
    return statusMap[this.document.ocrStatus] || 'Non disponible';
  }

  /**
   * Action principale du bouton d'action
   */
  handleMainAction(): void {
    if (!this.document) return;

    if (this.document.status === 'in_progress') {
      // Marquer comme complété
      this.titleService.setDocumentStatus('completed');
    } else if (this.document.status === 'pending') {
      // Démarrer le traitement
      this.titleService.setDocumentStatus('in_progress');
    }
  }

  /**
   * Obtient le texte du bouton d'action
   */
  getMainActionButtonText(): string {
    if (!this.document) return 'Charger le document';
    
    const actionMap: { [key: string]: string } = {
      'pending': 'Commencer la numérisation',
      'in_progress': 'Marquer comme complété',
      'completed': 'Document complété',
      'rejected': 'Recommencer'
    };
    return actionMap[this.document.status] || 'Action';
  }

  /**
   * Vérifie si le bouton d'action est désactivé
   */
  isMainActionDisabled(): boolean {
    if (!this.document) return true;
    return this.document.status === 'completed';
  }

  /**
   * Obtient la classe du bouton d'action
   */
  getMainActionButtonClass(): string {
    if (!this.document) return 'btn-primary';
    const classMap: { [key: string]: string } = {
      'pending': 'btn-primary',
      'in_progress': 'btn-warning',
      'completed': 'btn-success',
      'rejected': 'btn-danger'
    };
    return classMap[this.document.status] || 'btn-primary';
  }
}
