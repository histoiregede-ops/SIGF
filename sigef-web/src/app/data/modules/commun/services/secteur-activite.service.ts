import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { SecteurActivite } from '../models/SecteurActivite';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/secteursActivite`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<SecteurActivite>> {
    return this.httpClient.get<PagingData<SecteurActivite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<SecteurActivite[]> {
    return this.httpClient.get<SecteurActivite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<SecteurActivite> {
    return this.httpClient.get<SecteurActivite>(`${this.SERVICE_URL}/${id}`)
  }

  create(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.post<SecteurActivite>(`${this.SERVICE_URL}`, secteurActivite)
  }

  update(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.put<SecteurActivite>(`${this.SERVICE_URL}/${secteurActivite.id!}`, secteurActivite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
