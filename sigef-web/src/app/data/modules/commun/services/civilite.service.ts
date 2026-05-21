import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Civilite } from '../models/Civilite';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class CiviliteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/civilites`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Civilite>> {
    return this.httpClient.get<PagingData<Civilite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Civilite[]> {
    return this.httpClient.get<Civilite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Civilite> {
    return this.httpClient.get<Civilite>(`${this.SERVICE_URL}/${id}`)
  }

  create(civilite: Civilite): Observable<Civilite> {
    return this.httpClient.post<Civilite>(`${this.SERVICE_URL}`, civilite)
  }

  update(civilite: Civilite): Observable<Civilite> {
    return this.httpClient.put<Civilite>(`${this.SERVICE_URL}/${civilite.id!}`, civilite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
