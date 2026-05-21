import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonnePhysique } from '../models/PersonnePhysique';

@Injectable({
  providedIn: 'root'
})
export class PersonnePhysiqueService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesPhysiques`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonnePhysique>> {
    return this.httpClient.get<PagingData<PersonnePhysique>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonnePhysique[]> {
    return this.httpClient.get<PersonnePhysique[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonnePhysique> {
    return this.httpClient.get<PersonnePhysique>(`${this.SERVICE_URL}/${id}`)
  }

  create(personnePhysique: PersonnePhysique): Observable<PersonnePhysique> {
    return this.httpClient.post<PersonnePhysique>(`${this.SERVICE_URL}`, personnePhysique)
  }

  update(personnePhysique: PersonnePhysique): Observable<PersonnePhysique> {
    return this.httpClient.put<PersonnePhysique>(`${this.SERVICE_URL}/${personnePhysique.id!}`, personnePhysique)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
