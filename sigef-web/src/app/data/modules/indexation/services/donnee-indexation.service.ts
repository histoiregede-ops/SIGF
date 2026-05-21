import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { DonneeIndexation } from '../models/DonneeIndexation';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { TypesRegistre } from '../../../enums/TypesRegistre';

@Injectable({
  providedIn: 'root'
})
export class DonneeIndexationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/donneesIndexation`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, typeRegistreId?: TypesRegistre, filtres?: CustomMapType): Observable<PagingData<DonneeIndexation>> {
    return this.httpClient.get<PagingData<DonneeIndexation>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}&typeRegistre=${typeRegistreId}`, { params: filtres })
  }

  getAllData(): Observable<DonneeIndexation[]> {
    return this.httpClient.get<DonneeIndexation[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<DonneeIndexation> {
    return this.httpClient.get<DonneeIndexation>(`${this.SERVICE_URL}/${id}`)
  }

  // create(donneeIndexation: DonneeIndexation): Observable<DonneeIndexation> {
  //   return this.httpClient.post<DonneeIndexation>(`${this.SERVICE_URL}`, donneeIndexation)
  // }

  update(donneeIndexation: DonneeIndexation): Observable<DonneeIndexation> {
    return this.httpClient.put<DonneeIndexation>(`${this.SERVICE_URL}/${donneeIndexation.id!}`, donneeIndexation)
  }

  // delete(id: string): Observable<any> {
  //   return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  // }
}
