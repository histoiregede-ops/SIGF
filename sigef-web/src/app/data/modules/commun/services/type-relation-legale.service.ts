import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypeRelationLegale } from '../models/TypeRelationLegale';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypeRelationLegaleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/typesRelationLegale`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypeRelationLegale>> {
    return this.httpClient.get<PagingData<TypeRelationLegale>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypeRelationLegale[]> {
    return this.httpClient.get<TypeRelationLegale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypeRelationLegale> {
    return this.httpClient.get<TypeRelationLegale>(`${this.SERVICE_URL}/${id}`)
  }

  create(typeRelationLegale: TypeRelationLegale): Observable<TypeRelationLegale> {
    return this.httpClient.post<TypeRelationLegale>(`${this.SERVICE_URL}`, typeRelationLegale)
  }

  update(typeRelationLegale: TypeRelationLegale): Observable<TypeRelationLegale> {
    return this.httpClient.put<TypeRelationLegale>(`${this.SERVICE_URL}/${typeRelationLegale.id!}`, typeRelationLegale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
