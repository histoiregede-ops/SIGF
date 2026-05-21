import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CauseIndisponibilite } from '../models/CauseIndisponibilite';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class CauseIndisponibiliteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/causesIndisponibilite`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<CauseIndisponibilite>> {
    return this.httpClient.get<PagingData<CauseIndisponibilite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<CauseIndisponibilite[]> {
    return this.httpClient.get<CauseIndisponibilite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<CauseIndisponibilite> {
    return this.httpClient.get<CauseIndisponibilite>(`${this.SERVICE_URL}/${id}`)
  }

  create(CauseIndisponibilite: CauseIndisponibilite): Observable<CauseIndisponibilite> {
    return this.httpClient.post<CauseIndisponibilite>(`${this.SERVICE_URL}`, CauseIndisponibilite)
  }

  update(CauseIndisponibilite: CauseIndisponibilite): Observable<CauseIndisponibilite> {
    return this.httpClient.put<CauseIndisponibilite>(`${this.SERVICE_URL}/${CauseIndisponibilite.id!}`, CauseIndisponibilite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
