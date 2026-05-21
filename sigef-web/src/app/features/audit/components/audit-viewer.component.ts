// Phase 5: Audit UI Component

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuditLog {
  id: string;
  entitéType: string;
  entitéId: string;
  action: string;
  userId: string;
  userIP: string;
  oldValues: Record<string, any> | null;
  newValues: Record<string, any>;
  timestamp: Date;
}

@Component({
  selector: 'app-audit-viewer',
  template: `
    <div class="audit-container">
      <h2>Journal d'Audit</h2>

      <div class="filters">
        <div class="filter-group">
          <label>Type d'entité:</label>
          <select [(ngModel)]="entityTypeFilter" (change)="onFilterChange()">
            <option value="">Tous</option>
            <option value="lot">Lot</option>
            <option value="document">Document</option>
            <option value="upload">Upload</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Action:</label>
          <input type="text" [(ngModel)]="actionFilter" (change)="onFilterChange()" />
        </div>

        <div class="filter-group">
          <label>ID Utilisateur:</label>
          <input type="text" [(ngModel)]="userFilter" (change)="onFilterChange()" />
        </div>

        <div class="filter-group">
          <label>Date de début:</label>
          <input type="date" [(ngModel)]="startDate" (change)="onFilterChange()" />
        </div>

        <div class="filter-group">
          <label>Date de fin:</label>
          <input type="date" [(ngModel)]="endDate" (change)="onFilterChange()" />
        </div>
      </div>

      <div class="logs-table">
        <table class="table">
          <thead>
            <tr>
              <th>Date/Heure</th>
              <th>Entité</th>
              <th>Action</th>
              <th>Utilisateur</th>
              <th>IP</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of logs">
              <td>{{ log.timestamp | date: 'medium' }}</td>
              <td>{{ log.entitéType }} #{{ log.entitéId }}</td>
              <td>
                <span class="badge" [ngClass]="'action-' + log.action">
                  {{ log.action }}
                </span>
              </td>
              <td>{{ log.userId }}</td>
              <td>{{ log.userIP }}</td>
              <td>
                <button class="btn btn-sm btn-info" (click)="showDetails(log)">
                  Voir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button (click)="previousPage()" [disabled]="!hasPrevious">Précédent</button>
        <span>Page {{ currentPage + 1 }} / {{ totalPages }}</span>
        <button (click)="nextPage()" [disabled]="!hasNext">Suivant</button>
      </div>

      <!-- Details Modal -->
      <div *ngIf="selectedLog" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Détails de l'action</h3>
            <button class="close" (click)="selectedLog = null">&times;</button>
          </div>
          <div class="modal-body">
            <div class="detail-row">
              <strong>ID:</strong> {{ selectedLog.id }}
            </div>
            <div class="detail-row">
              <strong>Entité:</strong> {{ selectedLog.entitéType }} #{{ selectedLog.entitéId }}
            </div>
            <div class="detail-row">
              <strong>Action:</strong> {{ selectedLog.action }}
            </div>
            <div class="detail-row">
              <strong>Utilisateur:</strong> {{ selectedLog.userId }}
            </div>
            <div class="detail-row">
              <strong>IP:</strong> {{ selectedLog.userIP }}
            </div>
            <div class="detail-row">
              <strong>Date:</strong> {{ selectedLog.timestamp | date: 'medium' }}
            </div>

            <div class="detail-section" *ngIf="selectedLog.oldValues">
              <h4>Anciennes valeurs</h4>
              <pre>{{ selectedLog.oldValues | json }}</pre>
            </div>

            <div class="detail-section">
              <h4>Nouvelles valeurs</h4>
              <pre>{{ selectedLog.newValues | json }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .audit-container {
      padding: 20px;
    }
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 8px;
    }
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    .filter-group label {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 12px;
    }
    .filter-group input,
    .filter-group select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .logs-table {
      margin: 20px 0;
      overflow-x: auto;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th,
    .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .table th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .badge {
      padding: 4px 8px;
      border-radius: 3px;
      color: white;
      font-size: 12px;
    }
    .action-create {
      background-color: #28a745;
    }
    .action-update {
      background-color: #007bff;
    }
    .action-delete {
      background-color: #dc3545;
    }
    .action-validate {
      background-color: #17a2b8;
    }
    .pagination {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 20px 0;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      border-radius: 8px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }
    .close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
    .modal-body {
      padding: 20px;
    }
    .detail-row {
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .detail-section {
      margin-top: 20px;
    }
    .detail-section h4 {
      margin-bottom: 10px;
    }
    .detail-section pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
  `]
})
export class AuditViewerComponent implements OnInit {
  logs: AuditLog[] = [];
  selectedLog: AuditLog | null = null;
  currentPage = 0;
  pageSize = 20;
  total = 0;

  entityTypeFilter = '';
  actionFilter = '';
  userFilter = '';
  startDate = '';
  endDate = '';

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get hasNext(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.total;
  }

  get hasPrevious(): boolean {
    return this.currentPage > 0;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    const params: any = {
      limit: this.pageSize,
      offset: this.currentPage * this.pageSize,
    };

    this.http.get<{ data: AuditLog[]; pagination: any }>(
      '/api/audit',
      { params }
    ).subscribe((response) => {
      this.logs = response.data;
      this.total = response.pagination.total;
    });
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadLogs();
  }

  showDetails(log: AuditLog): void {
    this.selectedLog = log;
  }

  nextPage(): void {
    if (this.hasNext) {
      this.currentPage++;
      this.loadLogs();
    }
  }

  previousPage(): void {
    if (this.hasPrevious) {
      this.currentPage--;
      this.loadLogs();
    }
  }
}
