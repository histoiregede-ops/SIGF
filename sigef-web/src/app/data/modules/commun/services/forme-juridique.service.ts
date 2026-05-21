import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { FormeJuridique } from '../models/FormeJuridique';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class FormeJuridiqueService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/formesJuridiques`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<FormeJuridique>> {
    return this.httpClient.get<PagingData<FormeJuridique>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<FormeJuridique[]> {
    return this.httpClient.get<FormeJuridique[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<FormeJuridique> {
    return this.httpClient.get<FormeJuridique>(`${this.SERVICE_URL}/${id}`)
  }

  create(formejuridique: FormeJuridique): Observable<FormeJuridique> {
    return this.httpClient.post<FormeJuridique>(`${this.SERVICE_URL}`, formejuridique)
  }

  update(formejuridique: FormeJuridique): Observable<FormeJuridique> {
    return this.httpClient.put<FormeJuridique>(`${this.SERVICE_URL}/${formejuridique.id!}`, formejuridique)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
