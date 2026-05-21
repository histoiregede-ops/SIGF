import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Limite } from '../models/Limite';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class LimiteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/limites`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Limite>> {
    return this.httpClient.get<PagingData<Limite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Limite[]> {
    return this.httpClient.get<Limite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Limite> {
    return this.httpClient.get<Limite>(`${this.SERVICE_URL}/${id}`)
  }

  create(limite: Limite): Observable<Limite> {
    return this.httpClient.post<Limite>(`${this.SERVICE_URL}`, limite)
  }

  update(limite: Limite): Observable<Limite> {
    return this.httpClient.put<Limite>(`${this.SERVICE_URL}/${limite.id!}`, limite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
