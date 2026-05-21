import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PartiePrenante } from '../models/PartiePrenante';

@Injectable({
  providedIn: 'root'
})
export class PartiePrenanteService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/partiesPrenantes`

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<PartiePrenante[]> {
    return this.httpClient.get<PartiePrenante[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<PartiePrenante> {
    return this.httpClient.get<PartiePrenante>(`${this.SERVICE_URL}/${id}`)
  }

  create(partiePrenante: PartiePrenante): Observable<PartiePrenante> {
    return this.httpClient.post<PartiePrenante>(`${this.SERVICE_URL}`, partiePrenante)
  }

  update(partiePrenante: PartiePrenante): Observable<PartiePrenante> {
    return this.httpClient.put<PartiePrenante>(`${this.SERVICE_URL}/${partiePrenante.id!}`, partiePrenante)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
