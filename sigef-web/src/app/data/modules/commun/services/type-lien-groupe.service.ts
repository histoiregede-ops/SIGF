import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { TypeLienGroupe } from '../models/TypeLienGroupe';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypeLienGroupeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/typesLienGroupe`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypeLienGroupe>> {
    return this.httpClient.get<PagingData<TypeLienGroupe>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypeLienGroupe[]> {
    return this.httpClient.get<TypeLienGroupe[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypeLienGroupe> {
    return this.httpClient.get<TypeLienGroupe>(`${this.SERVICE_URL}/${id}`)
  }

  create(typeLienGroupe: TypeLienGroupe): Observable<TypeLienGroupe> {
    return this.httpClient.post<TypeLienGroupe>(`${this.SERVICE_URL}`, typeLienGroupe)
  }

  update(typeLienGroupe: TypeLienGroupe): Observable<TypeLienGroupe> {
    return this.httpClient.put<TypeLienGroupe>(`${this.SERVICE_URL}/${typeLienGroupe.id!}`, typeLienGroupe)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
