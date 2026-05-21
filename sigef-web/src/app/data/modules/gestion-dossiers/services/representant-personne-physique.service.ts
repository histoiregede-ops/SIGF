import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { RepresentantPersonnePhysique } from '../models/RepresentantPersonnePhysique';

@Injectable({
  providedIn: 'root'
})
export class RepresentantPersonnePhysiqueService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/representantsPersonnePhysique`
  private readonly PAGINATION_DEFAULT_SIZE: number = environment.PAGINATION_DEFAULT_SIZE

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number): Observable<PagingData<RepresentantPersonnePhysique>> {
    return this.httpClient.get<PagingData<RepresentantPersonnePhysique>>(`${this.SERVICE_URL}?page=${page}&size=${this.PAGINATION_DEFAULT_SIZE}`, {
      params: {}
    })
  }

  getAllData(): Observable<RepresentantPersonnePhysique[]> {
    return this.httpClient.get<RepresentantPersonnePhysique[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<RepresentantPersonnePhysique> {
    return this.httpClient.get<RepresentantPersonnePhysique>(`${this.SERVICE_URL}/${id}`)
  }

  create(representantPersonnePhysique: RepresentantPersonnePhysique): Observable<RepresentantPersonnePhysique> {
    return this.httpClient.post<RepresentantPersonnePhysique>(`${this.SERVICE_URL}`, representantPersonnePhysique)
  }

  update(representantPersonnePhysique: RepresentantPersonnePhysique): Observable<RepresentantPersonnePhysique> {
    return this.httpClient.put<RepresentantPersonnePhysique>(`${this.SERVICE_URL}/${representantPersonnePhysique.id!}`, representantPersonnePhysique)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
