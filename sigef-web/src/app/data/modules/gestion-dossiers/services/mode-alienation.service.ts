import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { ModeAlienation } from '../models/ModeAlienation';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class ModeAlienationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/modesAlienation`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<ModeAlienation>> {
    return this.httpClient.get<PagingData<ModeAlienation>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<ModeAlienation[]> {
    return this.httpClient.get<ModeAlienation[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<ModeAlienation> {
    return this.httpClient.get<ModeAlienation>(`${this.SERVICE_URL}/${id}`)
  }

  create(modeAlienation: ModeAlienation): Observable<ModeAlienation> {
    return this.httpClient.post<ModeAlienation>(`${this.SERVICE_URL}`, modeAlienation)
  }

  update(modeAlienation: ModeAlienation): Observable<ModeAlienation> {
    return this.httpClient.put<ModeAlienation>(`${this.SERVICE_URL}/${modeAlienation.id!}`, modeAlienation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
