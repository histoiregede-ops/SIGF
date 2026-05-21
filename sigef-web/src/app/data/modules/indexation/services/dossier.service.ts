import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Dossier } from '../models/Dossier';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { PagingData } from '../../../interfaces/PagingData';
import { TypesRegistre } from '../../../enums/TypesRegistre';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/dossiers`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<PagingData<Dossier>> {
    return this.httpClient.get<PagingData<Dossier>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistreId=${typeRegistreId}`,
      { params: filtres }
    )
  }

  getAllData(typeRegistreId?: TypesRegistre, dossierParentId?: string, filtres?: CustomMapType): Observable<Dossier[]> {
    let params = new HttpParams();
    if (typeRegistreId != null) {
      params = params.set('typeRegistreId', typeRegistreId);
    }
    if (dossierParentId != null && dossierParentId !== '' && dossierParentId !== 'undefined' && dossierParentId !== 'null') {
      params = params.set('dossier', dossierParentId);
    }

    return this.httpClient.get<Dossier[]>(
      `${this.SERVICE_URL}`,
      { params: filtres ? params.appendAll(filtres) : params }
    )
  }

  get(id: string): Observable<Dossier> {
    return this.httpClient.get<Dossier>(`${this.SERVICE_URL}/${id}`)
  }

  create(dossier: Dossier): Observable<Dossier> {
    return this.httpClient.post<Dossier>(`${this.SERVICE_URL}`, dossier)
  }

  update(dossier: Dossier): Observable<Dossier> {
    return this.httpClient.put<Dossier>(`${this.SERVICE_URL}/${dossier.id!}`, dossier)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
