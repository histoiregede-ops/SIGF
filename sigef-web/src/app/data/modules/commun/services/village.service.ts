import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Village } from '../models/Village';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/villages`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Village>> {
    return this.httpClient.get<PagingData<Village>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Village[]> {
    return this.httpClient.get<Village[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Village> {
    return this.httpClient.get<Village>(`${this.SERVICE_URL}/${id}`)
  }

  create(village: Village): Observable<Village> {
    return this.httpClient.post<Village>(`${this.SERVICE_URL}`, village)
  }

  update(village: Village): Observable<Village> {
    return this.httpClient.put<Village>(`${this.SERVICE_URL}/${village.id!}`, village)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
