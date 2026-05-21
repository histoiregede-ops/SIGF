import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypesRegistre } from '../../../enums/TypesRegistre';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { ActeRegistre } from '../models/ActeRegistre';

@Injectable({
  providedIn: 'root'
})
export class ActeRegistreService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/actesRegistres`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<PagingData<ActeRegistre>> {
    return this.httpClient.get<PagingData<ActeRegistre>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistreId=${typeRegistreId}`,
      { params: filtres }
    )
  }

  getAllData(typeRegistreId?: TypesRegistre, dossierRegistreId?: string, filtres?: CustomMapType): Observable<ActeRegistre[]> {
    return this.httpClient.get<ActeRegistre[]>(
      `${this.SERVICE_URL}?typeRegistreId=${typeRegistreId}&dossier=${dossierRegistreId}`,
      { params: filtres }
    )
  }

  getById(id: string): Observable<ActeRegistre> {
    return this.httpClient.get<ActeRegistre>(`${this.SERVICE_URL}/${id}`)
  }

  create(acteRegistre: ActeRegistre): Observable<ActeRegistre> {
    return this.httpClient.post<ActeRegistre>(`${this.SERVICE_URL}`, acteRegistre)
  }

  update(acteRegistre: ActeRegistre): Observable<ActeRegistre> {
    return this.httpClient.put<ActeRegistre>(`${this.SERVICE_URL}/${acteRegistre.id!}`, acteRegistre)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
