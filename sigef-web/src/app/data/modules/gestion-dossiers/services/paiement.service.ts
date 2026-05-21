import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Paiement } from '../models/Paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/paiements`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Paiement>> {
    return this.httpClient.get<PagingData<Paiement>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Paiement> {
    return this.httpClient.get<Paiement>(`${this.SERVICE_URL}/${id}`)
  }

  create(paiement: Paiement): Observable<Paiement> {
    return this.httpClient.post<Paiement>(`${this.SERVICE_URL}`, paiement)
  }

  update(paiement: Paiement): Observable<Paiement> {
    return this.httpClient.put<Paiement>(`${this.SERVICE_URL}/${paiement.id!}`, paiement)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
