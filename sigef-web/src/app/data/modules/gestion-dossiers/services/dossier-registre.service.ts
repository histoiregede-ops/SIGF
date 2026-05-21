import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TypesRegistre } from '../../../enums/TypesRegistre';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { DossierRegistre } from '../models/DossierRegistre';

@Injectable({
  providedIn: 'root'
})
export class DossierRegistreService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/dossiersRegistres`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<PagingData<DossierRegistre>> {
    return this.httpClient.get<PagingData<DossierRegistre>>(
      `${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistreId=${typeRegistreId}`,
      { params: filtres }
    )
  }

  getAllData(typeRegistreId?: TypesRegistre, dossierRegistreParentId?: string, filtres?: CustomMapType): Observable<DossierRegistre[]> {
    return this.httpClient.get<DossierRegistre[]>(
      `${this.SERVICE_URL}?typeRegistreId=${typeRegistreId}&dossierRegistre=${dossierRegistreParentId}`,
      { params: filtres }
    )
  }

  get(id: string): Observable<DossierRegistre> {
    return this.httpClient.get<DossierRegistre>(`${this.SERVICE_URL}/${id}`)
  }

  getProchainFolioDossierRegistre(dossierRegistreId: DossierRegistre['id'], typeRegistreId: TypesRegistre): Observable<any> {
    return this.httpClient.get<any>(`${this.SERVICE_URL}/prochainFolio/${dossierRegistreId}?typeRegistreId=${typeRegistreId}`)
  }

  getProchainNumeroOrdreDossierRegistre(dossierRegistreId: DossierRegistre['id'], typeRegistreId: TypesRegistre): Observable<any> {
    return this.httpClient.get<any>(`${this.SERVICE_URL}/prochainNumeroOrdre/${dossierRegistreId}?typeRegistreId=${typeRegistreId}`)
  }

  create(dossierRegistre: DossierRegistre): Observable<DossierRegistre> {
    return this.httpClient.post<DossierRegistre>(`${this.SERVICE_URL}`, dossierRegistre)
  }

  update(dossierRegistre: DossierRegistre): Observable<DossierRegistre> {
    return this.httpClient.put<DossierRegistre>(`${this.SERVICE_URL}/${dossierRegistre.id!}`, dossierRegistre)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
