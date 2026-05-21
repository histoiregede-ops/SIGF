import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagingData } from '../../../interfaces/PagingData';
import { TacheIndexation } from '../models/TacheIndexation';
import { TypesTacheIndexation } from '../../../enums/TypesTacheIndexation';
import { TypesRegistre } from '../../../enums/TypesRegistre';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class TacheIndexationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/tachesIndexation`

  constructor(private httpClient: HttpClient) { }

  getAll(typeTacheIndexation: TypesTacheIndexation, typeRegistre: TypesRegistre, page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<TacheIndexation>> {
    return this.httpClient.get<PagingData<TacheIndexation>>(`${this.SERVICE_URL}?typeTacheIndexation=${typeTacheIndexation}&typeRegistre=${typeRegistre}&page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(typeTacheIndexation: TypesTacheIndexation, typeRegistre: TypesRegistre): Observable<TacheIndexation[]> {
    return this.httpClient.get<TacheIndexation[]>(`${this.SERVICE_URL}?typeTacheIndexation=${typeTacheIndexation}&typeRegistre=${typeRegistre}`)
  }

  get(id: string, typeTacheIndexation: TypesTacheIndexation, typeRegistre: TypesRegistre): Observable<TacheIndexation> {
    return this.httpClient.get<TacheIndexation>(`${this.SERVICE_URL}/${id}?typeTacheIndexation=${typeTacheIndexation}&typeRegistre=${typeRegistre}`)
  }

  create(tacheIndexation: TacheIndexation): Observable<TacheIndexation> {
    return this.httpClient.post<TacheIndexation>(`${this.SERVICE_URL}`, tacheIndexation)
  }

  update(tacheIndexation: TacheIndexation): Observable<TacheIndexation> {
    return this.httpClient.put<TacheIndexation>(`${this.SERVICE_URL}/${tacheIndexation.id!}`, tacheIndexation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
