import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Ville } from '../models/Ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/villes`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Ville>> {
    return this.httpClient.get<PagingData<Ville>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Ville[]> {
    return this.httpClient.get<Ville[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Ville> {
    return this.httpClient.get<Ville>(`${this.SERVICE_URL}/${id}`)
  }

  create(ville: Ville): Observable<Ville> {
    return this.httpClient.post<Ville>(`${this.SERVICE_URL}`, ville)
  }

  update(ville: Ville): Observable<Ville> {
    return this.httpClient.put<Ville>(`${this.SERVICE_URL}/${ville.id!}`, ville)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
