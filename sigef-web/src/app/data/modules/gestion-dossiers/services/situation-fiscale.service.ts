import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { SituationFiscale } from '../models/SituationFiscale';

@Injectable({
  providedIn: 'root'
})
export class SituationFiscaleService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/situationsFiscales`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<SituationFiscale>> {
    return this.httpClient.get<PagingData<SituationFiscale>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<SituationFiscale[]> {
    return this.httpClient.get<SituationFiscale[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<SituationFiscale> {
    return this.httpClient.get<SituationFiscale>(`${this.SERVICE_URL}/${id}`)
  }

  create(SituationFiscale: SituationFiscale): Observable<SituationFiscale> {
    return this.httpClient.post<SituationFiscale>(`${this.SERVICE_URL}`, SituationFiscale)
  }

  update(SituationFiscale: SituationFiscale): Observable<SituationFiscale> {
    return this.httpClient.put<SituationFiscale>(`${this.SERVICE_URL}/${SituationFiscale.id!}`, SituationFiscale)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
