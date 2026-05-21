import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypesRegistre } from '../../../enums/TypesRegistre';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { DemandeTransfert } from '../models/DemandeTransfert';

@Injectable({
  providedIn: 'root'
})
export class DemandeTransfertService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/demandesTransferts`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<PagingData<DemandeTransfert>> {
    return this.httpClient.get<PagingData<DemandeTransfert>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistreId=${typeRegistreId}`,
      { params: filtres }
    )
  }

  getAllData(typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<DemandeTransfert[]> {
    return this.httpClient.get<DemandeTransfert[]>(
      `${this.SERVICE_URL}?typeRegistreId=${typeRegistreId}`,
      { params: filtres }
    )
  }

  get(id: string): Observable<DemandeTransfert> {
    return this.httpClient.get<DemandeTransfert>(`${this.SERVICE_URL}/${id}`)
  }

  create(demandeTransfert: DemandeTransfert): Observable<DemandeTransfert> {
    return this.httpClient.post<DemandeTransfert>(`${this.SERVICE_URL}`, demandeTransfert)
  }

  update(demandeTransfert: DemandeTransfert): Observable<DemandeTransfert> {
    return this.httpClient.put<DemandeTransfert>(`${this.SERVICE_URL}/${demandeTransfert.id!}`, demandeTransfert)
  }

  traiter(demandeTransfert: DemandeTransfert): Observable<DemandeTransfert> {
    return this.httpClient.put<DemandeTransfert>(`${this.SERVICE_URL}/${demandeTransfert.id!}/traitement`, demandeTransfert)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }

}
