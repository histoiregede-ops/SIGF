import { Component, OnInit } from '@angular/core';
import { LotService, UploadService } from '../lot/services/lot.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Tableau de Bord SIGEF</h1>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Lots Totaux</h3>
          <p class="stat-value">{{ totalLots }}</p>
        </div>
        <div class="stat-card">
          <h3>Lots en Cours</h3>
          <p class="stat-value">{{ lotsInProgress }}</p>
        </div>
        <div class="stat-card">
          <h3>Uploads en Attente</h3>
          <p class="stat-value">{{ pendingUploads }}</p>
        </div>
        <div class="stat-card">
          <h3>Lots Terminés</h3>
          <p class="stat-value">{{ completedLots }}</p>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-primary" routerLink="/lots/create">
          Créer un lot
        </button>
        <button class="btn btn-secondary" routerLink="/lots/upload">
          Uploader un PDF
        </button>
        <button class="btn btn-info" routerLink="/lots">
          Gérer les lots
        </button>
      </div>

      <div class="recent-activity">
        <h2>Activités Récentes</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Lot/Document</th>
              <th>Action</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let activity of recentActivities">
              <td>{{ activity.name }}</td>
              <td>{{ activity.action }}</td>
              <td>
                <span class="badge" [ngClass]="'status-' + activity.status">
                  {{ activity.status }}
                </span>
              </td>
              <td>{{ activity.date | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 30px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .stat-card h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .stat-value {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
    }
    .actions {
      margin: 30px 0;
      display: flex;
      gap: 15px;
    }
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-info {
      background-color: #17a2b8;
      color: white;
    }
    .recent-activity {
      margin-top: 40px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th,
    .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalLots = 0;
  lotsInProgress = 0;
  pendingUploads = 0;
  completedLots = 0;
  recentActivities: any[] = [];

  constructor(
    private lotService: LotService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Charger les statistiques
    this.lotService.getLots({}).subscribe((response) => {
      this.totalLots = response.pagination.total;
      this.lotsInProgress = response.data.filter(l => l.statut === 'en-cours').length;
      this.completedLots = response.data.filter(l => l.statut === 'termine').length;
    });

    this.uploadService.getUploads({ statut: 'en-attente' }).subscribe((response) => {
      this.pendingUploads = response.pagination.total;
    });

    // Charger les activités récentes
    this.loadRecentActivities();
  }

  loadRecentActivities(): void {
    this.recentActivities = [
      {
        name: 'Lot #001',
        action: 'Créé',
        status: 'cree',
        date: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        name: 'Lot #002',
        action: 'Affecté',
        status: 'affecte',
        date: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        name: 'Document #003',
        action: 'Validé',
        status: 'valide',
        date: new Date(Date.now() - 1000 * 60 * 60),
      },
    ];
  }
}
