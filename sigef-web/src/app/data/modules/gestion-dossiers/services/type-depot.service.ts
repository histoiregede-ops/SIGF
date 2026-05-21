import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypeDepot } from '../models/TypeDepot';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypeDepotService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/typesDepot`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypeDepot>> {
    return this.httpClient.get<PagingData<TypeDepot>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypeDepot[]> {
    return this.httpClient.get<TypeDepot[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypeDepot> {
    return this.httpClient.get<TypeDepot>(`${this.SERVICE_URL}/${id}`)
  }

  create(typeDepot: TypeDepot): Observable<TypeDepot> {
    return this.httpClient.post<TypeDepot>(`${this.SERVICE_URL}`, typeDepot)
  }

  update(typeDepot: TypeDepot): Observable<TypeDepot> {
    return this.httpClient.put<TypeDepot>(`${this.SERVICE_URL}/${typeDepot.id!}`, typeDepot)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
