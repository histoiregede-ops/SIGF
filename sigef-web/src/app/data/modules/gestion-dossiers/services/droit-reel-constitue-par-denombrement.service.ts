import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { DroitReelConstitueParDenombrement } from '../models/DroitReelConstitueParDenombrement';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class DroitReelConstitueParDenombrementService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/droitsReelsConstituesParDenombrement`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<DroitReelConstitueParDenombrement>> {
    return this.httpClient.get<PagingData<DroitReelConstitueParDenombrement>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<DroitReelConstitueParDenombrement[]> {
    return this.httpClient.get<DroitReelConstitueParDenombrement[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DroitReelConstitueParDenombrement> {
    return this.httpClient.get<DroitReelConstitueParDenombrement>(`${this.SERVICE_URL}/${id}`)
  }

  create(DroitReelConstitueParDenombrement: DroitReelConstitueParDenombrement): Observable<DroitReelConstitueParDenombrement> {
    return this.httpClient.post<DroitReelConstitueParDenombrement>(`${this.SERVICE_URL}`, DroitReelConstitueParDenombrement)
  }

  update(DroitReelConstitueParDenombrement: DroitReelConstitueParDenombrement): Observable<DroitReelConstitueParDenombrement> {
    return this.httpClient.put<DroitReelConstitueParDenombrement>(`${this.SERVICE_URL}/${DroitReelConstitueParDenombrement.id!}`, DroitReelConstitueParDenombrement)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
