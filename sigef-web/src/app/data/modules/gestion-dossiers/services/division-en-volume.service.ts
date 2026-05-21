import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { DivisionEnVolume } from '../models/DivisionEnVolume';

@Injectable({
  providedIn: 'root'
})
export class DivisionEnVolumeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/divisionsEnVolumes`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<DivisionEnVolume>> {
    return this.httpClient.get<PagingData<DivisionEnVolume>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<DivisionEnVolume[]> {
    return this.httpClient.get<DivisionEnVolume[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DivisionEnVolume> {
    return this.httpClient.get<DivisionEnVolume>(`${this.SERVICE_URL}/${id}`)
  }

  create(DivisionEnVolume: DivisionEnVolume): Observable<DivisionEnVolume> {
    return this.httpClient.post<DivisionEnVolume>(`${this.SERVICE_URL}`, DivisionEnVolume)
  }

  update(DivisionEnVolume: DivisionEnVolume): Observable<DivisionEnVolume> {
    return this.httpClient.put<DivisionEnVolume>(`${this.SERVICE_URL}/${DivisionEnVolume.id!}`, DivisionEnVolume)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
