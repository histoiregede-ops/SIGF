import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { ConjointPersonneDisposant } from '../models/ConjointPersonneDisposant';

@Injectable({
  providedIn: 'root'
})
export class ConjointPersonneDisposantService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/conjointsPersonneDisposant`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<ConjointPersonneDisposant>> {
    return this.httpClient.get<PagingData<ConjointPersonneDisposant>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<ConjointPersonneDisposant[]> {
    return this.httpClient.get<ConjointPersonneDisposant[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<ConjointPersonneDisposant> {
    return this.httpClient.get<ConjointPersonneDisposant>(`${this.SERVICE_URL}/${id}`)
  }

  create(conjointPersonneDisposant: ConjointPersonneDisposant): Observable<ConjointPersonneDisposant> {
    return this.httpClient.post<ConjointPersonneDisposant>(`${this.SERVICE_URL}`, conjointPersonneDisposant)
  }

  update(conjointPersonneDisposant: ConjointPersonneDisposant): Observable<ConjointPersonneDisposant> {
    return this.httpClient.put<ConjointPersonneDisposant>(`${this.SERVICE_URL}/${conjointPersonneDisposant.id!}`, conjointPersonneDisposant)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
