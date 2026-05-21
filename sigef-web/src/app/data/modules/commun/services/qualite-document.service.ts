import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { QualiteDocument } from '../models/QualiteDocument';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class QualiteDocumentService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/qualitesDocument`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<QualiteDocument>> {
    return this.httpClient.get<PagingData<QualiteDocument>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<QualiteDocument[]> {
    return this.httpClient.get<QualiteDocument[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<QualiteDocument> {
    return this.httpClient.get<QualiteDocument>(`${this.SERVICE_URL}/${id}`)
  }

  create(qualitedocument: QualiteDocument): Observable<QualiteDocument> {
    return this.httpClient.post<QualiteDocument>(`${this.SERVICE_URL}`, qualitedocument)
  }

  update(qualitedocument: QualiteDocument): Observable<QualiteDocument> {
    return this.httpClient.put<QualiteDocument>(`${this.SERVICE_URL}/${qualitedocument.id!}`, qualitedocument)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
