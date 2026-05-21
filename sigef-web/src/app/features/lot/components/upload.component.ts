import { Component } from '@angular/core';
import { UploadService } from '../services/lot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  template: `
    <div class="upload-container">
      <h2>Upload de fichiers PDF</h2>

      <div class="upload-area" 
           (dragover)="onDragOver($event)" 
           (dragleave)="onDragLeave()"
           (drop)="onDrop($event)">
        <div class="upload-icon">📄</div>
        <h3>Déposer vos fichiers PDF ici</h3>
        <p>ou</p>
        <input type="file" #fileInput accept=".pdf" (change)="onFileSelected($event)">
        <button class="btn btn-primary" (click)="fileInput.click()">
          Sélectionner des fichiers
        </button>
      </div>

      <div class="file-list" *ngIf="selectedFiles.length > 0">
        <h3>Fichiers à uploader</h3>
        <div class="file-item" *ngFor="let file of selectedFiles; let i = index">
          <span>{{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }}MB)</span>
          <button class="btn btn-sm btn-danger" (click)="removeFile(i)">Supprimer</button>
        </div>

        <div class="form-group">
          <label>Associer à un lot (optionnel)</label>
          <input type="text" placeholder="ID du lot" [(ngModel)]="lotId">
        </div>

        <button class="btn btn-success btn-lg" (click)="uploadFiles()" 
                [disabled]="uploading">
          {{ uploading ? 'Upload en cours...' : 'Uploader' }}
        </button>
      </div>

      <div class="progress" *ngIf="uploading">
        <div class="progress-bar" [style.width.%]="uploadProgress"></div>
      </div>

      <div *ngIf="uploadMessage" class="alert" [ngClass]="uploadMessageType">
        {{ uploadMessage }}
      </div>

      <div class="upload-results" *ngIf="uploadedFiles.length > 0">
        <h3>Fichiers uploadés</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Fichier</th>
              <th>Statut</th>
              <th>Pages</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let file of uploadedFiles">
              <td>{{ file.fileName }}</td>
              <td>
                <span class="badge" [ngClass]="'status-' + file.statut">
                  {{ file.statut }}
                </span>
              </td>
              <td>{{ file.pageCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .upload-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .upload-area {
      border: 2px dashed #007bff;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      margin: 20px 0;
    }
    .upload-area.drag-over {
      border-color: #28a745;
      background-color: #f0f8ff;
    }
    .upload-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }
    .upload-area input {
      display: none;
    }
    .file-list {
      margin: 20px 0;
    }
    .file-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background: #f9f9f9;
      margin: 10px 0;
      border-radius: 5px;
    }
    .form-group {
      margin: 20px 0;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .progress {
      width: 100%;
      height: 20px;
      background-color: #f0f0f0;
      border-radius: 5px;
      overflow: hidden;
      margin: 20px 0;
    }
    .progress-bar {
      height: 100%;
      background-color: #007bff;
      transition: width 0.3s;
    }
    .alert {
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
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
export class UploadComponent {
  selectedFiles: File[] = [];
  uploadedFiles: any[] = [];
  uploading = false;
  uploadProgress = 0;
  uploadMessage = '';
  uploadMessageType = '';
  lotId = '';
  dragOverActive = false;

  constructor(private uploadService: UploadService, private router: Router) {}

  onFileSelected(event: any): void {
    const files = event.target.files;
    this.addFiles(files);
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.dragOverActive = true;
  }

  onDragLeave(): void {
    this.dragOverActive = false;
  }

  onDrop(event: any): void {
    event.preventDefault();
    this.dragOverActive = false;
    const files = event.dataTransfer.files;
    this.addFiles(files);
  }

  addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'application/pdf') {
        this.selectedFiles.push(files[i]);
      }
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      this.showMessage('Sélectionnez au moins un fichier', 'error');
      return;
    }

    this.uploading = true;
    this.uploadProgress = 0;

    let uploadedCount = 0;
    const totalCount = this.selectedFiles.length;

    this.selectedFiles.forEach((file) => {
      this.uploadService.uploadPDF(file, this.lotId).subscribe(
        (response) => {
          this.uploadedFiles.push(response.data);
          uploadedCount++;
          this.uploadProgress = Math.round((uploadedCount / totalCount) * 100);

          if (uploadedCount === totalCount) {
            this.uploading = false;
            this.showMessage('Fichiers uploadés avec succès', 'success');
            this.selectedFiles = [];
          }
        },
        (error) => {
          console.error('Erreur:', error);
          this.showMessage(`Erreur lors de l'upload: ${error.error.message}`, 'error');
          this.uploading = false;
        }
      );
    });
  }

  showMessage(msg: string, type: string): void {
    this.uploadMessage = msg;
    this.uploadMessageType = `alert-${type}`;
    setTimeout(() => {
      this.uploadMessage = '';
    }, 5000);
  }
}
