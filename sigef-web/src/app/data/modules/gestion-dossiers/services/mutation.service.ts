import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Mutation } from '../models/Mutation';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class MutationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/mutations`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Mutation>> {
    return this.httpClient.get<PagingData<Mutation>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Mutation[]> {
    return this.httpClient.get<Mutation[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Mutation> {
    return this.httpClient.get<Mutation>(`${this.SERVICE_URL}/${id}`)
  }

  create(Mutation: Mutation): Observable<Mutation> {
    return this.httpClient.post<Mutation>(`${this.SERVICE_URL}`, Mutation)
  }

  update(Mutation: Mutation): Observable<Mutation> {
    return this.httpClient.put<Mutation>(`${this.SERVICE_URL}/${Mutation.id!}`, Mutation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
