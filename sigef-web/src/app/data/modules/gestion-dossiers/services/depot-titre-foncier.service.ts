import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DepotTitreFoncier } from '../models/DepotTitreFoncier';

@Injectable({
  providedIn: 'root'
})
export class DepotTitreFoncierService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/depotsTitresFonciers`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<DepotTitreFoncier[]> {
    return this.httpClient.get<DepotTitreFoncier[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DepotTitreFoncier> {
    return this.httpClient.get<DepotTitreFoncier>(`${this.SERVICE_URL}/${id}`)
  }

  create(depotTitreFoncier: DepotTitreFoncier): Observable<DepotTitreFoncier> {
    return this.httpClient.post<DepotTitreFoncier>(`${this.SERVICE_URL}`, depotTitreFoncier)
  }

  update(depotTitreFoncier: DepotTitreFoncier): Observable<DepotTitreFoncier> {
    return this.httpClient.put<DepotTitreFoncier>(`${this.SERVICE_URL}/${depotTitreFoncier.id!}`, depotTitreFoncier)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
