import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { ModeAcquisition } from '../models/ModeAcquisition';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class ModeAcquisitionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/modesAcquisition`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<ModeAcquisition>> {
    return this.httpClient.get<PagingData<ModeAcquisition>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<ModeAcquisition[]> {
    return this.httpClient.get<ModeAcquisition[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<ModeAcquisition> {
    return this.httpClient.get<ModeAcquisition>(`${this.SERVICE_URL}/${id}`)
  }

  create(modeAcquisition: ModeAcquisition): Observable<ModeAcquisition> {
    return this.httpClient.post<ModeAcquisition>(`${this.SERVICE_URL}`, modeAcquisition)
  }

  update(modeAcquisition: ModeAcquisition): Observable<ModeAcquisition> {
    return this.httpClient.put<ModeAcquisition>(`${this.SERVICE_URL}/${modeAcquisition.id!}`, modeAcquisition)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
