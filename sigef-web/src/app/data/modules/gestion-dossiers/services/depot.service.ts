import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Depot } from '../models/Depot';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/depots`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Depot>> {
    return this.httpClient.get<PagingData<Depot>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }
  
  getAllData(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Depot> {
    return this.httpClient.get<Depot>(`${this.SERVICE_URL}/${id}`)
  }

  create(depot: Depot): Observable<Depot> {
    return this.httpClient.post<Depot>(`${this.SERVICE_URL}`, depot)
  }

  update(depot: Depot): Observable<Depot> {
    return this.httpClient.put<Depot>(`${this.SERVICE_URL}/${depot.id!}`, depot)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
