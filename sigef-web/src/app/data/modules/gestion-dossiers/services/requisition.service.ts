import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Requisition } from '../models/Requisition';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private readonly API_URL = environment.API_URL + '/gestion-dossiers/requisitions';

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number, filters?: CustomMapType): Observable<PagingData<Requisition>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<PagingData<Requisition>>(this.API_URL, { params });
  }

  getAllData(filters?: CustomMapType): Observable<Requisition[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<Requisition[]>(this.API_URL, { params });
  }

  getById(id: string): Observable<Requisition> {
    return this.http.get<Requisition>(`${this.API_URL}/${id}`);
  }

  create(requisition: Requisition): Observable<Requisition> {
    return this.http.post<Requisition>(this.API_URL, requisition);
  }

  update(id: string, requisition: Requisition): Observable<Requisition> {
    return this.http.put<Requisition>(`${this.API_URL}/${id}`, requisition);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
