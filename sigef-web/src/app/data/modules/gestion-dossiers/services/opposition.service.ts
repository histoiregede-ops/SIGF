import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Opposition } from '../models/Opposition';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class OppositionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/oppositions`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Opposition>> {
    return this.httpClient.get<PagingData<Opposition>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }
  
  getAllData(): Observable<Opposition[]> {
    return this.httpClient.get<Opposition[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Opposition> {
    return this.httpClient.get<Opposition>(`${this.SERVICE_URL}/${id}`)
  }

  create(opposition: Opposition): Observable<Opposition> {
    return this.httpClient.post<Opposition>(`${this.SERVICE_URL}`, opposition)
  }

  update(opposition: Opposition): Observable<Opposition> {
    return this.httpClient.put<Opposition>(`${this.SERVICE_URL}/${opposition.id!}`, opposition)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}