import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypeOperationPostImmatriculation } from '../models/TypeOperationPostImmatriculation';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypeOperationPostImmatriculationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/typesOperationPostImmatriculation`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypeOperationPostImmatriculation>> {
    return this.httpClient.get<PagingData<TypeOperationPostImmatriculation>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypeOperationPostImmatriculation[]> {
    return this.httpClient.get<TypeOperationPostImmatriculation[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypeOperationPostImmatriculation> {
    return this.httpClient.get<TypeOperationPostImmatriculation>(`${this.SERVICE_URL}/${id}`)
  }

  create(typeOperationPostImmatriculation: TypeOperationPostImmatriculation): Observable<TypeOperationPostImmatriculation> {
    return this.httpClient.post<TypeOperationPostImmatriculation>(`${this.SERVICE_URL}`, typeOperationPostImmatriculation)
  }

  update(typeOperationPostImmatriculation: TypeOperationPostImmatriculation): Observable<TypeOperationPostImmatriculation> {
    return this.httpClient.put<TypeOperationPostImmatriculation>(`${this.SERVICE_URL}/${typeOperationPostImmatriculation.id!}`, typeOperationPostImmatriculation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
