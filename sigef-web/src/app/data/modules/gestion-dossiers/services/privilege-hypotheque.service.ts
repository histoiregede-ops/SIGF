import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PrivilegeHypotheque } from '../models/PrivilegeHypotheque';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeHypothequeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/privilegesHypotheques`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<PrivilegeHypotheque>> {
    return this.httpClient.get<PagingData<PrivilegeHypotheque>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<PrivilegeHypotheque[]> {
    return this.httpClient.get<PrivilegeHypotheque[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PrivilegeHypotheque> {
    return this.httpClient.get<PrivilegeHypotheque>(`${this.SERVICE_URL}/${id}`)
  }

  create(PrivilegeHypotheque: PrivilegeHypotheque): Observable<PrivilegeHypotheque> {
    return this.httpClient.post<PrivilegeHypotheque>(`${this.SERVICE_URL}`, PrivilegeHypotheque)
  }

  update(PrivilegeHypotheque: PrivilegeHypotheque): Observable<PrivilegeHypotheque> {
    return this.httpClient.put<PrivilegeHypotheque>(`${this.SERVICE_URL}/${PrivilegeHypotheque.id!}`, PrivilegeHypotheque)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
