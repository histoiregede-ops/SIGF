import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormalitePrealable } from '../models/FormalitePrealable';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class FormalitePrealableService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/formalites`

  constructor(private httpClient: HttpClient) { }

  filterAll(page?: number, paginationSize?: number, filtres?: any): Observable<PagingData<FormalitePrealable>> {
    return this.httpClient.post<PagingData<FormalitePrealable>>(`${this.SERVICE_URL}/filter?page=${page}&size=${paginationSize}`, filtres)
  }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<FormalitePrealable>> {
    return this.httpClient.get<PagingData<FormalitePrealable>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<FormalitePrealable[]> {
    return this.httpClient.get<FormalitePrealable[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<FormalitePrealable> {
    return this.httpClient.get<FormalitePrealable>(`${this.SERVICE_URL}/${id}`)
  }

  getParNumeroRequisition(numeroRequisition: string): Observable<FormalitePrealable> {
    return this.httpClient.get<FormalitePrealable>(`${this.SERVICE_URL}/requisition/${numeroRequisition}`)
  }

  create(formalitePrealable: FormalitePrealable): Observable<FormalitePrealable> {
    return this.httpClient.post<FormalitePrealable>(`${this.SERVICE_URL}`, formalitePrealable)
  }

  update(formalitePrealable: FormalitePrealable): Observable<FormalitePrealable> {
    return this.httpClient.put<FormalitePrealable>(`${this.SERVICE_URL}/${formalitePrealable.id!}`, formalitePrealable)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }

}
