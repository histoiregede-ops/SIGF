import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { TitreFoncier } from '../models/TitreFoncier';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Region } from '../../commun/models/Region';

@Injectable({
  providedIn: 'root'
})
export class TitreFoncierService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/titresFonciers`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TitreFoncier>> {
    return this.httpClient.get<PagingData<TitreFoncier>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<TitreFoncier[]> {
    return this.httpClient.get<TitreFoncier[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<TitreFoncier> {
    return this.httpClient.get<TitreFoncier>(`${this.SERVICE_URL}/${id}`)
  }

  getParNumeroTitreFoncier(numeroTitreFoncier: string): Observable<TitreFoncier> {
    return this.httpClient.get<TitreFoncier>(`${this.SERVICE_URL}/numeroTitreFoncier/${numeroTitreFoncier}`)
  }

  getProchainNumeroTitreFoncier(regionId: Region['id']): Observable<any> {
    return this.httpClient.get<any>(`${this.SERVICE_URL}/prochainNumeroTitreFoncier/${regionId}`)
  }

  create(titreFoncier: TitreFoncier): Observable<TitreFoncier> {
    return this.httpClient.post<TitreFoncier>(`${this.SERVICE_URL}`, titreFoncier)
  }

  update(titreFoncier: TitreFoncier): Observable<TitreFoncier> {
    return this.httpClient.put<TitreFoncier>(`${this.SERVICE_URL}/${titreFoncier.id!}`, titreFoncier)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
