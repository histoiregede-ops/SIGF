import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { GroupePersonnePhysique } from '../models/GroupePersonnePhysique';

@Injectable({
  providedIn: 'root'
})
export class GroupePersonnePhysiqueService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/groupesPersonnesPhysiques`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<GroupePersonnePhysique>> {
    return this.httpClient.get<PagingData<GroupePersonnePhysique>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<GroupePersonnePhysique[]> {
    return this.httpClient.get<GroupePersonnePhysique[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<GroupePersonnePhysique> {
    return this.httpClient.get<GroupePersonnePhysique>(`${this.SERVICE_URL}/${id}`)
  }

  create(groupePersonnePhysique: GroupePersonnePhysique): Observable<GroupePersonnePhysique> {
    return this.httpClient.post<GroupePersonnePhysique>(`${this.SERVICE_URL}`, groupePersonnePhysique)
  }

  update(groupePersonnePhysique: GroupePersonnePhysique): Observable<GroupePersonnePhysique> {
    return this.httpClient.put<GroupePersonnePhysique>(`${this.SERVICE_URL}/${groupePersonnePhysique.id!}`, groupePersonnePhysique)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
