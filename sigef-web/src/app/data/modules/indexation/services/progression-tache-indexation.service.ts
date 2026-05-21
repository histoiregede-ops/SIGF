import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProgressionTacheIndexation } from '../models/ProgressionTacheIndexation';
import { TypesRegistre } from '../../../enums/TypesRegistre';

@Injectable({
  providedIn: 'root'
})
export class ProgressionTacheIndexationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.INDEXATION}/progressionsTachesIndexation`

  constructor(private httpClient: HttpClient) { }

  getAllData(typeRegistre: TypesRegistre, tacheIndexationId?: string): Observable<ProgressionTacheIndexation[]> {
    return this.httpClient.get<ProgressionTacheIndexation[]>(`${this.SERVICE_URL}?typeRegistre=${typeRegistre}&tacheIndexationId=${tacheIndexationId}`)
  }

  get(id: string): Observable<ProgressionTacheIndexation> {
    return this.httpClient.get<ProgressionTacheIndexation>(`${this.SERVICE_URL}/${id}`)
  }

  create(progressionTacheIndexation: ProgressionTacheIndexation): Observable<ProgressionTacheIndexation> {
    return this.httpClient.post<ProgressionTacheIndexation>(`${this.SERVICE_URL}`, progressionTacheIndexation)
  }

  signaler(progressionTacheIndexation: ProgressionTacheIndexation): Observable<ProgressionTacheIndexation> {
    return this.httpClient.post<ProgressionTacheIndexation>(`${this.SERVICE_URL}/signalisation`, progressionTacheIndexation)
  }

  rejeter(progressionTacheIndexation: ProgressionTacheIndexation): Observable<ProgressionTacheIndexation> {
    return this.httpClient.put<ProgressionTacheIndexation>(`${this.SERVICE_URL}/${progressionTacheIndexation.id!}/rejet`, progressionTacheIndexation)
  }

  update(progressionTacheIndexation: ProgressionTacheIndexation): Observable<ProgressionTacheIndexation> {
    return this.httpClient.put<ProgressionTacheIndexation>(`${this.SERVICE_URL}/${progressionTacheIndexation.id!}`, progressionTacheIndexation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
