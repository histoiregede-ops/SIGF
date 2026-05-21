import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingData } from '../../../interfaces/PagingData';
import { CustomMapType } from '../../../utils/FiltresDonneesUtils';
import { Profil } from '../models/Profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private readonly SERVICE_URL: string = `${environment.API_MODULES.AUTH}/profils`

  constructor(private httpClient: HttpClient) { }

  getAll(page?: number, paginationSize?: number, filtres?: CustomMapType): Observable<PagingData<Profil>> {
    return this.httpClient.get<PagingData<Profil>>(`${this.SERVICE_URL}?page=${page}&size=${paginationSize}`, { params: filtres })
  }

  getAllData(): Observable<Profil[]> {
    return this.httpClient.get<Profil[]>(`${this.SERVICE_URL}`)
  }

  get(id: string): Observable<Profil> {
    return this.httpClient.get<Profil>(`${this.SERVICE_URL}/${id}`)
  }

  create(profil: Profil): Observable<Profil> {
    return this.httpClient.post<Profil>(`${this.SERVICE_URL}`, profil)
  }

  update(profil: Profil): Observable<Profil> {
    return this.httpClient.put<Profil>(`${this.SERVICE_URL}/${profil.id!}`, profil)
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.SERVICE_URL}/${id}`)
  }
}
