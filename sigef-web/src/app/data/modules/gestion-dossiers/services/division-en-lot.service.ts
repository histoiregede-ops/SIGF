import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { DivisionEnLot } from '../models/DivisionEnLot';

@Injectable({
  providedIn: 'root'
})
export class DivisionEnLotService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/divisionsEnLots`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<DivisionEnLot>> {
    return this.httpClient.get<PagingData<DivisionEnLot>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<DivisionEnLot[]> {
    return this.httpClient.get<DivisionEnLot[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DivisionEnLot> {
    return this.httpClient.get<DivisionEnLot>(`${this.SERVICE_URL}/${id}`)
  }

  create(DivisionEnLot: DivisionEnLot): Observable<DivisionEnLot> {
    return this.httpClient.post<DivisionEnLot>(`${this.SERVICE_URL}`, DivisionEnLot)
  }

  update(DivisionEnLot: DivisionEnLot): Observable<DivisionEnLot> {
    return this.httpClient.put<DivisionEnLot>(`${this.SERVICE_URL}/${DivisionEnLot.id!}`, DivisionEnLot)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
