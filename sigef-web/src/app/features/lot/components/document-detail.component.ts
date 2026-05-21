import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService, Document } from '../services/lot.service';

@Component({
  selector: 'app-document-detail',
  template: `
    <div class="document-detail-container" *ngIf="document">
      <div class="header">
        <button class="btn btn-secondary" (click)="goBack()">← Retour</button>
        <h2>Document {{ document.nomFichier }}</h2>
      </div>

      <div class="document-info">
        <div class="info-row">
          <label>Lot ID:</label>
          <span>{{ document.lotId }}</span>
        </div>
        <div class="info-row">
          <label>Statut:</label>
          <span class="badge" [ngClass]="'status-' + document.statut">
            {{ document.statut }}
          </span>
        </div>
        <div class="info-row">
          <label>Type:</label>
          <span>{{ document.typeDocument }}</span>
        </div>
        <div class="info-row" *ngIf="document.dateTraitement">
          <label>Date de traitement:</label>
          <span>{{ document.dateTraitement | date:'medium' }}</span>
        </div>
      </div>

      <div class="fields-section">
        <h3>Champs saisis</h3>
        <div class="fields">
          <div *ngFor="let key of getKeys(document.champsSaisie)" class="field">
            <label>{{ key }}:</label>
            <span>{{ document.champsSaisie[key] }}</span>
          </div>
        </div>
      </div>

      <div class="actions" *ngIf="document.statut === 'en-cours'">
        <button class="btn btn-success" (click)="validateDocument()">
          Valider
        </button>
        <button class="btn btn-danger" (click)="rejectDocument()">
          Rejeter
        </button>
      </div>
    </div>
  `,
  styles: [`
    .document-detail-container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 2px solid #ddd;
    }
    .document-info {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      margin-bottom: 10px;
    }
    .info-row label {
      font-weight: bold;
      width: 150px;
    }
    .fields-section {
      margin-top: 30px;
    }
    .fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .field {
      padding: 15px;
      background: #f0f0f0;
      border-radius: 5px;
    }
    .field label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
  `]
})
export class DocumentDetailComponent implements OnInit {
  document: Document | null = null;
  documentId: string = '';

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.documentId = params['id'];
      this.loadDocument();
    });
  }

  loadDocument(): void {
    this.documentService.getDocumentById(this.documentId).subscribe(
      (response) => {
        this.document = response.data;
      },
      (error) => console.error('Erreur:', error)
    );
  }

  validateDocument(): void {
    this.documentService.validateDocument(this.documentId).subscribe(
      () => {
        this.loadDocument();
      },
      (error) => console.error('Erreur:', error)
    );
  }

  rejectDocument(): void {
    const raison = prompt('Raison du rejet:');
    if (raison) {
      this.documentService.rejectDocument(this.documentId, raison).subscribe(
        () => {
          this.loadDocument();
        },
        (error) => console.error('Erreur:', error)
      );
    }
  }

  getKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj || {});
  }

  goBack(): void {
    this.router.navigate(['/lots']);
  }
}
