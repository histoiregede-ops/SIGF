import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentPage } from '../../models/title-document.model';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() page: DocumentPage | null = null;
  @Input() currentPage = 1;
  @Input() totalPages = 0;

  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  zoom = 100;
  rotation = 0;
  isFullscreen = false;

  ngOnInit(): void {
    this.resetZoomAndRotation();
  }

  /**
   * Augmente le zoom
   */
  increaseZoom(): void {
    if (this.zoom < 300) {
      this.zoom += 10;
    }
  }

  /**
   * Diminue le zoom
   */
  decreaseZoom(): void {
    if (this.zoom > 50) {
      this.zoom -= 10;
    }
  }

  /**
   * Réinitialise le zoom à 100%
   */
  resetZoom(): void {
    this.zoom = 100;
  }

  /**
   * Fait pivoter le document de 90 degrés
   */
  rotateImage(): void {
    this.rotation = (this.rotation + 90) % 360;
  }

  /**
   * Réinitialise la rotation
   */
  resetRotation(): void {
    this.rotation = 0;
  }

  /**
   * Réinitialise le zoom et la rotation
   */
  resetZoomAndRotation(): void {
    this.zoom = 100;
    this.rotation = 0;
  }

  /**
   * Bascule le mode plein écran
   */
  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Navigue vers la page précédente
   */
  goToPreviousPage(): void {
    this.previousPage.emit();
  }

  /**
   * Navigue vers la page suivante
   */
  goToNextPage(): void {
    this.nextPage.emit();
  }

  /**
   * Obtient le style de transformation pour l'image
   */
  getImageTransform(): string {
    return `scale(${this.zoom / 100}) rotate(${this.rotation}deg)`;
  }

  /**
   * Vérifie si on peut aller à la page précédente
   */
  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  /**
   * Vérifie si on peut aller à la page suivante
   */
  canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  /**
   * Obtient l'URL de l'image
   */
  getImageUrl(): string {
    if (!this.page?.imageUrl) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BdWN1bmUgaW1hZ2U8L3RleHQ+PC9zdmc+';
    }
    return this.page.imageUrl;
  }
}
