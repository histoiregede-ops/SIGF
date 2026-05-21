import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotService, Lot, Document } from '../services/lot.service';
import { DocumentService } from '../services/lot.service';

@Component({
  selector: 'app-lot-detail',
  template: `
    <div class="lot-detail-container" *ngIf="lot">
      <div class="header">
        <button class="btn btn-secondary" (click)="goBack()">← Retour</button>
        <h2>Lot {{ lot.id }}</h2>
        <button class="btn btn-primary" (click)="editLot()">Éditer</button>
      </div>

      <div class="lot-info">
        <div class="info-row">
          <label>Type:</label>
          <span>{{ lot.typeDocument }}</span>
        </div>
        <div class="info-row">
          <label>Statut:</label>
          <span class="badge" [ngClass]="'status-' + lot.statut">{{ lot.statut }}</span>
        </div>
        <div class="info-row">
          <label>Priorité:</label>
          <span>{{ lot.priorite }}</span>
        </div>
        <div class="info-row">
          <label>Nombre de documents:</label>
          <span>{{ lot.nombreDocuments }}</span>
        </div>
        <div class="info-row" *ngIf="lot.indexeurId">
          <label>Indexeur:</label>
          <span>{{ lot.indexeurId }}</span>
        </div>
        <div class="info-row">
          <label>Date création:</label>
          <span>{{ lot.dateCreation | date:'medium' }}</span>
        </div>
        <div class="info-row" *ngIf="lot.commentaires">
          <label>Commentaires:</label>
          <p>{{ lot.commentaires }}</p>
        </div>
      </div>

      <div class="documents-section">
        <h3>Documents ({{ documents.length }})</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let doc of documents">
              <td>{{ doc.nomFichier }}</td>
              <td>{{ doc.typeDocument }}</td>
              <td>
                <span class="badge" [ngClass]="'status-' + doc.statut">
                  {{ doc.statut }}
                </span>
              </td>
              <td>
                <button (click)="viewDocument(doc.id)" class="btn btn-sm btn-info">Voir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <button *ngIf="lot.statut === 'cree'" class="btn btn-warning" 
                (click)="changeStatus('affecte')">
          Affecter
        </button>
        <button *ngIf="lot.statut === 'affecte'" class="btn btn-warning" 
                (click)="changeStatus('en-cours')">
          Commencer
        </button>
        <button *ngIf="lot.statut === 'en-cours'" class="btn btn-success" 
                (click)="changeStatus('termine')">
          Terminer
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lot-detail-container {
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
    .lot-info {
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
    .documents-section {
      margin-top: 30px;
    }
    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
  `]
})
export class LotDetailComponent implements OnInit {
  lot: Lot | null = null;
  documents: Document[] = [];
  lotId: string = '';

  constructor(
    private lotService: LotService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lotId = params['id'];
      this.loadLotData();
    });
  }

  loadLotData(): void {
    this.lotService.getLotById(this.lotId).subscribe(
      (response) => {
        this.lot = response.data;
        this.loadDocuments();
      },
      (error) => console.error('Erreur:', error)
    );
  }

  loadDocuments(): void {
    this.documentService.getDocumentsByLot(this.lotId).subscribe(
      (response) => {
        this.documents = response.data;
      },
      (error) => console.error('Erreur:', error)
    );
  }

  editLot(): void {
    this.router.navigate(['/lots', this.lotId, 'edit']);
  }

  viewDocument(docId: string): void {
    this.router.navigate(['/documents', docId]);
  }

  changeStatus(newStatus: string): void {
    if (this.lot) {
      this.lotService.updateStatus(this.lot.id, newStatus).subscribe(
        () => this.loadLotData(),
        (error) => console.error('Erreur:', error)
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/lots']);
  }
}
