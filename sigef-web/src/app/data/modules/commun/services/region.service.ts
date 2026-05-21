import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Region } from '../models/Region';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/regions`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Region>> {
    return this.httpClient.get<PagingData<Region>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Region[]> {
    return this.httpClient.get<Region[]>(`${this.SERVICE_URL}`, { params: filtres })
  }

  get(id: string): Observable<Region> {
    return this.httpClient.get<Region>(`${this.SERVICE_URL}/${id}`)
  }

  create(region: Region): Observable<Region> {
    return this.httpClient.post<Region>(`${this.SERVICE_URL}`, region)
  }

  update(region: Region): Observable<Region> {
    return this.httpClient.put<Region>(`${this.SERVICE_URL}/${region.id!}`, region)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
