import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneMembre } from '../models/PersonneMembre';

@Injectable({
  providedIn: 'root'
})
export class PersonneMembreService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesMembres`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneMembre>> {
    return this.httpClient.get<PagingData<PersonneMembre>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneMembre[]> {
    return this.httpClient.get<PersonneMembre[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneMembre> {
    return this.httpClient.get<PersonneMembre>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneMembre: PersonneMembre): Observable<PersonneMembre> {
    return this.httpClient.post<PersonneMembre>(`${this.SERVICE_URL}`, personneMembre)
  }

  update(personneMembre: PersonneMembre): Observable<PersonneMembre> {
    return this.httpClient.put<PersonneMembre>(`${this.SERVICE_URL}/${personneMembre.id!}`, personneMembre)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
