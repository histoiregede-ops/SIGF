import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypePersonneMorale } from '../models/TypePersonneMorale';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypePersonneMoraleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/typesPersonneMorale`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypePersonneMorale>> {
    return this.httpClient.get<PagingData<TypePersonneMorale>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypePersonneMorale[]> {
    return this.httpClient.get<TypePersonneMorale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypePersonneMorale> {
    return this.httpClient.get<TypePersonneMorale>(`${this.SERVICE_URL}/${id}`)
  }

  create(typePersonneMorale: TypePersonneMorale): Observable<TypePersonneMorale> {
    return this.httpClient.post<TypePersonneMorale>(`${this.SERVICE_URL}`, typePersonneMorale)
  }

  update(typePersonneMorale: TypePersonneMorale): Observable<TypePersonneMorale> {
    return this.httpClient.put<TypePersonneMorale>(`${this.SERVICE_URL}/${typePersonneMorale.id!}`, typePersonneMorale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
