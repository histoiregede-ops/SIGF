import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Augmentation } from '../models/Augmentation';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class AugmentationService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.GESTION_DOSSIERS}/augmentations`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Augmentation>> {
    return this.httpClient.get<PagingData<Augmentation>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(filtres?: CustomMapType): Observable<Augmentation[]> {
    return this.httpClient.get<Augmentation[]>(`${this.SERVICE_URL}`, { params: filtres })
  }

  get(id: string): Observable<Augmentation> {
    return this.httpClient.get<Augmentation>(`${this.SERVICE_URL}/${id}`)
  }

  create(Augmentation: Augmentation): Observable<Augmentation> {
    return this.httpClient.post<Augmentation>(`${this.SERVICE_URL}`, Augmentation)
  }

  update(Augmentation: Augmentation): Observable<Augmentation> {
    return this.httpClient.put<Augmentation>(`${this.SERVICE_URL}/${Augmentation.id!}`, Augmentation)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
