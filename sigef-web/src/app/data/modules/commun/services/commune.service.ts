import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Commune } from '../models/Commune';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/communes`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Commune>> {
    return this.httpClient.get<PagingData<Commune>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Commune[]> {
    return this.httpClient.get<Commune[]>(`${this.SERVICE_URL}`, { params: filtres as any })
  }

  get(id: string): Observable<Commune> {
    return this.httpClient.get<Commune>(`${this.SERVICE_URL}/${id}`)
  }

  create(commune: Commune): Observable<Commune> {
    return this.httpClient.post<Commune>(`${this.SERVICE_URL}`, commune)
  }

  update(commune: Commune): Observable<Commune> {
    return this.httpClient.put<Commune>(`${this.SERVICE_URL}/${commune.id!}`, commune)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
