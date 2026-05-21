import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Canton } from '../models/Canton';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class CantonService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/cantons`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Canton>> {
    return this.httpClient.get<PagingData<Canton>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Canton[]> {
    return this.httpClient.get<Canton[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Canton> {
    return this.httpClient.get<Canton>(`${this.SERVICE_URL}/${id}`)
  }

  create(canton: Canton): Observable<Canton> {
    return this.httpClient.post<Canton>(`${this.SERVICE_URL}`, canton)
  }

  update(canton: Canton): Observable<Canton> {
    return this.httpClient.put<Canton>(`${this.SERVICE_URL}/${canton.id!}`, canton)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
