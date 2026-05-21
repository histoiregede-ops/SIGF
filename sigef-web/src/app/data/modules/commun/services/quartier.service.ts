import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Quartier } from '../models/Quartier';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/quartiers`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Quartier>> {
    return this.httpClient.get<PagingData<Quartier>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Quartier[]> {
    return this.httpClient.get<Quartier[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Quartier> {
    return this.httpClient.get<Quartier>(`${this.SERVICE_URL}/${id}`)
  }

  create(quartier: Quartier): Observable<Quartier> {
    return this.httpClient.post<Quartier>(`${this.SERVICE_URL}`, quartier)
  }

  update(quartier: Quartier): Observable<Quartier> {
    return this.httpClient.put<Quartier>(`${this.SERVICE_URL}/${quartier.id!}`, quartier)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
