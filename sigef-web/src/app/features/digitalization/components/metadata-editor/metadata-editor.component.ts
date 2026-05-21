import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleMetadata } from '../../models/title-document.model';
import { TitleDocumentService } from '../../services/title-document.service';
import { Section1Component } from './sections/section1.component';
import { Section2Component } from './sections/section2.component';
import { Section3Component } from './sections/section3.component';
import { Section4Component } from './sections/section4.component';
import { Section5Component } from './sections/section5.component';

@Component({
  selector: 'app-metadata-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component
  ],
  templateUrl: './metadata-editor.component.html',
  styleUrls: ['./metadata-editor.component.scss']
})
export class MetadataEditorComponent implements OnInit {
  @Input() metadata!: TitleMetadata;

  expandedSections = {
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false
  };

  constructor(private titleService: TitleDocumentService) {}

  ngOnInit(): void {
    // Les métadonnées sont injectées par le parent
  }

  /**
   * Bascule l'état d'expansion d'une section
   */
  toggleSection(sectionKey: keyof typeof this.expandedSections): void {
    this.expandedSections[sectionKey] = !this.expandedSections[sectionKey];
  }

  /**
   * Obtient la classe CSS pour le badge d'état
   */
  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'empty': 'badge-secondary',
      'in_progress': 'badge-warning',
      'completed': 'badge-success',
      'to_review': 'badge-info'
    };
    return statusMap[status] || 'badge-secondary';
  }

  /**
   * Obtient le texte du badge d'état
   */
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'empty': 'Vide',
      'in_progress': 'En cours',
      'completed': 'Complété',
      'to_review': 'À corriger'
    };
    return statusMap[status] || 'Vide';
  }

  /**
   * Met à jour le statut d'une section
   */
  updateSectionStatus(sectionKey: keyof TitleMetadata, status: any): void {
    this.titleService.updateSectionStatus(sectionKey, status);
  }
}
