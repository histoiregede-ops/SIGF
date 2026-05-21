import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { CentreConservationFonciere } from '../models/CentreConservationFonciere';

@Injectable({
  providedIn: 'root'
})
export class CentreConservationFonciereService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}/centresConservationFonciere`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<CentreConservationFonciere>> {
    return this.httpClient.get<PagingData<CentreConservationFonciere>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<CentreConservationFonciere[]> {
    return this.httpClient.get<CentreConservationFonciere[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<CentreConservationFonciere> {
    return this.httpClient.get<CentreConservationFonciere>(`${this.SERVICE_URL}/${id}`)
  }

  create(centreConservationFonciere: CentreConservationFonciere): Observable<CentreConservationFonciere> {
    return this.httpClient.post<CentreConservationFonciere>(`${this.SERVICE_URL}`, centreConservationFonciere)
  }

  update(centreConservationFonciere: CentreConservationFonciere): Observable<CentreConservationFonciere> {
    return this.httpClient.put<CentreConservationFonciere>(`${this.SERVICE_URL}/${centreConservationFonciere.id!}`, centreConservationFonciere)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
