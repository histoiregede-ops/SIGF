import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { NatureTypeImmeuble } from '../models/NatureTypeImmeuble';

@Injectable({
  providedIn: 'root'
})
export class NatureTypeImmeubleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/naturesTypeImmeuble`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<NatureTypeImmeuble>> {
    return this.httpClient.get<PagingData<NatureTypeImmeuble>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<NatureTypeImmeuble[]> {
    return this.httpClient.get<NatureTypeImmeuble[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<NatureTypeImmeuble> {
    return this.httpClient.get<NatureTypeImmeuble>(`${this.SERVICE_URL}/${id}`)
  }

  create(natureTypeImmeuble: NatureTypeImmeuble): Observable<NatureTypeImmeuble> {
    return this.httpClient.post<NatureTypeImmeuble>(`${this.SERVICE_URL}`, natureTypeImmeuble)
  }

  update(natureTypeImmeuble: NatureTypeImmeuble): Observable<NatureTypeImmeuble> {
    return this.httpClient.put<NatureTypeImmeuble>(`${this.SERVICE_URL}/${natureTypeImmeuble.id!}`, natureTypeImmeuble)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
