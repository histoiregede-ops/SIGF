// Phase 4: Form Builder Component (Admin)

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormService, DynamicForm, FormField } from '../services/dynamic-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  template: `
    <div class="form-builder-container">
      <h2>Constructeur de Formulaires</h2>

      <div class="builder-layout">
        <!-- Form Configuration -->
        <div class="form-config">
          <h3>Configuration du formulaire</h3>
          <form [formGroup]="configForm">
            <div class="form-group">
              <label>Type de document</label>
              <select formControlName="typeDocument">
                <option value="titre-foncier">Titre Foncier</option>
                <option value="depot">Dépôt</option>
                <option value="formalites">Formalités</option>
                <option value="oppositions">Oppositions</option>
              </select>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea formControlName="description" rows="3"></textarea>
            </div>

            <button type="button" class="btn btn-primary" (click)="addField()">
              + Ajouter un champ
            </button>
          </form>
        </div>

        <!-- Fields List -->
        <div class="fields-list">
          <h3>Champs du formulaire</h3>

          <div *ngFor="let field of fields; let i = index" class="field-item">
            <div class="field-header">
              <span>{{ field.label }}</span>
              <button (click)="removeField(i)" class="btn btn-sm btn-danger">
                ✕
              </button>
            </div>

            <div class="field-config">
              <input
                type="text"
                [(ngModel)]="field.label"
                placeholder="Label"
              />
              <select [(ngModel)]="field.type">
                <option value="text">Texte</option>
                <option value="textarea">Zone de texte</option>
                <option value="number">Nombre</option>
                <option value="date">Date</option>
                <option value="select">Liste</option>
                <option value="checkbox">Case à cocher</option>
                <option value="file">Fichier</option>
              </select>

              <div class="field-options">
                <label>
                  <input type="checkbox" [(ngModel)]="field.required" />
                  Requis
                </label>
              </div>

              <div class="field-actions">
                <button
                  (click)="moveField(i, -1)"
                  [disabled]="i === 0"
                  class="btn btn-sm"
                >
                  ↑
                </button>
                <button
                  (click)="moveField(i, 1)"
                  [disabled]="i === fields.length - 1"
                  class="btn btn-sm"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-success btn-lg" (click)="saveForm()">
          Enregistrer le formulaire
        </button>
        <button class="btn btn-secondary" (click)="cancel()">
          Annuler
        </button>
      </div>

      <div *ngIf="message" class="alert" [ngClass]="messageType">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .form-builder-container {
      padding: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .builder-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 30px 0;
    }
    .form-config,
    .fields-list {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
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
      border-radius: 4px;
    }
    .field-item {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-left: 4px solid #007bff;
      border-radius: 4px;
    }
    .field-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .field-config {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .field-config input,
    .field-config select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .field-options {
      display: flex;
      gap: 10px;
    }
    .field-actions {
      display: flex;
      gap: 5px;
    }
    .form-actions {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-success {
      background-color: #28a745;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class FormBuilderComponent implements OnInit {
  configForm: FormGroup;
  fields: FormField[] = [];
  message = '';
  messageType = '';

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: DynamicFormService,
    private router: Router
  ) {
    this.configForm = this.fb.group({
      typeDocument: ['titre-foncier'],
      description: [''],
    });
  }

  ngOnInit(): void {}

  addField(): void {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      name: '',
      type: 'text',
      label: 'Nouveau champ',
      required: false,
      order: this.fields.length + 1,
    };
    this.fields.push(newField);
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
    this.updateFieldOrders();
  }

  moveField(index: number, direction: number): void {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < this.fields.length) {
      [this.fields[index], this.fields[newIndex]] = [
        this.fields[newIndex],
        this.fields[index],
      ];
      this.updateFieldOrders();
    }
  }

  updateFieldOrders(): void {
    this.fields.forEach((field, index) => {
      field.order = index + 1;
    });
  }

  saveForm(): void {
    if (this.fields.length === 0) {
      this.showMessage('Ajoutez au moins un champ', 'error');
      return;
    }

    const formData: Partial<DynamicForm> = {
      typeDocument: this.configForm.get('typeDocument')?.value,
      description: this.configForm.get('description')?.value,
      fields: this.fields,
      isActive: true,
    };

    this.dynamicFormService.createForm(formData).subscribe(
      () => {
        this.showMessage('Formulaire enregistré avec succès', 'success');
        setTimeout(() => this.router.navigate(['/forms']), 2000);
      },
      (error) => {
        this.showMessage(
          `Erreur: ${error.error.message}`,
          'error'
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/forms']);
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = `alert-${type}`;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
