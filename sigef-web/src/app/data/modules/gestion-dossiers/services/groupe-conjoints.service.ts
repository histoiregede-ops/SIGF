import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { GroupeConjoints } from '../models/GroupeConjoints';

@Injectable({
  providedIn: 'root'
})
export class GroupeConjointsService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/groupesConjoints`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<GroupeConjoints>> {
    return this.httpClient.get<PagingData<GroupeConjoints>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<GroupeConjoints[]> {
    return this.httpClient.get<GroupeConjoints[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<GroupeConjoints> {
    return this.httpClient.get<GroupeConjoints>(`${this.SERVICE_URL}/${id}`)
  }

  create(groupeConjoints: GroupeConjoints): Observable<GroupeConjoints> {
    return this.httpClient.post<GroupeConjoints>(`${this.SERVICE_URL}`, groupeConjoints)
  }

  update(groupeConjoints: GroupeConjoints): Observable<GroupeConjoints> {
    return this.httpClient.put<GroupeConjoints>(`${this.SERVICE_URL}/${groupeConjoints.id!}`, groupeConjoints)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
