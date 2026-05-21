import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneConjointe } from '../models/PersonneConjointe';

@Injectable({
  providedIn: 'root'
})
export class PersonneConjointeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesConjointes`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneConjointe>> {
    return this.httpClient.get<PagingData<PersonneConjointe>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneConjointe[]> {
    return this.httpClient.get<PersonneConjointe[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneConjointe> {
    return this.httpClient.get<PersonneConjointe>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneConjointe: PersonneConjointe): Observable<PersonneConjointe> {
    return this.httpClient.post<PersonneConjointe>(`${this.SERVICE_URL}`, personneConjointe)
  }

  update(personneConjointe: PersonneConjointe): Observable<PersonneConjointe> {
    return this.httpClient.put<PersonneConjointe>(`${this.SERVICE_URL}/${personneConjointe.id!}`, personneConjointe)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
