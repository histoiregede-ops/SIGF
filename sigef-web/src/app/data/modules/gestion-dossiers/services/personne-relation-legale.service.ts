import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneRelationLegale } from '../models/PersonneRelationLegale';

@Injectable({
  providedIn: 'root'
})
export class PersonneRelationLegaleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesRelationLegale`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneRelationLegale>> {
    return this.httpClient.get<PagingData<PersonneRelationLegale>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneRelationLegale[]> {
    return this.httpClient.get<PersonneRelationLegale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneRelationLegale> {
    return this.httpClient.get<PersonneRelationLegale>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneRelationLegale: PersonneRelationLegale): Observable<PersonneRelationLegale> {
    return this.httpClient.post<PersonneRelationLegale>(`${this.SERVICE_URL}`, personneRelationLegale)
  }

  update(personneRelationLegale: PersonneRelationLegale): Observable<PersonneRelationLegale> {
    return this.httpClient.put<PersonneRelationLegale>(`${this.SERVICE_URL}/${personneRelationLegale.id!}`, personneRelationLegale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
