import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneMorale } from '../models/PersonneMorale';

@Injectable({
  providedIn: 'root'
})
export class PersonneMoraleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesMorales`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneMorale>> {
    return this.httpClient.get<PagingData<PersonneMorale>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneMorale[]> {
    return this.httpClient.get<PersonneMorale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneMorale> {
    return this.httpClient.get<PersonneMorale>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneMorale: PersonneMorale): Observable<PersonneMorale> {
    return this.httpClient.post<PersonneMorale>(`${this.SERVICE_URL}`, personneMorale)
  }

  update(personneMorale: PersonneMorale): Observable<PersonneMorale> {
    return this.httpClient.put<PersonneMorale>(`${this.SERVICE_URL}/${personneMorale.id!}`, personneMorale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
