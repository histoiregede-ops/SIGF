import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DirectionLimite } from '../models/DirectionLimite';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class DirectionLimiteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/directionsLimite`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<DirectionLimite>> {
    return this.httpClient.get<PagingData<DirectionLimite>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<DirectionLimite[]> {
    return this.httpClient.get<DirectionLimite[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DirectionLimite> {
    return this.httpClient.get<DirectionLimite>(`${this.SERVICE_URL}/${id}`)
  }

  create(directionLimite: DirectionLimite): Observable<DirectionLimite> {
    return this.httpClient.post<DirectionLimite>(`${this.SERVICE_URL}`, directionLimite)
  }

  update(directionLimite: DirectionLimite): Observable<DirectionLimite> {
    return this.httpClient.put<DirectionLimite>(`${this.SERVICE_URL}/${directionLimite.id!}`, directionLimite)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
