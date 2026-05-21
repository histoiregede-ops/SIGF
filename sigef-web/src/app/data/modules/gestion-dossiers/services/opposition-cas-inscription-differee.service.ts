import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { OppositionCasInscriptionDifferee } from '../models/OppositionCasInscriptionDifferee';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class OppositionCasInscriptionDiffereeService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/oppositionsCasInscriptionDifferee`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<OppositionCasInscriptionDifferee>> {
    return this.httpClient.get<PagingData<OppositionCasInscriptionDifferee>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<OppositionCasInscriptionDifferee[]> {
    return this.httpClient.get<OppositionCasInscriptionDifferee[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<OppositionCasInscriptionDifferee> {
    return this.httpClient.get<OppositionCasInscriptionDifferee>(`${this.SERVICE_URL}/${id}`)
  }

  create(OppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee): Observable<OppositionCasInscriptionDifferee> {
    return this.httpClient.post<OppositionCasInscriptionDifferee>(`${this.SERVICE_URL}`, OppositionCasInscriptionDifferee)
  }

  update(OppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee): Observable<OppositionCasInscriptionDifferee> {
    return this.httpClient.put<OppositionCasInscriptionDifferee>(`${this.SERVICE_URL}/${OppositionCasInscriptionDifferee.id!}`, OppositionCasInscriptionDifferee)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
