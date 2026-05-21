import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { RepresentantPersonneMorale } from '../models/RepresentantPersonneMorale';

@Injectable({
  providedIn: 'root'
})
export class RepresentantPersonneMoraleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/representantsPersonneMorale`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<RepresentantPersonneMorale>> {
    return this.httpClient.get<PagingData<RepresentantPersonneMorale>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<RepresentantPersonneMorale[]> {
    return this.httpClient.get<RepresentantPersonneMorale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<RepresentantPersonneMorale> {
    return this.httpClient.get<RepresentantPersonneMorale>(`${this.SERVICE_URL}/${id}`)
  }

  create(representantPersonneMorale: RepresentantPersonneMorale): Observable<RepresentantPersonneMorale> {
    return this.httpClient.post<RepresentantPersonneMorale>(`${this.SERVICE_URL}`, representantPersonneMorale)
  }

  update(representantPersonneMorale: RepresentantPersonneMorale): Observable<RepresentantPersonneMorale> {
    return this.httpClient.put<RepresentantPersonneMorale>(`${this.SERVICE_URL}/${representantPersonneMorale.id!}`, representantPersonneMorale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
