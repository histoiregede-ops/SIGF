// Angular Components for Lot Management

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotService, Lot } from '../services/lot.service';

@Component({
  selector: 'app-lot-list',
  template: `
    <div class="lot-list-container">
      <h2>Gestion des Lots</h2>
      
      <div class="controls">
        <button class="btn btn-primary" (click)="openCreateForm()">Créer un lot</button>
        <input type="text" placeholder="Filtrer par statut..." [(ngModel)]="statusFilter" 
               (change)="onFilterChange()">
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Documents</th>
            <th>Statut</th>
            <th>Priorité</th>
            <th>Date création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let lot of lots">
            <td>{{ lot.id }}</td>
            <td>{{ lot.typeDocument }}</td>
            <td>{{ lot.nombreDocuments }}</td>
            <td>
              <span class="badge" [ngClass]="'status-' + lot.statut">
                {{ lot.statut }}
              </span>
            </td>
            <td>{{ lot.priorite }}</td>
            <td>{{ lot.dateCreation | date:'short' }}</td>
            <td>
              <button (click)="viewLot(lot.id)" class="btn btn-sm btn-info">Voir</button>
              <button (click)="editLot(lot.id)" class="btn btn-sm btn-warning">Éditer</button>
              <button (click)="deleteLot(lot.id)" class="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button (click)="previousPage()" [disabled]="!hasPrevious">Précédent</button>
        <span>Page {{ currentPage + 1 }} / {{ totalPages }}</span>
        <button (click)="nextPage()" [disabled]="!hasNext">Suivant</button>
      </div>
    </div>
  `,
  styles: [`
    .lot-list-container {
      padding: 20px;
    }
    .controls {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .table th, .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .badge {
      padding: 5px 10px;
      border-radius: 3px;
      color: white;
    }
    .status-cree { background-color: #007bff; }
    .status-affecte { background-color: #17a2b8; }
    .status-en-cours { background-color: #ffc107; color: black; }
    .status-termine { background-color: #28a745; }
  `]
})
export class LotListComponent implements OnInit {
  lots: Lot[] = [];
  statusFilter = '';
  currentPage = 0;
  pageSize = 10;
  total = 0;

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get hasNext(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.total;
  }

  get hasPrevious(): boolean {
    return this.currentPage > 0;
  }

  constructor(
    private lotService: LotService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLots();
  }

  loadLots(): void {
    const filters: any = {
      limit: this.pageSize,
      offset: this.currentPage * this.pageSize,
    };

    if (this.statusFilter) {
      filters.statut = this.statusFilter;
    }

    this.lotService.getLots(filters).subscribe(
      (response) => {
        this.lots = response.data;
        this.total = response.pagination.total;
      },
      (error) => {
        console.error('Erreur lors du chargement des lots:', error);
      }
    );
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadLots();
  }

  viewLot(id: string): void {
    this.router.navigate(['/lots', id]);
  }

  editLot(id: string): void {
    this.router.navigate(['/lots', id, 'edit']);
  }

  deleteLot(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lot?')) {
      this.lotService.deleteLot(id).subscribe(
        () => {
          this.loadLots();
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  openCreateForm(): void {
    this.router.navigate(['/lots/create']);
  }

  nextPage(): void {
    if (this.hasNext) {
      this.currentPage++;
      this.loadLots();
    }
  }

  previousPage(): void {
    if (this.hasPrevious) {
      this.currentPage--;
      this.loadLots();
    }
  }
}
