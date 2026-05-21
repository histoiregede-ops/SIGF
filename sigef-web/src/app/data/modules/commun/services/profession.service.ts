import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { Profession } from '../models/Profession';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.COMMUN}/professions`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Profession>> {
    return this.httpClient.get<PagingData<Profession>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Profession[]> {
    return this.httpClient.get<Profession[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Profession> {
    return this.httpClient.get<Profession>(`${this.SERVICE_URL}/${id}`)
  }

  create(profession: Profession): Observable<Profession> {
    return this.httpClient.post<Profession>(`${this.SERVICE_URL}`, profession)
  }

  update(profession: Profession): Observable<Profession> {
    return this.httpClient.put<Profession>(`${this.SERVICE_URL}/${profession.id!}`, profession)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
