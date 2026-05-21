import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BordereauAnalytique } from '../models/BordereauAnalytique';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class BordereauAnalytiqueService {

  private readonly API_URL = environment.API_URL + '/gestion-dossiers/bordereaux-analytiques';

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number, filters?: CustomMapType): Observable<PagingData<BordereauAnalytique>> {
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

    return this.http.get<PagingData<BordereauAnalytique>>(this.API_URL, { params });
  }

  getById(id: string): Observable<BordereauAnalytique> {
    return this.http.get<BordereauAnalytique>(`${this.API_URL}/${id}`);
  }

  create(bordereau: BordereauAnalytique): Observable<BordereauAnalytique> {
    return this.http.post<BordereauAnalytique>(this.API_URL, bordereau);
  }

  update(id: string, bordereau: BordereauAnalytique): Observable<BordereauAnalytique> {
    return this.http.put<BordereauAnalytique>(`${this.API_URL}/${id}`, bordereau);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
