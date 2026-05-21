import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { GroupeHeritiers } from '../models/GroupeHeritiers';

@Injectable({
  providedIn: 'root'
})
export class GroupeHeritiersService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/groupesHeritiers`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<GroupeHeritiers>> {
    return this.httpClient.get<PagingData<GroupeHeritiers>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<GroupeHeritiers[]> {
    return this.httpClient.get<GroupeHeritiers[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<GroupeHeritiers> {
    return this.httpClient.get<GroupeHeritiers>(`${this.SERVICE_URL}/${id}`)
  }

  create(groupeHeritiers: GroupeHeritiers): Observable<GroupeHeritiers> {
    return this.httpClient.post<GroupeHeritiers>(`${this.SERVICE_URL}`, groupeHeritiers)
  }

  update(groupeHeritiers: GroupeHeritiers): Observable<GroupeHeritiers> {
    return this.httpClient.put<GroupeHeritiers>(`${this.SERVICE_URL}/${groupeHeritiers.id!}`, groupeHeritiers)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
