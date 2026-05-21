import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { OppositionRequisition } from '../models/OppositionRequisition';

@Injectable({
  providedIn: 'root'
})
export class OppositionRequisitionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/oppositionsRequisitions`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<OppositionRequisition[]> {
    return this.httpClient.get<OppositionRequisition[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<OppositionRequisition> {
    return this.httpClient.get<OppositionRequisition>(`${this.SERVICE_URL}/${id}`)
  }

  create(oppositionRequisition: OppositionRequisition): Observable<OppositionRequisition> {
    return this.httpClient.post<OppositionRequisition>(`${this.SERVICE_URL}`, oppositionRequisition)
  }

  update(oppositionRequisition: OppositionRequisition): Observable<OppositionRequisition> {
    return this.httpClient.put<OppositionRequisition>(`${this.SERVICE_URL}/${oppositionRequisition.id!}`, oppositionRequisition)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
