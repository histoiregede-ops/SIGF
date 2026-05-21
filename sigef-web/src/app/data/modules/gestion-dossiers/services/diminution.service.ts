import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Diminution } from '../models/Diminution';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class DiminutionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/diminutions`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Diminution>> {
    return this.httpClient.get<PagingData<Diminution>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Diminution[]> {
    return this.httpClient.get<Diminution[]>(`${this.SERVICE_URL}`, { params: filtres })
  }

  get(id: string): Observable<Diminution> {
    return this.httpClient.get<Diminution>(`${this.SERVICE_URL}/${id}`)
  }

  create(Diminution: Diminution): Observable<Diminution> {
    return this.httpClient.post<Diminution>(`${this.SERVICE_URL}`, Diminution)
  }

  update(Diminution: Diminution): Observable<Diminution> {
    return this.httpClient.put<Diminution>(`${this.SERVICE_URL}/${Diminution.id!}`, Diminution)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
