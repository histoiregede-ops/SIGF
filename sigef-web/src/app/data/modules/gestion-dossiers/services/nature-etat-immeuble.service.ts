import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { NatureEtatImmeuble } from '../models/NatureEtatImmeuble';

@Injectable({
  providedIn: 'root'
})
export class NatureEtatImmeubleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/naturesEtatImmeuble`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<NatureEtatImmeuble>> {
    return this.httpClient.get<PagingData<NatureEtatImmeuble>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<NatureEtatImmeuble[]> {
    return this.httpClient.get<NatureEtatImmeuble[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<NatureEtatImmeuble> {
    return this.httpClient.get<NatureEtatImmeuble>(`${this.SERVICE_URL}/${id}`)
  }

  create(natureEtatImmeuble: NatureEtatImmeuble): Observable<NatureEtatImmeuble> {
    return this.httpClient.post<NatureEtatImmeuble>(`${this.SERVICE_URL}`, natureEtatImmeuble)
  }

  update(natureEtatImmeuble: NatureEtatImmeuble): Observable<NatureEtatImmeuble> {
    return this.httpClient.put<NatureEtatImmeuble>(`${this.SERVICE_URL}/${natureEtatImmeuble.id!}`, natureEtatImmeuble)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
