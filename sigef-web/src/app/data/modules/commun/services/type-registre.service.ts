import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { TypeRegistre } from '../models/TypeRegistre';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TypeRegistreService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/typesRegistre`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TypeRegistre>> {
    return this.httpClient.get<PagingData<TypeRegistre>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TypeRegistre[]> {
    return this.httpClient.get<TypeRegistre[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TypeRegistre> {
    return this.httpClient.get<TypeRegistre>(`${this.SERVICE_URL}/${id}`)
  }
}
