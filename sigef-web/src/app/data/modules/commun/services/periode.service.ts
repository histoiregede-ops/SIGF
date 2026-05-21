import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Periode } from '../models/Periode';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/periodes`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Periode>> {
    return this.httpClient.get<PagingData<Periode>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(withRegions?: boolean): Observable<Periode[]> {
    return this.httpClient.get<Periode[]>(withRegions ? `${this.SERVICE_URL}?withRegions=${withRegions}` : `${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Periode> {
    return this.httpClient.get<Periode>(`${this.SERVICE_URL}/${id}`)
  }

  create(periode: Periode): Observable<Periode> {
    return this.httpClient.post<Periode>(`${this.SERVICE_URL}`, periode)
  }

  update(periode: Periode): Observable<Periode> {
    return this.httpClient.put<Periode>(`${this.SERVICE_URL}/${periode.id!}`, periode)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
