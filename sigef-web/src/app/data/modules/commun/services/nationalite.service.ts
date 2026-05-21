import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Nationalite } from '../models/Nationalite';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/nationalites`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Nationalite>> {
    return this.httpClient.get<PagingData<Nationalite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Nationalite[]> {
    return this.httpClient.get<Nationalite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Nationalite> {
    return this.httpClient.get<Nationalite>(`${this.SERVICE_URL}/${id}`)
  }

  create(nationalite: Nationalite): Observable<Nationalite> {
    return this.httpClient.post<Nationalite>(`${this.SERVICE_URL}`, nationalite)
  }

  update(nationalite: Nationalite): Observable<Nationalite> {
    return this.httpClient.put<Nationalite>(`${this.SERVICE_URL}/${nationalite.id!}`, nationalite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
