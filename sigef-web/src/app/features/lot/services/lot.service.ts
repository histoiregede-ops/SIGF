// Angular Services for Lot Management

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lot {
  id: string;
  typeDocument: string;
  nombreDocuments: number;
  statut: string;
  indexeurId?: string;
  dateCreation: Date;
  priorite: string;
  commentaires?: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  lotId: string;
  nomFichier: string;
  typeDocument: string;
  statut: string;
  champsSaisie: Record<string, any>;
  dateTraitement?: Date;
  indexeurId?: string;
  commentaires?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LotService {
  private apiUrl = '/api/lots';

  constructor(private http: HttpClient) {}

  createLot(lot: Partial<Lot>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, lot);
  }

  getLots(filters?: any): Observable<{ data: Lot[]; pagination: any }> {
    return this.http.get<{ data: Lot[]; pagination: any }>(this.apiUrl, { params: filters });
  }

  getLotById(id: string): Observable<{ data: Lot }> {
    return this.http.get<{ data: Lot }>(`${this.apiUrl}/${id}`);
  }

  updateLot(id: string, updates: Partial<Lot>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updates);
  }

  updateStatus(id: string, statut: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { statut });
  }

  assignIndexer(id: string, indexeurId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/assign`, { indexeurId });
  }

  deleteLot(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = '/api/documents';

  constructor(private http: HttpClient) {}

  getDocumentsByLot(lotId: string): Observable<{ data: Document[] }> {
    return this.http.get<{ data: Document[] }>(`/api/lots/${lotId}/documents`);
  }

  getDocumentById(id: string): Observable<{ data: Document }> {
    return this.http.get<{ data: Document }>(`${this.apiUrl}/${id}`);
  }

  updateFields(id: string, champsSaisie: Record<string, any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/fields`, { champsSaisie });
  }

  validateDocument(id: string, commentaires?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/validate`, { commentaires });
  }

  rejectDocument(id: string, raison: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, { raison });
  }
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = '/api/uploads';

  constructor(private http: HttpClient) {}

  uploadPDF(file: File, lotId?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (lotId) formData.append('lotId', lotId);

    return this.http.post(`${this.apiUrl}/pdf`, formData);
  }

  getUploads(filters?: any): Observable<{ data: any[]; pagination: any }> {
    return this.http.get<{ data: any[]; pagination: any }>(this.apiUrl, { params: filters });
  }

  validateUpload(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/validate`, {});
  }

  rejectUpload(id: string, erreurs: Record<string, any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, { erreurs });
  }
}
