// Phase 4: Dynamic Form Renderer Component

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormService, DynamicForm, FormField } from '../services/dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      <div class="form-header">
        <h3>{{ formConfig?.typeDocument }}</h3>
        <p>{{ formConfig?.description }}</p>
      </div>

      <div class="form-fields">
        <div *ngFor="let field of sortedFields" class="form-group">
          <label [for]="field.id" class="form-label">
            {{ field.label }}
            <span *ngIf="field.required" class="required">*</span>
          </label>

          <!-- Text Input -->
          <input
            *ngIf="field.type === 'text'"
            [id]="field.id"
            type="text"
            [formControlName]="field.id"
            class="form-control"
            [required]="field.required"
          />

          <!-- Textarea -->
          <textarea
            *ngIf="field.type === 'textarea'"
            [id]="field.id"
            [formControlName]="field.id"
            class="form-control"
            rows="4"
            [required]="field.required"
          ></textarea>

          <!-- Number -->
          <input
            *ngIf="field.type === 'number'"
            [id]="field.id"
            type="number"
            [formControlName]="field.id"
            class="form-control"
            [required]="field.required"
          />

          <!-- Date -->
          <input
            *ngIf="field.type === 'date'"
            [id]="field.id"
            type="date"
            [formControlName]="field.id"
            class="form-control"
            [required]="field.required"
          />

          <!-- Select -->
          <select
            *ngIf="field.type === 'select'"
            [id]="field.id"
            [formControlName]="field.id"
            class="form-control"
            [required]="field.required"
          >
            <option value="">Sélectionner...</option>
            <option *ngFor="let opt of field.options" [value]="opt.value">
              {{ opt.label }}
            </option>
          </select>

          <!-- Checkbox -->
          <div *ngIf="field.type === 'checkbox'" class="form-check">
            <input
              [id]="field.id"
              type="checkbox"
              [formControlName]="field.id"
              class="form-check-input"
            />
            <label [for]="field.id" class="form-check-label">
              Cocher si applicable
            </label>
          </div>

          <!-- File -->
          <input
            *ngIf="field.type === 'file'"
            [id]="field.id"
            type="file"
            [formControlName]="field.id"
            class="form-control"
            [required]="field.required"
          />

          <!-- Validation Errors -->
          <div
            *ngIf="
              form.get(field.id)?.invalid &&
              form.get(field.id)?.touched
            "
            class="form-error"
          >
            <small *ngIf="form.get(field.id)?.hasError('required')">
              Ce champ est requis
            </small>
            <small *ngIf="form.get(field.id)?.hasError('min')">
              La valeur minimale est {{ field.validation?.min }}
            </small>
            <small *ngIf="form.get(field.id)?.hasError('max')">
              La valeur maximale est {{ field.validation?.max }}
            </small>
            <small *ngIf="form.get(field.id)?.hasError('minlength')">
              Minimum {{ field.validation?.minLength }} caractères
            </small>
            <small *ngIf="form.get(field.id)?.hasError('maxlength')">
              Maximum {{ field.validation?.maxLength }} caractères
            </small>
            <small *ngIf="form.get(field.id)?.hasError('pattern')">
              Format invalide
            </small>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" [disabled]="!form.valid">
          {{ submitButtonText }}
        </button>
        <button type="button" class="btn btn-secondary" (click)="onCancel()">
          Annuler
        </button>
      </div>

      <div *ngIf="submitMessage" class="alert" [ngClass]="submitMessageType">
        {{ submitMessage }}
      </div>
    </form>
  `,
  styles: [`
    .dynamic-form {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #ddd;
    }
    .form-fields {
      margin: 30px 0;
    }
    .form-group {
      margin-bottom: 25px;
    }
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .required {
      color: red;
      margin-left: 3px;
    }
    .form-control,
    .form-check-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
    }
    .form-check {
      display: flex;
      align-items: center;
    }
    .form-check-input {
      width: auto;
      margin-right: 10px;
    }
    .form-error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
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
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
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
export class DynamicFormComponent implements OnInit {
  @Input() formConfigId: string = '';
  @Input() documentId: string = '';
  @Input() submitButtonText = 'Soumettre';
  @Output() formSubmitted = new EventEmitter<Record<string, any>>();
  @Output() formCancelled = new EventEmitter<void>();

  form: FormGroup;
  formConfig: DynamicForm | null = null;
  submitMessage = '';
  submitMessageType = '';

  get sortedFields(): FormField[] {
    return (this.formConfig?.fields || []).sort((a, b) => a.order - b.order);
  }

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: DynamicFormService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.formConfigId) {
      this.loadFormConfig();
    }
  }

  loadFormConfig(): void {
    // Simulated load - in real app, fetch from service
    this.formConfig = {
      id: this.formConfigId,
      typeDocument: 'Titre Foncier',
      description: 'Veuillez remplir tous les champs requis',
      isActive: true,
      fields: [
        {
          id: 'numero_titre',
          name: 'numero_titre',
          type: 'text',
          label: 'Numéro du Titre',
          required: true,
          order: 1,
        },
        {
          id: 'proprietaire',
          name: 'proprietaire',
          type: 'text',
          label: 'Propriétaire',
          required: true,
          order: 2,
        },
        {
          id: 'adresse',
          name: 'adresse',
          type: 'textarea',
          label: 'Adresse de la Propriété',
          required: true,
          order: 3,
        },
        {
          id: 'superficie',
          name: 'superficie',
          type: 'number',
          label: 'Superficie (m²)',
          required: true,
          order: 4,
        },
        {
          id: 'date_titre',
          name: 'date_titre',
          type: 'date',
          label: 'Date du Titre',
          required: true,
          order: 5,
        },
      ],
    };

    this.initializeForm();
  }

  initializeForm(): void {
    const controls: Record<string, any> = {};

    this.sortedFields.forEach((field) => {
      const validators: any[] = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'number') {
        if (field.validation?.min !== undefined) {
          validators.push(Validators.min(field.validation.min));
        }
        if (field.validation?.max !== undefined) {
          validators.push(Validators.max(field.validation.max));
        }
      }

      if (field.type === 'text' || field.type === 'textarea') {
        if (field.validation?.minLength) {
          validators.push(Validators.minLength(field.validation.minLength));
        }
        if (field.validation?.maxLength) {
          validators.push(Validators.maxLength(field.validation.maxLength));
        }
        if (field.validation?.pattern) {
          validators.push(Validators.pattern(field.validation.pattern));
        }
      }

      controls[field.id] = ['', validators];
    });

    this.form = this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.dynamicFormService
        .submitForm(this.formConfigId, this.documentId, formData)
        .subscribe(
          () => {
            this.showMessage('Formulaire soumis avec succès', 'success');
            setTimeout(() => {
              this.formSubmitted.emit(formData);
            }, 1000);
          },
          (error) => {
            this.showMessage(
              `Erreur: ${error.error.message}`,
              'error'
            );
          }
        );
    }
  }

  onCancel(): void {
    this.formCancelled.emit();
  }

  showMessage(msg: string, type: string): void {
    this.submitMessage = msg;
    this.submitMessageType = `alert-${type}`;
    setTimeout(() => {
      this.submitMessage = '';
    }, 5000);
  }
}
