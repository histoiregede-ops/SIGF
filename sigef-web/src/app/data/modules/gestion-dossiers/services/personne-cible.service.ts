import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { PersonneCible } from '../models/PersonneCible';

@Injectable({
  providedIn: 'root'
})
export class PersonneCibleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/personnesCibles`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<PersonneCible>> {
    return this.httpClient.get<PagingData<PersonneCible>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<PersonneCible[]> {
    return this.httpClient.get<PersonneCible[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PersonneCible> {
    return this.httpClient.get<PersonneCible>(`${this.SERVICE_URL}/${id}`)
  }

  create(personneCible: PersonneCible): Observable<PersonneCible> {
    return this.httpClient.post<PersonneCible>(`${this.SERVICE_URL}`, personneCible)
  }

  update(personneCible: PersonneCible): Observable<PersonneCible> {
    return this.httpClient.put<PersonneCible>(`${this.SERVICE_URL}/${personneCible.id!}`, personneCible)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
