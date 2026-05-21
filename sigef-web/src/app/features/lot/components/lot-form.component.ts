import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotService, Lot } from '../services/lot.service';

@Component({
  selector: 'app-lot-form',
  template: `
    <div class="form-container">
      <h2>{{ isEdit ? 'Éditer' : 'Créer' }} un lot</h2>

      <form [formGroup]="lotForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Type de document</label>
          <select formControlName="typeDocument" required>
            <option value="">Sélectionner...</option>
            <option value="titre-foncier">Titre Foncier</option>
            <option value="depot">Dépôt</option>
            <option value="formalites">Formalités</option>
            <option value="oppositions">Oppositions</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div class="form-group">
          <label>Nombre de documents</label>
          <input type="number" formControlName="nombreDocuments" required min="1">
        </div>

        <div class="form-group">
          <label>Priorité</label>
          <select formControlName="priorite" required>
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div class="form-group">
          <label>Commentaires</label>
          <textarea formControlName="commentaires" rows="4"></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!lotForm.valid">
            {{ isEdit ? 'Mettre à jour' : 'Créer' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">
            Annuler
          </button>
        </div>
      </form>

      <div *ngIf="message" class="alert" [ngClass]="messageType">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .alert {
      margin-top: 20px;
      padding: 15px;
      border-radius: 5px;
    }
    .alert-success {
      background-color: #d4edda;
      color: #155724;
    }
    .alert-error {
      background-color: #f8d7da;
      color: #721c24;
    }
  `]
})
export class LotFormComponent implements OnInit {
  lotForm: any;
  isEdit = false;
  lotId: string = '';
  message = '';
  messageType = '';

  constructor(
    private lotService: LotService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: any
  ) {
    this.lotForm = this.fb.group({
      typeDocument: ['', []],
      nombreDocuments: [0, []],
      priorite: ['normale', []],
      commentaires: ['', []],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.lotId = params['id'];
        this.loadLot();
      }
    });
  }

  loadLot(): void {
    this.lotService.getLotById(this.lotId).subscribe(
      (response) => {
        const lot = response.data;
        this.lotForm.patchValue({
          typeDocument: lot.typeDocument,
          nombreDocuments: lot.nombreDocuments,
          priorite: lot.priorite,
          commentaires: lot.commentaires,
        });
      },
      (error) => {
        this.showMessage('Erreur lors du chargement', 'error');
      }
    );
  }

  onSubmit(): void {
    const formValue = this.lotForm.value;

    if (this.isEdit) {
      this.lotService.updateLot(this.lotId, formValue).subscribe(
        () => {
          this.showMessage('Lot mis à jour avec succès', 'success');
          setTimeout(() => this.router.navigate(['/lots', this.lotId]), 2000);
        },
        (error) => this.showMessage('Erreur lors de la mise à jour', 'error')
      );
    } else {
      this.lotService.createLot(formValue).subscribe(
        () => {
          this.showMessage('Lot créé avec succès', 'success');
          setTimeout(() => this.router.navigate(['/lots']), 2000);
        },
        (error) => this.showMessage('Erreur lors de la création', 'error')
      );
    }
  }

  cancel(): void {
    if (this.isEdit) {
      this.router.navigate(['/lots', this.lotId]);
    } else {
      this.router.navigate(['/lots']);
    }
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = `alert-${type}`;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
