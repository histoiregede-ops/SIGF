import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { DemandeEtatDescriptif } from '../models/DemandeEtatDescriptif';

@Injectable({
  providedIn: 'root'
})
export class DemandeEtatDescriptifService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/demandesEtatsDescriptifs`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<DemandeEtatDescriptif>> {
    return this.httpClient.get<PagingData<DemandeEtatDescriptif>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}`,
      { params: filtres }
    )
  }

  getAllData(filtres?: CustomMapType): Observable<DemandeEtatDescriptif[]> {
    return this.httpClient.get<DemandeEtatDescriptif[]>(
      `${this.SERVICE_URL}`,
      { params: filtres }
    )
  }

  get(id: string): Observable<DemandeEtatDescriptif> {
    return this.httpClient.get<DemandeEtatDescriptif>(`${this.SERVICE_URL}/${id}`)
  }

  create(demandeEtatDescriptif: DemandeEtatDescriptif): Observable<DemandeEtatDescriptif> {
    return this.httpClient.post<DemandeEtatDescriptif>(`${this.SERVICE_URL}`, demandeEtatDescriptif)
  }

  update(demandeEtatDescriptif: DemandeEtatDescriptif): Observable<DemandeEtatDescriptif> {
    return this.httpClient.put<DemandeEtatDescriptif>(`${this.SERVICE_URL}/${demandeEtatDescriptif.id!}`, demandeEtatDescriptif)
  }

  traiter(demandeEtatDescriptif: DemandeEtatDescriptif): Observable<DemandeEtatDescriptif> {
    return this.httpClient.put<DemandeEtatDescriptif>(`${this.SERVICE_URL}/${demandeEtatDescriptif.id!}/traitement`, demandeEtatDescriptif)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
