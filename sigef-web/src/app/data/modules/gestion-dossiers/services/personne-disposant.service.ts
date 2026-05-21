import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneDisposant } from '../models/PersonneDisposant';

@Injectable({
  providedIn: 'root'
})
export class PersonneDisposantService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesDisposants`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneDisposant>> {
    return this.httpClient.get<PagingData<PersonneDisposant>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneDisposant[]> {
    return this.httpClient.get<PersonneDisposant[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneDisposant> {
    return this.httpClient.get<PersonneDisposant>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneDisposant: PersonneDisposant): Observable<PersonneDisposant> {
    return this.httpClient.post<PersonneDisposant>(`${this.SERVICE_URL}`, personneDisposant)
  }

  update(personneDisposant: PersonneDisposant): Observable<PersonneDisposant> {
    return this.httpClient.put<PersonneDisposant>(`${this.SERVICE_URL}/${personneDisposant.id!}`, personneDisposant)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
