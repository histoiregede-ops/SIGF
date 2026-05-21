import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Prefecture } from '../models/Prefecture';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class PrefectureService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/prefectures`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Prefecture>> {
    return this.httpClient.get<PagingData<Prefecture>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Prefecture[]> {
    return this.httpClient.get<Prefecture[]>(`${this.SERVICE_URL}`, { params: filtres as any })
  }

  get(id: string): Observable<Prefecture> {
    return this.httpClient.get<Prefecture>(`${this.SERVICE_URL}/${id}`)
  }

  create(prefecture: Prefecture): Observable<Prefecture> {
    return this.httpClient.post<Prefecture>(`${this.SERVICE_URL}`, prefecture)
  }

  update(prefecture: Prefecture): Observable<Prefecture> {
    return this.httpClient.put<Prefecture>(`${this.SERVICE_URL}/${prefecture.id!}`, prefecture)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
