import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) { }

  getAll<T>(resource: string): Observable<{ success: boolean, data: T[] }> {
    return this.http.get<{ success: boolean, data: T[] }>(`${this.baseUrl}/${resource}`);
  }

  getById<T>(resource: string, id: string | number): Observable<{ success: boolean, data: T }> {
    return this.http.get<{ success: boolean, data: T }>(`${this.baseUrl}/${resource}/${id}`);
  }

  create<T>(resource: string, item: T): Observable<{ success: boolean, data: T }> {
    return this.http.post<{ success: boolean, data: T }>(`${this.baseUrl}/${resource}`, item);
  }

  update<T>(resource: string, id: string | number, item: T): Observable<{ success: boolean, data: T }> {
    return this.http.put<{ success: boolean, data: T }>(`${this.baseUrl}/${resource}/${id}`, item);
  }
}