// Phase 4: Dynamic Forms (Saisie)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';
  label: string;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  options?: Array<{ value: string; label: string }>;
  order: number;
}

export interface DynamicForm {
  id: string;
  typeDocument: string;
  fields: FormField[];
  description: string;
  isActive: boolean;
}

export interface FormSubmission {
  id: string;
  formId: string;
  documentId: string;
  data: Record<string, any>;
  submittedAt: Date;
  submittedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private apiUrl = '/api/forms';

  constructor(private http: HttpClient) {}

  getFormByDocumentType(typeDocument: string): Observable<{ data: DynamicForm }> {
    return this.http.get<{ data: DynamicForm }>(
      `${this.apiUrl}/by-type/${typeDocument}`
    );
  }

  getAllForms(): Observable<{ data: DynamicForm[] }> {
    return this.http.get<{ data: DynamicForm[] }>(this.apiUrl);
  }

  createForm(form: Partial<DynamicForm>): Observable<{ data: DynamicForm }> {
    return this.http.post<{ data: DynamicForm }>(this.apiUrl, form);
  }

  updateForm(id: string, updates: Partial<DynamicForm>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updates);
  }

  deleteForm(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  submitForm(formId: string, documentId: string, data: Record<string, any>): Observable<any> {
    return this.http.post(`${this.apiUrl}/${formId}/submit`, {
      documentId,
      data,
    });
  }

  getSubmissions(documentId: string): Observable<{ data: FormSubmission[] }> {
    return this.http.get<{ data: FormSubmission[] }>(
      `/api/documents/${documentId}/submissions`
    );
  }
}
