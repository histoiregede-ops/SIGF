import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneHeritiere } from '../models/PersonneHeritiere';

@Injectable({
  providedIn: 'root'
})
export class PersonneHeritiereService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesHeritieres`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneHeritiere>> {
    return this.httpClient.get<PagingData<PersonneHeritiere>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneHeritiere[]> {
    return this.httpClient.get<PersonneHeritiere[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneHeritiere> {
    return this.httpClient.get<PersonneHeritiere>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneHeritiere: PersonneHeritiere): Observable<PersonneHeritiere> {
    return this.httpClient.post<PersonneHeritiere>(`${this.SERVICE_URL}`, personneHeritiere)
  }

  update(personneHeritiere: PersonneHeritiere): Observable<PersonneHeritiere> {
    return this.httpClient.put<PersonneHeritiere>(`${this.SERVICE_URL}/${personneHeritiere.id!}`, personneHeritiere)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
